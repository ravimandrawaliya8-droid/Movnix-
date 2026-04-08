import Header from "@/components/Header";
import QuickButtons from "@/components/QuickButtons";
import Hero from "@/components/Hero";
import ExploreSlider from "@/components/ExploreSlider";
import TrailerSection from "@/components/TrailerSection";
import TopWeek from "@/components/TopWeek";
import Celebrities from "@/components/Celebrities";
import MovnixPicks from "@/components/MovnixPicks";
import Trending from "@/components/Trending";
import FanFavourites from "@/components/FanFavourites";
import Streaming from "@/components/Streaming";
import PopularInterests from "@/components/PopularInterests";
import Theatre from "@/components/Theatre";
import BoxOffice from "@/components/BoxOffice";
import UpcomingSection from "@/components/UpcomingSection";
import MovieSection from "@/components/MovieSection";

export default function Home() {
  return (
    <>
      <Header />
      <QuickButtons />

      <Hero /> {/* SAME HERO */}

      <ExploreSlider />

      <TrailerSection />

      <TopWeek />

      <Celebrities />

      <MovnixPicks />

      <Trending />

      <FanFavourites />

      <Streaming />

      <PopularInterests />

      <Theatre />

      <BoxOffice />

      <UpcomingSection />

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
