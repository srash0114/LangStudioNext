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
  fetchEssayHistory: (page: number, append?: boolean) => void; // Add fetchEssayHistory prop
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
    setIsFlipped(true);
    setIsSidebarOpen(false);
  };

  const handleLoadMore = () => {
    const nextPage = essayHistory.page + 1;
    fetchEssayHistory(nextPage, true); // Fetch next page and append
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 left-0 h-full w-72 bg-white dark:bg-gray-dark dark:shadow-card text-dark dark:text-gray-300 transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out z-40 overflow-y-auto`}
    >
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Essay History</h2>
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 focus:outline-none text-dark dark:text-white"
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
        {historyLoading && essayHistory.essays.length === 0 ? (
          <p>Loading history...</p>
        ) : historyError ? (
          <p className="text-red-500">{historyError}</p>
        ) : essayHistory.essays.length > 0 ? (
          <>
            <ul className="space-y-4">
              {essayHistory.essays.map((essay) => (
                <li
                  key={essay.id}
                  className="border-b border-gray-700 pb-2 cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-300 p-2 rounded"
                  onClick={() => handleEssayClick(essay)}
                  aria-hidden="true"
                >
                  <h3 className="text-lg font-semibold truncate">{essay.title}</h3>
                  <p className="text-sm"><strong>Band Score:</strong> {essay.bandScore}</p>
                  <p className="text-sm"><strong>Target:</strong> {essay.targetBandScore}</p>
                  <p className="text-sm"><strong>Feedback:</strong> {essay.feedback.slice(0, 100)}...</p>
                  <p className="text-xs text-gray-400"><strong>Created:</strong> {formatDate(essay.createdAt)}</p>
                </li>
              ))}
            </ul>
            {essayHistory.essays.length >= essayHistory.page * essayHistory.pageSize && (
              <button
                onClick={handleLoadMore}
                disabled={historyLoading}
                className={`mt-4 w-full py-2 px-4 rounded text-white ${
                  historyLoading
                    ? 'bg-gray-500 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                {historyLoading ? 'Loading...' : 'Load More'}
              </button>
            )}
          </>
        ) : (
          <p>No essay history available.</p>
        )}
      </div>
    </div>
  );
}