
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import MovieRow from '@/components/MovieRow';
import { 
  getTrendingMovies, 
  getPopularMovies, 
  getTopRatedMovies, 
  getNowPlayingMovies 
} from '@/lib/tmdb';

export default async function Home() {
 
  const trendingData = getTrendingMovies();
  const popularData = getPopularMovies();
  const topRatedData = getTopRatedMovies();
  const nowPlayingData = getNowPlayingMovies();

  // 
  const [trending, popular, topRated, nowPlaying] = await Promise.all([
    trendingData,
    popularData,
    topRatedData,
    nowPlayingData,
  ]);

  
  const randomMovie = trending.results[
    Math.floor(Math.random() * trending.results.length)
  ];

  return (
    <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
      {/* Navigation Header */}
      <Header />

      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        {/* Hero Banner Section */}
        <HeroBanner movie={randomMovie} />

        {/* Movie Rows Section */}
        <section className="md:space-y-16">
          <MovieRow title="Trending Now" movies={trending.results} />
          <MovieRow title="Top Rated" movies={topRated.results} />
          <MovieRow title="Popular on Netflix" movies={popular.results} />
          <MovieRow title="New Releases" movies={nowPlaying.results} />
        </section>
      </main>
      
      {/* Simple Footer */}
      <footer className="flex justify-center py-8 text-xs text-gray-500">
        <p>Built with Next.js 14 & TMDB API</p>
      </footer>
    </div>
  );
}