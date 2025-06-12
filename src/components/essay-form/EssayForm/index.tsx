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
            className="rounded-lg bg-primary p-[13px] font-medium text-white hover:bg-opacity-90 mt-5"
          >
            <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M3 6H21M3 12H21M3 18H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          </button>
          Essay Checker
          <button
            onClick={handleFlip}
            type="button"
            className="rounded-lg bg-primary p-[13px] font-medium text-white hover:bg-opacity-90 mt-5"
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