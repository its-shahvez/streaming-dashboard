import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/types/movie';

interface Props {
  movie: Movie;
}

export default function MovieCard({ movie }: Props) {
  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
          className="rounded-sm object-cover md:rounded"
          fill
          alt={movie.title || movie.name || 'Movie'}
        />
        <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition" />
      </div>
      <p className="mt-2 text-sm text-gray-300 truncate w-[180px] md:w-[260px]">
        {movie.title || movie.name}
      </p>
    </Link>
  );
}