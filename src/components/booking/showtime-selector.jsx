import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";

import AllShowTimes from "./allshowtimes";

export default async function ShowtimeSelector({ movieId }) {
  return (
    <div className="md:w-2/3">
      <h2 className="text-2xl font-bold mb-6 border-l-4 border-red-600 pl-4">
        Select Showtime
      </h2>

      <AllShowTimes movieId={movieId} />
      {/* 
      <div className="mb-8">
        <div className="flex overflow-x-auto gap-4 pb-4">
          {["Today", "Tomorrow", "Wed, May 1", "Thu, May 2", "Fri, May 3"].map(
            (date, index) => (
              <div
                key={index}
                className={`flex-shrink-0 px-4 py-3 rounded-lg cursor-pointer transition duration-300 ${
                  index < 1
                    ? "bg-red-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                <div className="text-center">
                  <Calendar size={16} className="mx-auto mb-1" />
                  <span>{date}</span>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <CinemaShowtimes
        showtimes={showTimes}
        // showTimes={showTimes.availableShows}
        movieId={movieId}
      /> */}
    </div>
  );
}

function CinemaShowtimes({ showtimes, movieId }) {
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {showtimes.availableShows.map((showtime) => (
          <Link
            key={showtime._id}
            href={`/movies/${movieId}/booking/seats?seatId=${showtime.seatsId}`}
            className="bg-gray-800 hover:bg-gray-700 text-center py-4 px-2 rounded-lg transition duration-300"
          >
            <div className="font-bold">{showtime.time}</div>
            {/* <div className="text-sm text-gray-400">{showtime.theater}</div> */}
          </Link>
        ))}
      </div>
    </div>
  );
}

// {
//   showtimes.map((showtime) => (
//     <Link
//       key={showtime.id}
//       href={`/movies/${movieId}/booking/seats?showtime=${showtime.id}`}
//       className="bg-gray-800 hover:bg-gray-700 text-center py-4 px-2 rounded-lg transition duration-300"
//     >
//       <div className="font-bold">{showtime.time}</div>
//       {/* <div className="text-sm text-gray-400">{showtime.theater}</div> */}
//     </Link>
//   ));
// }
