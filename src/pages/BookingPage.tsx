import React from 'react';
import { BookingForm } from '../components/BookingForm';
import { ShieldCheck, Phone, MessageCircle } from 'lucide-react';
import { BookingEnquiry } from '../types';

interface BookingPageProps {
  initialServiceId?: string;
  onBookingSuccess?: (booking: BookingEnquiry) => void;
}

export const BookingPage: React.FC<BookingPageProps> = ({ initialServiceId, onBookingSuccess }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Top Banner Alert */}
      <div className="clay-card-mint p-6 border border-[#B8DCC5] flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto text-center sm:text-left shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#176B52] text-white flex items-center justify-center shrink-0 shadow-sm">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[#0F4837]">
              100% Doorstep Repair Service in Pune
            </h3>
            <p className="text-xs text-[#176B52]/90">
              Our technician visits your home with materials and tools. No mattress pickup or delivery needed.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href="tel:8412937878"
            className="clay-button-primary text-xs px-4 py-2 font-bold"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call 8412937878</span>
          </a>
          <a
            href="https://wa.me/918412937878"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-[#25D366] text-white hover:scale-105 transition-transform"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
          </a>
        </div>
      </div>

      {/* Main Booking Form */}
      <BookingForm
        initialServiceId={initialServiceId}
        onBookingComplete={onBookingSuccess}
      />
    </div>
  );
};
