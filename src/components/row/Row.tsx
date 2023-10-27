import React from "react";
import { RowProps } from "./row.props";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import Thumbnail from "../thumbnail/Thumbnail";
import { useState, useRef } from "react";

const Row = ({ title, movies, isBig=false }: RowProps) => {
  const [move, setMove] = useState<boolean>(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleClick = (direction: "left" | "right") => {
    setMove(true);

    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;

      const scrollto =
        direction === "left"
          ? scrollLeft - clientWidth
          : clientWidth + scrollLeft;

          carouselRef.current.scrollTo({left: scrollto, behavior:'smooth'})
          if(direction === 'left' && scrollto === 0){
            setMove(false);
          }
          
        
    }
  };

  return (
    <div className=" md:h-[600px] space-y-3 md:space-y-2">
      <h2 className=" w-28 text-semibold text-lg mt-4 md:mt-0 md:text-2xl cursor-pointer text-[#e5e5e5] hover:text-white transition  duration-100 ">
        {title}
      </h2>

      {/* carousel */}
      <div className="group relative md:ml-2">
        <FiChevronLeft
          className={`h-8 w-8 absolute text-red-600 top-0 m-auto bottom-0 left-2 z-40 cursor-pointer opacity-0 group-hover:opacity-100 transition ease-in duration-100 hover:scale-125 ${!move && 'hidden'}`}
          onClick={() => handleClick("left")}
        />

        <div
          ref={carouselRef}
          className={`flex scrollbar-hide items-center ${!isBig && 'space-x-1 md:space-x-2'} overflow-x-scroll`}
        >
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} isBig={isBig}/>
          ))}
        </div>

        <FiChevronRight
          className='h-8 w-8 absolute text-red-600 top-0 m-auto right-2 bottom-0 z-40 cursor-pointer opacity-0 group-hover:opacity-100 transition ease-in duration-100 hover:scale-125 '
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
};

export default Row;
