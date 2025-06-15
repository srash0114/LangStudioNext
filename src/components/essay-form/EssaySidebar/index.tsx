// EssaySidebar.tsx
import { useRef } from 'react';
import { EssayResult, EssayHistory } from '../types';

interface EssaySidebarProps {
  sidebarRef: React.RefObject<HTMLDivElement | null>;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  essayHistory: EssayHistory;
  historyLoading: boolean;
  historyError: string | null;
  setResult: React.Dispatch<React.SetStateAction<EssayResult | null>>;
  setIsFlipped: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fetchEssayHistory: (page: number, append?: boolean) => void;
}

export default function EssaySidebar({
  sidebarRef,
  isSidebarOpen,
  toggleSidebar,
  essayHistory,
  historyLoading,
  historyError,
  setResult,
  setIsFlipped,
  setIsSidebarOpen,
  fetchEssayHistory,
}: EssaySidebarProps) {
  const handleEssayClick = (essay: EssayResult) => {
    setResult(essay);
    setIsFlipped(true); // Flip to the result side
    setIsSidebarOpen(false); // Close the sidebar
  };

  const handleLoadMore = () => {
    const nextPage = essayHistory.page + 1;
    fetchEssayHistory(nextPage, true); // Fetch next page and append
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short', // e.g., Jan, Feb
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, // AM/PM
    };
    return date.toLocaleString('en-US', options);
  };

  return (
    <>
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden" // Only show overlay on smaller screens
          onClick={toggleSidebar}
          aria-hidden="true"
        ></div>
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-dark dark:shadow-card text-dark dark:text-gray-300 transform ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full' // Slide in from right
        } transition-transform duration-300 ease-in-out z-40 overflow-y-auto shadow-xl border-l border-stroke dark:border-dark-3`}
      >
        <div className="sticky top-0 bg-white dark:bg-gray-dark px-6 py-5 flex items-center justify-between border-b border-stroke dark:border-dark-3">
          <h2 className="text-xl font-bold text-dark dark:text-white">Essay History</h2>
          <button
            onClick={toggleSidebar}
            className="rounded-full p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none"
            aria-label="Close sidebar"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {historyLoading && essayHistory.essays.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10">
              <svg className="animate-spin h-8 w-8 text-indigo-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-gray-600 dark:text-gray-400">Loading history...</p>
            </div>
          ) : historyError ? (
            <div className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-md">
              <p>{historyError}</p>
            </div>
          ) : essayHistory.essays.length > 0 ? (
            <>
              <ul className="space-y-4">
                {essayHistory.essays.map((essay) => (
                  <li
                    key={essay.id}
                    className="group bg-white dark:bg-gray-dark border border-stroke dark:border-dark-3 rounded-lg p-4 cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
                    onClick={() => handleEssayClick(essay)}
                  >
                    <h3 className="text-lg font-semibold text-dark dark:text-white truncate mb-1">
                      {essay.title}
                    </h3>
                    <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <p>
                        <strong className="font-medium">Score:</strong>{' '}
                        <span className="font-bold text-indigo-600 dark:text-purple-400">
                          {essay.bandScore}
                        </span>{' '}
                        (Target: {essay.targetBandScore})
                      </p>
                      
                    </div>
                    
                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                      {essay.feedback || 'No specific feedback available.'}
                    </p>
                    <div className='relative left-28 mt-2 text-gray-400' style={{ textDecoration: 'underline' }}>
                    <p className="text-xs">{formatDate(essay.createdAt)}</p>
                    </div>
                  </li>
                ))}
              </ul>
              {essayHistory.essays.length >= essayHistory.page * essayHistory.pageSize && (
                <button
                  onClick={handleLoadMore}
                  disabled={historyLoading}
                  className={`mt-6 w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 flex items-center justify-center ${
                    historyLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90'
                  }`}
                >
                  {historyLoading ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    'Load More Essays'
                  )}
                </button>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center text-gray-600 dark:text-gray-400">
              <svg className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <p className="text-lg font-medium mb-2">No History Found</p>
              <p className="text-sm">Submit your first essay to see your history here.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}