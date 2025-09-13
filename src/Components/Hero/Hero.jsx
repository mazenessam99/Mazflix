import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Hero() {
  const slides = [
    {
      image: "https://wallpapercave.com/wp/wp4061875.jpg",
      title: "Welcome to MazFlix",
      subtitle: "Explore the latest movies, top-rated TV shows, and track your favorites!",
    },
    {
      image: "https://wallpaperaccess.com/full/3658600.jpg",
      title: "Top Trending Movies",
      subtitle: "Check out what everyone is watching right now!",
    },
    {
      image: "https://wallup.net/wp-content/uploads/2016/01/161930-TV-Banshee-Breaking_Bad-Vikings-True_Detective-Dexter-Peaky_Blinders-Hannibal-The_Big_Bang_Theory-Homeland-Bates_Motel-Friedrich_Nietzsche-Penny_Dreadful.jpg",
      title: "Discover TV Shows",
      subtitle: "Follow your favorite series and stay updated!",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false, mirror: true });
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[80vh] pt-16 my-6 overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="absolute inset-0 bg-black opacity-85"></div>
          <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4">
            <h1
              className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4"
              data-aos="fade-down"
            >
              {slide.title}
            </h1>
            <p
              className="text-lg sm:text-xl md:text-2xl mb-6 max-w-2xl"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {slide.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/movies"
                className="bg-red-500 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition-all"
                data-aos="zoom-in"
                data-aos-delay="400"
              >
                Browse Movies
              </Link>
              <Link
                to="/tvShows"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-red-500 px-6 py-3 rounded-lg font-semibold transition-all"
                data-aos="zoom-in"
                data-aos-delay="600"
              >
                Browse TV Shows
              </Link>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

