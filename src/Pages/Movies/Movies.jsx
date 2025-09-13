
import TopRated from '../../Components/Banners/TopRated'
import GetAllMovies from './GetAllMovies'

export default function Movies() {
  return (
    <>
    <h2 className="text-center text-4xl my-6 font-bold pt-16">Movie App 🎬</h2>
    <TopRated/>
    <GetAllMovies/>
    </>
  )
}
