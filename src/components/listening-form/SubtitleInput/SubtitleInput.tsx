'use client';

import { useState, useEffect } from 'react';
import { 
  FaBackward, 
  FaRedo, 
  FaPlay, 
  FaPause, 
  FaForward, 
  FaStop, 
  FaMicrophone, 
  FaTrophy 
} from 'react-icons/fa';

type Subtitle = {
  id: number;
  text: string;
  start: string;
  end: string;
};

interface SubtitleInputProps {
  subtitles: Subtitle[];
  selectedSubtitleId: number | null;
  setSelectedSubtitleId: (id: number | null) => void;
  onCorrectSubtitle: (subtitleId: number) => void;
  videoRef: React.RefObject<any>;
}

const SubtitleInput = ({
  subtitles,
  selectedSubtitleId,
  setSelectedSubtitleId,
  onCorrectSubtitle,
  videoRef,
}: SubtitleInputProps) => {
  const [input, setInput] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selectedSubtitle = subtitles.find((sub) => sub.id === selectedSubtitleId);

  // Clear error after a timeout
  const setErrorWithTimeout = (message: string) => {
    setError(message);
    setTimeout(() => setError(null), 3000); // Clear error after 3 seconds
  };

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US'; // Corrected to 'vi-VN' for Vietnamese if needed

      recognitionInstance.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        console.log('Speech recognition result:', transcript);
        setInput(transcript);
        setError(null);
      };

      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setErrorWithTimeout(`Speech recognition error: ${event.error}`);
        setIsRecognizing(false);
      };

      recognitionInstance.onend = () => {
        setIsRecognizing(false);
      };

      setRecognition(recognitionInstance);
    } else {
      console.warn('SpeechRecognition API is not supported in this browser.');
      setErrorWithTimeout('Browser does not support speech recognition.');
    }
  }, []);

  const handleSpeechToggle = () => {
    if (!recognition) return;

    if (isRecognizing) {
      recognition.stop();
      setIsRecognizing(false);
    } else {
      try {
        recognition.start();
        setIsRecognizing(true);
        setError(null);
      } catch (err) {
        console.error('Error starting speech recognition:', err);
        setErrorWithTimeout('Cannot start speech recognition.');
      }
    }
  };

  const handleSubmit = () => {
    if (!selectedSubtitle) return;

    const normalizedInput = input.trim().toLowerCase();
    const normalizedSubtitle = selectedSubtitle.text.trim().toLowerCase();

    if (normalizedInput === normalizedSubtitle) {
      onCorrectSubtitle(selectedSubtitle.id);
      setInput('');
    } else {
      setErrorWithTimeout('Incorrect input. Please try again!');
    }
  };

  const handleBack = () => {
    if (selectedSubtitleId) {
      const prevId = selectedSubtitleId - 1;
      const prevSubtitle = subtitles.find((sub) => sub.id === prevId);
      if (prevSubtitle) {
        setSelectedSubtitleId(prevId);
        videoRef.current?.playSegment(prevSubtitle.start, prevSubtitle.end);
      }
    }
  };

  const handleReplay = () => {
    if (selectedSubtitle) {
      videoRef.current?.playSegment(selectedSubtitle.start, selectedSubtitle.end);
      setIsPlaying(true);
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current?.pauseVideo();
      setIsPlaying(false);
    } else {
      videoRef.current?.playVideo();
      setIsPlaying(true);
    }
  };


  const handleSkip = () => {
    if (selectedSubtitleId) {
      const nextId = selectedSubtitleId + 1;
      const nextSubtitle = subtitles.find((sub) => sub.id === nextId);
      if (nextSubtitle) {
        setSelectedSubtitleId(nextId);
        videoRef.current?.playSegment(nextSubtitle.start, nextSubtitle.end);
      } else {
        setSelectedSubtitleId(null);
      }
    }
  };

  const handleEasy = () => {
    if (selectedSubtitle) {
      setInput(selectedSubtitle.text);
    }
  };

  const inputWords = input.trim().split(/\s+/).filter(Boolean);
  const subtitleWords = selectedSubtitle ? selectedSubtitle.text.split(' ') : [];

  const handleHintClick = (word: string, idx: number) => {
    setInput((prev) => {
      const inputWordsArray = prev.trim().split(/\s+/).filter(Boolean);
      const newInputWords = [...inputWordsArray];
      newInputWords[idx] = word;
      const newInput = newInputWords
        .map((w, i) => w || (i < inputWordsArray.length ? '' : ''))
        .join(' ')
        .trim();
      return newInput ? `${newInput} ` : word;
    });
  };

  // Calculate matching percentage
  const calculateMatchingPercentage = () => {
    if (!selectedSubtitle || !input) return 0;
    const inputWordsArray = input.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const subtitleWordsArray = selectedSubtitle.text.toLowerCase().split(' ').filter(Boolean);
    let matchingWords = 0;

    for (let i = 0; i < Math.min(inputWordsArray.length, subtitleWordsArray.length); i++) {
      if (inputWordsArray[i] === subtitleWordsArray[i]) {
        matchingWords++;
      }
    }

    return Math.round((matchingWords / subtitleWordsArray.length) * 100);
  };

  return (
    <div className="md:w-64 mb-4 ml-4 mr-4 md:mt-4 md:mr-4 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-4 rounded-lg space-y-4 shadow-sm">
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <div className="flex items-center space-x-2">
        <button
          className="p-7 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 ring-2 ring-primary/20"
          onClick={handleBack}
          disabled={!selectedSubtitle || selectedSubtitleId === 1}
        >
          <FaBackward />
        </button>
        <button
          className="p-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 ring-2 ring-primary/20"
          onClick={handleReplay}
          disabled={!selectedSubtitle}
        >
          <FaRedo />
        </button>
        {/* <button
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          onClick={handlePlayPause}
          disabled={!selectedSubtitle}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
          
        </button> */}
        <button
          className="p-7 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 ring-2 ring-primary/20"
          onClick={handleSkip}
          disabled={!selectedSubtitle || !subtitles.find((sub) => sub.id === selectedSubtitleId! + 1)}
        >
          <FaForward />
        </button>
      </div>

      <div className="relative">
        <textarea
          className="w-full p-2 rounded-lg border border-gray-300 bg-transparent outline-none transition focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:cursor-default disabled:bg-gray-2 data-[active=true]:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary dark:disabled:bg-dark dark:data-[active=true]:border-primary text-dark dark:text-white"
          rows={4}
          style={{ height: '150px', width: '100%' }}
          placeholder={selectedSubtitle ? 'Enter the sentence you hear...' : 'Select a subtitle from the sidebar...'}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={!selectedSubtitle}
        />
      </div>

      <div className="flex items-center space-x-2">
        <button
          className={`px-3 py-3 text-white rounded hover:bg-opacity-80 disabled:opacity-50 ring-2 ring-primary/20 ${
            isRecognizing ? 'bg-red-600' : 'bg-primary'
          }`}
          onClick={handleSpeechToggle}
          disabled={!selectedSubtitle || !recognition}
        >
          {isRecognizing ? <FaStop /> : <FaMicrophone />}
        </button>
        <button
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-80 text-white px-4 py-2 rounded disabled:opacity-50 ring-2 ring-primary/20"
          onClick={handleEasy}
          disabled={!selectedSubtitle}
        >
          Easy
        </button>
      </div>

      <button
        className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 ring-2 ring-primary/20"
        onClick={handleSubmit}
        disabled={!selectedSubtitle || !subtitles.find((sub) => sub.id === selectedSubtitleId! + 1)}
      >
        Next 
      </button>

      <div className="text-sm text-dark dark:text-gray-200">
        Matching: {calculateMatchingPercentage()}% {calculateMatchingPercentage() === 100 ? '🎉' : ''}
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        {selectedSubtitle ? (
          subtitleWords.map((word, idx) => {
            const isCorrect = inputWords[idx]?.toLowerCase() === word.toLowerCase();
            return (
              <button
                key={idx}
                className={`px-2 py-1 rounded text-sm cursor-pointer transition ring-2 ring-primary/20 border border-purple-600 dark:border-indigo-800 border-dashed ${
                  isCorrect
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
                onClick={() => handleHintClick(word, idx)}
                disabled={isCorrect}
              >
                {isCorrect ? word : '*'.repeat(word.length)}
              </button>
            );
          })
        ) : (
          <span className="text-sm text-gray-500 dark:text-gray-400">No subtitle selected</span>
        )}
      </div>
    </div>
  );
};

export default SubtitleInput;