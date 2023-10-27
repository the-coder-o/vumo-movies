import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { image_base } from "src/helpers/constants";
import { IMovie } from "src/interfaces/app.interface";
import { HeroProps } from "./hero.props";
import { BsPlayFill } from "react-icons/bs";
import ReactStars from "react-stars";
import { AuthContext } from "@/context/auth.context";
import { useInfoStore } from "@/store";

const Hero = ({ trending }: HeroProps): JSX.Element => {
  const [movie, setMovie] = useState<IMovie>({} as IMovie);

  const [loading, setLoading] = useState(true);

  const handleCurrentMovie = () => {
    setModal(true);
    setCurrentMovie(movie);
  };

  useEffect(() => {
    const randomMovie = trending[Math.floor(Math.random() * trending.length)];
    setMovie(randomMovie);
    setTimeout(() => setLoading(false), 100);
  }, [trending]);

  const { setModal, setCurrentMovie } = useInfoStore();

  return (
    <div className="flex flex-col space-y-2 py-24 md:space-y-4 h-[73vh] lg:py-12  lg:justify-end ">
      {loading && (
        <div role="status" className="flex items-center justify-">
          <svg
            aria-hidden="true"
            className="text-center w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {
        <div className="absolute top-0 left-0 -z-50 h-[100vh] w-full">
          <Image
            src={`${image_base}${movie?.backdrop_path || movie?.poster_path}`}
            alt={movie.title}
            fill
            className="object-cover"
          />
        </div>
      }
      <div className="py-[4px] px-[8px] text-center rounded-br-[8px] rounded-tl-[8px] bg-[#1d1d1d]/40 w-[111px]">
        {movie.media_type}
      </div>

      <div className="flex items-center space-x-2">
        <ReactStars count={10} edit={false} value={movie.vote_average} />
        <p>({movie.vote_count}) votes</p>
      </div>

      <h3 className="text-2xl text-shadow-xl font-bold md:text-4xl lg:text-5xl">
        {movie?.title ||
          movie?.name ||
          movie?.original_name ||
          movie?.original_title}
      </h3>

      <p className="max-w-xs md:max-w-lg text-shadow-xl lg:max-w-2xl text-sm md:text-lg lg:text-xl">
        {movie?.overview?.slice(0, 100)}...
      </p>

      <div className="">
        <button
          onClick={handleCurrentMovie}
          className="flex items-center outline-none justify-center space-x-2 font-bold bg-white/60 hover:bg-white/80 transition-all text-black rounded-full w-[125px] h-[40px] lg:w-[200px] lg:h-[56px]"
        >
          <BsPlayFill className="h-5 w-7 " /> Watch now
        </button>
      </div>
    </div>
  );
};

export default Hero;
