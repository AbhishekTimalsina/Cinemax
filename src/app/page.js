import Hero from "@/components/home/hero";
import MovieSection from "@/components/home/movie-section";
import { getMovies } from "@/lib/movie-data";

export default async function Home() {
  let data = await getMovies();

  // console.log(data);

  return (
    <div>
      <Hero movie={data.nowShowing} />

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
