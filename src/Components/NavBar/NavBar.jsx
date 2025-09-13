import { Heart, User, Menu, X } from 'lucide-react'
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import DarkMode from './DarkMode';
import { useState } from "react";
import logo from '../../assets/logo.png'

export default function NavBar() {
  const wishlistCount = useSelector((state) => state.wishlist.items.length);
  const [open, setOpen] = useState(false);

  return (
    <nav className='fixed top-0 backdrop-blur-md bg-white/10 text-white py-4 h-18 font-bold flex items-center w-full z-50 shadow-md'>
      <div className="container flex justify-between items-center">
        <div className="navbar__logo p-1.5 rounded-[5px] text-xl md:text-2xl font-bold bg-black">
          MA<span className='text-red-500'>ZF</span>LIX
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex navbar__links items-center gap-2.5">
          <li>
            <NavLink to="/" className={({ isActive }) =>
              isActive ? "text-red-500" : "hover:bg-red-400 px-3 py-2 rounded transition-all duration-200"
            }>Home</NavLink>
          </li>
          <li>
            <NavLink to="/movies" className={({ isActive }) =>
              isActive ? "text-red-500" : "hover:bg-red-400 px-3 py-2 rounded transition-all duration-200"
            }>Movies</NavLink>
          </li>
          <li>
            <NavLink to="/tvShows" className={({ isActive }) =>
              isActive ? "text-red-500" : "hover:bg-red-400 px-3 py-2 rounded transition-all duration-200"
            }>TV Shows</NavLink>
          </li>
          <li>
            <NavLink to="/wishlist" className={({ isActive }) =>
              isActive ? "text-red-500" : "hover:bg-red-400 px-3 py-2 rounded transition-all duration-200"
            }>Wishlist</NavLink>
          </li>
        </ul>

        {/* Icons */}
        <div className='flex gap-2 items-center text-2xl'>
          <div className="relative">
            <Link to='/wishlist'><Heart /></Link>
            {wishlistCount > 0 && (
              <span className="absolute -top-4 -right-2 bg-white text-red-500 text-xs font-bold rounded-full px-2">
                {wishlistCount}
              </span>
            )}
          </div>
          <Link to='/login'><User /></Link>
          {/* <DarkMode /> */}

          {/* Mobile Menu Button */}
          <button className="md:hidden ml-2" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <ul className={`md:hidden absolute top-full left-0 w-full bg-red-800 dark:bg-gray-800 text-white px-4 py-4 space-y-2 shadow-lg transform transition-all duration-300 ease-out
        ${open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"}`}>
        <li>
          <NavLink to="/" onClick={() => setOpen(false)} className="hover:bg-red-400 px-3 py-2 rounded transition-all duration-200">Home</NavLink>
        </li>
        <li>
          <NavLink to="/movies" onClick={() => setOpen(false)} className="hover:bg-red-400 px-3 py-2 rounded transition-all duration-200">Movies</NavLink>
        </li>
        <li>
          <NavLink to="/tvShows" onClick={() => setOpen(false)} className="hover:bg-red-400 px-3 py-2 rounded transition-all duration-200">TV Shows</NavLink>
        </li>
        <li>
          <NavLink to="/wishlist" onClick={() => setOpen(false)} className="hover:bg-red-400 px-3 py-2 rounded transition-all duration-200">Wishlist</NavLink>
        </li>
      </ul>
    </nav>
  )
}
