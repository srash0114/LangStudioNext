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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-12 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Learn English Smarter</h1>
        <p className="text-lg md:text-xl mb-6">Your personalized journey to fluency with AI-powered tools.</p>
        <Link
          href="/essay-checker"
          className="inline-block bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Get Started
        </Link>
      </header>

      <section className="py-12 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-4">Why Choose Our App?</h2>
        <p className="text-lg max-w-2xl mx-auto dark:text-gray-300">
          Our app combines cutting-edge AI technology with personalized learning to help you master English efficiently. Whether you are preparing for IELTS, improving your writing, or enhancing your listening skills, we&apos;ve got you covered.
        </p>
      </section>

      <section className="py-12 px-6">
        <h2 className="text-3xl font-semibold text-center mb-8">Our Features</h2>
        <main className="shadow-1 p-6 grid grid-cols-1 md:grid-cols-2 gap-6 dark:shadow-card">
          {features.map((item, index) => (
            <Link
              href={item.href}
              key={index}
              className="bg-purple-700 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition-transform hover:bg-purple-800 hover:shadow-2xl"
            >
              <div className="bg-pink-400 w-14 h-14 flex items-center justify-center rounded-xl mb-4">
                {item.icon}
              </div>
              <h2 className="text-2xl font-bold mb-1">{item.title}</h2>
              <p className="text-lg font-medium mb-2">{item.subtitle}</p>
              <p className="text-sm text-white">{item.desc}</p>
            </Link>
          ))}
        </main>
      </section>

      <section className="py-12 px-6 bg-gray-100 dark:bg-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="p-6">
              <h3 className="text-4xl font-bold text-purple-600 dark:text-purple-400">{stat.value}</h3>
              <p className="text-lg mt-2 dark:text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 px-6">
        <h2 className="text-3xl font-semibold text-center mb-8">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-dark p-6 rounded-xl shadow-md dark:shadow-card"
            >
              <p className="text-lg italic mb-4 dark:text-gray-300">{`"${testimonial.quote}"`}</p>
              <p className="font-semibold">{testimonial.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 px-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <h2 className="text-3xl font-semibold mb-4">Ready to Start Learning?</h2>
        <p className="text-lg mb-6">Join thousands of learners and take your English skills to the next level.</p>
        <Link
          href="/listening"
          className="inline-block bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Start Learning Now
        </Link>
      </section>
    </div>
  );
}