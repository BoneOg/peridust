import React from 'react';
import { Link, usePage } from '@inertiajs/react';

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
                  <div
                    className={`flex items-center justify-center gap-1 transition-all ${
                      isActive
                        ? 'text-black font-semibold text-[20px]'
                        : 'text-black/40 font-thin text-[16px]'
                    }`}
                  >
                    {isActive && (
                      <img
                        src="/assets/logo/star2.svg"
                        alt="active star"
                        className="w-[30px] h-[30px]"
                      />
                    )}
                    <span>{item}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* right: shop now button */}
        <Link
          href="/shop"
          className="w-[150px] h-[50px] bg-[#6666FF] text-white rounded-full shadow-sm flex items-center justify-center text-[20px] font-regular"
        >
          shop now
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
