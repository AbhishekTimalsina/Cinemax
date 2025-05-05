"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, Calendar, Edit, Trash2 } from "lucide-react";
import {
  deleteShowTime,
  getAllShowTime,
  getShowtimesByDate,
} from "@/lib/movie-data";
import ModuleHeader from "@/components/admin/module-header";
import DataTable from "@/components/admin/data-table";
import BookingTable from "@/components/admin/booking-table";

export default function ShowtimesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("all");
  const [showTimeData, setShowTimeData] = useState([]);

  // Get all showtimes
  const todayShowtimes = getShowtimesByDate("Today");
  const tomorrowShowtimes = getShowtimesByDate("Tomorrow");
  const allShowtimes = [...todayShowtimes, ...tomorrowShowtimes];

  // console.log(allShowtimes);

  useEffect(() => {
    getAllShowTime().then((res) => {
      let filter = res.reduce((acc, data) => {
        let cur = [...acc];
        data.availableShows.map((d) => {
          cur.push({
            ...d,
            movieName: data.movieId.title,
            showTimeId: data._id,
          });
        });
        return cur;
      }, []);
      console.log(res);
      setShowTimeData(filter);
    });
  }, []);

  console.log(showTimeData);

  // Filter showtimes based on search term and date
  const filteredShowtimes = showTimeData.filter((showtime) => {
    const matchesSearch = showtime.time
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesDate = filterDate === "all" || showtime.date === filterDate;

    return matchesSearch && matchesDate;
  });

  async function handleDeleteShow(e, data) {
    await deleteShowTime(data.showTimeId, data.seatsId._id);
    setShowTimeData((prevData) => prevData.filter((d) => d._id != data._id));
  }

  let columns = [
    {
      header: "ShowTime Id",
      render: (data) => <div>{data._id}</div>,
    },
    {
      header: "Date",
      render: (data) => <div>{new Date(data.date).toDateString()}</div>,
    },
    {
      header: "Time",
      render: (data) => <div>{data.time}</div>,
    },
    {
      header: "Movie",
      render: (data) => <div>{data.movieName}</div>,
    },
    {
      header: "Booked Seats",
      render: (data) => (
        <div className="text-center">{data.seatsId.bookedSeats.length}/100</div>
      ),
    },
    {
      header: "Actions",
      render: (data) => (
        <div className="flex justify-start">
          {/* <Link
            href={`/admin/showtimes/${data.showTimeId}/edit`}
            className="text-blue-600 dark:text-blue-500 hover:text-blue-900 dark:hover:text-blue-400"
          >
            <Edit className="h-5 w-5" />
          </Link> */}
          <button
            className="text-red-600 dark:text-red-500 hover:text-red-900 dark:hover:text-red-400"
            onClick={(e) => handleDeleteShow(e, data)}
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <ModuleHeader
        title="Showtimes Management"
        description="Schedule and manage movie showtimes"
      >
        <Link
          href="/admin/showtimes/create"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Showtime
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
              placeholder="Search showtimes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-gray-400 mr-2" />
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white sm:text-sm rounded-md"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            >
              <option value="all">All Dates</option>
              <option value="Today">Today</option>
              <option value="Tomorrow">Tomorrow</option>
            </select>
          </div>
        </div>
      </div>
      {/* 
      <DataTable
        columns={columns}
        data={filteredShowtimes}
        emptyMessage="No showtimes found"
      /> */}

      <BookingTable
        columns={columns}
        tableData={filteredShowtimes}
        emptyMessage="No ShowTimes"
      />
    </div>
  );
}
