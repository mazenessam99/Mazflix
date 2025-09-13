import { useEffect, useState } from 'react'
import darkModeImg from '../../assets/dark-mode-button.png'
import lightModeImg from '../../assets/light-mode-button.png'

export default function () {
  const [theme,setTheme]=useState(
  localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'
);

useEffect(() => {
  const htmlElement = document.documentElement;
  localStorage.setItem("theme", theme);

  if (theme === "dark") {
    htmlElement.classList.add("dark");
    
  } else {
    
    htmlElement.classList.remove("dark");
  }
}, [theme]);
  return (
    <div className='flex items-center relative w-12'>

        <img src={darkModeImg} alt="" onClick={()=>{
            setTheme(theme === 'dark' ? 'light':'dark')
        }} className={`absolute top-0 right-0 w-12 cursor-pointer transition-all duration-300 ${
          theme === 'dark' ? 'opacity-100' : 'opacity-0'
        }`} />

        <img src={lightModeImg} alt="" onClick={()=>{
            setTheme(theme === 'dark' ? 'light':'dark')
        }} className={`absolute top-0 right-0 w-12 cursor-pointer transition-all duration-300 ${
          theme === 'dark' ? 'opacity-0' : 'opacity-100'
        }`} /> 

    </div>
  )
}
