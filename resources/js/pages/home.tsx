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
          className="text-white text-[80px] font-normal text-center mt-23 max-w-4xl leading-tight"
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
              className="w-10 h-10 transform scale-x-[-1]"
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
              className="w-10 h-10"
            />
          </button>
        </div>

        {/* Bottom Dots - Responsive spacing */}
        <div className="flex space-x-4 mt-[40px]">
          {/* Dynamic Dots based on current slide */}
          {[0, 1, 2].map((index) => (
            <div 
              key={index}
              className={`w-3 h-3 rounded-full ${
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