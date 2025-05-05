import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[70vh] w-full">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-10"></div>
      <img
        src="https://upload.wikimedia.org/wikipedia/en/thumb/2/25/The_Last_Guardian_cover_art.jpg/250px-The_Last_Guardian_cover_art.jpg"
        alt="Featured movie"
        className="object-cover opacity-60 w-full h-full"
      />
      <div className="absolute bottom-0 left-0 z-20 p-8 md:p-16 w-full">
        <h1 className="text-4xl md:text-6xl font-bold mb-2">
          The Last Guardian
        </h1>
        <p className="text-xl md:text-2xl mb-6">
          Experience the adventure in IMAX
        </p>
        <Link
          href="/movies/2/booking"
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-md transition duration-300"
        >
          Book Tickets
        </Link>
      </div>
    </section>
  );
}
