"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const IMG_BASE = "https://image.tmdb.org/t/p/w300";
const FALLBACK_POSTER = "https://via.placeholder.com/300x300?text=No+Image";

export default function Celebrities() {
  const [celebs, setCelebs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    loadCelebrities();
  }, []);

  async function loadCelebrities() {
    try {
      // 🔥 SAME DATA (AS YOU PROVIDED)
      const maleCelebs = [
        {name:"Shah Rukh Khan",id:500},
        {name:"Salman Khan",id:501},
        {name:"Aamir Khan",id:502},
        {name:"Akshay Kumar",id:503},
        {name:"Ajay Devgn",id:504},
        {name:"Hrithik Roshan",id:505},
        {name:"Ranbir Kapoor",id:506},
        {name:"Ranveer Singh",id:507},
        {name:"Kartik Aaryan",id:508},
        {name:"Vicky Kaushal",id:509},
        {name:"Rajkummar Rao",id:510},
        {name:"Ayushmann Khurrana",id:511},
        {name:"Shahid Kapoor",id:512},
        {name:"Tiger Shroff",id:513},
        {name:"Prabhas",id:514},
        {name:"Allu Arjun",id:515},
        {name:"Ram Charan",id:516},
        {name:"Jr NTR",id:517},
        {name:"Mahesh Babu",id:518},
        {name:"Yash",id:519},
        {name:"Dhanush",id:520},
        {name:"Vijay",id:521},
        {name:"Suriya",id:522},
        {name:"Rajinikanth",id:523},
        {name:"Kamal Haasan",id:524},
        {name:"Nawazuddin Siddiqui",id:525},
        {name:"Pankaj Tripathi",id:526},
        {name:"Manoj Bajpayee",id:527},
        {name:"Saif Ali Khan",id:528},
        {name:"Varun Dhawan",id:529},
        {name:"Sidharth Malhotra",id:530},
        {name:"Aditya Roy Kapur",id:531},
        {name:"Farhan Akhtar",id:532},
        {name:"Riteish Deshmukh",id:533},
        {name:"Anil Kapoor",id:534},
        {name:"Suniel Shetty",id:535},
        {name:"Paresh Rawal",id:536},
        {name:"Jackie Shroff",id:537},
        {name:"Sanjay Dutt",id:538},
        {name:"Govinda",id:539}
      ];

      const femaleCelebs = [
        {name:"Deepika Padukone",id:600},
        {name:"Alia Bhatt",id:601},
        {name:"Katrina Kaif",id:602},
        {name:"Priyanka Chopra",id:603},
        {name:"Kareena Kapoor",id:604},
        {name:"Kiara Advani",id:605},
        {name:"Kriti Sanon",id:606},
        {name:"Shraddha Kapoor",id:607},
        {name:"Anushka Sharma",id:608},
        {name:"Rashmika Mandanna",id:609},
        {name:"Samantha Ruth Prabhu",id:610},
        {name:"Tamannaah Bhatia",id:611},
        {name:"Nayanthara",id:612},
        {name:"Trisha Krishnan",id:613},
        {name:"Pooja Hegde",id:614},
        {name:"Janhvi Kapoor",id:615},
        {name:"Sara Ali Khan",id:616},
        {name:"Mrunal Thakur",id:617},
        {name:"Tripti Dimri",id:618},
        {name:"Taapsee Pannu",id:619},
        {name:"Vidya Balan",id:620},
        {name:"Bhumi Pednekar",id:621},
        {name:"Yami Gautam",id:622},
        {name:"Parineeti Chopra",id:623},
        {name:"Radhika Apte",id:624},
        {name:"Kajol",id:625},
        {name:"Madhuri Dixit",id:626},
        {name:"Aishwarya Rai",id:627},
        {name:"Sonam Kapoor",id:628},
        {name:"Sonakshi Sinha",id:629},
        {name:"Rani Mukerji",id:630},
        {name:"Preity Zinta",id:631},
        {name:"Huma Qureshi",id:632},
        {name:"Ileana D Cruz",id:633},
        {name:"Disha Patani",id:634},
        {name:"Jacqueline Fernandez",id:635},
        {name:"Rakul Preet Singh",id:636},
        {name:"Nushrratt Bharuccha",id:637},
        {name:"Aditi Rao Hydari",id:638},
        {name:"Kangana Ranaut",id:639}
      ];

      const allCelebs = [...maleCelebs, ...femaleCelebs].slice(0,50);

      let results = [];

      for (const celeb of allCelebs) {
        try {
          const res = await fetch(
            `https://api.themoviedb.org/3/search/person?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${encodeURIComponent(celeb.name)}`
          );

          const data = await res.json();
          const person = data.results?.[0];

          if (!person) continue;

          const photo = person.profile_path
            ? IMG_BASE + person.profile_path
            : FALLBACK_POSTER;

          const creditsRes = await fetch(
            `https://api.themoviedb.org/3/person/${person.id}/movie_credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
          );

          const creditsData = await creditsRes.json();

          const titles = creditsData.cast ? creditsData.cast.length : 0;

          results.push({
            id: person.id,
            name: person.name,
            photo,
            dept: person.known_for_department,
            popularity: person.popularity,
            titles
          });

        } catch (err) {
          console.log("Celebrity load error", err);
        }
      }

      setCelebs(results);

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section className="celebs-section">

      <div className="celebs-grid">
        {celebs.map((c) => (
          <div
            key={c.id}
            className="celebrity-card"
            onClick={() => router.push(`/celebrity/${c.id}`)}
          >
            <div className="celebrity-photo">
              <img src={c.photo} alt={c.name} />
            </div>

            <div className="celebrity-name">
              {c.name}
            </div>

            <div className="celebrity-meta">
              {c.dept} • {c.titles} titles
            </div>

            <div className="celebrity-popularity">
              Popularity {Math.round(c.popularity)}
            </div>
          </div>
        ))}

        {/* SEE ALL */}
        <div
          className="celebrity-seeall"
          onClick={() => router.push("/celebrities")}
        >
          <div className="seeall-box">
            <div className="seeall-text">
              See<br />All
            </div>
          </div>
        </div>

      </div>
    </section>
  );
  }
