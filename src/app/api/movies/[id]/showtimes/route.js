import Seats from "@/app/models/Seats";
import ShowTime from "@/app/models/ShowTimes";
import dbConnect from "@/lib/mongoose";

export async function GET(request, { params }) {
  const slug = await params;
  await dbConnect();
  let data = await ShowTime.findOne({ movieId: slug.id });

  return Response.json(data);
}

//   let data = await Seats.find({});

//   let newDat = new ShowTime({
//     movieId: "680b361129b09cbcd41e15f6",
//     availableShows: [
//       {
//         date: new Date("2025-04-25"),
//         time: "10 AM",
//         seatsId: "680b79b3897a9c93e8e8ec78",
//       },
//       {
//         date: new Date("2025-04-25"),
//         time: "1:15 AM",
//         seatsId: "680b7d992aeb87e96fcb3e8e",
//       },
//       {
//         date: new Date("2025-04-25"),
//         time: "4 AM",
//         seatsId: "680b7d992aeb87e96fcb3e90",
//       },
//       {
//         date: new Date("2025-04-25"),
//         time: "7:30 AM",
//         seatsId: "680b7d992aeb87e96fcb3e92",
//       },
//     ],
//   });

//   await newDat.save();

//   await new Seats({
//     time: "1:15 AM",
//     date: new Date("2025-04-25"),
//     totalSeats: 100,
//     bookedSeats: [],
//     availableSeats: [],
//   }).save();
//   await new Seats({
//     time: "4 AM",
//     date: new Date("2025-04-25"),
//     totalSeats: 100,
//     bookedSeats: [],
//     availableSeats: [],
//   }).save();
//   await new Seats({
//     time: "7:30 AM",
//     date: new Date("2025-04-25"),
//     totalSeats: 100,
//     bookedSeats: [],
//     availableSeats: [],
//   }).save();

//   await st.save();
//   console.log(data[0].date.toDateString());
