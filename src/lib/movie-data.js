// Mock data for movies
export const nowShowingMovies = [
  {
    id: 1,
    title: "Interstellar: Beyond Time",
    genre: "Sci-Fi/Adventure",
    duration: "2h 49m",
    releaseDate: "Now Showing",
    image:
      "https://m.media-amazon.com/images/I/712I5GOGprL._AC_UF1000,1000_QL80_.jpg",
    rating: "PG-13",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    director: "Christopher Nolan",
    cast: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
  },
  {
    id: 2,
    title: "The Last Guardian",
    genre: "Action/Fantasy",
    duration: "2h 15m",
    releaseDate: "Now Showing",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/2/25/The_Last_Guardian_cover_art.jpg/250px-The_Last_Guardian_cover_art.jpg",
    rating: "PG-13",
    description:
      "An epic adventure about a young warrior who must protect an ancient mystical creature from dark forces.",
    director: "James Cameron",
    cast: "Tom Holland, Zendaya, Keanu Reeves",
  },
  {
    id: 3,
    title: "Midnight in Paris",
    genre: "Romance/Comedy",
    duration: "1h 54m",
    releaseDate: "Now Showing",
    image:
      "https://resizing.flixster.com/sbx3sPeko_R8xM4ls6C-5SoqlaM=/206x305/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p8526590_p_v10_aa.jpg",
    rating: "PG-13",
    description:
      "A romantic comedy about a nostalgic screenwriter who magically goes back to the 1920s every night at midnight.",
    director: "Woody Allen",
    cast: "Owen Wilson, Rachel McAdams, Marion Cotillard",
  },
  {
    id: 4,
    title: "The Dark Knight Returns",
    genre: "Action/Thriller",
    duration: "2h 32m",
    releaseDate: "Now Showing",
    image:
      "https://upload.wikimedia.org/wikipedia/en/e/e9/Batman_The_Dark_Knight_Returns_%28film%29.jpg",
    rating: "PG-13",
    description:
      "Batman returns from retirement to fight crime in a city that has fallen into chaos.",
    director: "Christopher Nolan",
    cast: "Christian Bale, Heath Ledger, Gary Oldman",
  },
];

export const comingSoonMovies = [
  {
    id: 5,
    title: "Eternal Sunshine",
    genre: "Drama/Romance",
    duration: "2h 10m",
    releaseDate: "Coming May 15",
    image:
      "https://upload.wikimedia.org/wikipedia/en/e/e9/Batman_The_Dark_Knight_Returns_%28film%29.jpg",
    rating: "PG-13",
    description:
      "A couple undergoes a procedure to erase each other from their memories after a painful breakup.",
    director: "Michel Gondry",
    cast: "Jim Carrey, Kate Winslet, Kirsten Dunst",
  },
  {
    id: 6,
    title: "Galactic Odyssey",
    genre: "Sci-Fi/Adventure",
    duration: "2h 25m",
    releaseDate: "Coming May 22",
    image:
      "https://resizing.flixster.com/sbx3sPeko_R8xM4ls6C-5SoqlaM=/206x305/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p8526590_p_v10_aa.jpg",
    rating: "PG-13",
    description:
      "A space explorer embarks on a journey to save humanity from an impending cosmic threat.",
    director: "Denis Villeneuve",
    cast: "Timothée Chalamet, Zendaya, Oscar Isaac",
  },
  {
    id: 7,
    title: "The Silent Echo",
    genre: "Thriller/Mystery",
    duration: "1h 58m",
    releaseDate: "Coming June 3",
    image:
      "https://m.media-amazon.com/images/I/712I5GOGprL._AC_UF1000,1000_QL80_.jpg",
    rating: "R",
    description:
      "A detective with a troubled past investigates a series of mysterious disappearances in a small town.",
    director: "David Fincher",
    cast: "Jake Gyllenhaal, Rosamund Pike, Hugh Jackman",
  },
  {
    id: 8,
    title: "Whispers of Tomorrow",
    genre: "Drama/Sci-Fi",
    duration: "2h 05m",
    releaseDate: "Coming June 10",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/2/25/The_Last_Guardian_cover_art.jpg/250px-The_Last_Guardian_cover_art.jpg",
    rating: "PG-13",
    description:
      "In a near-future world, a woman discovers she can communicate with her future self.",
    director: "Ava DuVernay",
    cast: "Lupita Nyong'o, Daniel Kaluuya, Letitia Wright",
  },
];

