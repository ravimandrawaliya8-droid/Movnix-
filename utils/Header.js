"use client";

import { useState, useEffect } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  // ESC key close
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  // body scroll lock
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <>
      <button className="menu-btn" onClick={() => setOpen(true)}>
        ☰
      </button>

      {open && (
        <>
          <div className="overlay" onClick={() => setOpen(false)} />

          <div className="menu active">
            <button onClick={() => setOpen(false)}>Close</button>

            {/* menu content */}
          </div>
        </>
      )}
    </>
  );
    }
