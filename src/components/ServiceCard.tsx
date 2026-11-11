import React from 'react';
import { ServiceItem } from '../types';
import { 
  Activity, 
  Zap, 
  Maximize2, 
  Shield, 
  Scissors, 
  Layers, 
  Feather, 
  ChevronsUp, 
  Sliders, 
  Smile, 
  Crop, 
  Minimize, 
  Compass, 
  Grid, 
  Sparkles, 
  RefreshCw, 
  CheckCircle2, 
  Shirt, 
  Droplets, 
  Sparkle, 
  Wind, 
  ShieldCheck, 
  Airplay,
  Clock,
  ArrowRight,
  MessageCircle,
  Calendar
} from 'lucide-react';
import { openWhatsAppBooking, openWhatsAppEnquiry } from '../utils/whatsapp';

interface ServiceCardProps {
  service: ServiceItem;
  onBook?: (serviceId: string) => void;
  onLearnMore: (service: ServiceItem) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onLearnMore }) => {
  const getIcon = (iconName: string) => {
    const props = { className: "w-5 h-5 text-[#176B52]" };
    switch (iconName) {
      case 'Activity': return <Activity {...props} />;
      case 'Zap': return <Zap {...props} />;
      case 'Maximize2': return <Maximize2 {...props} />;
      case 'Shield': return <Shield {...props} />;
      case 'Scissors': return <Scissors {...props} />;
      case 'Layers': return <Layers {...props} />;
      case 'Feather': return <Feather {...props} />;
      case 'ChevronsUp': return <ChevronsUp {...props} />;
      case 'Sliders': return <Sliders {...props} />;
      case 'Smile': return <Smile {...props} />;
      case 'Crop': return <Crop {...props} />;
      case 'Minimize': return <Minimize {...props} />;
      case 'Compass': return <Compass {...props} />;
      case 'Grid': return <Grid {...props} />;
      case 'Sparkles': return <Sparkles {...props} />;
      case 'RefreshCw': return <RefreshCw {...props} />;
      case 'CheckCircle2': return <CheckCircle2 {...props} />;
      case 'Shirt': return <Shirt {...props} />;
      case 'Droplets': return <Droplets {...props} />;
      case 'Sparkle': return <Sparkle {...props} />;
      case 'Wind': return <Wind {...props} />;
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      case 'Airplay': return <Airplay {...props} />;
      default: return <Layers {...props} />;
    }
  };

  const handleBookOnWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    openWhatsAppBooking(service.name);
  };

  const handleWhatsAppEnquire = (e: React.MouseEvent) => {
    e.stopPropagation();
    openWhatsAppEnquiry(service.name);
  };

  return (
    <div className="clay-card p-6 flex flex-col justify-between group h-full">
      
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#EAF1E8] border border-[#DCEBE2] flex items-center justify-center shadow-clay-sm group-hover:scale-105 group-hover:bg-[#DCEBE2] transition-all">
            {getIcon(service.iconName)}
          </div>
          {service.tag && (
            <span className="clay-badge text-[10px] font-bold tracking-wide uppercase">
              {service.tag}
            </span>
          )}
        </div>

        <div className="text-[11px] font-bold text-[#176B52] uppercase tracking-wider mb-1">
          {service.category}
        </div>

        <h3 className="text-lg font-bold text-[#202824] group-hover:text-[#176B52] transition-colors leading-snug mb-2">
          {service.name}
        </h3>

        <p className="text-xs sm:text-sm text-[#718078] leading-relaxed line-clamp-3 mb-4">
          {service.shortDesc}
        </p>

        {/* Benefits Preview */}
        <div className="space-y-1.5 mb-5 pb-4 border-b border-[#EAF1E8]">
          {service.benefits.slice(0, 2).map((b, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-[#202824]/90">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#176B52] shrink-0" />
              <span className="line-clamp-1">{b}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card Actions & Footer */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between text-xs text-[#718078]">
          <span className="flex items-center gap-1.5 font-medium">
            <Clock className="w-3.5 h-3.5 text-[#176B52]" />
            <span>On-site: {service.estimatedDuration}</span>
          </span>
          <button
            onClick={() => onLearnMore(service)}
            className="text-[#176B52] hover:text-[#0F4837] font-bold inline-flex items-center gap-1 hover:underline"
          >
            <span>Learn More</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Direct WhatsApp Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={handleBookOnWhatsApp}
            className="clay-button-primary text-xs py-2.5 px-3 w-full font-bold shadow-sm"
            title={`Book ${service.name} directly on WhatsApp`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Repair</span>
          </button>

          <button
            onClick={handleWhatsAppEnquire}
            className="clay-button-secondary text-xs py-2.5 px-2.5 w-full font-semibold"
            title={`Get pricing & enquiry for ${service.name} on WhatsApp`}
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            <span>Get Pricing</span>
          </button>
        </div>
      </div>
    </div>
  );
};
