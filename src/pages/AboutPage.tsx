import React from 'react';
import { ShieldCheck, HeartHandshake, Eye, Sparkles, MapPin, Phone, MessageCircle, Calendar } from 'lucide-react';
import { NavigationPage } from '../types';
import { openWhatsAppBooking } from '../utils/whatsapp';

interface AboutPageProps {
  onNavigate: (page: NavigationPage) => void;
  onBookClick?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF1E8] text-[#176B52] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Story & Principles</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#202824] tracking-tight">
          Craftsmanship Brought Directly To Your Doorstep
        </h1>
        <p className="text-sm sm:text-base text-[#718078] leading-relaxed">
          Mamta Mattresses Repairing Service is dedicated to restoring restful, pain-free sleep across Pune through honest, on-site craftsmanship.
        </p>
      </div>

      {/* Main Philosophy Story Card */}
      <div className="clay-card p-8 sm:p-12 bg-white border border-[#DCEBE2] shadow-clay">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm text-[#202824]/90 leading-relaxed">
            <h2 className="text-2xl font-bold text-[#176B52]">
              Why We Repair At Your Home
            </h2>
            <p>
              In traditional upholstery repair, mattresses are loaded onto trucks, driven through dusty city traffic, and kept away for days. We realized Pune homeowners deserve something much better, cleaner, and completely transparent.
            </p>
            <p>
              With Mamta Mattresses Repairing Service, <strong>our technician visits your residence directly</strong>. You observe the entire repair process — from unpicking the perimeter binding to inspecting interior layers, replacing worn foam, realigning springs, and lock-stitching the final seams.
            </p>
            <p>
              You sleep in your own bed on the very same night. No transport fees, no waiting weeks for delivery, and zero risk of damage during transit.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="clay-card-sage p-6 border border-[#B8DCC5] space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#176B52] text-white flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#202824]">Strict Doorstep Rule</h4>
                  <span className="text-[11px] text-[#176B52] font-semibold">100% On-Site Service</span>
                </div>
              </div>
              <p className="text-xs text-[#0F4837] leading-relaxed">
                We do not operate pickup or delivery vans. We come to your home with tools and certified replacement materials so that repair happens in front of your eyes.
              </p>
              <div className="pt-2 border-t border-[#B8DCC5]/60 flex items-center gap-2 text-xs font-semibold text-[#176B52]">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>Serving all residential localities across Pune</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Core Principles (No fake claims or numbers) */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#202824]">
            Our Operating Principles
          </h2>
          <p className="text-xs sm:text-sm text-[#718078]">
            Straightforward service standards built around honesty and customer peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="clay-card p-6 bg-white space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-[#EAF1E8] flex items-center justify-center text-[#176B52]">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#202824]">100% Material Transparency</h3>
            <p className="text-xs text-[#718078] leading-relaxed">
              You inspect the replacement foam sheets, memory foam density, springs, or fabrics before they are inserted into your mattress. No hidden cheap fillers.
            </p>
          </div>

          <div className="clay-card p-6 bg-white space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-[#EAF1E8] flex items-center justify-center text-[#176B52]">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#202824]">Targeted Restoration</h3>
            <p className="text-xs text-[#718078] leading-relaxed">
              We never recommend replacing what is still structurally sound. If only the top 2 inches of foam are fatigued, we replace only that layer, saving you money.
            </p>
          </div>

          <div className="clay-card p-6 bg-white space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-[#EAF1E8] flex items-center justify-center text-[#176B52]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#202824]">Clean Home Etiquette</h3>
            <p className="text-xs text-[#718078] leading-relaxed">
              Our technician brings floor drop-cloths and commercial cleanup equipment. We leave your bedroom tidy, vacuumed, and ready for use.
            </p>
          </div>

        </div>
      </div>

      {/* CTA Box */}
      <div className="clay-card p-8 bg-gradient-to-br from-[#176B52] to-[#0F4837] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-2xl font-bold">Ready to restore your mattress?</h3>
          <p className="text-xs sm:text-sm text-[#DCEBE2] max-w-xl">
            Book an at-home inspection appointment today. Our coordinator will contact you with availability.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => openWhatsAppBooking()}
            className="w-full sm:w-auto bg-white text-[#176B52] hover:bg-[#DCEBE2] font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-lg transition-all"
          >
            <Calendar className="w-4 h-4 inline-block mr-1.5" />
            Book a Repair on WhatsApp
          </button>
          <a
            href="https://wa.me/918412937878"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-[#25D366] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-lg transition-all text-center flex items-center justify-center gap-1.5"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            WhatsApp Us
          </a>
        </div>
      </div>

    </div>
  );
};
