import os
import requests
from flask import Flask, request, jsonify
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes

# =====================
# MONGODB SETUP
# =====================

from pymongo import MongoClient
from datetime import datetime

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)
db = client["movnix"]

theatres_col = db["theatres"]
shows_col = db["shows"]
seats_col = db["seats"]
bookings_col = db["bookings"]
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
# BOOKING HELPERS
# =====================

def create_seats(show_id):

    rows = ["A", "B", "C", "D", "E"]

    seats = []

    for r in rows:
        for i in range(1, 11):
            seats.append({
                "showId": show_id,
                "seatNumber": f"{r}{i}",
                "status": "available"
            })

    seats_col.insert_many(seats)


def generate_shows(theatre_id):

    times = ["10:00 AM", "2:00 PM", "6:00 PM", "10:00 PM"]

    movies = tmdb("/trending/movie/week").get("results", [])[:4]

    shows = []

    for i, time in enumerate(times):

        if i >= len(movies):
            break

        movie = movies[i]

        show = {
            "theatreId": theatre_id,
            "movieId": movie["id"],
            "movieName": movie["title"],
            "time": time,
            "date": str(datetime.now().date())
        }

        inserted = shows_col.insert_one(show)

        create_seats(str(inserted.inserted_id))

        show["_id"] = str(inserted.inserted_id)

        shows.append(show)

    return shows


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

@app.route("/add-theatre", methods=["POST"])
def add_theatre():

    data = request.json

    theatre = {
        "name": data.get("name"),
        "city": data.get("city"),
        "location": data.get("location", ""),
        "screens": data.get("screens", 1),
        "createdAt": datetime.now()
    }

    result = theatres_col.insert_one(theatre)

    return jsonify({
        "message": "Theatre added",
        "theatreId": str(result.inserted_id)
    })

@app.route("/theatres")
def get_theatres():

    city = request.args.get("city")

    if not city:
        return jsonify({"error": "City required"}), 400

    theatres = list(theatres_col.find({"city": city}, {"_id": 0}))

    return jsonify(theatres)

@app.route("/shows")
def get_shows():

    theatre_id = request.args.get("theatreId")

    shows = list(shows_col.find({"theatreId": theatre_id}, {"_id": 0}))

    if not shows:
        shows = generate_shows(theatre_id)

    return jsonify(shows)


@app.route("/seats")
def get_seats():

    show_id = request.args.get("showId")

    seats = list(seats_col.find({"showId": show_id}, {"_id": 0}))

    return jsonify(seats)

@app.route("/book", methods=["POST"])
def book_seats():

    data = request.json
    show_id = data.get("showId")
    selected_seats = data.get("seats")

    for seat in selected_seats:

        existing = seats_col.find_one({
            "showId": show_id,
            "seatNumber": seat,
            "status": "booked"
        })

        if existing:
            return jsonify({"error": f"{seat} already booked"}), 400

    for seat in selected_seats:

        seats_col.update_one(
            {"showId": show_id, "seatNumber": seat},
            {"$set": {"status": "booked"}}
        )

    bookings_col.insert_one({
        "showId": show_id,
        "seats": selected_seats,
        "createdAt": datetime.now()
    })

    return jsonify({"message": "Booking successful"})


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
