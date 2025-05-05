"use client";

import { useEffect, useState } from "react";
import { Search, Filter, Calendar, Download } from "lucide-react";
import { getBookings } from "@/lib/booking-data";
import ModuleHeader from "@/components/admin/module-header";
import DataTable from "@/components/admin/data-table";
import { getAllBookings } from "@/lib/movie-data";
import BookingTable from "@/components/admin/booking-table";

export default function BookingsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [booking, setBooking] = useState([]);

  // const allBookings = getBookings();

  // Filter bookings based on search term, status, and date range

  useEffect(() => {
    getAllBookings().then((res) => {
      let data = res.map((data) => {
        return {
          ...data,
          movieName: data.movieId.title,
          date: data.seatId.time,
          time: data.seatId.date,
        };
      });

      console.log(data);
      setBooking(data);
    });

    // getBookings()
  }, []);

  // console.log(booking, "------------");

  // console.log(allBookings);

  const filteredBookings = booking.filter((booking) => {
    const matchesSearch =
      booking._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.cardName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.movieName.toLowerCase().includes(searchTerm.toLowerCase());

    // const matchesStatus =
    //   filterStatus === "all" ||
    //   booking.status.toLowerCase() === filterStatus.toLowerCase();

    // In a real app, you would filter by actual dates
    const matchesDateRange = true;

    return matchesSearch && matchesDateRange;
  });

  let columns = [
    {
      header: "Booking Id",
      render: (data) => <div>{data._id}</div>,
    },
    {
      header: "Customer",
      render: (data) => <div>{data.cardName}</div>,
    },
    {
      header: "Movie",
      render: (data) => <div>{data.movieName}</div>,
    },
    {
      header: "Date & Time",
      render: (data) => (
        <div>
          {data.date}, {new Date(data.time).toDateString()}
        </div>
      ),
    },
    {
      header: "Seats",
      render: (data) => <div>{data.bookedSeats.join(",")}</div>,
    },
    {
      header: "Amount",
      render: (data) => <div>${data.bookedSeats.length * 10}</div>,
    },
  ];

  console.log(filteredBookings);

  return (
    <div className="space-y-6">
      <ModuleHeader
        title="Bookings Management"
        description="View and manage customer bookings"
      >
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          <Download className="h-5 w-5 mr-2" />
          Export
        </button>
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
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-400 mr-2" />
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white sm:text-sm rounded-md"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-400 mr-2" />
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white sm:text-sm rounded-md"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <BookingTable
        tableData={filteredBookings}
        columns={columns}
        emptyMessage="No Booking found"
      />
    </div>
  );
}
