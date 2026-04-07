import Link from "next/link";

export default function MovieCard({ movie }) {
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  return (
    <div className="movie-card">
      <img src={poster} alt={movie.title} />

      <h4>{movie.title}</h4>

      <Link href={`/movie/${movie.id}`} className="info-btn">
        View Details
      </Link>
    </div>
  );
    }
