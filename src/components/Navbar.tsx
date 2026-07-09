'use client'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import SearchBar from './SearchBar'
import Categories from './CategoryList'
import Menu from './Menu'
import NavIcons from './NavIcons'

const Navbar = () => {
  return (
    <div className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
      {/* Mobile Navbar */}
      <div className='md:hidden h-full flex items-center justify-between border-b border-gray-200 pb-4'>
        {/* Left - Logo */}
        <Link href="/" className='flex items-center gap-2 flex-shrink-0'>
          <span className='relative w-10 h-10 rounded-full overflow-hidden bg-brand-black flex-shrink-0'>
            <Image
              src="/logo.jpg"
              alt="Watch Fusion Kenya"
              fill
              sizes="40px"
              className='object-cover scale-125'
            />
          </span>
          <span className='font-bold text-base tracking-tight whitespace-nowrap'>
            Watch Fusion <span className='text-brand-gold-dark'>Ke</span>
          </span>
        </Link>
        <Menu />
      </div>

      {/* Desktop Navbar */}
      <div className='hidden md:flex items-center justify-between gap-8 h-full'>
        {/* Left Section */}
        <div className='w-1/3 xl:w-1/2 flex items-center gap-12'>
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <span className='relative w-10 h-10 rounded-full overflow-hidden bg-brand-black flex-shrink-0'>
              <Image
                src="/logo.jpg"
                alt="Watch Fusion Kenya"
                fill
                sizes="40px"
                className='object-cover scale-125'
              />
            </span>
            <span className='font-bold text-lg tracking-tight whitespace-nowrap'>
              Watch Fusion <span className='text-brand-gold-dark'>Ke</span>
            </span>
          </Link>
          <div className="hidden xl:flex gap-4">
            <Link href="/" className="hover:text-gray-600 transition-colors">
              Homepage
            </Link>
            <Link href="/shop" className="hover:text-gray-600 transition-colors">
              Shop
            </Link>
            <Link href="/deals" className="hover:text-gray-600 transition-colors">
              Deals
            </Link>
            <Link href="/contact" className="hover:text-gray-600 transition-colors">
              Contact
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className='w-2/3 xl:w-1/2 flex items-center justify-between gap-8'>
          <SearchBar />
          <NavIcons />
        </div>
      </div>
    </div>
  )
}

export default Navbar