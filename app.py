import os
import requests
from flask import Flask, request, jsonify
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes

TOKEN = os.getenv("TELEGRAM_TOKEN")
TMDB_API = os.getenv("TMDB_API")
WEBSITE = os.getenv("WEBSITE_URL")

app = Flask(__name__)

bot_app = ApplicationBuilder().token(TOKEN).build()

TMDB = "https://api.themoviedb.org/3"


# =====================
# TMDB FUNCTIONS
# =====================

def tmdb(endpoint, params={}):
    params["api_key"] = TMDB_API
    url = f"{TMDB}{endpoint}"
    r = requests.get(url, params=params)
    return r.json()


def search_movie(query):

    r = tmdb("/search/movie", {"query": query})

    if not r.get("results"):
        return None

    return r["results"][0]


# =====================
# WEBSITE APIs
# =====================

@app.route("/trending")
def trending():

    data = tmdb("/trending/movie/week")

    return jsonify(data)


@app.route("/popular")
def popular():

    data = tmdb("/movie/popular")

    return jsonify(data)


@app.route("/top")
def top():

    data = tmdb("/movie/top_rated")

    return jsonify(data)


@app.route("/search")
def search():

    q = request.args.get("q")

    data = tmdb("/search/movie", {"query": q})

    return jsonify(data)


@app.route("/movie")
def movie():

    movie_id = request.args.get("id")

    data = tmdb(f"/movie/{movie_id}", {"append_to_response": "videos,credits"})

    return jsonify(data)


@app.route("/celebs")
def celebs():

    data = tmdb("/person/popular")

    return jsonify(data)


# =====================
# TELEGRAM BOT
# =====================

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):

    text = (
        "🎬 Movnix Movie Bot\n\n"
        "Commands:\n"
        "/movie movie_name\n"
        "/trending\n"
        "/top\n"
        "/search movie_name\n"
    )

    await update.message.reply_text(text)


async def movie(update: Update, context: ContextTypes.DEFAULT_TYPE):

    if not context.args:
        await update.message.reply_text("Example: /movie avatar")
        return

    query = " ".join(context.args)

    data = search_movie(query)

    if not data:
        await update.message.reply_text("Movie not found")
        return

    poster = data.get("poster_path")

    if poster:
        poster_url = f"https://image.tmdb.org/t/p/w500{poster}"
    else:
        poster_url = "https://via.placeholder.com/500"

    caption = (
        f"🎬 {data['title']}\n"
        f"⭐ Rating: {data['vote_average']}\n"
        f"📅 Release: {data['release_date']}\n\n"
        f"{data['overview'][:300]}..."
    )

    keyboard = [
        [InlineKeyboardButton("🎥 Open in Movnix", url=WEBSITE)]
    ]

    reply_markup = InlineKeyboardMarkup(keyboard)

    await update.message.reply_photo(
        photo=poster_url,
        caption=caption,
        reply_markup=reply_markup
    )


async def trending_cmd(update: Update, context: ContextTypes.DEFAULT_TYPE):

    data = tmdb("/trending/movie/week")

    movies = data["results"][:5]

    text = "🔥 Trending Movies\n\n"

    for m in movies:
        text += f"🎬 {m['title']} ⭐ {m['vote_average']}\n"

    await update.message.reply_text(text)


async def top_cmd(update: Update, context: ContextTypes.DEFAULT_TYPE):

    data = tmdb("/movie/top_rated")

    movies = data["results"][:5]

    text = "🏆 Top Rated Movies\n\n"

    for m in movies:
        text += f"🎬 {m['title']} ⭐ {m['vote_average']}\n"

    await update.message.reply_text(text)


async def search_cmd(update: Update, context: ContextTypes.DEFAULT_TYPE):

    if not context.args:
        await update.message.reply_text("Example: /search avatar")
        return

    query = " ".join(context.args)

    data = tmdb("/search/movie", {"query": query})

    movies = data["results"][:5]

    text = f"🔎 Results for: {query}\n\n"

    for m in movies:
        text += f"🎬 {m['title']} ⭐ {m['vote_average']}\n"

    await update.message.reply_text(text)


# =====================
# BOT HANDLERS
# =====================

bot_app.add_handler(CommandHandler("start", start))
bot_app.add_handler(CommandHandler("movie", movie))
bot_app.add_handler(CommandHandler("trending", trending_cmd))
bot_app.add_handler(CommandHandler("top", top_cmd))
bot_app.add_handler(CommandHandler("search", search_cmd))


# =====================
# WEBHOOK
# =====================

@app.route(f"/{TOKEN}", methods=["POST"])
async def webhook():

    update = Update.de_json(request.get_json(force=True), bot_app.bot)

    await bot_app.process_update(update)

    return "ok"


# =====================
# HOME
# =====================

@app.route("/")
def home():
    return "Movnix Backend Running"


# =====================
# RUN
# =====================

if __name__ == "__main__":

    port = int(os.environ.get("PORT", 10000))

    app.run(host="0.0.0.0", port=port)
