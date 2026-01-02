
import React from 'react';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onViewDetails: (p: Product) => void;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewDetails, index }) => {
  return (
    <div 
      className="stagger-item group bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        
        <div className="absolute top-4 right-4 flex flex-col gap-2 transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out">
          <button className="p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:bg-pink-600 hover:text-white text-gray-600 transition-all duration-300">
            <Heart className="w-5 h-5" />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:bg-pink-600 hover:text-white text-gray-600 transition-all duration-300"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>

        {product.isNew && (
          <div className="absolute top-4 left-4 overflow-hidden rounded-full">
            <span className="relative z-10 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider block shimmer">
              New
            </span>
          </div>
        )}
        
        {product.isBestSeller && (
          <div className="absolute top-4 left-4 overflow-hidden rounded-full">
            <span className="relative z-10 bg-orange-500 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider block shimmer">
              Best Seller
            </span>
          </div>
        )}

        <div 
          onClick={() => onViewDetails(product)}
          className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-300 flex items-center justify-center"
        >
          <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-6 py-2 rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
            Quick View
          </span>
        </div>
      </div>

      <div className="p-5">
        <p className="text-[11px] font-semibold text-pink-600 uppercase tracking-widest mb-1">{product.category}</p>
        <h3 className="font-serif text-lg text-gray-800 leading-tight mb-2 group-hover:text-pink-700 transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center text-yellow-400">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-xs font-bold text-gray-700 ml-1">{product.rating}</span>
          </div>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
          <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
          <span className="text-xs font-semibold text-green-600 px-2 py-0.5 bg-green-50 rounded">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
