"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import BookingProgress from "@/components/booking/booking-progress";
import PaymentForm from "@/components/booking/payment-form";
import PaymentConfirmation from "@/components/booking/payment-confirmation";
import OrderSummary from "@/components/booking/order-summary";
import { getMovieById, getSeatById, postBookTicket } from "@/lib/movie-data";
import { use } from "react";

export default function PaymentPage({ params }) {
  params = use(params);

  const router = useRouter();
  const searchParams = useSearchParams();
  const seatId = searchParams.get("seatId");
  const seatsParam = searchParams.get("seats");
  const [showSeats, setShowSeats] = useState(null);

  const selectedSeats = seatsParam ? seatsParam.split(",") : [];
  const movieId = params.id;
  // const movie = getMovieById(movieId);

  const [paymentStep, setPaymentStep] = useState("details");
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    email: "",
    phone: "",
  });
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    getSeatById(seatId || "0").then((res) => setShowSeats(res));
    getMovieById(movieId).then((res) => setMovie(res));
  }, []);

  if (!movie || !showSeats || selectedSeats.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Invalid booking information
      </div>
    );
  }

  const handleFormSubmit = (data) => {
    setFormData(data);
    setPaymentStep("confirmation");
  };
  const handleConfirmPayment = () => {
    // here we do the update thingy

    postBookTicket(seatId, movieId, selectedSeats, formData);

    router.push(`/movies/${movieId}/booking/confirmation`);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BookingProgress currentStep={3} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {paymentStep === "details" ? (
              <PaymentForm onSubmit={handleFormSubmit} />
            ) : (
              <PaymentConfirmation
                formData={formData}
                onBack={() => setPaymentStep("details")}
                onConfirm={handleConfirmPayment}
              />
            )}
          </div>

          <div className="md:col-span-1">
            <OrderSummary
              movie={movie}
              showSeats={showSeats}
              selectedSeats={selectedSeats}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
