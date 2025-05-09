import { notFound } from "next/navigation";
import MovieDetails from "@/components/booking/movie-details";
import ShowtimeSelector from "@/components/booking/showtime-selector";
import { getMovieById } from "@/lib/movie-data";
import ErrorMessage from "@/components/utils/error";

export default async function BookingPage({ params }) {
  params = await params;
  const movieId = params.id;
  const movie = await getMovieById(movieId);
  if (!movie) {
    notFound();
  }

  if (movie.error) {
    return <ErrorMessage msg={movie.error} />;
  }

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <MovieDetails movie={movie} />

        <ShowtimeSelector movieId={movieId} />
      </div>
    </div>
  );
}
