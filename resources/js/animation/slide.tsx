import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { animate } from 'animejs';
import { Link } from '@inertiajs/react';
import Pop from './pop';

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface SlideProps {
  onSlideChange?: (currentIndex: number) => void;
}

export interface SlideRef {
  slideNext: () => void;
  slidePrev: () => void;
  currentIndex: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "peridust body lotion",
    description: "A delicate blend of weightless moisture and soft glow. Designed to melt into your skin like fairy dust, leaving it smooth, luminous, and gently scented.",
    image: "/assets/mockups/lotion.webp"
  },
  {
    id: 2,
    name: "peridust moisturizing cream",
    description: "experience deeply hydrated and nourished skin. this rich yet lightweight cream replenishes moisture, leaving your complexion soft, smooth, and revitalized.",
    image: "/assets/mockups/jar.webp"
  },
  {
    id: 3,
    name: "peridust sunscreen",
    description: "your everyday essential for sun protection. this lightweight, non-greasy formula provides broad spectrum spf 30 to shield your skin from harmful uva and uvb rays. perfect for daily wear.",
    image: "/assets/mockups/sunscreen.webp"
  }
];

const Slide = forwardRef<SlideRef, SlideProps>(({ onSlideChange }, ref) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);

  useImperativeHandle(ref, () => ({
    slideNext,
    slidePrev,
    currentIndex
  }));

  const slideNext = () => {
    if (isAnimating) return;
    
    const nextIndex = (currentIndex + 1) % products.length;
    animateSlide('next', nextIndex);
  };

  const slidePrev = () => {
    if (isAnimating) return;
    
    const prevIndex = currentIndex === 0 ? products.length - 1 : currentIndex - 1;
    animateSlide('prev', prevIndex);
  };

  const animateSlide = (direction: 'next' | 'prev', newIndex: number) => {
    if (!containerRef.current) return;
    
    setIsAnimating(true);
    
    const currentProduct = productRefs.current[currentIndex];
    const nextProduct = productRefs.current[newIndex];
    
    if (!currentProduct || !nextProduct) return;

    // Set initial position for incoming product
    if (direction === 'next') {
      // Coming from right
      animate(nextProduct, {
        translateX: '100%',
        opacity: 0,
        duration: 0
      });
    } else {
      // Coming from left
      animate(nextProduct, {
        translateX: '-100%',
        opacity: 0,
        duration: 0
      });
    }

    // Make next product visible
    nextProduct.style.display = 'flex';

    // Animate current product out
    animate(currentProduct, {
      translateX: direction === 'next' ? '-100%' : '100%',
      opacity: 0,
      duration: 600,
      easing: 'easeInOutQuart'
    });

    // Animate next product in with rubber band effect
    animate(nextProduct, {
      translateX: [
        direction === 'next' ? '100%' : '-100%', // Start position
        direction === 'next' ? '-5%' : '5%',     // Overshoot
        '0%'                                      // Final position
      ],
      opacity: [0, 1, 1],
      duration: 800,
      easing: 'easeOutElastic(1, .8)',
      complete: () => {
        // Hide previous product
        currentProduct.style.display = 'none';
        
        // Reset transform for current product
        animate(currentProduct, {
          translateX: '0%',
          opacity: 1,
          duration: 0
        });
        
        setCurrentIndex(newIndex);
        setIsAnimating(false);
        onSlideChange?.(newIndex);
      }
    });
  };

  useEffect(() => {
    // Initialize - show only first product
    productRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.style.display = index === 0 ? 'flex' : 'none';
        ref.style.transform = 'translateX(0%)';
        ref.style.opacity = '1';
      }
    });
  }, []);

  return (
    <div ref={containerRef} className="flex items-center justify-center relative w-full h-full">
      {products.map((product, index) => (
        <div
          key={product.id}
          ref={el => { productRefs.current[index] = el; }}
          className="absolute inset-0 flex items-center justify-center"
          style={{ display: index === 0 ? 'flex' : 'none' }}
        >
          {/* Mockup Product - Responsive sizing */}
          <div className="relative">
            <img 
              src={product.image}
              alt={`${product.name} Mockup`}
              className="h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[550px] 2xl:h-[620px] w-auto object-contain"
            />
          </div>

          {/* Product Info - Responsive positioning and sizing */}
          <div className="ml-4 sm:ml-6 md:ml-8 lg:ml-10 xl:ml-12 text-left max-w-[250px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[400px] xl:max-w-[450px] 2xl:max-w-[500px]">
            <h2 
              className="text-white text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-[28px] font-semibold mb-1 sm:mb-2"
              style={{
                textShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
              }}
            >
              {product.name}
            </h2>
            <p 
              className="text-white text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl 2xl:text-[20px] font-normal leading-relaxed mb-3 sm:mb-4"
              style={{
                textShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
              }}
            >
              {product.description}
            </p>

            {/* Shop Now Button - Responsive sizing */}
            <Pop
              as={Link}
              href="/shop"
              className="w-[120px] sm:w-[130px] md:w-[140px] lg:w-[145px] xl:w-[150px] h-[40px] sm:h-[42px] md:h-[45px] lg:h-[48px] xl:h-[50px] bg-[#6666FF] text-white rounded-full shadow-sm flex items-center justify-center text-base sm:text-lg md:text-lg lg:text-xl xl:text-[20px] font-regular hover:shadow-lg transition-shadow duration-200"
            >
              shop now
            </Pop>
          </div>
        </div>
      ))}
    </div>
  );
});

Slide.displayName = 'Slide';

export default Slide;