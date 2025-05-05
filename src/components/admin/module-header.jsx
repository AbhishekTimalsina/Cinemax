export default function ModuleHeader({ title, description, children }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg mb-6">
      <div className="px-6 py-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {title}
            </h2>
            {description && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {description}
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-2">{children}</div>
        </div>
      </div>
    </div>
  );
}
