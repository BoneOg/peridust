import Layout from '../components/layout';
import { Icon } from "@iconify/react";
import Pop from '../animation/pop';
import { Link } from '@inertiajs/react';

const HeroSection = () => {
  return (
    <Layout>
      <div className="bg-[#CCCCFF] min-h-screen px-[100px] flex flex-col justify-center items-center">
        {/* Hero Title - 50px above bottle */}
        <h1 
          className="text-white text-[80px] font-normal text-center mt-[50px]"
          style={{
            textShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
          }}
        >
          A twinkle in every touch
        </h1>

        {/* Main Content Area with Bottle and Arrows */}
        <div className="flex items-center justify-center relative">

          {/* Right Arrow */}
          <button className="absolute right-[900px] text-white hover:text-white/40 transition-opacity z-10">
            <Icon icon="fluent:ios-arrow-24-regular" className="text-4xl" />
          </button>

          {/* Center Content with Bottle and Product Info */}
          <div className="flex items-center justify-center relative">
            {/* Mockup Bottle */}
            <div className="relative">
              <img 
                src="/assets/mockups/lotion.png" 
                alt="Lotion Bottle Mockup" 
                className="h-[650px] w-auto object-contain"
              />
            </div>

            {/* Product Info - positioned to the right of bottle */}
            <div className="absolute left-full ml-4 top-2/3 transform -translate-y-1/2 text-left w-[500px]">
              <h2 
                className="text-white text-[32px] font-semibold mb-2"
                style={{
                  textShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
              >
                peridust body lotion
              </h2>
              <p 
                className="text-white text-[24px] font-normal leading-relaxed mb-4"
                style={{
                  textShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
              >
                A delicate blend of weightless moisture and soft glow. Designed to melt into your skin like fairy dust, leaving it smooth, luminous, and gently scented.
              </p>

              {/* Shop Now Button */}
              <Pop
                as={Link}
                href="/shop"
                className="w-[150px] h-[50px] bg-[#6666FF] text-white rounded-full shadow-sm flex items-center justify-center text-[20px] font-regular hover:shadow-lg transition-shadow duration-200"
              >
                shop now
              </Pop>
            </div>
          </div>

          {/* Left Arrow */}
          <button className="absolute left-[1050px] text-white hover:text-white/40 transition-opacity z-10">
            <Icon icon="fluent:ios-arrow-24-regular" className="text-4xl rotate-180" />
          </button>
        </div>

        {/* Bottom Dots */}
        <div className="flex space-x-8 mt-[30px]">
          {/* Active Dot */}
          <div 
            className="w-3 h-3 rounded-full bg-[#6666FF]"
            style={{
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
            }}
          ></div>
          
          {/* Inactive Dots */}
          <div 
            className="w-3 h-3 rounded-full bg-white/40"
            style={{
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
            }}
          ></div>
          
          <div 
            className="w-3 h-3 rounded-full bg-white/40"
            style={{
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
            }}
          ></div>
        </div>
      </div>
    </Layout>
  );
};

export default HeroSection;