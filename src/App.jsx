import { HashRouter, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "aos/dist/aos.css";

import './App.css'
import Login from './Pages/Login/Login'
import SignUp from './Pages/SignUp/SignUp'
import NavBar from './Components/NavBar/NavBar'
import Home from './Pages/Home/Home'
import NotFound from './Pages/NotFound/NotFound'
import Movies from './Pages/Movies/Movies'
import TVShows from './Pages/TV Shows/TVShows'
import MovieDetails from './Pages/MovieDetails/MovieDetails'
import TVShowDetails from './Pages/TVDetails/TVShowDetails'
import Wishlist from './Pages/Wishlist/Wishlist';
import Footer from './Components/Footer/Footer';
import ScrollToTopButton from './Components/ScrollToTop/ScrollToTopButton.jsx';

function Layout() {
  return (
    <div className="">
      <NavBar />
      <main className="">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopButton/>
    </div>
  )
}

function App() {

  const isLoggedIn = false; 

  return (
    <HashRouter>
      <Routes>

        <Route element={<Layout />}>
          <Route path='/' element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />} />
          <Route path='/movies' element={isLoggedIn ? <Movies /> : <Navigate to="/login" replace />} />
          <Route path='/tvShows' element={isLoggedIn ? <TVShows /> : <Navigate to="/login" replace />} />
          <Route path='/movie/:id' element={isLoggedIn ? <MovieDetails /> : <Navigate to="/login" replace />} />
          <Route path='/tv/:id' element={isLoggedIn ? <TVShowDetails /> : <Navigate to="/login" replace />} />
          <Route path='/wishlist' element={isLoggedIn ? <Wishlist /> : <Navigate to="/login" replace />} />
          <Route path='*' element={<NotFound />} />
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>

      <ToastContainer position="bottom-right" autoClose={2000} />
    </HashRouter>
  )
}

export default App
