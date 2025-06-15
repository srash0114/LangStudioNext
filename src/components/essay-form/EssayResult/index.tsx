import { useRef } from 'react';
import type { EssayResult as EssayResultType } from '../types';

interface EssayResultProps {
  result: EssayResultType | null;
  toggleSidebar: () => void;
  handleFlip: () => void;
}

export default function EssayResult({ result, toggleSidebar, handleFlip }: EssayResultProps) {
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };
    return date.toLocaleString('en-US', options);
  };

  if (!result) {
    return (
      <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card p-6 text-center text-gray-600 dark:text-gray-400">
        <h2 className="text-2xl font-bold text-dark dark:text-white mb-4">No Essay Result</h2>
        <p>Submit an essay to see your detailed results here.</p>
        <button
          onClick={handleFlip}
          className="mt-6 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 font-medium text-white hover:opacity-90 transition-opacity"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card p-4 sm:p-6 xl:p-10">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stroke pb-4 mb-6 dark:border-dark-3">
        {/* <button
          onClick={toggleSidebar}
          className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 p-3 text-white hover:opacity-90 transition-opacity flex items-center justify-center"
          aria-label="Open sidebar"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button> */}
        <h2 className="text-2xl text-center font-bold text-dark dark:text-white">Essay Result</h2>
        {/* <button
          onClick={handleFlip}
          type="button"
          className="rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 p-3 text-white hover:opacity-90 transition-opacity flex items-center justify-center"
          aria-label="Go back to essay form"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
          </svg>
        </button> */}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Overall Score Card */}
        <div className="md:col-span-2 lg:col-span-1 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white text-center flex flex-col items-center justify-center shadow-lg transform transition-transform hover:scale-105 duration-300">
          <p className="text-xl opacity-90 mb-2">Your Band Score</p>
          <p className="text-7xl font-extrabold leading-none">{result.bandScore}</p>
          <p className="text-base opacity-70 mt-2">Target: {result.targetBandScore}</p>
        </div>

        {/* Essay Details */}
        <div className="md:col-span-2 lg:col-span-2 bg-gray-50 dark:bg-dark-2 rounded-xl p-6 shadow-md">
          <h3 className="text-2xl font-bold text-dark dark:text-white mb-4">Essay Details</h3>
          <div className="space-y-3 text-gray-700 dark:text-gray-300">
            <p><strong className="font-semibold">Title:</strong> {result.title}</p>
            <p><strong className="font-semibold">Submitted On:</strong> {formatDate(result.createdAt)}</p>
            <p><strong className="font-semibold">Content Snippet:</strong> {result.content.substring(0, 150)}...</p>
            {/* Optionally, add a "Read Full Content" button if content is long */}
          </div>
        </div>

        {/* Feedback Section */}
        <div className="lg:col-span-3 bg-gray-50 dark:bg-dark-2 rounded-xl p-6 shadow-md">
          <h3 className="text-2xl font-bold text-dark dark:text-white mb-4">Detailed Feedback</h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {result.feedback}
          </p>
        </div>
      </div>

      {/* Call to action or navigation */}
      <div className="mt-8 pt-6 border-t border-stroke dark:border-dark-3 flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={handleFlip}
          className="flex-1 min-w-[200px] rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 p-3 font-medium text-white hover:opacity-90 transition-opacity text-lg"
        >
          Check Another Essay
        </button>
        {/* You might want a button here to view full history or dive deeper */}
        <button
          // This button could navigate to a detailed history page or trigger a modal
          onClick={() => {toggleSidebar()}}
          className="flex-1 min-w-[200px] rounded-lg border border-indigo-600 dark:border-purple-400 p-3 font-medium text-indigo-700 dark:text-purple-300 hover:bg-indigo-50 dark:hover:bg-purple-900 transition-colors text-lg"
        >
          View Another Result
        </button>
      </div>
    </div>
  );
}