import Layout from '../components/layout';
import Slide, { SlideRef } from '../animation/slide';
import { useRef, useState } from 'react';

const HeroSection = () => {
  const slideRef = useRef<SlideRef>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    slideRef.current?.slideNext();
  };

  const handlePrevSlide = () => {
    slideRef.current?.slidePrev();
  };

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <Layout>
      <div className="bg-[#CCCCFF] min-h-screen flex flex-col justify-center items-center py-8">
        {/* Hero Title - Responsive sizing and spacing */}
        <h1 
          className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[80px] font-normal text-center mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-1 xl:mt-23 max-w-4xl leading-tight"
          style={{
            textShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
          }}
        >
          A twinkle in every touch
        </h1>

        {/* Main Content Area with Bottle and Arrows */}
        <div className="flex items-center justify-center relative w-full flex-1">

          {/* Left Arrow - Fixed to match navbar margin exactly */}
          <button 
            onClick={handlePrevSlide}
            className="absolute left-[100px] text-white hover:opacity-40 transition-opacity z-10"
          >
            <img 
              src="assets/ui/arrow.svg" 
              alt="Previous" 
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 transform scale-x-[-1]"
            />
          </button>

          {/* Center Content with Sliding Products */}
          <Slide 
            ref={slideRef}
            onSlideChange={handleSlideChange}
          />

          {/* Right Arrow - Fixed to match navbar margin exactly */}
          <button 
            onClick={handleNextSlide}
            className="absolute right-[100px] text-white hover:opacity-40 transition-opacity z-10"
          >
            <img 
              src="assets/ui/arrow.svg" 
              alt="Next" 
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10"
            />
          </button>
        </div>

        {/* Bottom Dots - Responsive spacing */}
        <div className="flex space-x-4 sm:space-x-6 md:space-x-8 mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-[40px]">
          {/* Dynamic Dots based on current slide */}
          {[0, 1, 2].map((index) => (
            <div 
              key={index}
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full ${
                currentSlide === index ? 'bg-[#6666FF]' : 'bg-white/40'
              }`}
              style={{
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
              }}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default HeroSection;