import React, { useState } from 'react';
import { MessageCircle, X, ChevronRight, Sparkles } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const predefinedQueries = [
    {
      title: 'General Enquiry',
      text: 'Hello Mamta Mattresses Repairing Service, I would like to enquire about mattress repairing services in Pune.'
    },
    {
      title: 'Sagging & Foam Repair',
      text: 'Hello, I want to enquire about Mattress Sagging Repair & Foam Replacement at my home in Pune.'
    },
    {
      title: 'Spring / Noise Repair',
      text: 'Hello, my mattress springs are squeaking and popping. Please share repair details and at-home charges.'
    },
    {
      title: 'Mattress Resizing',
      text: 'Hello, I need to resize my mattress to fit my cot. Please share the procedure and technician visit details.'
    }
  ];

  const handleOpenChat = (customText?: string) => {
    const message = encodeURIComponent(
      customText || 'Hello Mamta Mattresses Repairing Service, I would like to enquire about mattress repairing services in Pune.'
    );
    window.open(`https://wa.me/918412937878?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Quick Menu Popover */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-3xl bg-white border border-[#DCEBE2] shadow-2xl p-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAF1E8]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md">
                <MessageCircle className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#202824]">Mamta Mattresses Support</h4>
                <div className="flex items-center gap-1.5 text-[11px] text-[#176B52] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
                  <span>Online for Pune Doorstep Service</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-[#718078] hover:bg-[#EAF1E8] transition-colors"
              aria-label="Close WhatsApp options"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[#718078] mt-2.5 mb-3 leading-relaxed">
            Need immediate advice on mattress repair or foam density? Pick a quick enquiry below:
          </p>

          <div className="space-y-1.5">
            {predefinedQueries.map((q, idx) => (
              <button
                key={idx}
                onClick={() => {
                  handleOpenChat(q.text);
                  setIsOpen(false);
                }}
                className="w-full text-left p-2.5 rounded-2xl bg-[#F7F8F4] hover:bg-[#EAF1E8] border border-[#DCEBE2]/80 transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-[#176B52] group-hover:text-[#0F4837] flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#176B52]" />
                    {q.title}
                  </div>
                  <div className="text-[11px] text-[#718078] line-clamp-1 mt-0.5">
                    {q.text}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#718078] group-hover:text-[#176B52] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
              </button>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-[#EAF1E8] flex items-center justify-between">
            <span className="text-[11px] text-[#718078]">Direct Number: +91 8412937878</span>
            <button
              onClick={() => handleOpenChat()}
              className="text-xs font-bold text-[#176B52] hover:underline"
            >
              Open Direct Chat →
            </button>
          </div>
        </div>
      )}

      {/* Floating Button with claymorphic elevation & pulse */}
      <div className="relative group flex items-center">
        
        {/* Subtle hover tooltip when closed */}
        {!isOpen && (
          <div className="hidden sm:block absolute right-16 top-1/2 -translate-y-1/2 mr-2 whitespace-nowrap bg-white text-[#176B52] text-xs font-bold py-1.5 px-3 rounded-full border border-[#DCEBE2] shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Chat with Technician
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_8px_24px_rgba(37,211,102,0.45)] hover:shadow-[0_12px_28px_rgba(37,211,102,0.55)] hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-white focus:outline-none"
          aria-label="Open WhatsApp live chat options"
        >
          {isOpen ? (
            <X className="w-6 h-6 stroke-[2.5]" />
          ) : (
            <MessageCircle className="w-7 h-7 fill-white stroke-[0]" />
          )}
        </button>

        {/* Ambient Ring Wave */}
        {!isOpen && (
          <span className="absolute -inset-1 rounded-full border-2 border-[#25D366]/40 animate-ping pointer-events-none" />
        )}
      </div>
    </div>
  );
};
