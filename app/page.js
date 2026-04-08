"use client";

import { useEffect } from "react";

/* ---------------- COMPONENTS ---------------- */
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
import NewsSection from "@/components/NewsSection";
import MovieSection from "@/components/MovieSection";

/* ---------------- SYSTEM ---------------- */
import { initApp } from "@/utils/movieSystem";

/* ---------------- LOADERS ---------------- */
import { loadHero } from "@/utils/hero";
import { startExploreSlider } from "@/utils/explore";

import {
  loadQuickButtons,
  loadTrailers,
  loadTopWeek,
  loadCelebrities,
  loadMovnixPicks,
  loadTrending,
  loadFanFavourites,
  loadStreaming,
  loadPopularInterests,
  loadTheatre,
  loadBoxOffice,
  loadUpcomingSection,
  loadNewsSection
} from "@/utils/allSections";

export default function Home() {

  useEffect(() => {

    initApp({
      loadHero,
      startExploreSlider,
      loaders: {
        loadQuickButtons,
        loadTrailers,
        loadTopWeek,
        loadCelebrities,
        loadMovnixPicks,
        loadTrending,
        loadFanFavourites,
        loadStreaming,
        loadPopularInterests,
        loadTheatre,
        loadBoxOffice,
        loadUpcomingSection,
        loadNewsSection
      }
    });

  }, []);

  return (
    <>
      <Header />

      {/* 🔥 IMPORTANT: IDs must match lazy system */}
      <div id="quickButtons">
        <QuickButtons />
      </div>

      <Hero />

      <ExploreSlider />

      <div id="trailers">
        <TrailerSection />
      </div>

      <div id="top-week-section">
        <TopWeek />
      </div>

      <div id="celebs">
        <Celebrities />
      </div>

      <div id="movnixPicks">
        <MovnixPicks />
      </div>

      <div id="trendingList">
        <Trending />
      </div>

      <div id="fanFavourites">
        <FanFavourites />
      </div>

      <div id="streamingSection">
        <Streaming />
      </div>

      <div id="popularInterests">
        <PopularInterests />
      </div>

      <div id="theatreReleases">
        <Theatre />
      </div>

      <div id="boxOfficeSection">
        <BoxOffice />
      </div>

      <div id="upcomingTheatres">
        <UpcomingSection />
      </div>

      <div id="newsSection">
        <NewsSection />
      </div>

      {/* NORMAL SECTIONS (NO LAZY) */}
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
