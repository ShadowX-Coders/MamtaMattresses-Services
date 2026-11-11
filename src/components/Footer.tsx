import React from 'react';
import { Phone, MessageCircle, Mail, MapPin, Clock, ShieldCheck, ChevronRight } from 'lucide-react';
import { NavigationPage } from '../types';
import { openWhatsAppBooking } from '../utils/whatsapp';

interface FooterProps {
  onNavigate: (page: NavigationPage) => void;
  onBookClick?: () => void;
  onSelectService?: (serviceId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectService }) => {
  const handleNav = (page: NavigationPage) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceClick = (serviceId: string) => {
    if (onSelectService) {
      onSelectService(serviceId);
    } else {
      onNavigate('services');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookNow = () => {
    openWhatsAppBooking();
  };

  return (
    <footer className="bg-[#0F4837] text-[#DCEBE2] pt-16 pb-12 border-t border-[#176B52]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* At-Home Assurance Card Banner */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-[#176B52]/60 border border-[#B8DCC5]/20 backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#DCEBE2] text-[#0F4837] flex items-center justify-center shrink-0 shadow-md">
              <ShieldCheck className="w-6 h-6 text-[#176B52]" />
            </div>
            <div>
              <h4 className="text-white text-lg font-bold">100% At-Home Mattress Repair Across Pune</h4>
              <p className="text-xs sm:text-sm text-[#DCEBE2]/90 mt-1 max-w-2xl">
                Our expert technician visits your home with certified materials and professional tools to inspect and repair your mattress on-site. No pickup or delivery required — your mattress never leaves your home.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={handleBookNow}
              className="w-full md:w-auto bg-[#FFFFFF] text-[#176B52] hover:bg-[#DCEBE2] px-6 py-3 rounded-full text-sm font-bold shadow-lg transition-all"
            >
              Request At-Home Repair
            </button>
            <a
              href="https://wa.me/918412937878"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-[#25D366] text-white rounded-full hover:scale-105 transition-transform shrink-0"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
            </a>
          </div>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#176B52]/80">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#DCEBE2] text-[#176B52] flex items-center justify-center font-black text-xl shadow-md">
                M
              </div>
              <div>
                <div className="text-lg font-extrabold text-white leading-tight">
                  MAMTA MATTRESSES
                </div>
                <div className="text-[10px] font-bold tracking-[0.18em] text-[#B8DCC5] uppercase">
                  REPAIRING SERVICE
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#DCEBE2]/80 leading-relaxed pt-2">
              Pune’s premier doorstep mattress restoration specialist. Restoring ergonomic support, replacing worn foam, fixing damaged springs, and custom tailoring comfort directly inside your home.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-[#B8DCC5]">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#B8DCC5]" />
                <span>Mon – Sun: 9:00 AM – 8:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#B8DCC5]" />
                <span>Serving all localities across Pune, Maharashtra</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="text-white text-sm font-bold tracking-wider uppercase text-[#B8DCC5]">Quick Links</h5>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#B8DCC5]" /> Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#B8DCC5]" /> All Services
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#B8DCC5]" /> About Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('reviews')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#B8DCC5]" /> Customer Reviews
                </button>
              </li>
              <li>
                <button onClick={handleBookNow} className="hover:text-white transition-colors flex items-center gap-1.5 font-semibold text-white">
                  <ChevronRight className="w-3 h-3 text-[#B8DCC5]" /> Book a Repair
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#B8DCC5]" /> Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Popular Services */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="text-white text-sm font-bold tracking-wider uppercase text-[#B8DCC5]">Popular Services</h5>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button onClick={() => handleServiceClick('mattress-sagging-repair')} className="text-left hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#B8DCC5] shrink-0" /> Mattress Sagging Repair
                </button>
              </li>
              <li>
                <button onClick={() => handleServiceClick('mattress-foam-replacement')} className="text-left hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#B8DCC5] shrink-0" /> Mattress Foam Replacement
                </button>
              </li>
              <li>
                <button onClick={() => handleServiceClick('mattress-spring-repair')} className="text-left hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#B8DCC5] shrink-0" /> Mattress Spring Repair
                </button>
              </li>
              <li>
                <button onClick={() => handleServiceClick('mattress-resizing')} className="text-left hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#B8DCC5] shrink-0" /> Mattress Resizing & Custom Cut
                </button>
              </li>
              <li>
                <button onClick={() => handleServiceClick('mattress-cover-replacement')} className="text-left hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#B8DCC5] shrink-0" /> Mattress Cover Replacement
                </button>
              </li>
              <li>
                <button onClick={() => handleServiceClick('mattress-deep-cleaning')} className="text-left hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#B8DCC5] shrink-0" /> Mattress Deep Cleaning & Sanitization
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Enquiries */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="text-white text-sm font-bold tracking-wider uppercase text-[#B8DCC5]">Contact Details</h5>
            
            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <span className="block text-[11px] text-[#B8DCC5] uppercase font-bold">Call Directly</span>
                <a href="tel:8412937878" className="text-white font-bold text-base hover:underline flex items-center gap-1.5 mt-0.5">
                  <Phone className="w-4 h-4 text-[#B8DCC5]" /> 8412937878
                </a>
              </div>

              <div>
                <span className="block text-[11px] text-[#B8DCC5] uppercase font-bold">WhatsApp Direct</span>
                <a 
                  href="https://wa.me/918412937878" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white font-semibold hover:underline flex items-center gap-1.5 mt-0.5"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" /> +91 8412937878
                </a>
              </div>

              <div>
                <span className="block text-[11px] text-[#B8DCC5] uppercase font-bold">Email Enquiries</span>
                <a 
                  href="mailto:SATISHLASHKAR219@GMAIL.COM" 
                  className="text-white font-semibold hover:underline flex items-center gap-1.5 mt-0.5 break-all"
                >
                  <Mail className="w-4 h-4 text-[#B8DCC5] shrink-0" /> SATISHLASHKAR219@GMAIL.COM
                </a>
              </div>

              <div>
                <span className="block text-[11px] text-[#B8DCC5] uppercase font-bold">Service City</span>
                <p className="text-white font-medium flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#B8DCC5]" /> Pune, Maharashtra, India
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#B8DCC5] gap-4">
          <p>© {new Date().getFullYear()} MAMTA MATTRESSES REPAIRING SERVICE. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => handleNav('privacy')} className="hover:text-white transition-colors">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={() => handleNav('terms')} className="hover:text-white transition-colors">
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
