import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import BubbleFloat from '../animation/bubbleFloat';
import Pop from '../animation/pop';

const navItems = ['home', 'products', 'about', 'contact', 'profile'];

const Navbar: React.FC = () => {
  const { url } = usePage();
  const currentPath = url.split('/')[1] || 'home';

  return (
    <header className="fixed top-0 w-full z-50 text-white bg-transparent">
      <div className="px-[100px] py-4 flex justify-between items-center">
        {/* left: branding */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/assets/logo/star.svg"
            alt="star logo"
            className="w-[50px] h-[50px]"
          />
          <span className="text-[40px] font-normal tracking-wide">peridust</span>
        </Link>

        {/* center: nav links inside shared white pill */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-[550px] h-[50px] bg-white rounded-full shadow-sm flex items-center px-4">
            {navItems.map((item) => {
              const isActive = currentPath === item;
              return (
                <Link
                  key={item}
                  href={item === 'home' ? '/' : `/${item}`}
                  className="flex-1 flex items-center justify-center"
                >
                  <BubbleFloat
                    text={item}
                    isActive={isActive}
                    activeIcon={
                      <img
                        src="/assets/logo/star2.svg"
                        alt="active star"
                        className="w-[30px] h-[30px]"
                      />
                    }
                    className={`transition-colors duration-300 ${
                      isActive
                        ? 'text-black font-semibold text-[20px] '
                        : 'text-[#6B7280] font-normal text-[16px]'
                    }`}
                  />
                </Link>
              );
            })}
          </div>
        </div>

        {/* right: shop now button with Pop animation */}
        <Pop
          as={Link}
          href="/shop"
          className="w-[150px] h-[50px] bg-[#6666FF] text-white rounded-full shadow-sm flex items-center justify-center text-[20px] font-regular hover:shadow-lg transition-shadow duration-200"
        >
          shop now
        </Pop>
      </div>
    </header>
  );
};

export default Navbar;