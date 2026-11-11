import React from 'react';
import { ServiceItem } from '../types';
import { X, CheckCircle2, AlertCircle, Clock, ShieldCheck, Calendar, MessageCircle } from 'lucide-react';
import { openWhatsAppBooking, openWhatsAppEnquiry } from '../utils/whatsapp';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onBook?: (serviceId: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose }) => {
  if (!service) return null;

  const handleBookNow = () => {
    onClose();
    openWhatsAppBooking(service.name);
  };

  const handleWhatsApp = () => {
    onClose();
    openWhatsAppEnquiry(service.name);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      
      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-[#DCEBE2] shadow-2xl overflow-hidden p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#718078] hover:bg-[#EAF1E8] hover:text-[#202824] transition-colors"
          aria-label="Close service details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category & Badge */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold text-[#176B52] uppercase tracking-wider">
            {service.category}
          </span>
          {service.tag && (
            <span className="clay-badge text-[10px] py-0.5 px-2.5">
              {service.tag}
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-[#202824] leading-tight mb-3">
          {service.name}
        </h2>

        {/* Duration & At-Home Pill */}
        <div className="flex flex-wrap items-center gap-3 mb-5 text-xs text-[#718078]">
          <span className="flex items-center gap-1.5 font-semibold text-[#176B52] bg-[#EAF1E8] px-3 py-1 rounded-full">
            <Clock className="w-3.5 h-3.5" />
            Estimated Duration: {service.estimatedDuration}
          </span>
          <span className="flex items-center gap-1.5 font-semibold text-[#202824] bg-[#F7F8F4] px-3 py-1 rounded-full border border-[#DCEBE2]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#176B52]" />
            100% Repaired At Your Home
          </span>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#202824]/90 leading-relaxed mb-6">
          {service.fullDesc}
        </p>

        {/* Key Benefits */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-[#176B52] uppercase tracking-wider mb-2.5">
            Key Advantages & Scope
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {service.benefits.map((benefit, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-[#202824] bg-[#F7F8F4] p-2.5 rounded-xl border border-[#DCEBE2]/60">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#176B52] shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Common Symptoms Solved */}
        {service.commonIssues && service.commonIssues.length > 0 && (
          <div className="mb-6">
            <h4 className="text-xs font-bold text-[#718078] uppercase tracking-wider mb-2">
              Common Signs You Need This Service
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {service.commonIssues.map((issue, i) => (
                <span key={i} className="text-[11px] bg-[#EAF1E8]/70 text-[#202824] px-2.5 py-1 rounded-lg border border-[#DCEBE2]/60 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-[#176B52]" />
                  {issue}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Important Rule Reminder */}
        <div className="p-3.5 rounded-2xl bg-[#EAF1E8] border border-[#B8DCC5] mb-6 flex items-start gap-3 text-xs text-[#0F4837]">
          <ShieldCheck className="w-4 h-4 text-[#176B52] shrink-0 mt-0.5" />
          <p>
            <strong>Doorstep Service Policy:</strong> Our technician carries all materials and machinery to your Pune home. Mattress repair is performed on-site. There is strictly no pickup or delivery hassle.
          </p>
        </div>

        {/* Action Buttons: Direct WhatsApp Integration */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            onClick={handleBookNow}
            className="clay-button-primary py-3 text-sm font-bold shadow-md"
            title={`Book ${service.name} directly on WhatsApp`}
          >
            <Calendar className="w-4 h-4" />
            <span>Book This Service on WhatsApp</span>
          </button>

          <button
            onClick={handleWhatsApp}
            className="clay-button-secondary py-3 text-sm font-semibold"
            title={`Get pricing for ${service.name} on WhatsApp`}
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>Get Pricing on WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
