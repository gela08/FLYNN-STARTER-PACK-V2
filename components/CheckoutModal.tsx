
import React from 'react';
import { CartItem } from '../types';
import { Button } from './Button';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  items: CartItem[];
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  items,
}) => {
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-orange-100">
        <div className="p-8 pb-4 text-center">
          <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <i className="fas fa-receipt text-3xl"></i>
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-2 italic uppercase">Confirm Feast</h2>
          <p className="text-gray-500 font-medium">Review your order before we start the fire.</p>
        </div>

        <div className="px-8 py-4 max-h-[40vh] overflow-y-auto custom-scrollbar">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-start gap-4 pb-4 border-b border-gray-50 last:border-0">
                <div className="flex-grow">
                  <p className="font-bold text-gray-900 text-sm">{item.quantity}x {item.name}</p>
                  {item.flavor && (
                    <p className="text-[10px] font-black uppercase text-orange-500 tracking-wider">{item.flavor}</p>
                  )}
                </div>
                <p className="font-black text-gray-900 text-sm whitespace-nowrap">₱{item.price * item.quantity}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 bg-gray-50/50">
          <div className="flex justify-between items-center mb-8">
            <span className="text-gray-500 font-black uppercase tracking-widest text-xs">Total Amount</span>
            <span className="text-3xl font-black text-orange-600">₱{total}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button variant="ghost" className="rounded-2xl h-14 font-black" onClick={onClose}>
              CANCEL
            </Button>
            <Button variant="primary" className="rounded-2xl h-14 font-black shadow-xl shadow-orange-200" onClick={onConfirm}>
              CONFIRM
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
