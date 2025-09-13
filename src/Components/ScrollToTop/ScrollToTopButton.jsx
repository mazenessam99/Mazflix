import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    if (window.scrollY > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-6  p-4 rounded-full bg-red-500 
        text-white shadow-xl cursor-pointer transform transition-right duration-300 hover:scale-110 
        flex items-center justify-center z-50
        ${visible ? "right-6" : "right-[-80px]"}
      `}
    >
      <ArrowUp className="w-6 h-6 animate-bounce" />
    </button>
  );
}
