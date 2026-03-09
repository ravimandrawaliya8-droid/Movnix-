import os
import requests
from flask import Flask, request
from telegram import Bot, Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Dispatcher, CommandHandler

# =====================
# ENV VARIABLES
# =====================

TOKEN = os.getenv("TELEGRAM_TOKEN")
TMDB_API = os.getenv("TMDB_API")
WEBSITE = os.getenv("WEBSITE_URL")

bot = Bot(token=TOKEN)

app = Flask(__name__)
dispatcher = Dispatcher(bot, None)

# =====================
# TMDB SEARCH
# =====================

def search_movie(query):

    url = f"https://api.themoviedb.org/3/search/movie?api_key={TMDB_API}&query={query}"

    r = requests.get(url).json()

    if not r.get("results"):
        return None

    movie = r["results"][0]

    return {
        "title": movie.get("title"),
        "overview": movie.get("overview"),
        "rating": movie.get("vote_average"),
        "release": movie.get("release_date"),
        "poster": movie.get("poster_path")
    }

# =====================
# START COMMAND
# =====================

def start(update, context):

    text = (
        "🎬 Welcome to Movie Bot\n\n"
        "Use command:\n"
        "/movie movie_name\n\n"
        "Example:\n"
        "/movie avatar"
    )

    update.message.reply_text(text)

# =====================
# MOVIE COMMAND
# =====================

def movie(update, context):

    if not context.args:
        update.message.reply_text("Example: /movie avatar")
        return

    query = " ".join(context.args)

    data = search_movie(query)

    if not data:
        update.message.reply_text("Movie not found")
        return

    poster = data["poster"]

    if poster:
        poster_url = f"https://image.tmdb.org/t/p/w500{poster}"
    else:
        poster_url = "https://via.placeholder.com/500x750"

    caption = (
        f"🎬 {data['title']}\n"
        f"⭐ Rating: {data['rating']}\n"
        f"📅 Release: {data['release']}\n\n"
        f"{data['overview'][:300]}..."
    )

    keyboard = [
        [InlineKeyboardButton("🎥 Watch Movie", url=WEBSITE)]
    ]

    reply_markup = InlineKeyboardMarkup(keyboard)

    bot.send_photo(
        chat_id=update.effective_chat.id,
        photo=poster_url,
        caption=caption,
        reply_markup=reply_markup
    )

# =====================
# HANDLERS
# =====================

dispatcher.add_handler(CommandHandler("start", start))
dispatcher.add_handler(CommandHandler("movie", movie))

# =====================
# WEBHOOK
# =====================

@app.route(f"/{TOKEN}", methods=["POST"])
def webhook():

    update = Update.de_json(request.get_json(force=True), bot)

    dispatcher.process_update(update)

    return "ok"

# =====================
# HOME ROUTE
# =====================

@app.route("/")
def home():
    return "Bot Running"

# =====================
# RUN SERVER
# =====================

if __name__ == "__main__":

    port = int(os.environ.get("PORT", 10000))

    app.run(host="0.0.0.0", port=port)
