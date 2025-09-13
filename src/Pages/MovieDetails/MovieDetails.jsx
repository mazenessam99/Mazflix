import { Link,useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_KEY = "55e49fbbc01076e8a91ebcad0ea01bff";

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const resMovie = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        );
        const dataMovie = await resMovie.json();
        setMovie(dataMovie);

        const resCredits = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
        );
        const dataCredits = await resCredits.json();
        setCredits(dataCredits);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) return Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className='shadow-md border-2 border-gray-300 h-[400px] flex items-center justify-center'>
                <div className="w-12 h-12 border-4 border-dashed border-red-500 rounded-full animate-spin"></div>
            </div>

        ));
  if (!movie) return <p className="text-center mt-10">Movie not found</p>;

  const director = credits?.crew?.find((person) => person.job === "Director");
  const cast = credits?.cast?.slice(0, 12); 

  return (
    <div className="container mx-auto my-6 pt-22 max-w-5xl">
      <Link to={'/movies'} className="text-red-500 flex items-center gap-3"> <ArrowLeft size={24} /> Go Back</Link>
      <div className="flex flex-col md:flex-row gap-6 mt-2.5 border-2 border-gray-300 rounded-lg p-4 shadow-md">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full md:w-1/3 rounded-md object-cover"
          />
        ) : (
          <div className="w-full md:w-1/3 h-72 flex items-center justify-center bg-gray-200 rounded-md">
            No Image
          </div>
        )}

        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
          <p className="mb-1">Original Title: {movie.original_title}</p>
          <p className="mb-1">Director: {director?.name || "N/A"}</p>
          <p className="mb-1">Release: {movie.release_date || "N/A"}</p>
          <p className="mb-1">Rating: {movie.vote_average || "N/A"}</p>
          <p className="mb-4">{movie.overview}</p>
        </div>
      </div>

      {cast && cast.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Cast</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {cast.map((actor) => (
              <div
                key={actor.id}
                className="border rounded-lg p-2 flex flex-col items-center"
              >
                {actor.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={actor.name}
                    className="w-full h-32 object-cover rounded-md mb-2"
                  />
                ) : (
                  <div className="w-full h-32 flex items-center justify-center bg-gray-200 mb-2">
                    No Image
                  </div>
                )}
                <p className="text-sm font-bold text-center">{actor.name}</p>
                <p className="text-xs text-gray-600 text-center">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
