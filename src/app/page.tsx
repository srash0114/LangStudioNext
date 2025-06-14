import { FaHeadphones, FaBrain } from "react-icons/fa";
import Link from "next/link";

type PropsType = {
  searchParams: Promise<{
    selected_time_frame?: string;
  }>;
};

const features = [
  {
    icon: <FaHeadphones size={32} />,
    title: "Listening",
    subtitle: "Personalized practice",
    desc: "Practice with tests tailored to your level and interests.",
    href: "/listening",
  },
  {
    icon: <FaBrain size={32} />,
    title: "Essay Grading",
    subtitle: "AI-powered writing evaluation",
    desc: "Receive detailed feedback and improvement suggestions instantly.",
    href: "/essay-checker",
  },
];

const stats = [
  { label: "Active Users", value: "50K+" },
  { label: "Lessons Completed", value: "1M+" },
  { label: "Average Improvement", value: "30%" },
];

const testimonials = [
  {
    name: "Anna L.",
    role: "IELTS Student",
    quote: "This app helped me improve my listening skills by 2 bands in just a month!",
  },
  {
    name: "Mark S.",
    role: "Academic Writer",
    quote: "The essay grading feature gave me actionable feedback that boosted my writing confidence.",
  },
];

export default async function Home({ searchParams }: PropsType) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-50">
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">Learn English Smarter</h1>
        <p className="text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto mb-6">Your personalized journey to fluency with AI-powered tools.</p>
        <Link
          href="/essay-checker"
          className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 text-base font-semibold rounded-md shadow-sm hover:bg-gray-200 transition-colors duration-200"
        >
          Get Started
        </Link>
      </header>

      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Choose Our App?</h2>
        <p className="text-base sm:text-lg max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
          Our app combines cutting-edge AI technology with personalized learning to help you master English efficiently. Whether you are preparing for IELTS, improving your writing, or enhancing your listening skills, we&apos;ve got you covered.
        </p>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((item, index) => (
            <Link
              href={item.href}
              key={index}
              className="group bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:bg-indigo-50 dark:hover:bg-gray-700"
            >
              <div className="bg-indigo-100 dark:bg-indigo-900 w-14 h-14 flex items-center justify-center rounded-md mb-4 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800 transition-colors">
                {item.icon}
              </div>
              <h2 className="text-xl font-semibold mb-1">{item.title}</h2>
              <p className="text-base font-medium text-gray-600 dark:text-gray-300 mb-2">{item.subtitle}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-200 dark:bg-gray-900">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto text-center">
          {stats.map((stat, index) => (
            <div key={index} className="p-6">
              <h3 className="text-3xl sm:text-4xl font-bold text-indigo-600 dark:text-indigo-400">{stat.value}</h3>
              <p className="text-base sm:text-lg mt-2 text-gray-600 dark:text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <p className="text-base italic mb-4 text-gray-600 dark:text-gray-300">{testimonial.quote}</p>
              <p className="text-base font-semibold">{testimonial.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Start Learning?</h2>
        <p className="text-base sm:text-lg mb-6 max-w-3xl mx-auto">Join thousands of learners and take your English skills to the next level.</p>
        <Link
          href="/listening"
          className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 text-base font-semibold rounded-md shadow-sm hover:bg-gray-200 transition-colors duration-200"
        >
          Start Learning Now
        </Link>
      </section>
    </div>
  );
}