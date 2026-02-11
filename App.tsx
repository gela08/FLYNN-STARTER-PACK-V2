
import React, { useState, useMemo } from 'react';
import { PRODUCTS } from './constants';
import { Product, CartItem, Flavor } from './types';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { FlavorModal } from './components/FlavorModal';
import { CheckoutModal } from './components/CheckoutModal';
import { Button } from './components/Button';

type CategoryFilter = 'all' | 'with-coffee' | 'no-coffee' | 'meal';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [flavoringProduct, setFlavoringProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const cartItemCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleAddToCart = (product: Product) => {
    if (product.hasFlavors) {
      setFlavoringProduct(product);
    } else {
      addToCartState(product);
      setIsCartOpen(true);
    }
  };

  const addToCartState = (product: Product, flavor?: Flavor) => {
    setCart(prevCart => {
      const itemId = flavor ? `${product.id}-${flavor.name}` : product.id;
      const existingItem = prevCart.find(item => item.id === itemId);
      
      if (existingItem) {
        return prevCart.map(item => 
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      
      return [
        ...prevCart,
        {
          id: itemId,
          productId: product.id,
          name: product.name,
          price: product.price + (flavor?.price || 0),
          flavor: flavor?.name,
          quantity: 1,
        }
      ];
    });
  };

  const handleFlavorSelect = (flavor: Flavor) => {
    if (flavoringProduct) {
      addToCartState(flavoringProduct, flavor);
      setFlavoringProduct(null);
      setIsCartOpen(true);
    }
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === itemId) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      });
    });
  };

  const handleRemoveItem = (itemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const handleOpenCheckoutModal = () => {
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  const handleFinalConfirm = () => {
    alert("🦖 Rawr! Order placed successfully! Your cave cravings are being prepared.");
    setCart([]);
    setIsCheckoutModalOpen(false);
  };

  return (
    <div className="min-h-screen pb-32">
      {/* Dynamic Navbar */}
      <header className="sticky top-0 z-[1000] glass-panel border-b border-orange-100/50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gray-900 rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl shadow-orange-900/20 -rotate-6 hover:rotate-0 transition-all duration-500 cursor-pointer overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-amber-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <i className="fas fa-dragon text-2xl relative z-10"></i>
            </div>
            <div>
              <h1 className="text-3xl font-[900] text-gray-900 tracking-tighter leading-none italic uppercase">Cave Crave</h1>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <p className="text-[10px] text-orange-600 uppercase font-black tracking-[0.2em] italic">Open & Cooking</p>
              </div>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            className="relative rounded-2xl h-14 w-14 flex items-center justify-center bg-gray-900 text-white hover:bg-orange-600 transition-all duration-300"
            onClick={() => setIsCartOpen(true)}
          >
            <i className="fas fa-shopping-basket text-xl"></i>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[11px] font-black h-7 w-7 rounded-full flex items-center justify-center border-4 border-[#fdf8f4] animate-bounce shadow-lg">
                {cartItemCount}
              </span>
            )}
          </Button>
        </div>
      </header>

      {/* Modern Hero Section */}
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-[4rem] p-12 lg:p-20 relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]">
            {/* Background Light Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/20 rounded-full blur-[120px] -mr-40 -mt-40"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-amber-600/10 rounded-full blur-[80px] -ml-20 -mb-20"></div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1 text-center lg:text-left">
                <span className="bg-orange-600/10 border border-orange-500/20 text-orange-500 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] inline-flex items-center gap-3 mb-8">
                  <span className="w-2 h-2 bg-orange-500 rounded-full animate-ping"></span> Dino's Secret Recipe
                </span>
                <h2 className="text-6xl lg:text-8xl font-[900] text-white mb-8 leading-[1] italic uppercase tracking-tighter">
                  Feed Your <br/> <span className="text-orange-500">Primal</span> Side.
                </h2>
                <p className="text-gray-400 text-xl mb-12 opacity-90 max-w-xl leading-relaxed font-medium">
                  Experience the ultimate harmony of high-caffeine cold brews and legendary Korean boneless chicken.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                  <Button 
                    size="lg"
                    className="bg-orange-600 hover:bg-orange-500 text-white rounded-[2rem] px-12 h-20 text-xl font-black italic uppercase tracking-widest shadow-[0_20px_40px_-10px_rgba(234,88,12,0.5)] transition-all hover:scale-105 active:scale-95"
                    onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Start Order <i className="fas fa-bolt ml-4"></i>
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 relative hidden lg:block">
                 <div className="relative z-10 animate-float">
                    <img 
                      src="Images/24-chicken-RM3.png" 
                      alt="Hero Chicken" 
                      className="w-full max-w-md mx-auto drop-shadow-[0_40px_60px_rgba(0,0,0,0.8)]"
                    />
                 </div>
                 {/* Decorative coffee cup */}
                 <div className="absolute -bottom-10 -left-10 w-48 h-48 rotate-[-20deg] opacity-60">
                    <img src="Images/iced-caramel-macchiatos-coffee-no-bg.png" alt="Hero Coffee" />
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Area */}
      <main id="menu" className="max-w-7xl mx-auto px-6 mt-12">
        {/* Sticky Control Center */}
        <div className="sticky top-[100px] z-[900] mb-16">
          <div className="glass-panel p-6 rounded-[2.5rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-orange-100 flex flex-col lg:flex-row items-center justify-between gap-6">
            
            <div className="relative w-full lg:w-96 group">
              <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors"></i>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Find your craving..." 
                className="w-full bg-orange-50/50 border-2 border-orange-100/50 rounded-2xl py-4 pl-16 pr-6 text-sm font-black focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all uppercase placeholder:text-gray-400"
              />
            </div>

            <div className="flex bg-gray-100/50 p-2 rounded-[1.8rem] gap-1 overflow-x-auto max-w-full custom-scrollbar">
              {(['all', 'with-coffee', 'no-coffee', 'meal'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap italic ${
                    activeCategory === cat 
                    ? 'bg-gray-900 text-white shadow-xl' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/50'
                  }`}
                >
                  {cat === 'all' ? 'The Whole Cave' : cat === 'with-coffee' ? 'Brews' : cat === 'no-coffee' ? 'No Buzz' : 'Feasts'}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart} 
              />
            ))
          ) : (
            <div className="col-span-full py-40 text-center">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-orange-50 rounded-full mb-8">
                <i className="fas fa-search text-5xl text-orange-200"></i>
              </div>
              <h3 className="text-3xl font-black uppercase italic tracking-tighter text-gray-800">No Cravings Found</h3>
              <p className="text-gray-500 font-medium mt-2">The Dino couldn't find that. Try another cave search!</p>
            </div>
          )}
        </div>
      </main>

      {/* High-End Footer */}
      <footer className="mt-40 bg-gray-900 pt-32 pb-16 px-6 rounded-t-[5rem] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[150px] -mr-32 -mt-32"></div>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-20 border-b border-gray-800 pb-20">
            <div className="max-w-md">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white">
                  <i className="fas fa-dragon text-2xl"></i>
                </div>
                <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Cave Crave</h2>
              </div>
              <p className="text-gray-500 text-xl font-medium leading-relaxed">
                Premium roasted beans meet authentic Korean fried chicken. Crafted for those with a prehistoric appetite.
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
              <div className="flex flex-col gap-4">
                <span className="text-white font-black uppercase tracking-[0.2em] text-xs mb-2">Explore</span>
                <a href="#" className="text-gray-500 hover:text-orange-500 font-bold uppercase text-xs transition-colors">Menu</a>
                <a href="#" className="text-gray-500 hover:text-orange-500 font-bold uppercase text-xs transition-colors">Locations</a>
                <a href="#" className="text-gray-500 hover:text-orange-500 font-bold uppercase text-xs transition-colors">Dino Rewards</a>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-white font-black uppercase tracking-[0.2em] text-xs mb-2">Social</span>
                <a href="#" className="text-gray-500 hover:text-orange-500 font-bold uppercase text-xs transition-colors">Instagram</a>
                <a href="#" className="text-gray-500 hover:text-orange-500 font-bold uppercase text-xs transition-colors">Facebook</a>
                <a href="#" className="text-gray-500 hover:text-orange-500 font-bold uppercase text-xs transition-colors">TikTok</a>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center mt-16 gap-8">
            <p className="text-gray-700 text-[10px] font-black uppercase tracking-[0.3em]">© 2024 Dino's Cave Crave. All Rights Reserved.</p>
            <div className="flex gap-10">
              <a href="#" className="text-gray-700 hover:text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] transition-colors">Privacy</a>
              <a href="#" className="text-gray-700 hover:text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Components */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveItem}
        onCheckout={handleOpenCheckoutModal}
      />

      <FlavorModal 
        isOpen={!!flavoringProduct}
        product={flavoringProduct}
        onClose={() => setFlavoringProduct(null)}
        onSelect={handleFlavorSelect}
      />

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        onConfirm={handleFinalConfirm}
        items={cart}
      />
    </div>
  );
};

export default App;
