"use client";

import { useRouter } from "next/navigation";

export default function QuickButtons() {
  const router = useRouter();

  const actions = {
    trending: "/trending",
    top: "/toprated",
    genre: "/genres",
    new: "/new",
    must: "/list",
    list: "/watchlist",
    trailer: "/trailers",
    boxoffice: "/boxoffice",
    theatre: "/theatre",
    movie: "/movie",
    popular: "/popular"
  };

  return (
    <div className="quick-buttons">
      {Object.entries(actions).map(([key, path]) => (
        <button key={key} onClick={() => router.push(path)}>
          {key}
        </button>
      ))}
    </div>
  );
    }
