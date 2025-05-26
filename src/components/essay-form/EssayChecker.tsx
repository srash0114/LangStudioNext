// EssayChecker.tsx
import { useState, useEffect, useRef } from 'react';
import EssayForm from './EssayForm';
import EssayResult from './EssayResult';
import EssaySidebar from './EssaySidebar';
import { EssayFormData, EssayResult as EssayResultType, EssayHistory } from './types';
import axios from 'axios';

export default function EssayChecker() {
  const [formData, setFormData] = useState<EssayFormData>({
    title: '',
    content: '',
    targetBandScore: ''
  });
  const [result, setResult] = useState<EssayResultType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [essayHistory, setEssayHistory] = useState<EssayHistory>({ essays: [], page: 1, pageSize: 5 });
  const [historyLoading, setHistoryLoading] = useState<boolean>(false);
  const [historyError, setHistoryError] = useState<string | null>(null);

  const fetchEssayHistory = async (page: number, append: boolean = false) => {
    setHistoryLoading(true);
    setHistoryError(null);
    try {
      const { data } = await axios.get('https://api.scanvirus.me/Writing/history', {
        params: { page: page.toString(), pageSize: essayHistory.pageSize.toString() },
        withCredentials: true,
      });
      setEssayHistory((prev) => ({
        ...data,
        essays: append ? [...prev.essays, ...data.essays] : data.essays,
      }));
    } catch (error) {
      setHistoryError('Failed to fetch essay history');
      console.error(error);
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    fetchEssayHistory(1);
  }, []);

  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <main style={{ fontFamily: 'Roboto, sans-serif' }}>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
      <EssaySidebar
        sidebarRef={sidebarRef}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        essayHistory={essayHistory}
        historyLoading={historyLoading}
        historyError={historyError}
        setResult={setResult}
        setIsFlipped={setIsFlipped}
        setIsSidebarOpen={setIsSidebarOpen}
        fetchEssayHistory={fetchEssayHistory} // Pass fetchEssayHistory to EssaySidebar
      />
      <div className="flip-container">
        <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
          <div className="flip-front">
            <EssayForm
              formData={formData}
              setFormData={setFormData}
              setResult={setResult}
              setLoading={setLoading}
              setError={setError}
              setIsFlipped={setIsFlipped}
              loading={loading}
              error={error}
              toggleSidebar={toggleSidebar}
              handleFlip={handleFlip}
              setEssayHistory={setEssayHistory}
              setHistoryLoading={setHistoryLoading}
              setHistoryError={setHistoryError}
            />
          </div>
          <div className="flip-back">
            <EssayResult
              result={result}
              toggleSidebar={toggleSidebar}
              handleFlip={handleFlip}
            />
          </div>
        </div>
      </div>
      <style jsx>{`
        .flip-container {
          perspective: 1000px;
          width: 100%;
          min-height: 700px;
        }

        .flip-card {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.6s;
        }

        .flip-card.flipped {
          transform: rotateY(180deg);
        }

        .flip-front, .flip-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          top: 0;
          left: 0;
        }

        .flip-back {
          transform: rotateY(180deg);
          background-color: #f9fafb;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </main>
  );
}