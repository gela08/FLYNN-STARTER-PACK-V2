
import React from 'react';
import { Product, Flavor } from '../types';
import { FLAVORS } from '../constants';
import { Button } from './Button';

interface FlavorModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (flavor: Flavor) => void;
}

export const FlavorModal: React.FC<FlavorModalProps> = ({ product, isOpen, onClose, onSelect }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-xl animate-in fade-in duration-500"
        onClick={onClose}
      ></div>
      
      {/* Modal content */}
      <div className="relative bg-[#fdf8f4] w-full max-w-2xl rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in-95 duration-300 border border-white">
        <div className="p-10 bg-orange-600 text-white relative overflow-hidden">
          {/* Decorative dino icon */}
          <i className="fas fa-dragon absolute -top-10 -right-10 text-[120px] opacity-10 rotate-12"></i>
          
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none mb-2">Flavor Profile</h2>
              <p className="text-orange-100 font-bold uppercase tracking-widest text-xs opacity-80">Customizing: {product.name}</p>
            </div>
            <button 
              onClick={onClose}
              className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/20 hover:bg-white text-orange-600 transition-all active:scale-90"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>
        
        <div className="p-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[50vh] overflow-y-auto pr-4 custom-scrollbar">
            {FLAVORS.map((flavor) => (
              <button
                key={flavor.name}
                onClick={() => onSelect(flavor)}
                className="group p-5 rounded-3xl border-2 border-orange-100 bg-white hover:border-orange-500 hover:bg-orange-50 transition-all duration-300 text-left relative overflow-hidden active:scale-95 flex flex-col justify-between h-32"
              >
                <div className="relative z-10">
                  <h4 className="font-black text-gray-900 group-hover:text-orange-700 transition-colors uppercase italic text-sm leading-tight mb-1">
                    {flavor.name}
                  </h4>
                  <div className={`text-[10px] font-black px-2 py-0.5 rounded-full inline-block ${flavor.price > 0 ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                    {flavor.price > 0 ? `+₱${flavor.price}` : 'FREE'}
                  </div>
                </div>
                
                <div className="flex justify-end relative z-10">
                   <div className="w-8 h-8 rounded-full bg-orange-100 group-hover:bg-orange-600 flex items-center justify-center text-orange-600 group-hover:text-white transition-colors">
                      <i className="fas fa-plus text-[10px]"></i>
                   </div>
                </div>

                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-all duration-500 transform group-hover:scale-150">
                   <i className="fas fa-drumstick-bite text-6xl rotate-12"></i>
                </div>
              </button>
            ))}
          </div>
          
          <div className="mt-10 pt-8 border-t border-orange-100">
            <Button 
                variant="ghost" 
                fullWidth 
                onClick={onClose}
                className="rounded-2xl h-14 font-black text-gray-400 hover:text-red-500 uppercase tracking-widest text-xs"
            >
              <i className="fas fa-arrow-left mr-2"></i> Nevermind
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
