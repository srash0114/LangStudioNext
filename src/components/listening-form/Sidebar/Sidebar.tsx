'use client';

import React from "react";

type Subtitle = {
  id: number;
  text: string;
  start: string;
  end: string;
};

interface SidebarProps {
  onSubtitleClick: (start: string, end: string, id: number) => void;
  subtitles: Subtitle[];
  revealedSubtitles: number[];
  selectedSubtitleId: number | null;
}

const Sidebar: React.FC<SidebarProps> = ({
  onSubtitleClick,
  subtitles,
  revealedSubtitles,
  selectedSubtitleId,
}) => {
  const maskText = (text: string) => {
    return text
      .split(" ")
      .map((word) => "*".repeat(word.length))
      .join(" ");
  };

  return (
    <aside className="w-64 h-screen max-h-[74vh] mt-4 ml-4 mb-4 p-4 space-y-2 rounded-[10px] border border-gray-300 shadow-md bg-white dark:bg-gray-900 dark:border-gray-600 dark:shadow-lg flex flex-col">
      <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
        Select subtitle...
      </h2>

      <div className="overflow-y-auto flex-1 space-y-2 pr-1">
        {subtitles.map((sub) => (
          <div
            key={sub.id}
            className={`p-2 rounded cursor-pointer border border-purple-600 dark:border-indigo-800 border-dashed transition ${
              selectedSubtitleId === sub.id
                ? "bg-blue-100 dark:bg-blue-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            onClick={() => onSubtitleClick(sub.start, sub.end, sub.id)}
          >
            <p className="text-sm text-gray-800 dark:text-gray-200">
              {revealedSubtitles.includes(sub.id) ? sub.text : maskText(sub.text)}
            </p>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              #{sub.id} – [{sub.start} → {sub.end}]
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;