import styles from './EssayChecker.module.css';'use client';

import { useState } from 'react';
import axios from 'axios';

import InputGroup from "@/components/FormElements/InputGroup";
import { TextAreaGroup } from "@/components/FormElements/InputGroup/text-area";
import { Select } from "@/components/FormElements/select";
import { GlobeIcon } from '@/assets/icons';

interface EssayFormData {
  title: string;
  content: string;
  targetBandScore: string;
}

interface EssayResult {
  id: string;
  title: string;
  targetBandScore: string;
  content: string;
  bandScore: string;
  feedback: string;
  createdAt: string;
}

export default function EssayChecker() {
  const [formData, setFormData] = useState<EssayFormData>({
    title: '',
    content: '',
    targetBandScore: ''
  });
  const [result, setResult] = useState<EssayResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

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
      // Kiểm tra formData nếu cần
      if (!formData) {
        setError('Dữ liệu biểu mẫu không hợp lệ');
      }

      const response = await axios.post('https://api.scanvirus.me/Writing/submit', formData, {
        withCredentials: true, // Đặt withCredentials trong cấu hình axios
      });
      setResult(response.data);
      setIsFlipped(true); // Tự động lật sang kết quả sau khi gửi
    } catch (err) {
      setError('Đã xảy ra lỗi khi gửi yêu cầu');
    } finally {
      setLoading(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};
  return (
    <main style={{ fontFamily: 'Roboto, sans-serif' }}>
      <div className="flip-container">
        <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
          {/* Mặt trước: Form */}
          <div className="flip-front">
            <form onSubmit={handleSubmit}>
              <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
                <h2 className="flex items-center justify-between border-b border-stroke px-4 py-4 font-medium text-dark dark:border-dark-3 dark:text-white sm:px-6 xl:px-7.5">
                  Essay Checker
                  <button
                    onClick={handleFlip}
                    type="button"
                    className="rounded-lg bg-green-600 p-[10px] font-medium text-white hover:bg-opacity-90"
                  >
                    {isFlipped ? 'Quay lại form' : 'Xem kết quả'}
                  </button>
                </h2>

                <div className="p-4 sm:p-6 xl:p-10">
                  <InputGroup
                    label="Tiêu đề"
                    placeholder="Nhập tiêu đề đoạn essay"
                    type="text"
                    name="title"
                    value={formData.title}
                    handleChange={handleChange}
                    required
                  />

                  <TextAreaGroup
                    label="Nội dung"
                    placeholder="Nhập nội dung"
                    value={formData.content}
                    onChange={handleChange}
                    name="content" // Thêm name để khớp với formData
                    className="mt-4"
                    required
                  />

                  <Select
                    label="Band score mục tiêu:"
                    items={[
                      { label: "A1", value: "A1" },
                      { label: "A2", value: "A2" },
                      { label: "B1", value: "B1" },
                      { label: "B2", value: "B2" },
                      { label: "C1", value: "C1" },
                      { label: "C2", value: "C2" },
                    ]}
                    className="mt-3"
                    value = {formData.targetBandScore}
                    name = 'targetBandScore'
                    prefixIcon={<GlobeIcon />}
                    onChange={handleChange}
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full justify-center rounded-lg bg-primary p-[13px] font-medium text-white hover:bg-opacity-90 mt-10"
                  >
                    {loading ? 'Đang chấm điểm...' : 'Chấm điểm'}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Mặt sau: Kết quả */}
          <div className="flip-back">
            <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
              <h2 className="flex items-center justify-between border-b border-stroke px-4 py-4 font-medium text-dark dark:border-dark-3 dark:text-white sm:px-6 xl:px-7.5">
                Kết quả
                <button
                  onClick={handleFlip}
                  type="button"
                  className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-opacity-90"
                >
                  Quay lại form
                </button>
              </h2>
              <div className='px-6 py-4'>
              {result ? (
                <>
                  <p><strong>Tiêu đề:</strong> {result.title}</p>
                  <p><strong>Band score mục tiêu:</strong> {result.targetBandScore}</p>
                  <p><strong>Band score:</strong> {result.bandScore}</p>
                  <p><strong>Feedback:</strong> {result.feedback}</p>
                  <p><strong>Thời gian tạo:</strong> {result.createdAt}</p>
                </>
              ) : (
                <p>Không có kết quả để hiển thị.</p>
              )}
              </div>
            </div>
          </div>
        </div> 
      </div>

      {/* ✅ CSS để flip hoạt động */}
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
