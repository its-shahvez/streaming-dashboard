
import { MovieAPIResponse, MovieDetails } from '@/types/movie';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY;

async function fetchFromTMDB<T>(endpoint: string): Promise<T> {
 
  const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=en-US`;

  
  console.log(`🔍 Trying to fetch: ${url}`); 

  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error(`❌ API responded with Error: ${response.status}`);
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  } catch (error) {
    // 3. अगर fetch फेल हुआ, तो बताओ क्यों हुआ
    console.error(`💥 Fetch Crashed for URL: ${url}`);
    console.error(error);
    throw error;
  }
}

export async function getTrendingMovies() {
  return fetchFromTMDB<MovieAPIResponse>('/trending/movie/day');
}

export async function getPopularMovies() {
  return fetchFromTMDB<MovieAPIResponse>('/movie/popular');
}

export async function getTopRatedMovies() {
  return fetchFromTMDB<MovieAPIResponse>('/movie/top_rated');
}

export async function getNowPlayingMovies() {
  return fetchFromTMDB<MovieAPIResponse>('/movie/now_playing');
}

export async function getMovieById(id: string) {
 
  if (!id) throw new Error("Movie ID is missing!");
  return fetchFromTMDB<MovieDetails>(`/movie/${id}`);
}