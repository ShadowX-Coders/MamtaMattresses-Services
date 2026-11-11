import React from 'react';
import { Home, Calendar, Phone, MessageCircle } from 'lucide-react';
import { NavigationPage } from '../types';

interface NotFoundPageProps {
  onNavigate: (page: NavigationPage) => void;
  onBookClick: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate, onBookClick }) => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-20 h-20 rounded-full bg-[#EAF1E8] text-[#176B52] mx-auto flex items-center justify-center font-extrabold text-2xl shadow-clay">
        404
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#202824]">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-[#718078] max-w-md mx-auto">
          The page you requested does not exist or may have moved. You can return to our homepage or request an at-home mattress repair appointment below.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        <button
          onClick={() => onNavigate('home')}
          className="clay-button-primary px-6 py-3 text-xs sm:text-sm font-bold w-full sm:w-auto"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </button>

        <button
          onClick={onBookClick}
          className="clay-button-secondary px-6 py-3 text-xs sm:text-sm font-bold w-full sm:w-auto"
        >
          <Calendar className="w-4 h-4 text-[#176B52]" />
          <span>Book A Repair</span>
        </button>
      </div>

      <div className="pt-8 text-xs text-[#718078] flex items-center justify-center gap-4">
        <a href="tel:8412937878" className="hover:text-[#176B52] flex items-center gap-1 font-semibold">
          <Phone className="w-3.5 h-3.5" /> 8412937878
        </a>
        <span>•</span>
        <a href="https://wa.me/918412937878" target="_blank" rel="noopener noreferrer" className="hover:text-[#176B52] flex items-center gap-1 font-semibold">
          <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" /> WhatsApp Support
        </a>
      </div>
    </div>
  );
};
