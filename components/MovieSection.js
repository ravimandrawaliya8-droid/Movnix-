import { getMovies } from "@/lib/api";
import MovieCard from "./MovieCard";

export default async function MovieSection({ endpoint, title }) {
  const movies = await getMovies(endpoint);

  return (
    <section>
      <h2>{title}</h2>

      <div className="movie-row">
        {movies.slice(0, 20).map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
  }
