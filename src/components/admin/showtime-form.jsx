import { useEffect, useState } from "react";
import { Save, Clock, CalendarIcon, MapPin } from "lucide-react";
export function ShowTimeForm({ isSubmitting, movies, showtime, onSubmit }) {
  const [formData, setFormData] = useState({
    movieId: "",
    movieName: "",
    date: "",
    time: "",
    price: "12.99",
    specialEvent: false,
    notes: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log(showtime);
    // setFormData({
    //     movieId: formData.movieId
    // });
  }, [showtime]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const generateTimeOptions = () => {
    const options = ["10:15", "12:45", "03:00", "05:45", "07:30"];

    return options;
  };

  // Generate date options (today + next 14 days)
  const generateDateOptions = () => {
    const options = [];
    const today = new Date();

    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const dateStr = date.toISOString().split("T")[0];
      const displayStr =
        i === 0
          ? "Today"
          : i === 1
          ? "Tomorrow"
          : date.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            });

      options.push({ value: dateStr, label: displayStr });
    }

    return options;
  };

  const timeOptions = generateTimeOptions();
  const dateOptions = generateDateOptions();

  return (
    <div className="space-y-6">
      <form id="showtime-form" onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Showtime Details
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Select a movie and schedule when it will be shown.
            </p>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="movieId"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Movie
                </label>
                <select
                  id="movieId"
                  name="movieId"
                  value={formData.movieId}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full border ${
                    errors.movieId
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white sm:text-sm`}
                >
                  <option value="">Select a movie</option>
                  <optgroup label="Now Showing">
                    {movies.nowShowing?.map((movie) => (
                      <option key={movie._id} value={movie._id}>
                        {movie.title}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Coming Soon">
                    {movies.commingSoon?.map((movie) => (
                      <option key={movie._id} value={movie._id}>
                        {movie.title}
                      </option>
                    ))}
                  </optgroup>
                </select>
                {errors.movieId && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                    {errors.movieId}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    Date
                  </div>
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().slice(0, 10)}
                  max={new Date(Date.now() + 60 * 60 * 24 * 1000 * 5)
                    .toISOString()
                    .slice(0, 10)}
                  className={`mt-1 block w-full border ${
                    errors.releaseDate
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white sm:text-sm`}
                />
                {/* <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    Date
                  </div>
                </label>
                <select
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full border ${
                    errors.date
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white sm:text-sm`}
                >
                  <option value="">Select a date</option>
                  {dateOptions.map((date) => (
                    <option key={date.value} value={date.value}>
                      {date.label}
                    </option>
                  ))}
                </select> */}
                {errors.date && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                    {errors.date}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="time"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Time
                  </div>
                </label>
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full border ${
                    errors.time
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white sm:text-sm`}
                >
                  <option value="">Select a time</option>
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                {errors.time && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                    {errors.time}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Ticket Price ($)
                </label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full border ${
                    errors.price
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white sm:text-sm`}
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                    {errors.price}
                  </p>
                )}
              </div>

              <div className="flex items-start pt-5">
                <div className="flex items-center h-5">
                  <input
                    id="specialEvent"
                    name="specialEvent"
                    type="checkbox"
                    checked={formData.specialEvent}
                    onChange={handleInputChange}
                    className="focus:ring-red-500 h-4 w-4 text-red-600 border-gray-300 dark:border-gray-600 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="specialEvent"
                    className="font-medium text-gray-700 dark:text-gray-300"
                  >
                    Special Event
                  </label>
                  <p className="text-gray-500 dark:text-gray-400">
                    Mark this as a special screening or premiere.
                  </p>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Any special instructions or information about this showtime"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 text-right">
            <button
              type="button"
              onClick={() => router.push("/admin/showtimes")}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 mr-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Saving..." : "Create Showtime"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
