import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { toast } from 'react-toastify';
import AOS from "aos";
import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { addToWishlist } from "../../Store/wishlistSlice";

export default function TVShows() {
  const [TvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("all");
  const API_KEY = "55e49fbbc01076e8a91ebcad0ea01bff";
  const dispatch = useDispatch();

  const getTvShows = async () => {
    setLoading(true);
    try {
      let url = "";

      if (tab === "airing-today") {
        url = `https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}&page=${page}`;
      } else if (tab === "top-rated") {
        url = `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&page=${page}`;
      } else if (tab === "search" && query) {
        url = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`;
      } else {
        url = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&sort_by=popularity.desc&page=${page}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      setTvShows(data.results || []);
    } catch (error) {
      console.error("Error fetching TV Shows:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTvShows();
  }, [page, tab]);

  useEffect(() => {
      AOS.init({
        duration: 1000, 
        once: true,     
      });
    }, []);
  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setTab("search");
    getTvShows();
  };

  return (
    <>
      <div className='flex justify-center items-center gap-4 text-[15px] md:text-xl my-7'>
        <button onClick={() => setTab("all")} className='text-red-500 hover:bg-red-500 hover:text-white z-10 p-1.5 rounded cursor-pointer transition-all duration-200'>
          All TVShows
        </button>
        <button onClick={() => setTab("airing-today")} className='text-red-500 hover:bg-red-500 hover:text-white p-1.5 rounded cursor-pointer transition-all duration-200'>
          Airing Today
        </button>
        <button onClick={() => setTab("top-rated")} className='text-red-500 hover:bg-red-500 hover:text-white p-1.5 rounded transition-all duration-200'>
          Top Rated
        </button>
        <button onClick={() => setTab("search")} className='text-white hover:bg-red-800 p-1.5 rounded cursor-pointer transition-all duration-200'>
          Search
        </button>
      </div>

      {tab === "search" && (
        <form onSubmit={handleSearch} className='flex gap-2 justify-center items-center mb-5'>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search TvShows..."
            className='p-2.5 w-[250px] md:w-[360px] h-[40px] border-2 border-red-400 outline-0'
          />
          <button type="submit" className='bg-red-400 p-2.5 rounded'>
            Search
          </button>
        </form>
      )}

      (
        <div className='container grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
          {loading ? Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className='shadow-md border-2 border-gray-300 h-[400px] flex items-center justify-center'>
                <div className="w-12 h-12 border-4 border-dashed border-red-500 rounded-full animate-spin"></div>
            </div>

        )):
        TvShows.map((series) => (
            <div data-aos="zoom-in" data-aos-once="false"  className='shadow-md border-2 border-gray-300' key={series.id}>
              {series.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/original${series.poster_path}`}
                  alt={series.name}
                  className='w-full'
                />
              ) : (
                <div className='flex justify-center items-center h-[300px] bg-[#eee]'>No Image</div>
              )}
              <h3 className='px-3 my-3 text-center font-bold'>{series.name}</h3>
              <p className='px-3 my-2'>Release: {series.first_air_date || "N/A"}</p>
              <p className='px-3 my-2'>Rating: {series.vote_average || "N/A"}</p>
              <div className="flex content-end items-center justify-between mb-4 p-4">
                <Heart
                  className="cursor-pointer hover:scale-110 transition-transform"
                  onClick={() =>{ 
                    dispatch(addToWishlist({ ...series, type: "tvShow" }))
                    toast.success(`${series.name} added to wishlist!`,{ 
                          style: { fontFamily: 'Arial' },
                          position: "top-center",
                          autoClose: 1200});
                  }}
                />
                <Link to={`/tv/${series.id}`} className="text-red-500">Show Details</Link>
              </div>
            </div>
          ))}
        </div>
      

      <div className='mt-8 text-center flex items-center justify-center'>
        <button className='p-2 mr-3 bg-white text-red-500 text-xl cursor-pointer rounded font-bold' onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>Previous</button>
        <span> Page {page}</span>
        <button className='p-2 ml-3 bg-white text-red-500 text-xl cursor-pointer rounded font-bold' onClick={() => setPage((prev) => prev + 1)}>Next</button>
      </div>
    </>
  );
}
