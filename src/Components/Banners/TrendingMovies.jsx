import { useState, useEffect } from 'react'
import Slider from "react-slick";

export default function TrendingMovies() {
  const settings = {
    dots: false,
    infinite: true,
    centerMode: true, 
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 2,
    initialSlide: 0,
    autoplay: true,         
    autoplaySpeed: 1500,
    centerPadding: "10px",
    lazyLoad: "ondemand",
    
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const API_KEY = "55e49fbbc01076e8a91ebcad0ea01bff";

  const getMovies = async () => {
    setLoading(true);
    try {

      const res = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${page}`);
      const data = await res.json();
      
      console.log(data.results);
      setMovies(data.results || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    getMovies();
  };

  return (
    <div className="container">
      <h2 className='text-2xl md:text-4xl my-5 '><span className='text-red-600'>Trending </span>Movies</h2>
      <div className='Trend__Movies'>
      <Slider {...settings}>
      {movies.map((movie) => {
        return (
            <div className="movie__card" >
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title}/>
              ) : (
                <div className='h-[200px] flex items-center justify-center bg-[#eee]'> No Image </div>
              )}
            </div>
        )

      })}

</Slider>
</div>

    </div>
  );
}

