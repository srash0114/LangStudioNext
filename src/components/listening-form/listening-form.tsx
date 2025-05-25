'use client';

import { useRef, useState } from "react";
import Sidebar from "@/components/listening-form/Sidebar/Sidebar";
import VideoPlayer from "@/components/listening-form/VideoPlayer/VideoPlayer";
import SubtitleInput from "@/components/listening-form/SubtitleInput/SubtitleInput";

type Subtitle = {
  id: number;
  text: string;
  start: string;
  end: string;
};

export default function Home() {
  const videoRef = useRef<any>(null);
  const [revealedSubtitles, setRevealedSubtitles] = useState<number[]>([]);
  const [selectedSubtitleId, setSelectedSubtitleId] = useState<number | null>(null);
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);

  const handleSubtitleClick = (start: string, end: string, id: number) => {
    setSelectedSubtitleId(id);
    videoRef.current?.playSegment(start, end);
  };

  const handleCorrectSubtitle = (subtitleId: number) => {
    if (!revealedSubtitles.includes(subtitleId)) {
      setRevealedSubtitles([...revealedSubtitles, subtitleId]);
    }
    const nextId = subtitleId + 1;
    const nextSubtitle = subtitles.find((sub) => sub.id === nextId);
    setSelectedSubtitleId(nextSubtitle ? nextId : null);
    if (nextSubtitle) {
      videoRef.current?.playSegment(nextSubtitle.start, nextSubtitle.end);
    }
  };

  const handleSelectNextSubtitle = (nextId: number | null) => {
    setSelectedSubtitleId(nextId);
    if (nextId) {
      const nextSubtitle = subtitles.find((sub) => sub.id === nextId);
      if (nextSubtitle) {
        videoRef.current?.playSegment(nextSubtitle.start, nextSubtitle.end);
      }
    }
  };

  const handleSubtitlesLoaded = (newSubtitles: Subtitle[]) => {
    console.log('Subtitles loaded:', newSubtitles);
    setSubtitles(newSubtitles);
    if (newSubtitles.length > 0) {
      const firstId = newSubtitles[0].id;
      setSelectedSubtitleId(firstId);
      videoRef.current?.playSegment(newSubtitles[0].start, newSubtitles[0].end);
    } else {
      setSelectedSubtitleId(null);
    }
  };

  return (
    <div className="flex flex-col md:flex-row overflow-auto text-white rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="hidden md:block">
        <Sidebar
          onSubtitleClick={handleSubtitleClick}
          subtitles={subtitles}
          revealedSubtitles={revealedSubtitles}
          selectedSubtitleId={selectedSubtitleId}
        />
      </div>

      <div className="flex flex-col flex-1 p-4 space-y-4 order-1 md:order-none overflow-auto">
        <VideoPlayer
          ref={videoRef}
          onSubtitlesLoaded={handleSubtitlesLoaded}
          subtitles={subtitles}
          selectedSubtitleId={selectedSubtitleId}
          onSelectNextSubtitle={handleSelectNextSubtitle} // Pass the new handler
        />
      </div>

      <div className="order-2 md:order-none">
        <SubtitleInput
          subtitles={subtitles}
          selectedSubtitleId={selectedSubtitleId}
          setSelectedSubtitleId={setSelectedSubtitleId}
          onCorrectSubtitle={handleCorrectSubtitle}
          videoRef={videoRef}
        />
      </div>
    </div>
  );
}