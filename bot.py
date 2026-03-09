import os
import requests
from flask import Flask, request
from telegram import Bot, Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Dispatcher, CommandHandler

# ==========================
# ENV VARIABLES
# ==========================

TOKEN = os.environ.get("TELEGRAM_TOKEN")
TMDB_API = os.environ.get("TMDB_API")
WEBSITE = os.environ.get("WEBSITE_URL")

bot = Bot(token=TOKEN)

app = Flask(__name__)
dispatcher = Dispatcher(bot, None, workers=0)

# ==========================
# TMDB SEARCH
# ==========================

def search_movie(query):

    url = f"https://api.themoviedb.org/3/search/movie?api_key={TMDB_API}&query={query}"

    data = requests.get(url).json()

    if not data["results"]:
        return None

    movie = data["results"][0]

    return {
        "title": movie["title"],
        "overview": movie["overview"],
        "rating": movie["vote_average"],
        "release": movie["release_date"],
        "poster": movie["poster_path"]
    }

# ==========================
# START COMMAND
# ==========================

def start(update, context):

    text = (
        "🎬 *Welcome to Movie Bot*\n\n"
        "Use command:\n"
        "`/movie movie_name`\n\n"
        "Example:\n"
        "`/movie avatar`"
    )

    update.message.reply_text(text, parse_mode="Markdown")

# ==========================
# MOVIE COMMAND
# ==========================

def movie(update, context):

    if not context.args:
        update.message.reply_text("Example:\n/movie avatar")
        return

    query = " ".join(context.args)

    data = search_movie(query)

    if not data:
        update.message.reply_text("Movie not found ❌")
        return

    title = data["title"]
    overview = data["overview"]
    rating = data["rating"]
    release = data["release"]
    poster = data["poster"]

    if poster:
        poster_url = f"https://image.tmdb.org/t/p/w500{poster}"
    else:
        poster_url = "https://via.placeholder.com/500x750"

    caption = (
        f"🎬 *{title}*\n"
        f"⭐ Rating: {rating}\n"
        f"📅 Release: {release}\n\n"
        f"{overview[:300]}..."
    )

    keyboard = [
        [InlineKeyboardButton("🎥 Watch Movie", url=WEBSITE)]
    ]

    reply_markup = InlineKeyboardMarkup(keyboard)

    bot.send_photo(
        chat_id=update.effective_chat.id,
        photo=poster_url,
        caption=caption,
        parse_mode="Markdown",
        reply_markup=reply_markup
    )

# ==========================
# HANDLERS
# ==========================

dispatcher.add_handler(CommandHandler("start", start))
dispatcher.add_handler(CommandHandler("movie", movie))

# ==========================
# WEBHOOK
# ==========================

@app.route(f"/{TOKEN}", methods=["POST"])
def webhook():

    update = Update.de_json(request.get_json(force=True), bot)
    dispatcher.process_update(update)

    return "ok"

# ==========================
# HOME PAGE
# ==========================

@app.route("/")
def home():

    return "Bot Running 🚀"

# ==========================
# RUN SERVER
# ==========================

if __name__ == "__main__":

    port = int(os.environ.get("PORT", 10000))

    app.run(host="0.0.0.0", port=port)
