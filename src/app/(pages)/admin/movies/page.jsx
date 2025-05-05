"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Search, Edit, Trash2, Eye, Filter } from "lucide-react";
import {
  nowShowingMovies,
  comingSoonMovies,
  getMovies,
  deleteMovie,
} from "@/lib/movie-data";
// import DeleteMovieModal from "@/components/admin/delete-movie-modal";
import ModuleHeader from "@/components/admin/module-header";
import DataTable from "@/components/admin/data-table";
import BookingTable from "@/components/admin/booking-table";

export default function MoviesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState(null);
  const [allMovies, setAllMovies] = useState([]);

  useEffect(() => {
    getMovies().then((res) =>
      setAllMovies([...res.commingSoon, ...res.nowShowing])
    );
    // getMovies().then((res) => console.log(res));
  }, []);

  // Combine all movies
  // const allMovies = [...nowShowingMovies, ...comingSoonMovies];

  // Filter movies based on search term and status
  const filteredMovies = allMovies.filter((movie) => {
    const matchesSearch =
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterStatus === "all") return matchesSearch;
    if (filterStatus === "now-showing")
      return matchesSearch && movie.releaseDate.includes("Now Showing");
    if (filterStatus === "coming-soon")
      return matchesSearch && movie.releaseDate.includes("Coming");

    return matchesSearch;
  });

  const handleDeleteClick = (movie) => {
    setMovieToDelete(movie);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    // In a real app, this would call an API to delete the movie
    console.log(`Deleting movie: ${movieToDelete.title}`);
    setIsDeleteModalOpen(false);
    setMovieToDelete(null);
    // You would then refresh the movies list
  };

  async function handleDeleteMovies(e, data) {
    console.log(data);
    await deleteMovie(data._id);
    // await deleteShowTime(data.showTimeId, data.seatsId._id);
    // setAllMovies((prevData) => prevData.filter((d) => d._id != data._id));
  }

  let columns = [
    {
      header: "Movie",
      render: (data) => <div>{data._id}</div>,
    },
    {
      header: "Title",
      render: (data) => <div>{data.title}</div>,
    },
    {
      header: "Genre",
      render: (data) => <div>{data.genre}</div>,
    },
    {
      header: "Duration",
      render: (data) => <div>{data.duration}</div>,
    },
    {
      header: "Status",
      render: (data) => {
        let todayDate = new Date().toISOString().slice(0, 10);
        let isReleased = !(
          new Date(todayDate) - new Date(data.releaseDate) <
          0
        );

        return <div>{isReleased ? "Now Showing" : "Coming soon"}</div>;
      },
    },
    {
      header: "Actions",
      render: (data) => (
        <div className="flex justify-end space-x-2">
          <Link
            href={`/admin/movies/${data._id}/edit`}
            className="text-blue-600 dark:text-blue-500 hover:text-blue-900 dark:hover:text-blue-400"
          >
            <Edit className="h-5 w-5" />
          </Link>
          <button
            className="text-red-600 dark:text-red-500 hover:text-red-900 dark:hover:text-red-400"
            onClick={(e) => handleDeleteMovies(e, data)}
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      ),
    },
  ];

  console.log(filteredMovies);

  // const columns = [
  //   {
  //     header: "Movie",
  //     accessor: "title",
  //     render: (movie) => (
  //       <div className="flex items-center">
  //         <div className="h-10 w-10 flex-shrink-0">
  //           <img
  //             src={movie.image || "/placeholder.svg"}
  //             alt={movie.title}
  //             width={40}
  //             height={60}
  //             className="rounded object-cover"
  //           />
  //         </div>
  //         <div className="ml-4">
  //           <div className="text-sm font-medium text-gray-900 dark:text-white">
  //             {movie.title}
  //           </div>
  //         </div>
  //       </div>
  //     ),
  //   },
  //   {
  //     header: "Genre",
  //     accessor: "genre",
  //   },
  //   {
  //     header: "Duration",
  //     accessor: "duration",
  //   },
  //   {
  //     header: "Status",
  //     accessor: "releaseDate",
  //     render: (movie) => (
  //       <span
  //         className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
  //           movie.releaseDate.includes("Now Showing")
  //             ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
  //             : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
  //         }`}
  //       >
  //         {movie.releaseDate.includes("Now Showing")
  //           ? "Now Showing"
  //           : "Coming Soon"}
  //       </span>
  //     ),
  //   },

  //   {
  //     header: "Actions",
  //     align: "right",
  //     render: (movie) => (
  //       <div className="flex justify-end space-x-2">
  //         <Link
  //           href={`/movies/${movie.id}`}
  //           className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
  //         >
  //           <Eye className="h-5 w-5" />
  //         </Link>
  //         <Link
  //           href={`/admin/movies/${movie.id}/edit`}
  //           className="text-blue-600 dark:text-blue-500 hover:text-blue-900 dark:hover:text-blue-400"
  //         >
  //           <Edit className="h-5 w-5" />
  //         </Link>
  //         <button
  //           onClick={() => handleDeleteClick(movie)}
  //           className="text-red-600 dark:text-red-500 hover:text-red-900 dark:hover:text-red-400"
  //         >
  //           <Trash2 className="h-5 w-5" />
  //         </button>
  //       </div>
  //     ),
  //   },
  // ];

  return (
    <div className="space-y-6">
      <ModuleHeader
        title="Movies Management"
        description="View, add, edit, or delete movies in your catalog"
      >
        <Link
          href="/admin/movies/create"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Movie
        </Link>
      </ModuleHeader>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg mb-6">
        <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 dark:focus:placeholder-gray-500 focus:ring-1 focus:ring-red-500 dark:focus:ring-red-500 focus:border-red-500 dark:focus:border-red-500 sm:text-sm"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center">
            <Filter className="h-5 w-5 text-gray-400 mr-2" />
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white sm:text-sm rounded-md"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Movies</option>
              <option value="now-showing">Now Showing</option>
              <option value="coming-soon">Coming Soon</option>
            </select>
          </div>
        </div>
      </div>
      {/* 
      <DataTable
        columns={columns}
        data={filteredMovies}
        emptyMessage="No movies found"
      /> */}
      <BookingTable
        columns={columns}
        tableData={filteredMovies}
        emptyMessage="No movies found"
      />
      {/* 
      <DeleteMovieModal
        isOpen={isDeleteModalOpen}
        movie={movieToDelete}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      /> */}
    </div>
  );
}
