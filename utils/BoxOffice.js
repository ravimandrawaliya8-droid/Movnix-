"use client";

import { useEffect, useRef, useState } from "react";

const BASE = "https://api.themoviedb.org/3";

export default function BoxOffice() {

  const containerRef = useRef(null);

  const [currentType, setCurrentType] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    loadBoxOffice("india", true);
  }, []);

  async function getMovies(endpoint){
    try{
      const url = endpoint.includes("?")
        ? `${BASE}${endpoint}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        : `${BASE}${endpoint}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;

      const res = await fetch(url);
      const data = await res.json();

      return data.results || [];
    }catch(err){
      console.log(err);
      return [];
    }
  }

  async function loadBoxOffice(type = "india", firstLoad = false){

    const container = containerRef.current;
    if(!container) return;

    if(type === currentType && !firstLoad) return;
    if(isAnimating && !firstLoad) return;

    const prevType = currentType;
    setCurrentType(type);

    let endpoint = "";

    if(type === "india"){
      endpoint = "/discover/movie?with_origin_country=IN&sort_by=popularity.desc";
    }
    else if(type === "world"){
      endpoint = "/trending/movie/week";
    }
    else{
      endpoint = "/movie/now_playing";
    }

    /* ================= FIRST LOAD ================= */

    if(firstLoad){

      container.innerHTML = `<div class="box-loading">Loading...</div>`;

      try{
        const data = await getMovies(endpoint);
        const movies = data?.slice(0,7) || [];

        container.innerHTML = "";
        container.appendChild(createMovieList(movies));

        initEvents();

      }catch{
        container.innerHTML = `<div class="box-error">Failed to load</div>`;
      }

      return;
    }

    /* ================= ANIMATION ================= */

    setIsAnimating(true);

    const containerHeight = container.offsetHeight;
    container.style.height = containerHeight + "px";

    const oldContent = container.innerHTML;

    let direction = "right";
    const order = ["india","world","opening"];

    if(order.indexOf(type) < order.indexOf(prevType)){
      direction = "left";
    }

    const wrapper = document.createElement("div");
    wrapper.className = "box-slider";

    wrapper.innerHTML = `
      <div class="box-slide old">${oldContent}</div>
      <div class="box-slide new">${getSkeletonRows()}</div>
    `;

    container.innerHTML = "";
    container.appendChild(wrapper);

    const newSlide = wrapper.querySelector(".new");

    newSlide.style.transform = direction === "right"
      ? "translateX(100%)"
      : "translateX(-100%)";

    try{

      const data = await getMovies(endpoint);
      const movies = data?.slice(0,7) || [];

      newSlide.innerHTML = "";
      newSlide.appendChild(createMovieList(movies));

      requestAnimationFrame(()=>{

        wrapper.style.transition = "transform 0.45s ease";

        wrapper.style.transform = direction === "right"
          ? "translateX(-100%)"
          : "translateX(100%)";

      });

      setTimeout(()=>{

        container.innerHTML = "";
        container.appendChild(createMovieList(movies));

        initEvents();

        container.style.height = "auto";
        setIsAnimating(false);

      },450);

    }catch(err){

      container.innerHTML = `<div class="box-error">Failed to load</div>`;
      container.style.height = "auto";
      setIsAnimating(false);

    }

  }

  /* ================= CREATE LIST ================= */

  function createMovieList(movies){

    const fragment = document.createDocumentFragment();

    movies.forEach((movie,index)=>{

      const title = movie.title || movie.name || "No Title";

      const weekend = Math.floor(Math.random()*70)+10;
      const total = weekend + Math.floor(Math.random()*100)+20;

      const row = document.createElement("div");
      row.className = "box-row";

      row.innerHTML = `
        <div class="box-rank">${index+1}</div>

        <div class="box-add" data-id="${movie.id}">+</div>

        <div class="box-info">
          <div class="box-title" data-id="${movie.id}">
            ${title}
          </div>
          <div class="box-earnings">
            $${weekend}M · Total $${total}M
          </div>
        </div>

        <div class="box-ticket" data-id="${movie.id}">
          🎟
        </div>
      `;

      fragment.appendChild(row);
    });

    return fragment;
  }

  /* ================= EVENTS ================= */

  function initEvents(){

    document.querySelectorAll(".box-title").forEach(el=>{
      el.onclick = ()=>{
        window.location.href = `/movie/${el.dataset.id}`;
      };
    });

    document.querySelectorAll(".box-ticket").forEach(el=>{
      el.onclick = ()=>{
        window.location.href = `/movie/${el.dataset.id}`;
      };
    });

    document.querySelectorAll(".box-add").forEach(btn=>{
      btn.onclick = ()=>{
        btn.innerText = "✓";
        btn.style.background = "#4da3ff";
      };
    });

  }

  /* ================= SKELETON ================= */

  function getSkeletonRows(){

    let skeleton = "";

    for(let i=0;i<5;i++){
      skeleton += `
        <div class="box-row skeleton">
          <div class="box-rank"></div>
          <div class="box-add"></div>
          <div class="box-info">
            <div class="box-title"></div>
            <div class="box-earnings"></div>
          </div>
          <div class="box-ticket"></div>
        </div>
      `;
    }

    return skeleton;
  }

  return (
    <section className="boxoffice-section">

      <h2>🎬 Box Office</h2>

      {/* TABS */}
      <div className="box-tabs">

        <button 
          className="box-tab"
          onClick={()=>loadBoxOffice("india")}
        >
          🇮🇳 India
        </button>

        <button 
          className="box-tab"
          onClick={()=>loadBoxOffice("world")}
        >
          🌍 World
        </button>

        <button 
          className="box-tab"
          onClick={()=>loadBoxOffice("opening")}
        >
          🎟 Opening
        </button>

      </div>

      {/* LIST */}
      <div id="boxOfficeList" ref={containerRef}></div>

      {/* SEE FULL */}
      <div 
        className="box-more"
        onClick={()=>{
          window.location.href = `/boxoffice?type=${currentType}`;
        }}
      >
        See Full →
      </div>

    </section>
  );
      }
