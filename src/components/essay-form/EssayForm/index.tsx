import axios from 'axios';
import InputGroup from "@/components/FormElements/InputGroup";
import { TextAreaGroup } from "@/components/FormElements/InputGroup/text-area";
import { Select } from "@/components/FormElements/select";
import { GlobeIcon } from '@/assets/icons';
import { EssayFormData, EssayResult, EssayHistory } from '../types';

interface EssayFormProps {
  formData: EssayFormData;
  setFormData: React.Dispatch<React.SetStateAction<EssayFormData>>;
  setResult: React.Dispatch<React.SetStateAction<EssayResult | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setIsFlipped: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  error: string | null;
  toggleSidebar: () => void;
  handleFlip: () => void;
  setEssayHistory: React.Dispatch<React.SetStateAction<EssayHistory>>;
  setHistoryLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setHistoryError: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function EssayForm({
  formData,
  setFormData,
  setResult,
  setLoading,
  setError,
  setIsFlipped,
  loading,
  error,
  toggleSidebar,
  handleFlip,
  setEssayHistory,
  setHistoryLoading,
  setHistoryError
}: EssayFormProps) {
  const fetchEssayHistory = async () => {
    setHistoryLoading(true);
    setHistoryError(null);

    const options = {
      method: 'GET',
      url: 'https://api.scanvirus.me/Writing/history',
      params: { page: '1', pageSize: '20' },
      withCredentials: true,
    };

    try {
      const { data } = await axios.request(options);
      setEssayHistory(data);
    } catch (error) {
      setHistoryError('Failed to fetch essay history');
      console.error(error);
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name in formData) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (!formData.title || !formData.content || !formData.targetBandScore) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      const response = await axios.post('https://api.scanvirus.me/Writing/submit', formData, {
        withCredentials: true,
      });
      setResult(response.data);
      setIsFlipped(true);
      fetchEssayHistory();
    } catch (err) {
      setError('An error occurred while submitting the request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <h2 className="flex items-center justify-between border-b border-stroke px-4 py-4 font-medium text-dark dark:border-dark-3 dark:text-white sm:px-6 xl:px-7.5">
          <button
            onClick={toggleSidebar}
            className="rounded-lg bg-green-600 p-[10px] font-medium hover:bg-opacity-90"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 8V12L14.5 14.5"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.60423 5.60423L5.0739 5.0739V5.0739L5.60423 5.60423ZM4.33785 6.87061L3.58786 6.87438C3.58992 7.28564 3.92281 7.61853 4.33408 7.6206L4.33785 6.87061ZM6.87963 7.63339C7.29384 7.63547 7.63131 7.30138 7.63339 6.88717C7.63547 6.47296 7.30138 6.13549 6.88717 6.13341L6.87963 7.63339ZM5.07505 4.32129C5.07296 3.90708 4.7355 3.57298 4.32129 3.57506C3.90708 3.57715 3.57298 3.91462 3.57507 4.32882L5.07505 4.32129ZM3.75 12C3.75 11.5858 3.41421 11.25 3 11.25C2.58579 11.25 2.25 11.5858 2.25 12H3.75ZM16.8755 20.4452C17.2341 20.2378 17.3566 19.779 17.1492 19.4204C16.9418 19.0619 16.483 18.9393 16.1245 19.1468L16.8755 20.4452ZM19.1468 16.1245C18.9393 16.483 19.0619 16.9418 19.4204 17.1492C19.779 17.3566 20.2378 17.2341 20.4452 16.8755L19.1468 16.1245ZM5.14033 5.07126C4.84598 5.36269 4.84361 5.83756 5.13505 6.13191C5.42648 6.42626 5.90134 6.42862 6.19569 6.13719L5.14033 5.07126ZM18.8623 5.13786C15.0421 1.31766 8.86882 1.27898 5.0739 5.0739L6.13456 6.13456C9.33366 2.93545 14.5572 2.95404 17.8017 6.19852L18.8623 5.13786ZM5.0739 5.0739L3.80752 6.34028L4.86818 7.40094L6.13456 6.13456L5.0739 5.0739ZM4.33408 7.6206L6.87963 7.63339L6.87963 7.63339L4.33408 7.6206ZM5.08784 6.86684L5.07505 4.32129L3.57507 4.32882L3.58786 6.87438L5.08784 6.86684ZM12 3.75C16.5563 3.75 20.25 7.44365 20.25 12H21.75C21.75 6.61522 17.3848 2.25 12 2.25V3.75ZM12 20.25C7.44365 20.25 3.75 16.5563 3.75 12H2.25C2.25 17.3848 6.61522 21.75 12 21.75V20.25ZM16.1245 19.1468C14.9118 19.8483 13.5039 20.25 12 20.25V21.75C13.7747 21.75 15.4407 21.2752 16.8755 20.4452L16.1245 19.1468ZM20.25 12C20.25 13.5039 19.8483 14.9118 19.1468 16.1245L20.4452 16.8755C21.2752 15.4407 21.75 13.7747 21.75 12H20.25ZM6.19569 6.13719C7.68707 4.66059 9.73646 3.75 12 3.75V2.25C9.32542 2.25 6.90113 3.32791 5.14033 5.07126L6.19569 6.13719Z"
                fill="#FFFFFF"
              />
            </svg>
          </button>
          Essay Checker
          <button
            onClick={handleFlip}
            type="button"
            className="rounded-lg bg-green-600 p-[10px] font-medium hover:bg-opacity-90"
          >
            <svg
              width="24"
              height="24"
              fill="#FFFFFF"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="7.5" y="9.75" width="1.5" height="1.5" />
              <rect x="10.5" y="9.75" width="6" height="1.5" />
              <rect x="7.5" y="13.5" width="1.5" height="1.5" />
              <rect x="7.5" y="17.25" width="1.5" height="1.5" />
              <path d="M5.25,21V5.25h2.25v2.25H16.5V5.25h2.25v6h1.5V5.25a1.5,1.5,0,0,0-1.5-1.5H16.5V3a1.5,1.5,0,0,0-1.5-1.5H9a1.5,1.5,0,0,0-1.5,1.5V3.75H5.25A1.5,1.5,0,0,0,3.75,5.25V21a1.5,1.5,0,0,0,1.5,1.5h6.75V21ZM9,3h6V6H9Z" />
              <path d="M13.5,14.25v1.8098A5.247,5.247,0,1,1,18,24V22.5a3.75,3.75,0,1,0-3.4321-5.25H16.5v1.5H12V14.25Z" />
            </svg>
          </button>
        </h2>
        <form onSubmit={handleSubmit}>
            

            <div className="p-4 sm:p-6 xl:p-10">
              <InputGroup
                label="Title"
                placeholder="Enter the essay title"
                type="text"
                name="title"
                value={formData.title}
                handleChange={handleChange}
              />

              <TextAreaGroup
                label="Content"
                placeholder="Enter essay content"
                value={formData.content}
                className="mt-3"
                onChange={handleChange}
                name="content"
              />

              <Select
                label="Target band score:"
                items={[
                  { label: "A1", value: "A1" },
                  { label: "A2", value: "A2" },
                  { label: "B1", value: "B1" },
                  { label: "B2", value: "B2" },
                  { label: "C1", value: "C1" },
                  { label: "C2", value: "C2" },
                ]}
                className="mt-2 mb-5"
                value={formData.targetBandScore}
                name="targetBandScore"
                required
                prefixIcon={<GlobeIcon />}
                onChange={handleChange}
              />

              {error && <p className="text-red-500">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-lg bg-primary p-[13px] font-medium text-white hover:bg-opacity-90 mt-5"
              >
                {loading ? 'Scoring...' : 'Score Essay'}
              </button>
            </div>
        </form>
    </div>
  );
}