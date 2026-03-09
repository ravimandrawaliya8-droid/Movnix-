import os
import requests
from flask import Flask, request, jsonify
from telegram import Bot, Update
from telegram.ext import Dispatcher, CommandHandler, CallbackContext

# ==============================
# ENV VARIABLES
# ==============================

TOKEN = os.environ.get("TELEGRAM_TOKEN")
TMDB_API = os.environ.get("TMDB_API")
RENDER_URL = os.environ.get("RENDER_URL")

bot = Bot(token=TOKEN)

app = Flask(__name__)

dispatcher = Dispatcher(bot, None, workers=4)

# ==============================
# HELPER FUNCTION
# ==============================

def search_movie(query):

    url = f"https://api.themoviedb.org/3/search/movie?api_key={TMDB_API}&query={query}"

    res = requests.get(url).json()

    if not res.get("results"):
        return None

    movie = res["results"][0]

    return {
        "title": movie.get("title"),
        "rating": movie.get("vote_average"),
        "release": movie.get("release_date"),
        "overview": movie.get("overview"),
        "poster": movie.get("poster_path")
    }

# ==============================
# BOT COMMANDS
# ==============================

def start(update: Update, context: CallbackContext):

    text = (
        "🎬 *Welcome to Movnix Bot*\n\n"
        "Commands:\n"
        "/movie movie_name\n\n"
        "Example:\n"
        "`/movie avatar`"
    )

    update.message.reply_text(text, parse_mode="Markdown")


def movie(update: Update, context: CallbackContext):

    if not context.args:
        update.message.reply_text("❗ Example:\n/movie avatar")
        return

    query = " ".join(context.args)

    movie_data = search_movie(query)

    if not movie_data:
        update.message.reply_text("❌ Movie not found")
        return

    title = movie_data["title"]
    rating = movie_data["rating"]
    release = movie_data["release"]
    overview = movie_data["overview"]
    poster = movie_data["poster"]

    poster_url = f"https://image.tmdb.org/t/p/w500{poster}"

    caption = (
        f"🎬 *{title}*\n"
        f"⭐ Rating: {rating}\n"
        f"📅 Release: {release}\n\n"
        f"{overview[:300]}..."
    )

    bot.send_photo(
        chat_id=update.message.chat_id,
        photo=poster_url,
        caption=caption,
        parse_mode="Markdown"
    )

# ==============================
# REGISTER HANDLERS
# ==============================

dispatcher.add_handler(CommandHandler("start", start))
dispatcher.add_handler(CommandHandler("movie", movie))

# ==============================
# WEBSITE ROUTES
# ==============================

@app.route("/")
def home():

    return """
    <h1>Movnix Server Running</h1>
    <p>Telegram bot active</p>
    """

@app.route("/health")
def health():

    return jsonify({"status": "running"})


# ==============================
# TELEGRAM WEBHOOK
# ==============================

@app.route("/webhook", methods=["POST"])
def webhook():

    if request.method == "POST":

        update = Update.de_json(request.get_json(force=True), bot)

        dispatcher.process_update(update)

        return "ok"

    return "invalid"


# ==============================
# SET WEBHOOK
# ==============================

@app.route("/setwebhook")
def set_webhook():

    webhook_url = f"{RENDER_URL}/webhook"

    url = f"https://api.telegram.org/bot{TOKEN}/setWebhook?url={webhook_url}"

    r = requests.get(url).json()

    return jsonify(r)


# ==============================
# RUN SERVER
# ==============================

if __name__ == "__main__":

    port = int(os.environ.get("PORT", 10000))

    print("Movnix server starting...")

    app.run(host="0.0.0.0", port=port)
