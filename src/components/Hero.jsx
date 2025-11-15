import React from 'react';
import { assets } from '../assets/assets.js';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative w-full h-auto">
      <img
        className="w-full h-[500px] object-cover hidden md:block"
        src={assets.main_banner_bg}
        alt="Main Banner"
      />
      <img
        className="w-full h-[400px] object-cover md:hidden"
        src={assets.main_banner_bg_sm}
        alt="Mobile Banner"
      />

      <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 lg:px-24 gap-6">
        <h1 className="text-white sm:text-[#1f1f1f] text-4xl md:text-5xl lg:text-6xl font-bold leading-tight md:leading-[5rem] max-w-[90%] md:max-w-[600px] lg:max-w-[750px] drop-shadow-sm">
          Freshness You Can Trust, <br /> Savings You’ll Love!
        </h1>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 mt-4">
          <Link
            to="/shop"
            className="bg-primary hover:bg-primary-dark transition-all text-white text-md font-medium shadow-md rounded-md px-6 py-2 md:px-8 md:py-2 lg:px-10 lg:py-3">Shop Now
          </Link>

          <Link
            to="/deals"
            className="group flex items-center gap-2 text-[#1f1f1f] text-md font-medium hover:underline">Explore Deals
            <img
              src={assets.black_arrow_icon}
              alt="arrow"
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;