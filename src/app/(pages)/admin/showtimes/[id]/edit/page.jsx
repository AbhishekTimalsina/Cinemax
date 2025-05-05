"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Save, Clock, CalendarIcon, MapPin } from "lucide-react";
import ModuleHeader from "@/components/admin/module-header";
import {
  nowShowingMovies,
  comingSoonMovies,
  getMovies,
  postNewShowTime,
  getShowtimeById,
} from "@/lib/movie-data";
import { ShowTimeForm } from "@/components/admin/showtime-form";

export default function CreateShowtimePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [movies, setMovies] = useState([]);
  const params = useParams();

  // Initial form state
  const [formData, setFormData] = useState({
    movieId: "",
    movieName: "",
    date: "",
    time: "",
    price: "12.99",
    specialEvent: false,
    notes: "",
  });

  useEffect(() => {
    getMovies().then((res) => setMovies(res));

    getShowtimeById(params.id).then((res) => console.log(res));
  }, []);

  // console.log(movies);
  // console.log(formData);

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.movieId) {
      newErrors.movieId = "Please select a movie";
    }

    if (!formData.date) {
      newErrors.date = "Please select a date";
    }

    if (!formData.time) {
      newErrors.time = "Please select a time";
    }

    if (
      !formData.price ||
      isNaN(Number.parseFloat(formData.price)) ||
      Number.parseFloat(formData.price) <= 0
    ) {
      newErrors.price = "Please enter a valid price";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!validateForm()) {
    //   return;
    // }

    setIsSubmitting(true);

    try {
      // In a real app, this would be an API call to create the showtime
      // console.log("Creating new showtime:", formData);
      // Simulate API delay
      postNewShowTime(formData);

      // Redirect to showtimes list
      router.push("/admin/showtimes");
    } catch (error) {
      console.error("Error creating showtime:", error);
      setIsSubmitting(false);
    }
  };

  // Generate time options (every 15 minutes)
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 10; hour <= 23; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const hourStr = hour.toString().padStart(2, "0");
        const minuteStr = minute.toString().padStart(2, "0");
        const time = `${hourStr}:${minuteStr}`;
        options.push(time);
      }
    }
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Create New Showtime
        </h1>
      </div>

      <ShowTimeForm
        isSubmitting={isSubmitting}
        movies={movies}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
