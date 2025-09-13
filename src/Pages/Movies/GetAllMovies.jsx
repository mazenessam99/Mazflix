import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { toast } from 'react-toastify';
import AOS from "aos";
import { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { addToWishlist } from "../../Store/wishlistSlice";

export default function Movies() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");
    const [tab, setTab] = useState("all");
    const API_KEY = "55e49fbbc01076e8a91ebcad0ea01bff";
    const dispatch = useDispatch();


    const getMovies = async () => {
        setLoading(true);
        try {
            let url = "";

            if (tab === "now") {
                url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${page}`;
            }

            else if (tab === "top-rated") {
                url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${page}`;
            }

            else if (tab === "search" && query) {
                url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
                    query
                )}&page=${page}`;
            }

            else {
                url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=${page}`;
            }

            const res = await fetch(url);
            const data = await res.json();
            setMovies(data.results || []);
        } catch (error) {
            console.error("Error fetching movies:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMovies();
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
        getMovies();
    };

    return (
        <>
            <div className='flex justify-center items-center gap-4 text-[15px] md:text-xl my-7  '>
                <button onClick={() => setTab("all")} className='text-red-500 hover:bg-red-500 hover:text-white z-10  p-1.5 rounded cursor-pointer transition-all duration-200'>
                    All Movies
                </button>
                <button onClick={() => setTab("now")} className='text-red-500 hover:bg-red-500 hover:text-white  p-1.5 rounded cursor-pointer transition-all duration-200'>
                    Now Playing
                </button>

                <button onClick={() => setTab("top-rated")} className='text-red-500 hover:bg-red-500 hover:text-white p-1.5 rounded transition-all duration-200'>
                    Top Rated
                </button>
                <button onClick={() => setTab("search")} className='text-white hover:bg-red-800  p-1.5 rounded cursor-pointer transition-all duration-200'>
                    Search
                </button>
            </div>



            {/* Search Form  */}
            {tab === "search" && (
                <form
                    onSubmit={handleSearch}
                    className='flex gap-2 justify-center items-center mb-5'
                >
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search movies..."
                        className='p-2.5 w-[250px] md:w-[360px] h-[40px] border-2 border-red-400 outline-0'
                    />
                    <button type="submit" className='bg-red-400 p-2.5 rounded'>
                        Search
                    </button>
                </form>
            )}
                <div  className='container mx-auto grid justify-center gap-4 grid-cols-1 
                sm:grid-cols-2
                md:grid-cols-3 
                lg:grid-cols-4 
                xl:grid-cols-5 '>
                    {/* Loading */}
                    {loading ? Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className='shadow-md border-2 border-gray-300 h-[400px] flex items-center justify-center'>
                <div className="w-12 h-12 border-4 border-dashed border-red-500 rounded-full animate-spin"></div>
            </div>

        )) : movies.map((movie) => (
                        <div data-aos="zoom-in" data-aos-once="false" className=' shadow-md border-2 border-gray-300 '
                            key={movie.id} >
                            {movie.poster_path ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                    alt={movie.title}
                                    className='w-full'
                                />
                            ) : (
                                <div className='flex justify-center items-center h-[300px] bg-[#eee]'> No Image</div>
                            )}
                            <h3 className='px-3 my-3 text-center font-bold'>{movie.title}</h3>
                            <p className='px-3 my-2'>Release: {movie.release_date || "N/A"}</p>
                            <p className='px-3 my-2'>Rating: {movie.vote_average || "N/A"}</p>
                            <div className="flex content-end items-center justify-between mb-4 p-4">
                                <Heart
                                    className="cursor-pointer  hover:scale-110 transition-transform"
                                    onClick={() =>{ 
                                        dispatch(addToWishlist({ ...movie, type: "movie" }))
                                        toast.success(`${movie.title} added to wishlist!`,{ 
                                                style: { fontFamily: 'Arial' },
                                                position: "top-center",
                                                autoClose: 1200});
                                    }}
                                />
                                <Link to={`/movie/${movie.id}`} className="text-red-500">Show Details</Link>
                            </div>
                        </div>
                    ))}
                </div>
            <div className='mt-8 text-center flex items-center justify-center'>
                <button className='p-2 mr-3 bg-white text-red-500 text-xl cursor-pointer rounded font-bold' onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}> Previous </button>
                <span className=''> Page {page}</span>
                <button className='p-2 ml-3 bg-white text-red-500 text-xl cursor-pointer rounded font-bold' onClick={() => setPage((prev) => prev + 1)}>Next</button>
            </div>


        </>
    );
}


