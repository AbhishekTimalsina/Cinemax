// import { getMovieById } from "@/lib/movie-data";
import Movies from "@/app/models/Movies";
import Seats from "@/app/models/Seats";
import ShowTimes from "@/app/models/ShowTimes";
import UserBookings from "@/app/models/UserBookings";
import dbConnect from "@/lib/mongoose";
import { nowShowingMovies, comingSoonMovies } from "@/lib/movie-data";

export async function GET(request, { params }) {
  await dbConnect();
  const slug = await params;

  let data = await Movies.findById(slug.id);
  return Response.json(data);
}
// function getMovieById(id) {
//   return [...nowShowingMovies, ...comingSoonMovies].find(
//     (movie) => movie.id === id
//   );
// }

export async function PUT(request, { params }) {
  await dbConnect();
  const slug = await params;

  const body = await request.json();

  let data = await Movies.findByIdAndUpdate(slug.id, body);

  return Response.json(data);
}

export async function DELETE(request, { params }) {
  await dbConnect();

  const slug = await params;

  let data = await Movies.findByIdAndDelete(slug.id);
  let showTimeData = await ShowTimes.findOneAndDelete({ movieId: slug.id });
  await UserBookings.findOneAndDelete({ movieId: slug.id });

  let allSeats = showTimeData.availableShows.map((d) => d.seatsId);
  // console.log(data);
  await Seats.deleteMany({ _id: { $in: allSeats } });

  return Response.json({ data });
}
