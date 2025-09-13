import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";

export default function TVDetails() {
  const { id } = useParams();
  const [tv, setTv] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_KEY = "55e49fbbc01076e8a91ebcad0ea01bff";

  useEffect(() => {
    const fetchTV = async () => {
      setLoading(true);
      try {
        const resTv = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`
        );
        const dataTv = await resTv.json();
        setTv(dataTv);

        const resCredits = await fetch(
          `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${API_KEY}`
        );
        const dataCredits = await resCredits.json();
        setCredits(dataCredits);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTV();
  }, [id]);

  if (loading) return Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className='shadow-md border-2 border-gray-300 h-[400px] flex items-center justify-center'>
                <div className="w-12 h-12 border-4 border-dashed border-red-500 rounded-full animate-spin"></div>
            </div>

        ));
  if (!tv) return <p className="text-center mt-10">TV show not found</p>;

  const creator = tv.created_by?.[0]?.name;
  const cast = credits?.cast?.slice(0, 12);

  return (
    <div className="container mx-auto my-6 pt-22 max-w-5xl">
      <Link to={'/tvShows'} className="text-red-500 flex items-center gap-3"> <ArrowLeft size={24} /> Go Back</Link>
      <div className="flex flex-col md:flex-row gap-6 mt-2.5 border-2 border-gray-300 rounded-lg p-4 shadow-md">
        {tv.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
            alt={tv.name}
            className="w-full md:w-1/3 rounded-md object-cover"
          />
        ) : (
          <div className="w-full md:w-1/3 h-72 flex items-center justify-center bg-gray-200 rounded-md">
            No Image
          </div>
        )}

        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold mb-2">{tv.name}</h2>
          <p className="mb-1">Original Name: {tv.original_name}</p>
          <p className="mb-1">Creator: {creator || "N/A"}</p>
          <p className="mb-1">First Air Date: {tv.first_air_date || "N/A"}</p>
          <p className="mb-1">Rating: {tv.vote_average || "N/A"}</p>
          <p className="mb-1">Seasons: {tv.number_of_seasons}</p>
          <p className="mb-1">Episodes: {tv.number_of_episodes}</p>
          <p className="my-4 border-t-2 border-red-200 py-2">overView: {tv.overview}</p>
        </div>
      </div>

      {tv.seasons && tv.seasons.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Seasons</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {tv.seasons.slice(0, 3).map((season) => (
              <div
                key={season.id}
                className="border rounded-lg p-3 shadow-sm flex flex-col items-center"
              >
                {season.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${season.poster_path}`}
                    alt={season.name}
                    className="w-full h-40 object-cover rounded-md mb-2"
                  />
                ) : (
                  <div className="w-full h-40 flex items-center justify-center bg-gray-200 mb-2">
                    No Image
                  </div>
                )}
                <p className="font-bold text-center">{season.name}</p>
                <p className="text-sm text-gray-600 text-center">
                  Episodes: {season.episode_count}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

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
                <p className="text-xs text-gray-600 text-center">
                  {actor.character}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
