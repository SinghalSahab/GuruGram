import React from 'react';

interface CardProps {
  name: string;
  description: string;
  domainStatement: string;
  image: string;
}

const Card: React.FC<CardProps> = ({ name, description, domainStatement, image }) => {
  return (
    <div 
      className="w-full max-w-md mx-auto bg-gradient-to-br from-orange-500 to-yellow-600 rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer"
    >
      <div className="md:flex">
        <div className="md:flex-shrink-0 flex items-center justify-center px-4 py-2 rounded-lg">
          <img 
            className="h-48 w-full object-cover md:w-48 rounded-lg" 
            src={image} 
            alt={name} 
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-100 font-semibold">
            {domainStatement}
          </div>
          <h2 className="mt-2 text-xl leading-tight font-bold text-white">
            {name}
          </h2>
          <p className="mt-2 text-gray-100">
            {description}
          </p>
          <div className="mt-4">
            <button className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-700 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none">
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;