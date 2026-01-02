
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, User, Bot, Loader2 } from 'lucide-react';
import { getStyleAdvice } from '../services/geminiService';
import { PRODUCTS } from '../constants';

const StyleAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: "Namaste! I'm your AI Stylist. Looking for the perfect Kurti for a wedding, office, or casual brunch? Ask me anything!" }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    const catalogSummary = PRODUCTS.map(p => `${p.name} (₹${p.price}, ${p.category})`).join(', ');
    const advice = await getStyleAdvice(userMessage, catalogSummary);
    
    setLoading(false);
    setMessages(prev => [...prev, { role: 'bot', text: advice || "I'm sorry, I'm having trouble connecting to my fashion sense right now." }]);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-20 h-20 bg-gradient-to-br from-pink-600 to-purple-700 text-white rounded-full shadow-[0_20px_50px_rgba(219,39,119,0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 group animate-float"
      >
        <div className="absolute inset-0 rounded-full bg-pink-600 animate-ping opacity-20 group-hover:hidden"></div>
        <Sparkles className="w-10 h-10 group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-12 right-0 bg-white text-pink-600 text-[10px] font-black tracking-widest px-4 py-2 rounded-xl shadow-2xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-pink-100 uppercase">
          AI Fashion Concierge
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 md:inset-auto md:bottom-32 md:right-8 w-full md:w-[450px] h-full md:h-[700px] bg-white md:rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.15)] z-50 flex flex-col overflow-hidden border border-gray-100 animate-in slide-in-from-bottom-20 duration-500">
          <div className="bg-gradient-to-r from-pink-600 to-purple-700 p-8 text-white flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                <Sparkles className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-black text-xl tracking-tight">AI Fashion Stylist</h3>
                <p className="text-[10px] uppercase tracking-[0.2em] text-pink-100 font-bold">Personalized Boutique Guidance</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform p-2 bg-white/10 rounded-full">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-8 space-y-6 bg-gray-50/50 custom-scrollbar"
          >
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-${m.role === 'user' ? 'right' : 'left'}-4`}>
                <div className={`flex gap-4 max-w-[90%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-md ${m.role === 'user' ? 'bg-pink-100 text-pink-600' : 'bg-purple-100 text-purple-600'}`}>
                    {m.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                  </div>
                  <div className={`p-5 rounded-[1.5rem] text-sm leading-loose shadow-sm font-medium ${m.role === 'user' ? 'bg-pink-600 text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'}`}>
                    {m.text}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex gap-4 max-w-[90%]">
                  <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center shadow-md">
                    <Bot size={20} />
                  </div>
                  <div className="p-5 rounded-[1.5rem] bg-white text-gray-400 rounded-tl-none border border-gray-100 flex items-center gap-3">
                    <Loader2 className="w-5 h-5 animate-spin text-purple-500" />
                    <span className="text-xs font-bold uppercase tracking-widest italic">Styling your look...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-8 bg-white border-t border-gray-100">
            <div className="flex gap-3">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Style me for a royal wedding..."
                className="flex-1 bg-gray-50 border-2 border-gray-50 focus:border-pink-100 focus:bg-white rounded-2xl px-6 py-4 text-sm outline-none transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className="w-14 h-14 bg-pink-600 text-white rounded-2xl flex items-center justify-center hover:bg-pink-700 transition-all disabled:opacity-50 shadow-xl shadow-pink-600/20 active:scale-90"
              >
                <Send size={22} />
              </button>
            </div>
            <p className="text-[9px] text-center text-gray-400 mt-6 uppercase tracking-[0.4em] font-black">Powered by EthnicElite Intelligence</p>
          </div>
        </div>
      )}
    </>
  );
};

export default StyleAssistant;
