"use client";

import { useEffect, useState, useRef } from "react";
import { getDailyCelebs, bannerTexts } from "@/lib/celebs";
import { useRouter } from "next/navigation";

export default function ExploreSlider() {
  const [index, setIndex] = useState(0);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const celebs = useRef(getDailyCelebs());
  const cache = useRef({});
  const router = useRouter();

  useEffect(() => {
    updateBanner();
    const interval = setInterval(updateBanner, 10000);
    return () => clearInterval(interval);
  }, [index]);

  async function updateBanner() {
    const celeb = celebs.current[index];

    const text =
      bannerTexts[Math.floor(Math.random() * bannerTexts.length)];

    setTitle(text.replace("{name}", celeb.name));

    if (cache.current[celeb.name]) {
      setImage(cache.current[celeb.name]);
    } else {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/person?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${celeb.name}`
      );
      const data = await res.json();

      if (data.results?.[0]?.profile_path) {
        const url =
          "https://image.tmdb.org/t/p/w780" +
          data.results[0].profile_path;

        cache.current[celeb.name] = url;
        setImage(url);
      }
    }

    setIndex((prev) => (prev + 1) % celebs.current.length);
  }

  return (
    <div className="explore-banner">
      <img src={image} alt="actor" />

      <h2>
        {title.split(celebs.current[index]?.name).map((part, i, arr) =>
          i < arr.length - 1 ? (
            <>
              {part}
              <span className="actor-name">
                {celebs.current[index]?.name}
              </span>
            </>
          ) : (
            part
          )
        )}
      </h2>

      <button
        onClick={() =>
          router.push(`/explore/${celebs.current[index].id}`)
        }
      >
        Explore
      </button>
    </div>
  );
                             }
