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
    title: "EXERCISES",
    subtitle: "Personalized practice",
    desc: "Practice with tests tailored to your level and interests.",
    href: '/chat-ai',
  },
  {
    icon: <FaComments size={32} />,
    title: "AI ASSISTANT",
    subtitle: "Start a conversation with AI",
    desc: "The AI assistant helps answer your questions quickly and accurately.",
    href: '/chat-ai',
  },
  {
    icon: <FaBrain size={32} />,
    title: "ESSAY GRADING",
    subtitle: "AI-powered writing evaluation",
    desc: "Receive detailed feedback and improvement suggestions instantly.",
    href: '/essay-checker',
  },
  {
    icon: <FaPen size={32} />,
    title: "WRITE & EDIT",
    subtitle: "Effective writing support",
    desc: "The AI assistant helps you edit and polish your writing with ease.",
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
