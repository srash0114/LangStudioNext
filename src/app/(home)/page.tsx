import { FaBookOpen, FaBrain, FaComments, FaPen } from "react-icons/fa";
import Link from "next/link";

type PropsType = {
  searchParams: Promise<{
    selected_time_frame?: string;
  }>;
};

const features = [
  {
    icon: <FaBookOpen size={32} />,
    title: "BÀI TẬP",
    subtitle: "Bài tập cá nhân hóa",
    desc: "Luyện tập với các bài kiểm tra được tùy chỉnh theo trình độ và sở thích của bạn.",
    href: '/chat-ai',
  },
  {
    icon: <FaComments size={32} />,
    title: "TRỢ LÝ AI",
    subtitle: "Tạo cuộc trò chuyện với AI",
    desc: "Trợ lý AI sẽ giúp bạn giải đáp mọi thắc mắc một cách nhanh chóng và chính xác.",
    href: '/chat-ai',
  },
  {
    icon: <FaBrain size={32} />,
    title: "CHẤM BÀI VIẾT",
    subtitle: "Đánh giá bài viết bằng AI",
    desc: "Nhận phản hồi chi tiết và gợi ý cải thiện ngay lập tức.",
    href: '/essay-checker',
  },
  {
    icon: <FaPen size={32} />,
    title: "VIẾT VÀ SỬA BÀI",
    subtitle: "Hỗ trợ viết bài hiệu quả hơn",
    desc: "Trợ lý AI giúp bạn chỉnh sửa và hoàn thiện nội dung bài viết dễ dàng.",
    href: '/chat-ai',
  },
];


export default async function Home({ searchParams }: PropsType) {
  
  return (
    <main className="bg-white shadow-1 p-6 grid grid-cols-1 md:grid-cols-2 gap-6 dark:bg-gray-dark dark:shadow-card rounded-xl">
      {features.map((item, index) => (
        <Link
          href={item.href}
          key={index}
          className="bg-purple-700 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition-transform hover:bg-purple-800 hover:shadow-2xl"
        >
          <div className="bg-pink-400 w-14 h-14 flex items-center justify-center rounded-xl mb-4">
            {item.icon}
          </div>
          <h2 className="text-2xl font-bold mb-1 ">{item.title}</h2>
          <p className="text-lg font-medium mb-2 ">{item.subtitle}</p>
          <p className="text-sm text-white ">{item.desc}</p>
        </Link>
      ))}
    </main>
  );
}
