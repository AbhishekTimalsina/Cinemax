import dbConnect from "@/lib/mongoose";
import Movies from "@/app/models/Movies";
import { put } from "@vercel/blob";

export async function GET() {
  await dbConnect();
  let data = await Movies.find({});

  // filter data by now showing and comming soon
  // let filteredData = data.reduce(
  //   (acc, curr) => {
  //     if (curr.releaseDate == "Now Showing") {
  //       return { ...acc, nowShowing: [...acc.nowShowing, curr] };
  //     }
  //     return { ...acc, commingSoon: [...acc.commingSoon, curr] };
  //   },
  //   {
  //     commingSoon: [],
  //     nowShowing: [],
  //   }
  // );
  // filter data by now showing and comming soon

  let filteredData = data.reduce(
    (acc, curr) => {
      let todayDate = new Date().toISOString().slice(0, 10);
      let isReleased = !(new Date(todayDate) - new Date(curr.releaseDate) < 0);

      return isReleased
        ? { ...acc, nowShowing: [...acc.nowShowing, curr] }
        : { ...acc, commingSoon: [...acc.commingSoon, curr] };
    },
    {
      commingSoon: [],
      nowShowing: [],
    }
  );

  // let todayDate = new Date().toISOString().slice(0, 10);
  // console.log(new Date(curr.releaseDate) - new Date("2025-05-03"));
  // filteredData.forEach((d) => {
  //   console.log(d.releaseDate);
  // });

  return Response.json(filteredData);
}

export async function POST(request) {
  await dbConnect();
  let formData = await request.formData();

  let body = Object.fromEntries(formData.entries());

  const blob = await put(body.image.name + Math.random(), body.image, {
    access: "public",
  });

  let newMovie = new Movies({
    ...body,
    image: blob.url,
  });
  await newMovie.save();

  // return Response.json({ name: "I don't know" });
  return Response.json(body);
}
// let datas = [
//   {
//     title: "The Last Guardian",
//     genre: "Action/Fantasy",
//     duration: "2h 15m",
//     releaseDate: "Now Showing",
//     image:
//       "https://upload.wikimedia.org/wikipedia/en/thumb/2/25/The_Last_Guardian_cover_art.jpg/250px-The_Last_Guardian_cover_art.jpg",
//     description:
//       "An epic adventure about a young warrior who must protect an ancient mystical creature from dark forces.",
//     director: "James Cameron",
//     cast: "Tom Holland, Zendaya, Keanu Reeves",
//   },
//   {
//     title: "Midnight in Paris",
//     genre: "Romance/Comedy",
//     duration: "1h 54m",
//     releaseDate: "Now Showing",
//     image:
//       "https://resizing.flixster.com/sbx3sPeko_R8xM4ls6C-5SoqlaM=/206x305/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p8526590_p_v10_aa.jpg",
//     description:
//       "A romantic comedy about a nostalgic screenwriter who magically goes back to the 1920s every night at midnight.",
//     director: "Woody Allen",
//     cast: "Owen Wilson, Rachel McAdams, Marion Cotillard",
//   },
//   {
//     title: "The Dark Knight Returns",
//     genre: "Action/Thriller",
//     duration: "2h 32m",
//     releaseDate: "Now Showing",
//     image:
//       "https://upload.wikimedia.org/wikipedia/en/e/e9/Batman_The_Dark_Knight_Returns_%28film%29.jpg",
//     description:
//       "Batman returns from retirement to fight crime in a city that has fallen into chaos.",
//     director: "Christopher Nolan",
//     cast: "Christian Bale, Heath Ledger, Gary Oldman",
//   },
//   {
//     title: "Eternal Sunshine",
//     genre: "Drama/Romance",
//     duration: "2h 10m",
//     releaseDate: "Coming May 15",
//     image:
//       "https://upload.wikimedia.org/wikipedia/en/e/e9/Batman_The_Dark_Knight_Returns_%28film%29.jpg",
//     description:
//       "A couple undergoes a procedure to erase each other from their memories after a painful breakup.",
//     director: "Michel Gondry",
//     cast: "Jim Carrey, Kate Winslet, Kirsten Dunst",
//   },
//   {
//     title: "Galactic Odyssey",
//     genre: "Sci-Fi/Adventure",
//     duration: "2h 25m",
//     releaseDate: "Coming May 22",
//     image:
//       "https://resizing.flixster.com/sbx3sPeko_R8xM4ls6C-5SoqlaM=/206x305/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p8526590_p_v10_aa.jpg",
//     description:
//       "A space explorer embarks on a journey to save humanity from an impending cosmic threat.",
//     director: "Denis Villeneuve",
//     cast: "Timothée Chalamet, Zendaya, Oscar Isaac",
//   },
//   {
//     title: "The Silent Echo",
//     genre: "Thriller/Mystery",
//     duration: "1h 58m",
//     releaseDate: "Coming June 3",
//     image:
//       "https://m.media-amazon.com/images/I/712I5GOGprL._AC_UF1000,1000_QL80_.jpg",
//     description:
//       "A detective with a troubled past investigates a series of mysterious disappearances in a small town.",
//     director: "David Fincher",
//     cast: "Jake Gyllenhaal, Rosamund Pike, Hugh Jackman",
//   },
//   {
//     title: "Whispers of Tomorrow",
//     genre: "Drama/Sci-Fi",
//     duration: "2h 05m",
//     releaseDate: "Coming June 10",
//     image:
//       "https://upload.wikimedia.org/wikipedia/en/thumb/2/25/The_Last_Guardian_cover_art.jpg/250px-The_Last_Guardian_cover_art.jpg",
//     description:
//       "In a near-future world, a woman discovers she can communicate with her future self.",
//     director: "Ava DuVernay",
//     cast: "Lupita Nyong'o, Daniel Kaluuya, Letitia Wright",
//   },
// ];

// Movies.insertMany(datas).then((res) => console.log("inserted", res));
