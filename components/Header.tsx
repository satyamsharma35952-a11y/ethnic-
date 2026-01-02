
import React from 'react';
import { Search, ShoppingBag, User, Heart, Menu } from 'lucide-react';
import { View } from '../types';

interface HeaderProps {
  cartCount: number;
  setView: (view: View) => void;
  currentView: View;
}

const Header: React.FC<HeaderProps> = ({ cartCount, setView, currentView }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4 lg:hidden">
          <Menu className="w-6 h-6 text-gray-600" />
        </div>

        <div 
          onClick={() => setView('home')}
          className="cursor-pointer group flex flex-col items-center"
        >
          <span className="text-2xl font-bold tracking-widest text-pink-700 font-serif uppercase group-hover:text-pink-800 transition-colors">
            EthnicElite
          </span>
          <span className="text-[10px] tracking-[0.3em] text-gray-400 font-medium uppercase -mt-1">
            Timeless Elegance
          </span>
        </div>

        <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-gray-600">
          <button 
            onClick={() => setView('home')}
            className={`hover:text-pink-600 transition-colors ${currentView === 'home' ? 'text-pink-600 font-semibold' : ''}`}
          >
            HOME
          </button>
          <button 
            onClick={() => setView('shop')}
            className={`hover:text-pink-600 transition-colors ${currentView === 'shop' ? 'text-pink-600 font-semibold' : ''}`}
          >
            SHOP ALL
          </button>
          <button className="hover:text-pink-600 transition-colors">NEW ARRIVALS</button>
          <button className="hover:text-pink-600 transition-colors">BEST SELLERS</button>
        </nav>

        <div className="flex items-center space-x-5">
          <div className="hidden md:flex items-center bg-gray-50 px-3 py-2 rounded-full border border-gray-200 focus-within:ring-2 ring-pink-100 transition-all">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search Kurtis..." 
              className="bg-transparent border-none focus:ring-0 text-sm w-40 outline-none"
            />
          </div>
          
          <button className="hover:text-pink-600 transition-colors relative">
            <Heart className="w-6 h-6" />
          </button>

          <button 
            onClick={() => setView('profile')}
            className="hover:text-pink-600 transition-colors"
          >
            <User className="w-6 h-6" />
          </button>

          <button 
            onClick={() => setView('cart')}
            className="group relative flex items-center p-2 rounded-full hover:bg-pink-50 transition-all"
          >
            <ShoppingBag className="w-6 h-6 text-gray-700 group-hover:text-pink-600" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-pink-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center shadow-lg">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
