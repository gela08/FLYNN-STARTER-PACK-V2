
import React from 'react';
import { Product } from '../types';
import { Button } from './Button';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group relative flex flex-col h-full">
      {/* Main Card Body */}
      <div className="relative flex flex-col h-full bg-white rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] group-hover:shadow-[0_30px_60px_-12px_rgba(234,88,12,0.15)] transition-all duration-500 border border-orange-100/30 overflow-hidden transform group-hover:-translate-y-3">
        
        {/* Visual Header */}
        <div className={`relative h-60 overflow-hidden p-6 bg-gradient-to-br ${product.gradient}`}>
          {/* Abstract Shape Overlay */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-700 drop-shadow-[0_20px_30px_rgba(0,0,0,0.3)]"
            />
          </div>

          {/* Price Tag */}
          <div className="absolute bottom-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-2xl font-black text-sm shadow-xl flex items-center gap-1">
            <span className="text-orange-500 text-[10px]">₱</span>
            {product.price}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-7 flex flex-col flex-grow">
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600">
                {product.category === 'meal' ? 'Signature Bite' : 'Cave Brew'}
              </span>
            </div>
            
            <h3 className="text-xl font-black text-gray-900 mb-3 leading-tight group-hover:text-orange-600 transition-colors uppercase italic tracking-tight">
              {product.name}
            </h3>
            
            <p className="text-gray-500 text-xs font-medium leading-relaxed line-clamp-2 mb-4">
              {product.description}
            </p>
          </div>

          {/* Action Button */}
          <Button 
            variant="primary" 
            fullWidth 
            onClick={() => onAddToCart(product)}
            className="rounded-[1.2rem] h-14 text-xs font-black uppercase tracking-[0.15em] bg-gray-900 hover:bg-orange-600 shadow-xl group-hover:shadow-orange-200"
          >
            Add to Order <i className="fas fa-plus ml-3 text-[10px]"></i>
          </Button>
        </div>
      </div>
      
      {/* Subtle Background Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-amber-400 rounded-[2.6rem] opacity-0 group-hover:opacity-10 blur-xl transition-opacity -z-10"></div>
    </div>
  );
};
