import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

const testimonials = [
  {
    image: "https://img-b.udemycdn.com/user/200_H/79584910_daa6_3.jpg",
    quote: "I was able to land my dream job thanks to the guidance and support of my mentor. The platform made it easy to connect with industry experts and get personalized feedback.",
    name: "Emily R.",
    title: "Software Engineer at Google",
    color: "from-pink-400 to-red-500"
  },
  {
    image: "https://img-b.udemycdn.com/user/200_H/79584910_daa6_3.jpg",
    quote: "The platform helped me to clarify my career goals and create a roadmap to achieve them. I'm now working in my dream industry and loving every minute of it!",
    name: "David K.",
    title: "Marketing Manager at Amazon",
    color: "from-green-400 to-blue-500"
  },
  {
    image: "https://img-b.udemycdn.com/user/200_H/79584910_daa6_3.jpg",
    quote: "I was struggling to find a job after graduating, but the platform connected me with a mentor who helped me to improve my resume and prepare for interviews. I'm now working in my field and loving it!",
    name: "Sarah L.",
    title: "Data Analyst at Microsoft",
    color: "from-yellow-400 to-orange-500"
  },
  {
    image: "https://img-b.udemycdn.com/user/200_H/79584910_daa6_3.jpg",
    quote: "The platform provided me with access to industry experts and thought leaders who guided me towards success. I'm now running my own business and loving the freedom and flexibility it brings.",
    name: "John D.",
    title: "Founder of XYZ Startups",
    color: "from-purple-400 to-indigo-500"
  }
];

function Testimonial() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200">What Our Mentees Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface TestimonialCardProps {
  image: string;
  quote: string;
  name: string;
  title: string;
  color: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ image, quote, name, title, color }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl relative`}>
      <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${color}`}></div>
      <div className="p-6">
        <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6 border-4 border-white dark:border-gray-800 shadow-lg">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <div className="relative">
          <p className="text-gray-600 dark:text-gray-300 mb-6 italic text-sm md:text-base relative z-10">"{quote}"</p>
        </div>
        <div className="border-t pt-4 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-gray-200">{name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        </div>
        <div className="mt-4 flex justify-center">
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;