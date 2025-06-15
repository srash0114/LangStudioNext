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
    // Ensure the name exists in formData to prevent issues
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
      setError('An error occurred while submitting the request. Please try again.');
      console.error("Submission error:", err); // Log the actual error for debugging
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card p-4 sm:p-6 xl:p-10">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stroke pb-4 mb-6 dark:border-dark-3">
        <button
          onClick={toggleSidebar}
          className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 p-3 text-white hover:opacity-80 transition-opacity flex items-center justify-center"
          aria-label="Open sidebar"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold text-dark dark:text-white">Essay Checker</h2>
        <button
          onClick={handleFlip}
          type="button"
          className="rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 p-3 text-white hover:opacity-80 transition-opacity flex items-center justify-center"
          aria-label="View history / results"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Document icon for history/results, adjusted for clarity */}
            <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 2.00001V8.00001H20" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 13H8" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 17H8" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 9H8" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <InputGroup
          label="Essay Title"
          placeholder="Enter the essay title"
          type="text"
          name="title"
          value={formData.title}
          handleChange={handleChange}
        />

        <TextAreaGroup
          label="Essay Content"
          placeholder="Enter your essay content here..."
          value={formData.content}
          onChange={handleChange}
          name="content"
          // row={10} // Increased rows for better usability
        />

        <Select
          label="Target Band Score"
          items={[
            { label: "A1 (Beginner)", value: "A1" },
            { label: "A2 (Elementary)", value: "A2" },
            { label: "B1 (Intermediate)", value: "B1" },
            { label: "B2 (Upper-Intermediate)", value: "B2" },
            { label: "C1 (Advanced)", value: "C1" },
            { label: "C2 (Proficient)", value: "C2" },
          ]}
          value={formData.targetBandScore}
          name="targetBandScore"
          required
          prefixIcon={<GlobeIcon />}
          onChange={handleChange}
        />

        {error && (
          <div className="p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-md text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`flex w-full justify-center rounded-lg p-[13px] font-medium text-white transition-all duration-300 ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:bg-opacity-90 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 hover:opacity-80'
          }`}
        >
          {loading ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Scoring...
            </div>
          ) : (
            'Score My Essay'
          )}
        </button>
      </form>
    </div>
  );
}