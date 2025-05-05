"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, Download, Calendar, MapPin } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function ConfirmationPage() {
  const [bookingNumber, setBookingNumber] = useState("");

  useEffect(() => {
    // Generate a random booking number
    const randomBooking =
      "BK" +
      Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, "0");
    setBookingNumber(randomBooking);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-900 p-8 rounded-lg text-center">
          <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
          <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-gray-400 mb-6">
            Your tickets have been booked successfully
          </p>

          <div className="bg-gray-800 p-6 rounded-lg mb-8">
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-2">Booking Reference</h2>
              <p className="text-2xl font-mono bg-gray-700 py-2 rounded">
                {bookingNumber}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div>
                <h3 className="text-gray-400 text-sm">Movie</h3>
                <p className="font-bold">The Last Guardian</p>
              </div>
              <div>
                <h3 className="text-gray-400 text-sm">Date & Time</h3>
                <p className="font-bold flex items-center">
                  <Calendar size={16} className="mr-1" /> Today, 7:30 PM
                </p>
              </div>
              <div>
                <h3 className="text-gray-400 text-sm">Theater</h3>
                <p className="font-bold flex items-center">
                  <MapPin size={16} className="mr-1" /> Theater 3 (IMAX)
                </p>
              </div>
              <div>
                <h3 className="text-gray-400 text-sm">Seats</h3>
                <p className="font-bold">F7, F8</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded flex items-center justify-center transition duration-300">
              <Download size={18} className="mr-2" /> Download Tickets
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded flex items-center justify-center transition duration-300">
              Add to Calendar
            </button>
          </div>

          <div className="text-left border-t border-gray-800 pt-6">
            <h2 className="text-xl font-bold mb-4">Important Information</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li>Please arrive at least 15 minutes before the show starts.</li>
              <li>
                Present this confirmation or your booking ID at the ticket
                counter.
              </li>
              <li>
                Outside food and beverages are not allowed in the theater.
              </li>
              <li>
                Please keep your mobile phones on silent mode during the show.
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <Link
              href="/"
              className="text-red-500 hover:text-red-400 transition duration-300"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
