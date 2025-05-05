import Link from "next/link";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  trendDirection,
  href,
}) {
  const CardContent = () => (
    <>
      <div className="flex items-center">
        <div className="p-3 rounded-full bg-red-100 dark:bg-red-900">
          <Icon className="h-6 w-6 text-red-600 dark:text-red-300" />
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
              {title}
            </dt>
            <dd>
              <div className="text-lg font-medium text-gray-900 dark:text-white">
                {value}
              </div>
            </dd>
          </dl>
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center text-sm">
          {trendDirection === "up" ? (
            <TrendingUp className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500 mr-1.5 flex-shrink-0" />
          )}
          <span
            className={`font-medium ${
              trendDirection === "up"
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {trend}
          </span>
          <span className="ml-1.5 text-gray-500 dark:text-gray-400">
            from last month
          </span>
        </div>
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg p-5 hover:shadow-md transition-shadow duration-300"
      >
        <CardContent />
      </Link>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg p-5">
      <CardContent />
    </div>
  );
}
