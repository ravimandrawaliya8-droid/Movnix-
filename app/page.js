import MovieSection from "@/components/MovieSection";
import QuickButtons from "@/components/QuickButtons";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />

      <QuickButtons />

      <MovieSection
        title="Trending Movies"
        endpoint="/trending/movie/week"
      />

      <MovieSection
        title="Popular in India"
        endpoint="/discover/movie?with_origin_country=IN"
      />
    </>
  );
}
