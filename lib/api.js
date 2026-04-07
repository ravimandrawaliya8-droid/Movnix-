const BASE = "https://api.themoviedb.org/3";

export async function getMovies(endpoint) {
  const url = endpoint.includes("?")
    ? `${BASE}${endpoint}&api_key=${process.env.TMDB_API_KEY}`
    : `${BASE}${endpoint}?api_key=${process.env.TMDB_API_KEY}`;

  const res = await fetch(url, {
    next: { revalidate: 3600 } // cache 1 hour
  });

  const data = await res.json();
  return data.results || [];
}
