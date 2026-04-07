import Header from "@/components/Header";
import QuickButtons from "@/components/QuickButtons";
import Hero from "@/components/Hero";
import ExploreSlider from "@/components/ExploreSlider";
import MovieSection from "@/components/MovieSection";

export default function Home() {
  return (
    <>
      <Header />
      <QuickButtons />

      <Hero /> {/* SAME HERO */}

      <ExploreSlider />

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
