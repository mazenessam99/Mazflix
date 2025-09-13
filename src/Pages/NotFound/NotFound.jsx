
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className=" text-[150px] md:text-[220px] tracking-wide font-bold text-[#222] [text-shadow:1px_1px_0px_red,-1px_-1px_0px_red]">
        4<span className="[text-shadow:2px_2px_0px_red,-2px_-2px_0px_red,0px_0px_8px_red]">0</span>4
      </h1>
      <p className=" text-xl md:text-2xl mx-auto max-w-2xl opacity-85 mt-4">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
    </div>
  )
}
