import MovieSection from "@/components/home/movie-section";
import { getMovies } from "@/lib/movie-data";

export default async function Movies() {
  let data = await getMovies();

  return (
    <div>
      <MovieSection
        title="Now Showing"
        movies={data.nowShowing}
        buttonText="Book Tickets"
        buttonAction="book"
      />

      <MovieSection
        title="Coming Soon"
        movies={data.commingSoon}
        buttonText="Coming Soon"
        buttonAction="disabled"
      />
    </div>
  );
}
