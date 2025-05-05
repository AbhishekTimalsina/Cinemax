import MovieCard from "./movie-card";

export default function MovieSection({
  title,
  movies,
  buttonText,
  buttonAction,
}) {
  return (
    <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 border-l-4 border-red-600 pl-4">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            buttonText={buttonText}
            buttonAction={buttonAction}
          />
        ))}
      </div>
    </section>
  );
}
