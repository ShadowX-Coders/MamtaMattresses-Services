import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Phone, 
  MessageCircle, 
  Calendar, 
  Home, 
  Sparkles, 
  Info, 
  Star, 
  Mail, 
  ShieldCheck
} from 'lucide-react';
import { NavigationPage } from '../types';
import { openWhatsAppBooking, openWhatsAppEnquiry } from '../utils/whatsapp';

interface NavbarProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  onBookClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; page: NavigationPage; icon: React.ReactNode }[] = [
    { label: 'Home', page: 'home', icon: <Home className="w-4 h-4" /> },
    { label: 'Services', page: 'services', icon: <Sparkles className="w-4 h-4" /> },
    { label: 'About Us', page: 'about', icon: <Info className="w-4 h-4" /> },
    { label: 'Reviews', page: 'reviews', icon: <Star className="w-4 h-4" /> },
    { label: 'Contact', page: 'contact', icon: <Mail className="w-4 h-4" /> },
  ];

  const handleNavClick = (page: NavigationPage) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookNow = () => {
    setIsMobileMenuOpen(false);
    openWhatsAppBooking();
  };

  const handleWhatsAppUs = () => {
    setIsMobileMenuOpen(false);
    openWhatsAppEnquiry();
  };

  return (
    <>
      {/* Top Banner Notice: At-Home Service Highlight */}
      <div className="bg-[#176B52] text-white text-xs font-medium py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-2">
        <ShieldCheck className="w-3.5 h-3.5 text-[#B8DCC5] shrink-0" />
        <span>
          Pune Doorstep Service: <strong className="font-semibold text-[#DCEBE2]">Technician visits & repairs at your home</strong>. No pickup or delivery hassle!
        </span>
        <span className="hidden md:inline text-[#B8DCC5]">•</span>
        <a href="tel:8412937878" className="hidden md:inline-flex items-center gap-1 text-[#DCEBE2] hover:text-white underline font-semibold">
          <Phone className="w-3 h-3" /> Call: 8412937878
        </a>
      </div>

      {/* Main Navbar */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#F7F8F4]/95 backdrop-blur-md shadow-[0_4px_20px_rgba(23,107,82,0.08)] py-3 border-b border-[#DCEBE2]/80' 
            : 'bg-[#F7F8F4] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <button 
              onClick={() => handleNavClick('home')} 
              className="text-left group flex items-center gap-3 focus:outline-none"
            >
              <div className="w-11 h-11 rounded-2xl bg-[#176B52] text-white flex items-center justify-center shadow-[4px_6px_14px_rgba(23,107,82,0.25)] group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 4v16"/>
                  <path d="M2 8h18a2 2 0 0 1 2 2v10"/>
                  <path d="M2 17h20"/>
                  <path d="M6 8v9"/>
                </svg>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#176B52] leading-none">
                  MAMTA MATTRESSES
                </div>
                <div className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#718078] uppercase mt-0.5">
                  REPAIRING SERVICE
                </div>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 bg-white/80 border border-[#DCEBE2] px-3 py-1.5 rounded-full shadow-[2px_4px_12px_rgba(23,107,82,0.04)]">
              {navLinks.map((item) => {
                const isActive = currentPage === item.page;
                return (
                  <button
                    key={item.page}
                    onClick={() => handleNavClick(item.page)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                      isActive 
                        ? 'bg-[#176B52] text-white shadow-sm' 
                        : 'text-[#202824] hover:text-[#176B52] hover:bg-[#EAF1E8]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              {/* WhatsApp Secondary CTA */}
              <button
                onClick={handleWhatsAppUs}
                className="clay-button-secondary text-xs lg:text-sm px-4 py-2.5"
                title="Chat with us on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-[#176B52]" />
                <span>WhatsApp Us</span>
              </button>

              {/* Primary Book CTA -> Direct WhatsApp Booking */}
              <button
                onClick={handleBookNow}
                className="clay-button-primary text-xs lg:text-sm px-5 py-2.5"
                title="Book an at-home mattress repair via WhatsApp (+91 8412937878)"
              >
                <Calendar className="w-4 h-4 text-white" />
                <span>BOOK A REPAIR</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={handleBookNow}
                className="clay-button-primary text-xs px-3 py-2"
              >
                <span>BOOK</span>
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl bg-white border border-[#DCEBE2] text-[#202824] shadow-sm hover:text-[#176B52]"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-[#DCEBE2] bg-[#F7F8F4] px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top">
            <div className="space-y-1">
              {navLinks.map((item) => {
                const isActive = currentPage === item.page;
                return (
                  <button
                    key={item.page}
                    onClick={() => handleNavClick(item.page)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                      isActive 
                        ? 'bg-[#176B52] text-white' 
                        : 'text-[#202824] hover:bg-[#EAF1E8]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    {isActive && <span className="w-2 h-2 rounded-full bg-[#B8DCC5]" />}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 pt-4 border-t border-[#DCEBE2] space-y-2.5">
              <button
                onClick={handleBookNow}
                className="w-full clay-button-primary py-3 text-sm font-bold shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>BOOK AN AT-HOME REPAIR</span>
              </button>

              <button
                onClick={handleWhatsAppUs}
                className="w-full clay-button-secondary py-3 text-sm font-semibold"
              >
                <MessageCircle className="w-4 h-4 text-[#176B52]" />
                <span>Chat on WhatsApp (+91 8412937878)</span>
              </button>

              <a
                href="tel:8412937878"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 text-xs text-[#176B52] font-semibold bg-white border border-[#DCEBE2] rounded-xl"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Direct Call: 8412937878</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
