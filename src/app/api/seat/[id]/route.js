import Seats from "@/app/models/Seats";
import UserBookings from "@/app/models/UserBookings";
import dbConnect from "@/lib/mongoose";

export async function GET(request, { params }) {
  //   const searchParams = request.nextUrl.searchParams;
  await dbConnect();
  const slug = await params;

  let data = await Seats.findById(slug.id);

  return Response.json(data);
}

export async function POST(request, { params }) {
  //   const searchParams = request.nextUrl.searchParams;
  await dbConnect();
  let body = await request.json();
  const slug = await params;
  // console.log(body);
  let data = await Seats.findByIdAndUpdate(slug.id, {
    $push: { bookedSeats: { $each: [...body.selectedSeats] } },
  });
  console.log(body);
  let userBooking = new UserBookings({
    ...body.userData,
    bookedSeats: [...body.selectedSeats],
    movieId: body.movieId,
    seatId: slug.id,
  });

  await userBooking.save();

  // console.log(userBooking);

  return Response.json(data);
}
