import { Movie } from '@/types/movie';
import MovieCard from './MovieCard';

interface Props {
  title: string;
  movies: Movie[];
}

export default function MovieRow({ title, movies }: Props) {
  return (
    <div className="h-40 space-y-0.5 md:space-y-2 px-4 lg:px-10 my-8">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>
      
      <div className="group relative md:-ml-2">
        <div className="flex items-center space-x-2.5 overflow-x-scroll scrollbar-hide md:space-x-4 md:p-2">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}