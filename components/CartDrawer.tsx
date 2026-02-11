
import React from 'react';
import { CartItem } from '../types';
import { Button } from './Button';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemove: (itemId: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemove,
  onCheckout,
}) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[1500] animate-in fade-in duration-300"
          onClick={onClose}
        ></div>
      )}
      
      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-[1600] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
            <p className="text-sm text-gray-500">{itemCount} items selected</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-500"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>

        {/* Items List */}
        <div className="flex-grow overflow-y-auto p-4 custom-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-10">
              <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-shopping-basket text-4xl text-orange-200"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Cart is empty</h3>
              <p className="text-gray-500">Add some delicious treats to start your order!</p>
              <Button variant="primary" className="mt-6" onClick={onClose}>
                Back to Menu
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-orange-50/50 border border-orange-100/50 group animate-in slide-in-from-right-4 duration-300">
                  <div className="flex-grow">
                    <h4 className="font-bold text-gray-800 line-clamp-1">{item.name}</h4>
                    {item.flavor && (
                      <span className="text-xs font-semibold px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full">
                        {item.flavor}
                      </span>
                    )}
                    <p className="text-sm font-bold text-orange-600 mt-1">₱{item.price * item.quantity}</p>
                    
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="px-3 py-1 text-gray-500 hover:bg-gray-50 transition-colors"
                        >
                          <i className="fas fa-minus text-xs"></i>
                        </button>
                        <span className="px-3 py-1 font-bold text-gray-800 min-w-[32px] text-center">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-3 py-1 text-gray-500 hover:bg-gray-50 transition-colors"
                        >
                          <i className="fas fa-plus text-xs"></i>
                        </button>
                      </div>
                      <button 
                        onClick={() => onRemove(item.id)}
                        className="text-xs font-semibold text-red-400 hover:text-red-600 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-white space-y-4 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)]">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Subtotal</span>
              <span className="text-2xl font-bold text-gray-900">₱{total}</span>
            </div>
            <Button variant="primary" size="lg" fullWidth onClick={onCheckout} className="py-4 rounded-2xl text-lg shadow-xl shadow-orange-200">
              Complete Order <i className="fas fa-arrow-right ml-2 text-sm"></i>
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
