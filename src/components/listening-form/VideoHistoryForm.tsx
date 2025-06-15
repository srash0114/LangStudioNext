'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRef } from 'react';
import ErrorMs from '@/components/ErrorNetWork/ErrorNetWork';

interface VideoItem {
  id: string;
  title: string;
  linkVideo: string;
  topic: string;
  srtSubtitles: string;
  content: string;
  bandScore: string;
}

const VideoHistoryForm = () => {
  const hasFetched = useRef(false);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [popup, setPopup] = useState(false);
  const getYouTubeVideoId = (url: string): string | null => {
    try {
      const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
      const match = url.match(regex);
      return match ? match[1] : null;
    } catch {
      return null;
    }
  };

  const fetchVideos = async (pageNum: number) => {
    setLoading(true);
    
    try {
      const response = await axios.get(`https://api.scanvirus.me/Listening/topics?topic=IELTS&page=${pageNum}&pageSize=12`, {
        withCredentials: true,
      });

      const newVideos: VideoItem[] = response.data;
      setVideos((prev) => [...prev, ...newVideos]);

      
      if (newVideos.length < 12) setHasMore(false);
    } catch (error) {
      console.error('Error fetching video history:', error);
      // setError('Failed to load video history');
              // setErrorMessage("An error occurred. Please try again later.")
        setPopup(true)
        const timer = setTimeout(() => {
          setPopup(false)
        }, 3000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      fetchVideos(page);
      hasFetched.current = true;
    }
  }, [page]);

  const loadMore = () => {
    if (!loading && hasMore) {setPage((prev) => prev + 1); hasFetched.current = false;}
  };

  return (
    <div className="w-full p-4 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white mt-5 text-center">Video History</h2>
        {error && <div className="text-red-500 text-sm mb-6">{error}</div>}

        {videos.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
              {videos.map((video) => {
                const videoId = getYouTubeVideoId(video.linkVideo);
                const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '/placeholder.jpg';

                return (
                  <Link
                    key={video.id}
                    href={`/listening?vid=${btoa(video.linkVideo)}`}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden block cursor-pointer ring-2 ring-primary/10 border-dashed border border-purple-600 dark:ring-purple/10 hover:mt-1"
                    aria-label={`Watch ${video.title}`}
                  >
                    <div className="relative h-32">
                      <img
                        src={thumbnailUrl}
                        alt={`${video.title} thumbnail`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.jpg';
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        {video.title.length > 20 ? `${video.title.substring(0, 20)}...` : video.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Topic: {video.topic}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Band Score: {video.bandScore}</p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={loadMore}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            {/* <p className="text-gray-500 dark:text-gray-400 text-lg">No video history available.</p> */}
            {popup && (
              <ErrorMs color='warning' message='Something went wrong. Please try again later' timeout={3000}></ErrorMs>
            )}
            
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoHistoryForm;