// Mock data for showtimes
const showtimes = [
  { id: 1, time: "10:30 AM", theater: "Theater 1", date: "Today" },
  { id: 2, time: "1:15 PM", theater: "Theater 2", date: "Today" },
  { id: 3, time: "4:00 PM", theater: "Theater 1", date: "Today" },
  { id: 4, time: "7:30 PM", theater: "Theater 3 (IMAX)", date: "Today" },
  { id: 5, time: "10:45 PM", theater: "Theater 2", date: "Today" },
  { id: 6, time: "11:00 AM", theater: "Theater 1", date: "Tomorrow" },
  { id: 7, time: "2:30 PM", theater: "Theater 3 (IMAX)", date: "Tomorrow" },
  { id: 8, time: "5:45 PM", theater: "Theater 2", date: "Tomorrow" },
  { id: 9, time: "8:15 PM", theater: "Theater 1", date: "Tomorrow" },
];

// Helper functions to get data

export async function getMovies() {
  let data = await fetch(`${process.env.NEXT_PUBLIC_WEB_URI}/api/movies`);
  data = await data.json();
  return data;
}

export async function getMovieById(id) {
  let data = await fetch(`${process.env.NEXT_PUBLIC_WEB_URI}/api/movies/${id}`);
  data = await data.json();

  return data;
}

export async function getShowTimesByMovie(movieId) {
  let data = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URI}/api/movies/${movieId}/showtimes`
  );
  data = await data.json();
  console.log(data);
  return data;
}

export async function getShowtimeById(showId) {
  let data = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URI}/api/showtime/${showId}`
  );
  data = await data.json();
  return data;
}

export async function getAllBookings() {
  let data = await fetch(`${process.env.NEXT_PUBLIC_WEB_URI}/api/userbooking`);
  data = await data.json();
  return data;
}

export async function getSeatById(id) {
  let data = await fetch(`${process.env.NEXT_PUBLIC_WEB_URI}/api/seat/${id}`);
  data = await data.json();
  return data;
}

export async function postNewMovie(movieData) {
  // console.log(movieData);
  let formData = new FormData();

  for (let key of Object.keys(movieData)) {
    formData.append(key, movieData[key]);
  }

  let data = await fetch(`${process.env.NEXT_PUBLIC_WEB_URI}/api/movies`, {
    method: "POST",
    body: formData,
  });
  data = await data.json();

  return data;
}

export async function putUpdateMovie(id, movieData) {
  let formData = new FormData();

  for (let key of Object.keys(movieData)) {
    formData.append(key, movieData[key]);
  }

  let data = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URI}/api/movies/${id}`,
    {
      method: "PUT",
      body: formData,
    }
  );
  data = await data.json();
  return data;
}

export async function deleteMovie(id) {
  let data = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URI}/api/movies/${id}`,
    {
      method: "DELETE",
    }
  );
  data = await data.json();

  return data;
}

export async function postBookTicket(seatId, movieId, selectedSeats, userData) {
  let data = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URI}/api/userbooking?seatId=${seatId}`,
    {
      // let data = await fetch(`${process.env.NEXT_PUBLIC_WEB_URI}/api/seat/${seatId}`, {
      method: "POST",
      body: JSON.stringify({
        selectedSeats: selectedSeats,
        userData: userData,
        movieId: movieId,
      }),
    }
  );
  data = await data.json();
  return data;
}

export async function getBookingById(id) {
  let data = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URI}/api/userbooking/${id}`
  );
  data = await data.json();

  return data;
}

export async function getAllShowTime() {
  let data = await fetch(`${process.env.NEXT_PUBLIC_WEB_URI}/api/showtime`);
  data = await data.json();
  return data;
}

export async function deleteShowTime(showTimeId, seatId) {
  let data = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URI}/api/showtime/${showTimeId}?seatId=${seatId}`,
    {
      method: "DELETE",
    }
  );
  data = await data.json();
  return data;
}

export async function postNewShowTime(showTimeData) {
  console.log(showTimeData, "yeta bata hai");
  let data = await fetch(`${process.env.NEXT_PUBLIC_WEB_URI}/api/showtime`, {
    method: "POST",
    body: JSON.stringify(showTimeData),
  });
  return data;
}

// export function getShowtimeById(id) {
//   return showtimes.find((showtime) => showtime.id === id);
// }

export function getShowtimesByDate(date) {
  return showtimes.filter((showtime) => showtime.date === date);
}
