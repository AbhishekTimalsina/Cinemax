"use client";

import { useState } from "react";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import ModuleHeader from "@/components/admin/module-header";
import { nowShowingMovies } from "@/lib/movie-data";

export default function ShowtimeSchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedTheater, setSelectedTheater] = useState("all");

  // Define theaters
  const theaters = [
    { id: 1, name: "Theater 1" },
    { id: 2, name: "Theater 2" },
    { id: 3, name: "Theater 3 (IMAX)" },
  ];

  // Generate mock schedule data
  const generateScheduleData = () => {
    const schedule = [];
    const movies = nowShowingMovies;

    // Generate time slots from 10:00 to 23:00, every 2 hours
    const timeSlots = [];
    for (let hour = 10; hour <= 22; hour += 2) {
      timeSlots.push(`${hour.toString().padStart(2, "0")}:00`);
    }

    // For each theater, generate showtime slots
    theaters.forEach((theater) => {
      if (
        selectedTheater !== "all" &&
        selectedTheater !== theater.id.toString()
      ) {
        return;
      }

      const theaterSchedule = {
        theater,
        slots: [],
      };

      timeSlots.forEach((timeSlot) => {
        // Randomly assign a movie or leave empty
        const hasMovie = Math.random() > 0.3;
        if (hasMovie) {
          const randomMovie = movies[Math.floor(Math.random() * movies.length)];
          theaterSchedule.slots.push({
            time: timeSlot,
            movie: randomMovie,
            isFull: Math.random() > 0.7,
          });
        } else {
          theaterSchedule.slots.push({
            time: timeSlot,
            movie: null,
          });
        }
      });

      schedule.push(theaterSchedule);
    });

    return schedule;
  };

  const scheduleData = generateScheduleData();

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Navigate to previous day
  const goToPreviousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  // Navigate to next day
  const goToNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  return (
    <div className="space-y-6">
      <ModuleHeader
        title="Showtime Schedule"
        description="View and manage the movie schedule by date and theater"
      >
        <div className="flex items-center space-x-2">
          <button
            onClick={goToPreviousDay}
            className="inline-flex items-center p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goToNextDay}
            className="inline-flex items-center p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </ModuleHeader>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center">
            <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              {formatDate(currentDate)}
            </h2>
          </div>

          <div className="flex items-center">
            <label
              htmlFor="theater-filter"
              className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Theater:
            </label>
            <select
              id="theater-filter"
              value={selectedTheater}
              onChange={(e) => setSelectedTheater(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white sm:text-sm rounded-md"
            >
              <option value="all">All Theaters</option>
              {theaters.map((theater) => (
                <option key={theater.id} value={theater.id}>
                  {theater.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Theater
                </th>
                {scheduleData[0]?.slots.map((slot, index) => (
                  <th
                    key={index}
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    {slot.time}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {scheduleData.map((theaterSchedule, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {theaterSchedule.theater.name}
                  </td>
                  {theaterSchedule.slots.map((slot, slotIndex) => (
                    <td key={slotIndex} className="px-2 py-4 text-center">
                      {slot.movie ? (
                        <div
                          className={`p-2 rounded ${
                            slot.isFull
                              ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                              : "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                          }`}
                        >
                          <div className="font-medium text-sm">
                            {slot.movie.title}
                          </div>
                          <div className="text-xs">
                            {slot.isFull ? "Sold Out" : "Available"}
                          </div>
                        </div>
                      ) : (
                        <div className="p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm">
                          Available
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
