import React, { useState } from 'react';
import { SERVICES_DATA, SERVICE_CATEGORIES } from '../data/servicesData';
import { ServiceItem } from '../types';
import { ServiceCard } from '../components/ServiceCard';
import { ServiceModal } from '../components/ServiceModal';
import { Search, Sparkles, ShieldCheck, ArrowRight, Phone } from 'lucide-react';

interface ServicesPageProps {
  onBookService: (serviceId: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onBookService }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const filteredServices = SERVICES_DATA.filter((service) => {
    const matchesCategory = activeCategory === 'All' || service.category === activeCategory;
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.fullDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF1E8] text-[#176B52] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Complete 25-Service Portfolio</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#202824] tracking-tight">
          Complete Mattress Care & Repair Solutions
        </h1>
        <p className="text-sm sm:text-base text-[#718078] leading-relaxed">
          Expert mattress repair services designed to restore comfort, improve support, and extend mattress life — performed 100% at your home in Pune.
        </p>

        {/* Doorstep Assurance Banner */}
        <div className="mt-4 p-3.5 rounded-2xl bg-[#EAF1E8] border border-[#B8DCC5] max-w-xl mx-auto flex items-center justify-center gap-2.5 text-xs text-[#0F4837]">
          <ShieldCheck className="w-4 h-4 text-[#176B52] shrink-0" />
          <span>
            <strong>At-Home Service Across Pune:</strong> Technician visits with repair machinery. No pickup or delivery service.
          </span>
        </div>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="clay-card p-4 sm:p-5 bg-white border border-[#DCEBE2] space-y-4">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#718078] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search mattress sagging, spring, memory foam, resizing, cover replacement, deep cleaning..."
            className="w-full clay-input pl-10 pr-4 py-3 text-xs sm:text-sm text-[#202824]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#718078] hover:text-[#202824]"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              activeCategory === 'All'
                ? 'bg-[#176B52] text-white shadow-sm'
                : 'bg-[#F7F8F4] text-[#718078] hover:bg-[#EAF1E8] hover:text-[#176B52] border border-[#DCEBE2]'
            }`}
          >
            All Services ({SERVICES_DATA.length})
          </button>
          {SERVICE_CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat.name
                  ? 'bg-[#176B52] text-white shadow-sm'
                  : 'bg-[#F7F8F4] text-[#718078] hover:bg-[#EAF1E8] hover:text-[#176B52] border border-[#DCEBE2]'
              }`}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>

        {/* Category Description Highlight */}
        {activeCategory !== 'All' && (
          <div className="text-xs text-[#176B52] bg-[#EAF1E8] p-2.5 rounded-xl border border-[#DCEBE2] flex items-center justify-between">
            <span>
              <strong>{activeCategory}:</strong>{' '}
              {SERVICE_CATEGORIES.find((c) => c.name === activeCategory)?.desc}
            </span>
            <span className="font-bold">{filteredServices.length} Services</span>
          </div>
        )}
      </div>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <div className="clay-card p-12 bg-white text-center space-y-4 max-w-lg mx-auto">
          <p className="text-base font-bold text-[#202824]">No matching services found</p>
          <p className="text-xs text-[#718078]">
            Try another search term or chat directly with our technician on WhatsApp for custom mattress work.
          </p>
          <button
            onClick={() => {
              setActiveCategory('All');
              setSearchQuery('');
            }}
            className="clay-button-secondary text-xs px-4 py-2"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onBook={(id) => onBookService(id)}
              onLearnMore={(s) => setSelectedService(s)}
            />
          ))}
        </div>
      )}

      {/* Bottom Consultation Banner */}
      <div className="clay-card p-8 bg-gradient-to-r from-[#EAF1E8] to-[#DCEBE2] border border-[#B8DCC5] flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-[#202824]">
            Unsure which repair or foam density your mattress needs?
          </h3>
          <p className="text-xs sm:text-sm text-[#718078] mt-1">
            Speak directly with our senior technician in Pune. Describe your cot type and issue for honest advice.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <a
            href="tel:8412937878"
            className="clay-button-primary px-6 py-3 text-xs sm:text-sm font-bold w-full md:w-auto"
          >
            <Phone className="w-4 h-4" />
            <span>Call 8412937878</span>
          </a>
          <a
            href="https://wa.me/918412937878"
            target="_blank"
            rel="noopener noreferrer"
            className="clay-button-secondary px-6 py-3 text-xs sm:text-sm font-bold w-full md:w-auto"
          >
            <span>WhatsApp Enquiry</span>
          </a>
        </div>
      </div>

      {/* Modal Dialog */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onBook={(id) => {
          setSelectedService(null);
          onBookService(id);
        }}
      />
    </div>
  );
};
