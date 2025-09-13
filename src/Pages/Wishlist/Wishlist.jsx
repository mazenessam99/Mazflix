import { useSelector, useDispatch } from "react-redux";
import { Box } from "lucide-react";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { removeFromWishlist } from "../../Store/wishlistSlice";

export default function Wishlist() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items) || [];

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] pt-16 my-6 text-center px-4">
        <Box className="w-20 h-20 text-red-400 mb-4 animate-bounce" />
        <h2 className="text-2xl font-bold mb-2">Your Wishlist is Empty!</h2>
        <p className="text-gray-600 mb-4">
          Looks like you haven’t added any movies or TV shows yet.
        </p>
        <div className="flex flex-col sm:flex-row gap-2.5">
          <Link
            to="/movies"
            className="bg-red-500 text-white px-6 py-2 rounded shadow hover:bg-red-700 transition-all"
          >
            Browse Movies
          </Link>
          <Link
            to="/tvShows"
            className="bg-red-500 text-white px-6 py-2 rounded shadow hover:bg-red-700 transition-all"
          >
            Browse TV Shows
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-6 pt-17 h-full px-2">
      <h2 className="text-2xl font-bold my-4 text-center">My Wishlist</h2>

      {/* Table for medium and larger screens */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border border-gray-300 table-auto">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="px-4 py-2 border">Poster</th>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Type</th>
              <th className="px-4 py-2 border">Release Date</th>
              <th className="px-4 py-2 border">Rating</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {wishlist.map((item) => (
              <tr key={item.id + item.type} className="text-center border-t">
                <td className="px-2 py-2 border">
                  {item.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                      alt={item.title || item.name}
                      className="w-16 mx-auto"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="px-2 py-2 border text-sm sm:text-base">{item.title || item.name}</td>
                <td className="px-2 py-2 border">{item.type === "tvShow" ? "TV Show" : "Movie"}</td>
                <td className="px-2 py-2 border text-sm sm:text-base">{item.release_date || item.first_air_date || "N/A"}</td>
                <td className="px-2 py-2 border">{item.vote_average || "N/A"}</td>
                <td className="px-2 py-2 border">
                  <button
                    onClick={() => {
                        dispatch(removeFromWishlist({ id: item.id, type: item.type }))
                        toast.success(`${item.title || item.name}  removed from wishlist!`,{ 
                              style: { fontFamily: 'Arial' },
                              position: "top-center",
                              autoClose: 1200});
                }}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 cursor-pointer text-sm sm:text-base"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for small screens */}
      <div className="md:hidden grid gap-4">
        {wishlist.map((item) => (
          <div key={item.id + item.type} className="border shadow-md rounded overflow-hidden">
            {item.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                alt={item.title || item.name}
                className="w-full h-64 object-cover"
              />
            ) : (
              <div className="flex justify-center items-center h-64 bg-gray-200">No Image</div>
            )}
            <div className="p-4">
              <h3 className="font-bold text-lg">{item.title || item.name}</h3>
              <p className="text-sm text-gray-600">
                {item.type === "tvShow" ? "TV Show" : "Movie"} | {item.release_date || item.first_air_date || "N/A"}
              </p>
              <p className="text-sm text-gray-600">Rating: {item.vote_average || "N/A"}</p>
              <button
                onClick={() => dispatch(removeFromWishlist({ id: item.id, type: item.type }))}
                className="mt-2 w-full bg-red-500 text-white py-1 rounded hover:bg-red-700 transition-all"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
