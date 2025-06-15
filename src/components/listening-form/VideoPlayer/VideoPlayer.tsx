'use client';

import { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { YoutubeTranscript } from 'youtube-transcript';

// Extracts the YouTube video ID from a URL
const extractVideoId = (url: string) => {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : '';
};

// Converts SRT time format (HH:MM:SS,MS) to seconds
const timeToSeconds = (time: string) => {
  const [hms, ms = '0'] = time.split(',');
  const [hh, mm, ss] = hms.split(':').map(Number);
  const milliseconds = parseInt(ms, 10) || 0;
  return hh * 3600 + mm * 60 + ss + milliseconds / 1000;
};

// Parses SRT subtitle data into an array of Subtitle objects
const parseSrtSubtitles = (srt: string): Subtitle[] => {
  const subtitles: Subtitle[] = [];
  if (!srt || typeof srt !== 'string') {
    console.error('Invalid SRT subtitles: Expected a non-empty string');
    return subtitles;
  }

  // Remove the ```srt ... ``` wrapper if present
  const cleanedSrt = srt.replace(/```srt\s*|\s*```$/g, '').trim();
  const entries = cleanedSrt.split('\n\n');

  entries.forEach((entry, index) => {
    const lines = entry.split('\n').filter(line => line.trim());
    if (lines.length < 3) {
      console.warn(`Skipping invalid SRT entry #${index + 1}: Insufficient lines`);
      return;
    }

    const idMatch = lines[0].match(/^\d+$/);
    if (!idMatch) {
      console.warn(`Skipping invalid SRT entry #${index + 1}: Invalid ID format`);
      return;
    }
    const id = parseInt(idMatch[0], 10);

    const timeLine = lines[1];
    if (!timeLine.includes(' --> ')) {
      console.warn(`Skipping invalid SRT entry #${index + 1}: Invalid time format`);
      return;
    }

    const [start, end] = timeLine.split(' --> ').map(t => t.trim());
    if (!start || !end) {
      console.warn(`Skipping invalid SRT entry #${index + 1}: Missing start or end time`);
      return;
    }

    const text = lines.slice(2).join(' ').trim().replace(/\s*```$/, '');
    if (!text) {
      console.warn(`Skipping invalid SRT entry #${index + 1}: Empty text`);
      return;
    }

    subtitles.push({ id, text, start, end });
  });

  return subtitles;
};

type Subtitle = {
  id: number;
  text: string;
  start: string;
  end: string;
  lang?: 'vi-VN' | 'en-US';
};

interface VideoPlayerProps {
  onSubtitlesLoaded: (subtitles: Subtitle[]) => void;
  subtitles: Subtitle[];
  selectedSubtitleId: number | null;
  onSelectNextSubtitle: (nextId: number | null) => void;
}

// Define the type for the ref methods
interface VideoPlayerRef {
  playSegment: (start: string, end: string) => void;
  playVideo: () => void;
  pauseVideo: () => void;
}

const VideoPlayer = forwardRef<VideoPlayerRef, VideoPlayerProps>(
  ({ onSubtitlesLoaded, subtitles, selectedSubtitleId, onSelectNextSubtitle }, ref) => {
    const [inputUrl, setInputUrl] = useState('');
    const [videoId, setVideoId] = useState('');
    const [error, setError] = useState<string | null>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const searchParams = useSearchParams();

    // Handles loading the video and fetching subtitles
    const handleLoadVideo = async (url: string) => {
      try {
        setError(null);
        const id = extractVideoId(url);
        if (!id) {
          setError('Invalid YouTube URL');
          return;
        }

        const options = {
          method: 'POST',
          url: 'https://api.scanvirus.me/Listening/submit',
          withCredentials: true,
          data: { linkVideo: url },
        };
        
        const { data } = await axios.request(options);
        console.log('API Response:', data);
        const parsedSubtitles = parseSrtSubtitles(data.srtSubtitles || data);
        if (parsedSubtitles.length === 0) {
          setError('No valid subtitles found');
        }
        onSubtitlesLoaded(parsedSubtitles);
        setVideoId(id);
        setInputUrl(url);
      } catch (error) {
        console.error('Error loading video:', error);
        setError('Failed to load video or subtitles');
      }
    };

    // Automatically load video from query parameter on mount
    useEffect(() => {
      const vid = searchParams.get('vid');
      if (vid) {
        try {
          const decodedUrl = atob(vid);
          if (extractVideoId(decodedUrl)) {
            handleLoadVideo(decodedUrl);
          } else {
            setError('Invalid YouTube URL in query parameter');
          }
        } catch {
          setError('Failed to decode URL from query parameter');
        }
      }
    }, [searchParams]);

    // Monitor video time and advance to next subtitle if current time exceeds end time
    useEffect(() => {
      YoutubeTranscript.fetchTranscript("https://www.youtube.com/watch?v=CaOy5agIvOA").then(console.log);
      if (!iframeRef.current || !selectedSubtitleId || !subtitles.length) return;

      const currentSubtitle = subtitles.find((sub) => sub.id === selectedSubtitleId);
      if (!currentSubtitle) return;

      const endTime = timeToSeconds(currentSubtitle.end);
      let intervalId: NodeJS.Timeout;

      const checkTime = () => {
        iframeRef.current?.contentWindow?.postMessage(
          JSON.stringify({ event: 'listening', func: 'getCurrentTime' }),
          '*'
        );
      };

      const handleMessage = (event: MessageEvent) => {
        if (event.source !== iframeRef.current?.contentWindow) return;

        try {
          const data = JSON.parse(event.data);
          if (data.event === 'infoDelivery' && data.info && typeof data.info.currentTime === 'number') {
            const currentTime = data.info.currentTime;
            if (currentTime >= endTime) {
              const nextId = selectedSubtitleId + 1;
              const nextSubtitle = subtitles.find((sub) => sub.id === nextId);
              if (nextSubtitle && ref && 'current' in ref && ref.current) {
                onSelectNextSubtitle(nextId);
                ref.current.playSegment(nextSubtitle.start, nextSubtitle.end);
              } else {
                onSelectNextSubtitle(null);
                if (ref && 'current' in ref && ref.current) {
                  ref.current.pauseVideo();
                }
              }
            }
          }
        } catch (e) {
          console.error('Error processing message from YouTube iframe:', e);
        }
      };

      window.addEventListener('message', handleMessage);
      intervalId = setInterval(checkTime, 500);

      return () => {
        window.removeEventListener('message', handleMessage);
        clearInterval(intervalId);
      };
    }, [selectedSubtitleId, subtitles, ref, onSelectNextSubtitle]);

    // Exposes methods to control the video player
    useImperativeHandle(ref, () => ({
      playSegment: (start: string, end: string) => {
        const startSec = timeToSeconds(start);
        const endSec = timeToSeconds(end);
        const duration = (endSec - startSec) * 1000;

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        iframeRef.current?.contentWindow?.postMessage(
          JSON.stringify({ event: 'command', func: 'seekTo', args: [startSec, true] }),
          '*'
        );

        iframeRef.current?.contentWindow?.postMessage(
          JSON.stringify({ event: 'command', func: 'playVideo', args: [] }),
          '*'
        );

        timeoutRef.current = setTimeout(() => {
          iframeRef.current?.contentWindow?.postMessage(
            JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }),
            '*'
          );
        }, duration);
      },
      playVideo: () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        iframeRef.current?.contentWindow?.postMessage(
          JSON.stringify({ event: 'command', func: 'playVideo', args: [] }),
          '*'
        );
      },
      pauseVideo: () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        iframeRef.current?.contentWindow?.postMessage(
          JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }),
          '*'
        );
      },
    }));

    const currentSubtitle = subtitles.find((sub) => sub.id === selectedSubtitleId);

    return (
      <div className="w-full flex flex-col space-y-2 mt-1">
        <div className="flex space-x-2 mb-2">
          <input
            type="text"
            placeholder="Enter YouTube URL..."
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="flex-1 p-2 w-full rounded border border-gray-300 bg-transparent outline-none transition 
            focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:cursor-default disabled:bg-gray-2 
            data-[active=true]:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary dark:disabled:bg-dark 
            dark:data-[active=true]:border-primary text-dark dark:text-white"
          />
          <button
            onClick={() => handleLoadVideo(inputUrl)}
            className="rounded bg-primary hover:bg-opacity-90 p-[13px] font-medium text-white ring-2 ring-primary/20 border-primary"
          >
            Load
          </button>
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        {videoId && (
          <div className="w-full aspect-video bg-black relative">
            <iframe
              ref={iframeRef}
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
              title="YouTube video"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        )}
        {currentSubtitle && (
          <div className="w-full left-0 right-0 mx-auto px-4 py-2 bg-black bg-opacity-70 text-white text-center text-lg font-semibold rounded">
            {currentSubtitle.text}
          </div>
        )}
      </div>
    );
  }
);

VideoPlayer.displayName = 'VideoPlayer';
export default VideoPlayer;