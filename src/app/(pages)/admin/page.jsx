import Link from "next/link";
import { Film, Ticket, Calendar, ArrowRight } from "lucide-react";
import AdminCard from "@/components/admin/admin-card";
import RecentBookingsTable from "@/components/admin/recent-bookings-table";
import { getBookings } from "@/lib/booking-data";

export default function AdminDashboard() {
  const recentBookings = getBookings().slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Admin Control Panel
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AdminCard
          title="Movies Management"
          description="Add, edit, or remove movies from the catalog"
          icon={Film}
          href="/admin/movies"
          actions={[
            { label: "View All Movies", href: "/admin/movies" },
            { label: "Add New Movie", href: "/admin/movies/create" },
          ]}
        />

        <AdminCard
          title="Bookings Management"
          description="View and manage customer bookings"
          icon={Ticket}
          href="/admin/bookings"
          actions={[
            { label: "View All Bookings", href: "/admin/bookings" },
            { label: "Today's Bookings", href: "/admin/bookings?date=today" },
          ]}
        />

        <AdminCard
          title="Showtimes Management"
          description="Schedule and manage movie showtimes"
          icon={Calendar}
          href="/admin/showtimes"
          actions={[
            { label: "View All Showtimes", href: "/admin/showtimes" },
            { label: "Add New Showtime", href: "/admin/showtimes/create" },
          ]}
        />
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Recent Bookings
          </h2>
          <Link
            href="/admin/bookings"
            className="text-sm font-medium text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400 flex items-center"
          >
            View all
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <RecentBookingsTable bookings={recentBookings} />
      </div>
    </div>
  );
}
