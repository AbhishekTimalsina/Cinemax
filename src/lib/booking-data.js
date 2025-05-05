// Mock data for bookings
const bookings = [
  {
    id: "BK123456",
    customer: "John Smith",
    movie: "The Last Guardian",
    date: "Today",
    time: "7:30 PM",
    seats: ["F7", "F8"],
    amount: "42.48",
    status: "Completed",
  },
  {
    id: "BK123457",
    customer: "Sarah Johnson",
    movie: "Interstellar: Beyond Time",
    date: "Today",
    time: "4:00 PM",
    seats: ["C4", "C5", "C6"],
    amount: "63.72",
    status: "Completed",
  },
  {
    id: "BK123458",
    customer: "Michael Brown",
    movie: "Midnight in Paris",
    date: "Today",
    time: "1:15 PM",
    seats: ["D8", "D9"],
    amount: "42.48",
    status: "Pending",
  },
  {
    id: "BK123459",
    customer: "Emily Davis",
    movie: "The Dark Knight Returns",
    date: "Tomorrow",
    time: "8:15 PM",
    seats: ["G3", "G4", "G5", "G6"],
    amount: "84.96",
    status: "Pending",
  },
  {
    id: "BK123460",
    customer: "David Wilson",
    movie: "The Last Guardian",
    date: "Yesterday",
    time: "7:30 PM",
    seats: ["B2", "B3"],
    amount: "42.48",
    status: "Completed",
  },
  {
    id: "BK123461",
    customer: "Jennifer Taylor",
    movie: "Interstellar: Beyond Time",
    date: "Yesterday",
    time: "10:30 AM",
    seats: ["E7"],
    amount: "21.24",
    status: "Cancelled",
  },
  {
    id: "BK123462",
    customer: "Robert Martinez",
    movie: "The Dark Knight Returns",
    date: "Today",
    time: "10:45 PM",
    seats: ["H10", "H11"],
    amount: "42.48",
    status: "Completed",
  },
  {
    id: "BK123463",
    customer: "Lisa Anderson",
    movie: "Midnight in Paris",
    date: "Tomorrow",
    time: "5:45 PM",
    seats: ["A5", "A6", "A7"],
    amount: "63.72",
    status: "Pending",
  },
  {
    id: "BK123464",
    customer: "James Thomas",
    movie: "The Last Guardian",
    date: "Tomorrow",
    time: "2:30 PM",
    seats: ["F1", "F2"],
    amount: "42.48",
    status: "Pending",
  },
  {
    id: "BK123465",
    customer: "Patricia White",
    movie: "Interstellar: Beyond Time",
    date: "Yesterday",
    time: "4:00 PM",
    seats: ["D1"],
    amount: "21.24",
    status: "Cancelled",
  },
];

// Helper function to get all bookings
export function getBookings() {
  return bookings;
}

// Helper function to get booking by ID
export function getBookingById(id) {
  return bookings.find((booking) => booking.id === id);
}

// Helper function to get bookings by movie ID
export function getBookingsByMovieId(movieId) {
  // In a real app, you would filter by movie ID
  // For now, we'll just return all bookings
  return bookings;
}

// Helper function to get bookings by date
export function getBookingsByDate(date) {
  return bookings.filter((booking) => booking.date === date);
}

// Helper function to get bookings by status
export function getBookingsByStatus(status) {
  return bookings.filter((booking) => booking.status === status);
}
