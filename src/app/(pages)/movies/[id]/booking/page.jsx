import { notFound } from "next/navigation";
import MovieDetails from "@/components/booking/movie-details";
import ShowtimeSelector from "@/components/booking/showtime-selector";
import { getMovieById } from "@/lib/movie-data";

export default async function BookingPage({ params }) {
  params = await params;
  const movieId = params.id;
  const movie = await getMovieById(movieId);
  if (!movie) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <MovieDetails movie={movie} />

        <ShowtimeSelector movieId={movieId} />
      </div>
    </div>
  );
}
