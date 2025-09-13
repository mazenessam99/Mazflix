
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black/80  shadow-lg text-white mt-10">
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <h3 className="font-bold text-lg mb-3">About</h3>
          <p className="text-sm ">
            MazFlix – Your favorite place to browse movies and TV shows, save your wishlist, and enjoy content in dark mode.
          </p>
        </div>


        <div>
          <h3 className="font-bold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-red-500">Home</Link></li>
            <li><Link to="/movies" className="hover:text-red-500 ">Movies</Link></li>
            <li><Link to="/tvShows" className="hover:text-red-500 ">TV Shows</Link></li>
            <li><Link to="/wishlist" className="hover:text-red-500">Wishlist</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3">Follow Us</h3>
          <div className="flex gap-3 text-xl">
            <a href="#" className="hover:text-gray-200"><Facebook /></a>
            <a href="#" className="hover:text-gray-200"><Instagram /></a>
            <a href="#" className="hover:text-gray-200"><Twitter /></a>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3">Contact</h3>
          <p className="text-sm">support@MazFlix.com</p>
          <p className="text-sm">+20 109 2201 099</p>
        </div>
      </div>

      <div className="container text-red-500 text-center py-4 text-sm md:text-xl border-t-[1px] border-amber-50-light">
        &copy; 2025 MazFlix. All rights reserved.
      </div>
    </footer>
  );
}
