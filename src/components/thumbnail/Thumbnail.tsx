import React from 'react'
import { ThumbnailProps } from './thumbnail.props'
import Image from 'next/image'
import { image_base } from '@/helpers/constants'
import ReactStars from 'react-stars'
import { useInfoStore } from '@/store'

const Thumbnail = ({movie, isBig}:ThumbnailProps) => {
  const { setModal, setCurrentMovie } = useInfoStore()


  const handleCurrentMovie = ()=>{
    setModal(true)
    setCurrentMovie(movie)
  }




  return (
    <div onClick={handleCurrentMovie} className={`relative ${isBig ? "h-[400px] md:h-[550px] min-w-[350px] md:min-w-[470px]" : 'h-[330px] md:h-[440px] min-w-[200px] md:min-w-[292px]'} cursor-pointer ease-out hover:scale-95 overflow-hidden transition duration-200`}>
 <Image
          src={`${image_base}${movie?.backdrop_path || movie?.poster_path}`}
          alt={movie.title}
          fill
          className="object-cover rounded-sm lg:rounded"
        />

<div className='absolute top-0 left-0 right-0 bottom-0 bg-black/40 w-full h-full'/>


        <div className="absolute bottom-0 min-h-[150px] left-2 right-2">

<div className="flex items-center space-x-2">
      <ReactStars count={10} edit={false} value={movie.vote_average} 
	  />
	  <p>({movie.vote_count}) votes</p>

</div>
    <h3 className="text-xl text-shadow-xl font-bold md:text-2xl">
        {movie?.title ||
          movie?.name ||
          movie?.original_name ||
          movie?.original_title}
      </h3>

        </div>
    </div>
  )
}

export default Thumbnail