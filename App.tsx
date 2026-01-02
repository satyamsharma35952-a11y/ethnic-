
import React, { useState, useEffect } from 'react';
import Header from './components/Header.tsx';
import ProductCard from './components/ProductCard.tsx';
import StyleAssistant from './components/StyleAssistant.tsx';
import { PRODUCTS, CATEGORIES } from './constants.tsx';
import { Product, CartItem, View, Order } from './types.ts';
import { 
  ShoppingBag, ChevronRight, X, ArrowRight, ShieldCheck, 
  Truck, RefreshCw, Star, Heart, User, CreditCard, 
  CheckCircle2, MapPin, Smartphone, Landmark, Banknote, Loader2,
  Check, Quote, Award, Globe, HeartHandshake, Package, Box, Clock
} from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Checkout States
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const filteredProducts = selectedCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === selectedCategory);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev;
      }
      return [...prev, { ...product, quantity: 1, selectedSize: 'M', selectedColor: product.colors[0] }];
    });
  };

  const buyNow = (product: Product) => {
    const existing = cart.find(item => item.id === product.id);
    if (!existing) {
      setCart(prev => [...prev, { ...product, quantity: 1, selectedSize: 'M', selectedColor: product.colors[0] }]);
    }
    setCheckoutStep(1);
    setOrderComplete(false);
    setView('checkout');
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const newOrder: Order = {
        id: `EE-${Math.floor(Math.random() * 900000 + 100000)}`,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
        items: [...cart],
        total: cartTotal,
        status: 'Processing',
        trackingNumber: `TRK${Math.random().toString(36).toUpperCase().substring(2, 10)}`
      };
      setOrders(prev => [newOrder, ...prev]);
      setIsProcessing(false);
      setOrderComplete(true);
      setCart([]);
    }, 2500);
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const isItemInCart = (id: string) => cart.some(item => item.id === id);

  const renderHome = () => (
    <div className="space-y-24 pb-20 view-enter">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1590117582451-0759ed75c710?q=80&w=2000&auto=format&fit=crop" 
            className="w-full h-full object-cover brightness-[0.7] animate-slow-zoom"
            alt="Hero Background"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-white">
          <div className="max-w-3xl">
            <div className="stagger-item" style={{ animationDelay: '200ms' }}>
              <span className="inline-block px-5 py-2 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold tracking-[0.3em] uppercase mb-8 border border-white/20">
                Luxe Collection 2024
              </span>
            </div>
            <h1 className="text-7xl md:text-9xl font-serif font-bold leading-[1.1] mb-8 stagger-item" style={{ animationDelay: '400ms' }}>
              Timeless <br /> <span className="text-pink-400 italic font-normal">Grace</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed font-light max-w-xl stagger-item" style={{ animationDelay: '600ms' }}>
              Hand-woven perfection for the woman who defines her own elegance. Discover the artistry of ethnic elite.
            </p>
            <div className="flex flex-wrap gap-6 stagger-item" style={{ animationDelay: '800ms' }}>
              <button 
                onClick={() => setView('shop')}
                className="px-12 py-5 bg-pink-600 hover:bg-pink-700 text-white rounded-full font-bold transition-all shadow-2xl hover:shadow-pink-600/50 flex items-center gap-3 group"
              >
                Explore Shop <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-12 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full font-bold transition-all">
                The Heritage
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Press / Social Proof Strip */}
      <section className="max-w-7xl mx-auto px-6 py-10 opacity-40">
        <div className="flex flex-wrap justify-around items-center gap-12 grayscale">
          {['VOGUE', 'ELLE', 'BAZAAR', 'GRAZIA', 'COSMO'].map((brand) => (
            <span key={brand} className="text-2xl font-serif font-bold tracking-[0.4em]">{brand}</span>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 gap-4">
          <div>
            <span className="text-pink-600 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Our Curated Styles</span>
            <h2 className="text-5xl font-serif font-bold text-gray-900">Shop by Category</h2>
          </div>
          <button onClick={() => setView('shop')} className="group flex items-center gap-2 text-pink-600 font-bold hover:text-pink-700 transition-colors">
            Discover All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {['Anarkali', 'Straight', 'Ethnic Set', 'Short'].map((cat, i) => (
            <div 
              key={cat}
              onClick={() => { setSelectedCategory(cat); setView('shop'); }}
              className="stagger-item relative aspect-[3/4] rounded-[2rem] overflow-hidden cursor-pointer group shadow-lg"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <img src={PRODUCTS.find(p => p.category === cat)?.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60" />
              <div className="absolute bottom-10 left-10 text-white">
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-70 mb-2">Explore</p>
                <h3 className="text-3xl font-serif font-bold">{cat}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Artisan's Journey (Deep Trust Builder) */}
      <section className="bg-gray-950 text-white py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <div className="space-y-4">
                <span className="text-pink-500 font-bold tracking-[0.3em] uppercase text-xs">The Artisan's Promise</span>
                <h2 className="text-5xl md:text-7xl font-serif font-bold leading-tight">Authenticity in <br /> Every Thread</h2>
              </div>
              <p className="text-gray-400 text-xl leading-loose font-light">
                Each EthnicElite Kurti travels through the hands of master artisans. From the intricate hand-block prints of Jaipur to the delicate Chikankari of Lucknow, we preserve centuries of heritage.
              </p>
              <div className="grid grid-cols-2 gap-10">
                <div className="space-y-4">
                  <Globe className="text-pink-500 w-10 h-10" />
                  <h4 className="font-bold text-lg">Ethically Sourced</h4>
                  <p className="text-sm text-gray-500">Supporting over 500 weaving families across India.</p>
                </div>
                <div className="space-y-4">
                  <HeartHandshake className="text-pink-500 w-10 h-10" />
                  <h4 className="font-bold text-lg">Pure Fabrics</h4>
                  <p className="text-sm text-gray-500">100% natural fibers including organic cotton and mulberry silk.</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1610030469915-9a08fa996eec?q=80&w=1000&auto=format&fit=crop" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-pink-600 p-12 rounded-[2rem] hidden md:block animate-float">
                <Award className="w-12 h-12 mb-4" />
                <p className="font-black text-2xl">Certified Craft</p>
                <p className="text-pink-200 text-sm">Handicraft Mark Licensed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-pink-600 font-bold tracking-[0.4em] uppercase text-xs mb-6 block">Trending Now</span>
            <h2 className="text-6xl font-serif font-bold text-gray-900 mb-4">The Best Sellers</h2>
            <div className="w-24 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {PRODUCTS.filter(p => p.isBestSeller).slice(0, 8).map((product, i) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                index={i}
                onAddToCart={addToCart} 
                onViewDetails={(p) => { setSelectedProduct(p); setView('product'); }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-pink-50/50 py-32 border-y border-pink-100/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <Quote className="w-16 h-16 text-pink-200 mx-auto mb-8" />
            <h2 className="text-5xl font-serif font-bold text-gray-900">Loved by the Elite Circle</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                name: "Anjali R.", 
                loc: "Mumbai", 
                text: "The quality of the Chikankari is unlike anything I've bought online before. It feels like a boutique piece from Lucknow.", 
                img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" 
              },
              { 
                name: "Megha S.", 
                loc: "Delhi", 
                text: "I wore the Royal Blue Anarkali for my brother's wedding and received non-stop compliments. The fit was absolutely perfect.", 
                img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop" 
              },
              { 
                name: "Priya K.", 
                loc: "Bangalore", 
                text: "The AI Style Assistant actually helped me pick the right size for my body type. Exceptional shopping experience!", 
                img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop" 
              }
            ].map((t, idx) => (
              <div key={idx} className="bg-white p-12 rounded-[3rem] shadow-xl shadow-pink-100/20 relative stagger-item" style={{ animationDelay: `${idx * 200}ms` }}>
                <div className="flex items-center gap-4 mb-8">
                  <img src={t.img} className="w-16 h-16 rounded-2xl object-cover shadow-lg" alt={t.name} />
                  <div>
                    <h4 className="font-bold text-gray-900">{t.name}</h4>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400">{t.loc}</p>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-current" />)}
                </div>
                <p className="text-gray-600 italic leading-loose">"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotion Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-gradient-to-r from-pink-900 to-pink-700 rounded-[3rem] p-12 md:p-24 relative overflow-hidden flex flex-col md:flex-row items-center gap-16">
          <div className="relative z-10 flex-1">
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-white mb-8">Join the Elite Club</h2>
            <p className="text-pink-100 text-xl mb-12 max-w-md leading-relaxed">Early access to collection previews and a complimentary style consultation.</p>
            <div className="flex gap-4 max-w-md">
              <input type="email" placeholder="Your Email" className="bg-white/10 border border-white/20 rounded-2xl px-8 py-5 flex-1 outline-none text-white focus:bg-white/20 transition-all" />
              <button className="bg-white text-pink-700 px-10 py-5 rounded-2xl font-black hover:bg-pink-50 transition-colors uppercase tracking-widest text-xs">Join</button>
            </div>
          </div>
          <div className="relative z-10 w-full md:w-1/3">
             <div className="aspect-[4/5] rounded-3xl overflow-hidden border-8 border-white/10 rotate-3 hover:rotate-0 transition-transform duration-700">
                <img src="https://images.unsplash.com/photo-1627484351109-433390c58a69?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Model" />
             </div>
          </div>
        </div>
      </section>

      {/* Enhanced Trust Section */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 py-20">
        {[
          { icon: <ShieldCheck className="w-10 h-10 text-pink-600" />, title: 'Secure Boutique Pay', desc: 'Bank-grade encryption for all transactions.' },
          { icon: <Truck className="w-10 h-10 text-pink-600" />, title: 'Premium Delivery', desc: 'Handled with care. Free on all orders above ₹999.' },
          { icon: <RefreshCw className="w-10 h-10 text-pink-600" />, title: 'Hassle-Free Returns', desc: '15-day return window for perfect satisfaction.' },
          { icon: <Star className="w-10 h-10 text-pink-600" />, title: 'Fabric Quality Check', desc: 'Every piece undergoes a 3-point inspection.' },
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col items-center text-center group">
            <div className="mb-6 p-6 bg-pink-50 rounded-[2rem] group-hover:bg-pink-600 group-hover:text-white transition-all duration-500 transform group-hover:-rotate-6">
              {React.cloneElement(item.icon as React.ReactElement, { className: "w-10 h-10 transition-colors" })}
            </div>
            <h4 className="font-black text-gray-900 text-lg mb-3 tracking-tight">{item.title}</h4>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">{item.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );

  const renderShop = () => (
    <div className="max-w-7xl mx-auto px-6 py-20 view-enter">
      <div className="flex flex-col lg:flex-row gap-16">
        <aside className="w-full lg:w-72 space-y-12">
          <div className="stagger-item">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-900 mb-8 pb-4 border-b-2 border-pink-100">Curation</h3>
            <div className="flex flex-col space-y-4">
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setSelectedCategory(cat)} className={`text-left text-sm transition-all flex items-center justify-between group ${selectedCategory === cat ? 'text-pink-600 font-bold translate-x-2' : 'text-gray-500 hover:text-pink-600 hover:translate-x-2'}`}>
                  {cat}
                  <ChevronRight size={14} className={selectedCategory === cat ? 'opacity-100' : 'opacity-0'} />
                </button>
              ))}
            </div>
          </div>
          <div className="p-8 bg-gradient-to-br from-pink-50 to-purple-50 rounded-[2.5rem] border border-pink-100">
            <h4 className="font-bold text-pink-900 text-lg mb-3">Stylist Concierge</h4>
            <p className="text-sm text-pink-700 mb-6">Need help choosing a fabric? Chat with our AI.</p>
            <button className="bg-pink-600 text-white w-full py-4 rounded-full text-xs font-bold uppercase tracking-widest">Start Chat</button>
          </div>
        </aside>
        <div className="flex-1">
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-12">{selectedCategory} Collection</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProducts.map((product, i) => (
              <ProductCard 
                key={product.id} product={product} index={i}
                onAddToCart={addToCart} 
                onViewDetails={(p) => { setSelectedProduct(p); setView('product'); }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderProductDetail = () => {
    if (!selectedProduct) return null;
    const itemInBag = isItemInCart(selectedProduct.id);
    
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 view-enter">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl">
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110" />
          </div>
          <div className="flex flex-col justify-center space-y-10">
            <div className="space-y-6">
              <span className="text-pink-600 font-black tracking-widest text-xs uppercase px-5 py-2 bg-pink-50 rounded-full inline-block">{selectedProduct.category}</span>
              <h1 className="text-6xl font-serif font-bold text-gray-900 leading-tight">{selectedProduct.name}</h1>
              <div className="flex items-center gap-6">
                <div className="flex items-center text-yellow-400 bg-gray-50 px-4 py-2 rounded-xl">
                  <Star size={20} className="fill-current" />
                  <span className="text-xl font-black text-gray-800 ml-2">{selectedProduct.rating}</span>
                </div>
                <span className="text-gray-400 text-sm">({selectedProduct.reviews} reviews)</span>
              </div>
            </div>

            <div className="flex items-baseline gap-6 border-y border-gray-100 py-10">
              <span className="text-5xl font-black text-gray-900">₹{selectedProduct.price}</span>
              <span className="text-2xl text-gray-400 line-through">₹{selectedProduct.originalPrice}</span>
              <span className="text-xl font-bold text-green-600 px-5 py-2 bg-green-50 rounded-2xl">
                Save {Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100)}%
              </span>
            </div>

            <p className="text-gray-600 leading-relaxed text-xl italic border-l-4 border-pink-200 pl-8 bg-pink-50/20 py-6 rounded-r-3xl">
              "{selectedProduct.description}"
            </p>
            
            <div className="flex gap-6">
              {itemInBag ? (
                <button 
                  onClick={() => setView('cart')}
                  className="flex-1 bg-gray-50 border-2 border-emerald-100 text-emerald-600 h-20 rounded-[2rem] font-black text-lg transition-all flex items-center justify-center gap-2 group"
                >
                  In Your Bag <Check size={24} className="group-hover:scale-110 transition-transform" />
                </button>
              ) : (
                <button 
                  onClick={() => addToCart(selectedProduct)}
                  className="flex-1 bg-white border-2 border-gray-200 text-gray-900 h-20 rounded-[2rem] font-black text-lg hover:border-pink-600 hover:text-pink-600 transition-all flex items-center justify-center gap-2"
                >
                  Add To Bag <ShoppingBag size={20} />
                </button>
              )}
              <button 
                onClick={() => buyNow(selectedProduct)}
                className="flex-[2] bg-pink-600 text-white h-20 rounded-[2rem] font-black text-lg hover:bg-pink-700 transition-all shadow-xl shadow-pink-600/20 active:scale-95 flex items-center justify-center gap-3"
              >
                Buy Now <ArrowRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderCart = () => (
    <div className="max-w-7xl mx-auto px-6 py-20 view-enter">
      <h2 className="text-5xl font-serif font-bold mb-16 text-gray-900">Shopping Bag</h2>
      {cart.length === 0 ? (
        <div className="text-center py-40 bg-gray-50 rounded-[3rem]">
          <ShoppingBag size={60} className="mx-auto mb-8 text-pink-200" />
          <h3 className="text-3xl font-serif font-bold mb-6">Your bag is empty</h3>
          <button onClick={() => setView('shop')} className="px-12 py-5 bg-pink-600 text-white rounded-full font-black uppercase tracking-widest text-xs">Start Shopping</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-8">
            {cart.map((item, idx) => (
              <div key={item.id} className="flex gap-8 p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group stagger-item" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="w-32 aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                  <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                   <div>
                     <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">{item.name}</h3>
                     <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Size: {item.selectedSize} | Color: {item.selectedColor}</p>
                   </div>
                   <div className="flex justify-between items-end mt-8">
                      <div className="flex items-center gap-6 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                        <button onClick={() => updateQuantity(item.id, -1)} className="px-4 font-black hover:text-pink-600">-</button>
                        <span className="font-black text-lg">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="px-4 font-black hover:text-pink-600">+</button>
                      </div>
                      <div className="text-right">
                        <span className="block text-sm text-gray-400 line-through">₹{item.originalPrice * item.quantity}</span>
                        <span className="text-3xl font-black text-gray-900">₹{item.price * item.quantity}</span>
                      </div>
                   </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-10 bg-gray-950 rounded-[3rem] text-white h-max sticky top-32">
            <h3 className="text-2xl font-serif font-bold mb-10 border-b border-white/10 pb-8">Order Total</h3>
            <div className="space-y-6 mb-12">
               <div className="flex justify-between text-gray-400 font-medium">
                  <span>Subtotal</span>
                  <span>₹{cartTotal}</span>
               </div>
               <div className="flex justify-between text-gray-400 font-medium">
                  <span>Shipping</span>
                  <span className="text-emerald-400 font-black uppercase tracking-widest text-[10px]">Free</span>
               </div>
               <div className="h-px bg-white/10"></div>
               <div className="flex justify-between items-baseline">
                  <span className="text-xl font-bold">Total Due</span>
                  <span className="text-4xl font-black text-pink-500">₹{cartTotal}</span>
               </div>
            </div>
            <button 
              onClick={() => { setCheckoutStep(1); setView('checkout'); }}
              className="w-full bg-pink-600 text-white py-6 rounded-2xl font-black text-xl shadow-xl shadow-pink-600/30 flex items-center justify-center gap-3 transition-transform active:scale-95"
            >
              Secure Checkout <ArrowRight size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderCheckout = () => {
    if (orderComplete) {
      return (
        <div className="max-w-7xl mx-auto px-6 py-40 text-center view-enter">
          <div className="w-40 h-40 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl animate-bounce">
            <CheckCircle2 size={80} />
          </div>
          <h2 className="text-6xl font-serif font-bold mb-6 text-gray-900">Namaste! Success!</h2>
          <p className="text-xl text-gray-500 max-w-xl mx-auto mb-12 leading-relaxed">
            Your exquisite piece is being prepared for its journey to you. A confirmation email has been sent.
          </p>
          <div className="flex justify-center gap-6">
            <button onClick={() => setView('home')} className="px-12 py-5 bg-gray-900 text-white rounded-full font-black uppercase tracking-widest text-xs">Home</button>
            <button onClick={() => setView('orders')} className="px-12 py-5 bg-pink-600 text-white rounded-full font-black uppercase tracking-widest text-xs shadow-lg shadow-pink-600/20">Track My Order</button>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-5xl mx-auto px-6 py-20 view-enter">
        <div className="flex items-center gap-4 mb-20">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black transition-all ${checkoutStep >= 1 ? 'bg-pink-600 text-white shadow-lg' : 'bg-gray-100 text-gray-400'}`}>1</div>
          <div className="h-px bg-gray-200 flex-1"></div>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black transition-all ${checkoutStep >= 2 ? 'bg-pink-600 text-white shadow-lg' : 'bg-gray-100 text-gray-400'}`}>2</div>
          <div className="h-px bg-gray-200 flex-1"></div>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black transition-all ${checkoutStep >= 3 ? 'bg-pink-600 text-white shadow-lg' : 'bg-gray-100 text-gray-400'}`}>3</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            {checkoutStep === 1 && (
              <div className="space-y-10 animate-in fade-in slide-in-from-left-4">
                <h2 className="text-4xl font-serif font-bold text-gray-900">Shipping Details</h2>
                <div className="grid grid-cols-2 gap-6">
                  <input type="text" placeholder="Full Name" className="col-span-2 p-5 bg-gray-50 border-none rounded-2xl outline-none focus:ring-4 ring-pink-50 transition-all font-medium" />
                  <input type="text" placeholder="Phone" className="p-5 bg-gray-50 border-none rounded-2xl outline-none focus:ring-4 ring-pink-50 transition-all font-medium" />
                  <input type="text" placeholder="Email" className="p-5 bg-gray-50 border-none rounded-2xl outline-none focus:ring-4 ring-pink-50 transition-all font-medium" />
                  <input type="text" placeholder="House/Flat No." className="col-span-2 p-5 bg-gray-50 border-none rounded-2xl outline-none focus:ring-4 ring-pink-50 transition-all font-medium" />
                  <input type="text" placeholder="City" className="p-5 bg-gray-50 border-none rounded-2xl outline-none focus:ring-4 ring-pink-50 transition-all font-medium" />
                  <input type="text" placeholder="Pincode" className="p-5 bg-gray-50 border-none rounded-2xl outline-none focus:ring-4 ring-pink-50 transition-all font-medium" />
                </div>
                <button onClick={() => setCheckoutStep(2)} className="w-full py-6 bg-pink-600 text-white rounded-2xl font-black text-xl shadow-xl shadow-pink-600/20 active:scale-95 transition-transform">
                  Proceed to Payment
                </button>
              </div>
            )}

            {checkoutStep === 2 && (
              <div className="space-y-10 animate-in fade-in slide-in-from-left-4">
                <h2 className="text-4xl font-serif font-bold text-gray-900">Payment Selection</h2>
                <div className="space-y-5">
                  {[
                    { id: 'upi', icon: <Smartphone />, label: 'UPI / Google Pay', desc: 'Secure phone payments' },
                    { id: 'card', icon: <CreditCard />, label: 'Credit / Debit Card', desc: 'All major banks supported' },
                    { id: 'cod', icon: <Banknote />, label: 'Cash on Delivery', desc: 'Pay when your Kurti arrives' },
                  ].map((p) => (
                    <div 
                      key={p.id}
                      onClick={() => setPaymentMethod(p.id)}
                      className={`p-8 rounded-[2rem] border-2 transition-all cursor-pointer flex items-center gap-8 ${paymentMethod === p.id ? 'border-pink-600 bg-pink-50' : 'border-gray-100 hover:border-pink-200'}`}
                    >
                      <div className={`p-5 rounded-2xl ${paymentMethod === p.id ? 'bg-pink-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                        {p.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-black text-gray-900 text-lg">{p.label}</h4>
                        <p className="text-sm text-gray-500 font-medium">{p.desc}</p>
                      </div>
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${paymentMethod === p.id ? 'border-pink-600 bg-pink-600' : 'border-gray-300'}`}>
                        {paymentMethod === p.id && <div className="w-3 h-3 bg-white rounded-full"></div>}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-6">
                  <button onClick={() => setCheckoutStep(1)} className="flex-1 py-6 border-2 border-gray-100 rounded-2xl font-black text-gray-400 uppercase tracking-widest text-xs">Back</button>
                  <button 
                    onClick={() => setCheckoutStep(3)} 
                    disabled={!paymentMethod}
                    className="flex-[2] py-6 bg-pink-600 text-white rounded-2xl font-black text-xl disabled:opacity-50"
                  >
                    Review Final Order
                  </button>
                </div>
              </div>
            )}

            {checkoutStep === 3 && (
              <div className="space-y-10 animate-in fade-in slide-in-from-left-4">
                <h2 className="text-4xl font-serif font-bold text-gray-900">Order Summary</h2>
                <div className="p-10 bg-gray-50 rounded-[3rem] space-y-8">
                  <div className="flex justify-between items-center pb-8 border-b border-gray-200">
                    <span className="text-gray-500 font-bold uppercase tracking-widest text-xs">Method</span>
                    <span className="font-black text-gray-900 text-xl uppercase tracking-tighter">{paymentMethod}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-bold uppercase tracking-widest text-xs">Grand Total</span>
                    <span className="text-5xl font-black text-pink-600 tracking-tighter">₹{cartTotal}</span>
                  </div>
                </div>
                <div className="p-8 border-2 border-dashed border-pink-200 rounded-[2rem] flex items-center gap-6 bg-pink-50/20">
                  <ShieldCheck size={40} className="text-pink-600 flex-shrink-0" />
                  <p className="text-sm text-pink-800 font-medium leading-relaxed">
                    EthnicElite Boutique Guarantee: 100% encrypted transaction and artisanal quality assurance.
                  </p>
                </div>
                <button 
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full py-8 bg-pink-600 text-white rounded-[2.5rem] font-black text-2xl shadow-2xl shadow-pink-600/30 flex items-center justify-center gap-4 active:scale-95 transition-transform"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="animate-spin" /> Finalizing...
                    </>
                  ) : (
                    <>Confirm & Pay <CheckCircle2 size={32} /></>
                  )}
                </button>
              </div>
            )}
          </div>

          <div className="lg:sticky lg:top-32 h-max space-y-10">
            <div className="p-10 bg-white rounded-[3rem] border border-gray-100 shadow-2xl">
               <h3 className="text-2xl font-serif font-bold text-gray-900 mb-8 border-b border-gray-50 pb-6">Your Curation</h3>
               <div className="space-y-6 max-h-[450px] overflow-y-auto custom-scrollbar pr-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-6 items-center">
                      <img src={item.image} className="w-20 aspect-[3/4] object-cover rounded-2xl shadow-md" />
                      <div className="flex-1">
                        <h4 className="text-lg font-serif font-bold text-gray-800">{item.name}</h4>
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Qty: {item.quantity} | {item.selectedSize}</p>
                        <p className="text-xl font-black text-pink-600 mt-2">₹{item.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderOrders = () => (
    <div className="max-w-7xl mx-auto px-6 py-20 view-enter">
      <div className="mb-16">
        <h2 className="text-6xl font-serif font-bold text-gray-900 mb-4">My Boutique Orders</h2>
        <p className="text-gray-500 font-medium tracking-wide">Tracking your journey of elegance.</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-40 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
          <Package size={80} className="mx-auto mb-8 text-gray-200" />
          <h3 className="text-3xl font-serif font-bold mb-6">No orders found</h3>
          <p className="text-gray-400 mb-10">Your collection awaits its first masterpiece.</p>
          <button onClick={() => setView('shop')} className="px-12 py-5 bg-pink-600 text-white rounded-full font-black uppercase tracking-widest text-xs">Browse Catalog</button>
        </div>
      ) : (
        <div className="space-y-16">
          {orders.map((order, idx) => (
            <div key={order.id} className="bg-white rounded-[3rem] border border-gray-100 shadow-xl overflow-hidden stagger-item" style={{ animationDelay: `${idx * 150}ms` }}>
              <div className="bg-gray-50 p-10 flex flex-wrap justify-between items-center gap-8 border-b border-gray-100">
                <div className="flex gap-12">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Order Date</p>
                    <p className="font-bold text-gray-900">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Total Value</p>
                    <p className="font-bold text-pink-600 text-xl">₹{order.total}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Order ID</p>
                    <p className="font-mono font-bold text-gray-900">{order.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="font-black text-gray-900 uppercase tracking-widest text-xs">{order.status}</span>
                </div>
              </div>

              <div className="p-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                  {/* Item List */}
                  <div className="space-y-8">
                    {order.items.map(item => (
                      <div key={item.id} className="flex gap-6 items-center">
                        <img src={item.image} className="w-20 aspect-[3/4] object-cover rounded-2xl shadow-md" />
                        <div>
                          <h4 className="text-lg font-serif font-bold text-gray-900">{item.name}</h4>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Qty: {item.quantity} | Size: {item.selectedSize}</p>
                          <p className="font-black text-pink-600 mt-1">₹{item.price * item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tracking Timeline */}
                  <div className="relative pl-12 space-y-12">
                    <div className="absolute left-4 top-2 bottom-2 w-px bg-pink-100"></div>
                    
                    {[
                      { status: 'Placed', icon: <CheckCircle2 />, label: 'Order Confirmed', time: 'Today, 2:45 PM', completed: true },
                      { status: 'Artisan', icon: <Box />, label: 'Quality Check by Artisan', time: 'Scheduled for tomorrow', completed: false },
                      { status: 'Shipped', icon: <Truck />, label: 'Handed to Premium Courier', time: 'Estimated Wednesday', completed: false },
                      { status: 'Delivered', icon: <Heart />, label: 'Delivered with Love', time: 'Estimated Friday', completed: false },
                    ].map((step, sIdx) => (
                      <div key={sIdx} className={`relative flex items-center gap-8 ${step.completed ? 'opacity-100' : 'opacity-40'}`}>
                        <div className={`absolute -left-11 w-6 h-6 rounded-full border-2 flex items-center justify-center bg-white z-10 transition-all ${step.completed ? 'border-pink-600 text-pink-600 scale-125 shadow-lg shadow-pink-100' : 'border-gray-200 text-gray-300'}`}>
                          {React.cloneElement(step.icon as React.ReactElement, { size: 12 })}
                        </div>
                        <div>
                          <h5 className="font-black text-gray-900 uppercase tracking-widest text-xs">{step.label}</h5>
                          <p className="text-sm text-gray-500 font-medium">{step.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-12 pt-12 border-t border-gray-50 flex justify-between items-center">
                  <div className="flex gap-4">
                    <button className="px-8 py-3 bg-gray-50 text-gray-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-100 transition-colors">Order Invoice</button>
                    <button className="px-8 py-3 bg-gray-50 text-gray-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-100 transition-colors">Need Help?</button>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">Tracking ID</p>
                    <p className="font-mono text-gray-900 font-bold">{order.trackingNumber}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-pink-100 selection:text-pink-900">
      <Header 
        cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)} 
        setView={setView} 
        currentView={view}
      />
      
      <main>
        {view === 'home' && renderHome()}
        {view === 'shop' && renderShop()}
        {view === 'product' && renderProductDetail()}
        {view === 'cart' && renderCart()}
        {view === 'checkout' && renderCheckout()}
        {view === 'orders' && renderOrders()}
        {view === 'profile' && (
          <div className="max-w-7xl mx-auto px-6 py-40 text-center view-enter">
            <div className="w-40 h-40 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-10 text-pink-600 shadow-inner animate-float">
              <User size={80} />
            </div>
            <h2 className="text-6xl font-serif font-bold mb-6 text-gray-900">The Boutique Studio</h2>
            <div className="flex flex-wrap justify-center gap-6 mt-12">
              <button onClick={() => setView('orders')} className="px-12 py-5 bg-pink-600 text-white rounded-full font-black uppercase tracking-widest text-xs shadow-lg">My Orders</button>
              <button onClick={() => setView('home')} className="px-12 py-5 border-2 border-gray-200 rounded-full font-black uppercase tracking-widest text-xs">Return to Home</button>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-gray-950 text-gray-500 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-20 mb-32">
          <div className="space-y-8">
            <div className="flex flex-col">
              <span className="text-4xl font-bold tracking-widest text-white font-serif uppercase">EthnicElite</span>
              <span className="text-[10px] tracking-[0.5em] text-pink-500 font-bold uppercase -mt-2">Timeless Heritage</span>
            </div>
            <p className="text-sm leading-loose opacity-60">
              Defining modern Indian elegance through traditional craft and ethical manufacturing. Every thread tells a story.
            </p>
          </div>
          <div>
            <h4 className="text-white font-black mb-10 text-xs uppercase tracking-widest">Curation</h4>
            <ul className="space-y-5 text-sm">
              <li className="hover:text-pink-400 cursor-pointer transition-colors" onClick={() => setView('shop')}>Royal Anarkalis</li>
              <li className="hover:text-pink-400 cursor-pointer transition-colors" onClick={() => setView('shop')}>Daily Cotton</li>
              <li className="hover:text-pink-400 cursor-pointer transition-colors" onClick={() => setView('shop')}>Mirror Work</li>
              <li className="hover:text-pink-400 cursor-pointer transition-colors" onClick={() => setView('shop')}>Hand-block</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black mb-10 text-xs uppercase tracking-widest">Account</h4>
            <ul className="space-y-5 text-sm">
              <li className="hover:text-pink-400 cursor-pointer transition-colors" onClick={() => setView('orders')}>Track Orders</li>
              <li className="hover:text-pink-400 cursor-pointer transition-colors" onClick={() => setView('profile')}>My Profile</li>
              <li className="hover:text-pink-400 cursor-pointer transition-colors" onClick={() => setView('cart')}>My Bag</li>
              <li className="hover:text-pink-400 cursor-pointer transition-colors">Wishlist</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black mb-10 text-xs uppercase tracking-widest">Newsletter</h4>
            <p className="text-sm mb-8 opacity-60">Invitations to private previews.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email" className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 flex-1 outline-none text-white focus:border-pink-500" />
              <button className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-black text-xs uppercase">Join</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <p className="text-[10px] font-black tracking-[0.4em] uppercase text-gray-700">© 2024 ETHNICELITE. DESIGNED FOR THE ROYAL SOUL.</p>
          <div className="flex gap-12 text-[10px] uppercase tracking-[0.4em] font-black text-gray-700">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
          </div>
        </div>
      </footer>

      <StyleAssistant />
    </div>
  );
};

export default App;