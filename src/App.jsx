import { BrowserRouter, Route, Routes,Outlet } from 'react-router-dom'
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


  return (
    <BrowserRouter>
      <Routes>

        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/tvShows' element={<TVShows />} />
          <Route path='/movie/:id' element={<MovieDetails />} />
          <Route path='/tv/:id' element={<TVShowDetails />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path='*' element={<NotFound />} />
        </Route>
        
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
       
      <ToastContainer position="bottom-right" autoClose={2000} />
    </BrowserRouter>
  )
}

export default App
