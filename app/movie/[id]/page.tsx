
import Image from 'next/image';
import { getMovieById } from '@/lib/tmdb';
import Link from 'next/link';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function MoviePage(props: Props) {

  const params = await props.params;
  const id = params.id;

  console.log("🎬 Movie Page loaded for ID:", id);

  // 2. Data fetch 
  let movie;
  try {
    movie = await getMovieById(id);
  } catch (error) {
    
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500">Oops!</h1>
          <p className="mt-4 text-xl">Movie not found or API Error.</p>
          <p className="text-sm text-gray-500 mt-2">ID: {id}</p>
          <Link href="/" className="mt-6 inline-block rounded bg-white px-6 py-2 text-black font-bold">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-white">
      <Link href="/" className="absolute top-8 left-8 z-50 rounded-full bg-black/50 px-4 py-2 text-white hover:bg-black/80 backdrop-blur-sm border border-white/20">
        ← Back
      </Link>

      {/* Backdrop Image */}
      <div className="fixed top-0 left-0 -z-10 h-[100vh] w-full opacity-60">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`}
          alt={movie.title || "Movie"}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
      </div>

      {/* Content */}
      <main className="flex flex-col items-start justify-center px-6 pt-32 md:px-12 lg:px-24 lg:pt-40">
        <h1 className="mb-4 text-4xl font-extrabold md:text-6xl lg:text-7xl drop-shadow-lg">
          {movie.title || movie.name}
        </h1>

        <div className="flex items-center space-x-4 text-sm font-semibold text-gray-300 md:text-base">
          <span className="text-green-400">{movie.vote_average ? Math.round(movie.vote_average * 10) : 0}% Match</span>
          <span>{movie.release_date?.split('-')[0]}</span>
          <span className="border border-gray-500 px-1 text-xs uppercase">HD</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {movie.genres?.map((genre) => (
            <span key={genre.id} className="rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur-sm">
              {genre.name}
            </span>
          ))}
        </div>

        <p className="mt-6 max-w-2xl text-lg text-gray-200 drop-shadow-md md:text-xl line-clamp-4">
          {movie.overview}
        </p>

        <div className="mt-8 flex space-x-4">
          <button className="rounded bg-white px-6 py-2 font-bold text-black hover:bg-gray-300">
            ▶ Play
          </button>
        </div>
      </main>
    </div>
  );
}