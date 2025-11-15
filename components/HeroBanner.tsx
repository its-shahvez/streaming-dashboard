import Image from 'next/image';
import { Movie } from '@/types/movie';

interface Props {
  movie: Movie;
}

export default function HeroBanner({ movie }: Props) {
  const imagePath = movie?.backdrop_path || movie?.poster_path;

  return (
    <div className="relative flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[80vh] lg:justify-end lg:pb-12">
      
      {/* Background Image */}
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-full">
        <Image
          src={`https://image.tmdb.org/t/p/original${imagePath}`}
          alt={movie.title || movie.name || 'Banner'}
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay ताकि text साफ़ दिखे */}
        <div className="absolute bottom-0 w-full h-64 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Movie Info */}
      <div className="px-4 lg:px-10 space-y-4 max-w-2xl">
        <h1 className="text-3xl font-bold md:text-5xl lg:text-7xl text-white drop-shadow-md">
          {movie?.title || movie?.name}
        </h1>
        
        <p className="max-w-xs text-xs text-shadow-md text-gray-200 md:max-w-lg md:text-lg lg:max-w-2xl lg:text-xl line-clamp-3">
          {movie?.overview}
        </p>

        <div className="flex space-x-3">
          <button className="flex items-center gap-x-2 rounded bg-white px-5 py-1.5 text-sm font-bold text-black transition hover:bg-[#e6e6e6] md:px-8 md:py-2.5 md:text-xl">
            Play
          </button>
          <button className="flex items-center gap-x-2 rounded bg-[gray]/70 px-5 py-1.5 text-sm font-bold text-white transition hover:bg-[gray]/40 md:px-8 md:py-2.5 md:text-xl">
            More Info
          </button>
        </div>
      </div>
    </div>
  );
}