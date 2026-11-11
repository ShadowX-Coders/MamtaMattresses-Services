import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Calendar, 
  MessageCircle, 
  Phone, 
  ArrowRight, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Layers, 
  Sliders, 
  Search,
  Star,
  Activity,
  HeartHandshake
} from 'lucide-react';
import { SERVICES_DATA, SERVICE_CATEGORIES } from '../data/servicesData';
import { ServiceItem, NavigationPage, ServiceCategory } from '../types';
import { ServiceCard } from '../components/ServiceCard';
import { ServiceModal } from '../components/ServiceModal';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { BookingForm } from '../components/BookingForm';
import { ReviewModal } from '../components/ReviewModal';
import { storageService } from '../services/storage';
import { openWhatsAppBooking } from '../utils/whatsapp';

interface HomePageProps {
  onNavigate: (page: NavigationPage) => void;
  onBookService: (serviceId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onBookService }) => {
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<ServiceItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Reviews from storage for homepage preview
  const reviews = storageService.getReviews().filter(r => r.status === 'Approved').slice(0, 3);

  // Filter services
  const filteredServices = SERVICES_DATA.filter(service => {
    const matchesCategory = activeCategory === 'All' || service.category === activeCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const openWhatsAppGeneral = () => {
    const msg = encodeURIComponent("Hello Mamta Mattresses Repairing Service, I would like to enquire about mattress repairing services in Pune.");
    window.open(`https://wa.me/918412937878?text=${msg}`, '_blank');
  };

  return (
    <div className="space-y-20 sm:space-y-28 pb-16">
      
      {/* SECTION 1: HERO SECTION */}
      <section className="relative pt-6 sm:pt-12 overflow-hidden">
        
        {/* Soft Clay Ambient Background Glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#DCEBE2]/40 via-[#EAF1E8]/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF1E8] border border-[#B8DCC5] text-[#176B52] text-xs font-bold tracking-wide shadow-clay-sm">
                <span className="w-2 h-2 rounded-full bg-[#176B52] animate-pulse" />
                <span>AT-HOME MATTRESS REPAIR IN PUNE</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#202824] tracking-tight leading-[1.15]">
                Restore Your Mattress. <br />
                <span className="text-[#176B52]">Rediscover Your Comfort.</span>
              </h1>

              {/* Supporting Text */}
              <p className="text-sm sm:text-base lg:text-lg text-[#718078] max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Professional mattress repairing, foam replacement, restoration and customization services at your home in Pune.
              </p>

              {/* Primary & Secondary Hero CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => openWhatsAppBooking()}
                  className="w-full sm:w-auto clay-button-primary px-8 py-4 text-sm sm:text-base font-bold shadow-xl tracking-wide"
                >
                  <Calendar className="w-5 h-5" />
                  <span>BOOK A REPAIR</span>
                </button>

                <button
                  onClick={openWhatsAppGeneral}
                  className="w-full sm:w-auto clay-button-secondary px-7 py-4 text-sm sm:text-base font-bold"
                >
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  <span>CHAT ON WHATSAPP</span>
                </button>
              </div>

              {/* Small Trust Indicators */}
              <div className="pt-4 border-t border-[#DCEBE2] grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto lg:mx-0">
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 p-2">
                  <div className="w-8 h-8 rounded-full bg-[#DCEBE2] flex items-center justify-center text-[#176B52] shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#202824] leading-tight">At-Home Repair</h4>
                    <p className="text-[10px] text-[#718078] hidden sm:block">No pickup or delivery</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 p-2">
                  <div className="w-8 h-8 rounded-full bg-[#DCEBE2] flex items-center justify-center text-[#176B52] shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#202824] leading-tight">Expert Work</h4>
                    <p className="text-[10px] text-[#718078] hidden sm:block">Certified materials</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 p-2">
                  <div className="w-8 h-8 rounded-full bg-[#DCEBE2] flex items-center justify-center text-[#176B52] shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#202824] leading-tight">Fast Booking</h4>
                    <p className="text-[10px] text-[#718078] hidden sm:block">Prompt visit window</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Hero Visual / Clay Photo Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Main Visual Clay Container */}
                <div className="clay-card p-3 sm:p-4 bg-white overflow-hidden shadow-clay">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#EAF1E8]">
                    <img 
                      src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1000&q=80" 
                      alt="Professional mattress repairing and foam restoration at home in Pune"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Overlay Tag */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#B8DCC5]">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Technician Visits Your Residence</span>
                      </div>
                      <p className="text-xs text-white/90 line-clamp-1 mt-0.5">
                        High-density foam replacement & pocket spring alignment
                      </p>
                    </div>
                  </div>

                  {/* Floating Pill 1: Pune Doorstep Guarantee */}
                  <div className="mt-3 p-3 rounded-xl bg-[#F7F8F4] border border-[#DCEBE2] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#176B52]" />
                      <span className="font-semibold text-[#202824]">Serving All Areas Across Pune</span>
                    </div>
                    <span className="font-bold text-[#176B52]">Doorstep Service</span>
                  </div>
                </div>

                {/* Floating Clay Badge Overlay */}
                <div className="hidden sm:flex absolute -top-4 -right-4 clay-card p-3 bg-white border border-[#B8DCC5] items-center gap-2.5 shadow-clay">
                  <div className="w-9 h-9 rounded-full bg-[#176B52] text-white flex items-center justify-center font-bold text-xs">
                    100%
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#202824]">At-Home Repair</div>
                    <div className="text-[10px] text-[#718078]">No Pickup or Delivery</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: SERVICES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF1E8] text-[#176B52] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete Care Catalogue</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#202824] tracking-tight">
            Complete Mattress Care & Repair Solutions
          </h2>
          <p className="text-xs sm:text-base text-[#718078]">
            Expert mattress repair services designed to restore comfort, improve support, and extend mattress life.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1">
              <button
                onClick={() => setActiveCategory('All')}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  activeCategory === 'All'
                    ? 'bg-[#176B52] text-white shadow-sm'
                    : 'bg-white text-[#718078] hover:bg-[#EAF1E8] hover:text-[#176B52] border border-[#DCEBE2]'
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
                      : 'bg-white text-[#718078] hover:bg-[#EAF1E8] hover:text-[#176B52] border border-[#DCEBE2]'
                  }`}
                >
                  {cat.name} ({cat.count})
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-[#718078] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sagging, foam, spring..."
                className="w-full clay-input pl-9 pr-3 py-2 text-xs text-[#202824]"
              />
            </div>
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.slice(0, 6).map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onBook={(id) => onBookService(id)}
              onLearnMore={(s) => setSelectedServiceForModal(s)}
            />
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-10 text-center">
          <button
            onClick={() => {
              onNavigate('services');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="clay-button-secondary px-8 py-3.5 text-sm font-bold"
          >
            <span>Explore All 25 Mattress Services & Customizations</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </section>

      {/* SECTION 3: HOW IT WORKS (STRICTLY AT-HOME) */}
      <section className="bg-[#EAF1E8]/60 py-16 sm:py-20 border-y border-[#DCEBE2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="clay-badge uppercase tracking-wider text-xs">
              Simple 4-Step Process
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#202824]">
              How At-Home Mattress Repair Works
            </h2>
            <p className="text-xs sm:text-sm text-[#718078]">
              Your mattress never leaves your home. Enjoy seamless comfort restoration without moving heavy furniture.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            
            {/* Step 1 */}
            <div className="clay-card p-6 bg-white relative">
              <div className="w-12 h-12 rounded-2xl bg-[#176B52] text-white flex items-center justify-center font-bold text-sm mb-4 shadow-clay-sm">
                01
              </div>
              <h3 className="text-base font-bold text-[#202824] mb-2">
                Choose Your Service
              </h3>
              <p className="text-xs text-[#718078] leading-relaxed">
                Browse our specialized repair options — from sagging restoration and foam upgrades to spring repairs and custom resizing.
              </p>
            </div>

            {/* Step 2 */}
            <div className="clay-card p-6 bg-white relative">
              <div className="w-12 h-12 rounded-2xl bg-[#176B52] text-white flex items-center justify-center font-bold text-sm mb-4 shadow-clay-sm">
                02
              </div>
              <h3 className="text-base font-bold text-[#202824] mb-2">
                Book Your Appointment
              </h3>
              <p className="text-xs text-[#718078] leading-relaxed">
                Share your Pune address, mattress problem, and preferred time slot using our instant request form or via WhatsApp.
              </p>
            </div>

            {/* Step 3 */}
            <div className="clay-card p-6 bg-white relative">
              <div className="w-12 h-12 rounded-2xl bg-[#176B52] text-white flex items-center justify-center font-bold text-sm mb-4 shadow-clay-sm">
                03
              </div>
              <h3 className="text-base font-bold text-[#202824] mb-2">
                Technician Visits Your Home
              </h3>
              <p className="text-xs text-[#718078] leading-relaxed">
                Our technician arrives at your doorstep with industrial tools, certified foam layers, and heavy-duty sewing equipment.
              </p>
            </div>

            {/* Step 4 */}
            <div className="clay-card p-6 bg-white relative">
              <div className="w-12 h-12 rounded-2xl bg-[#176B52] text-white flex items-center justify-center font-bold text-sm mb-4 shadow-clay-sm">
                04
              </div>
              <h3 className="text-base font-bold text-[#202824] mb-2">
                Mattress Repair Completed On-Site
              </h3>
              <p className="text-xs text-[#718078] leading-relaxed">
                The mattress is opened, repaired, re-stitched, and restored right inside your home in 2 to 4 hours. You test it immediately.
              </p>
            </div>

          </div>

          {/* Strict Reminder Alert */}
          <div className="mt-10 p-4 rounded-2xl bg-white border border-[#B8DCC5] max-w-2xl mx-auto flex items-center justify-center gap-3 text-xs text-[#0F4837] text-center shadow-clay-sm">
            <ShieldCheck className="w-5 h-5 text-[#176B52] shrink-0" />
            <span>
              <strong>Zero Transport Hassle:</strong> No mattress pickup or delivery required. Complete repair happens in front of you.
            </span>
          </div>

        </div>
      </section>

      {/* SECTION 4: WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="clay-badge uppercase tracking-wider text-xs">
            Authentic Service Values
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#202824]">
            Why Pune Families Trust Mamta Mattresses
          </h2>
          <p className="text-xs sm:text-sm text-[#718078]">
            Genuine at-home craftsmanship focused on real comfort, honest advice, and transparent doorstep workmanship.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="clay-card p-6 bg-white space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-[#EAF1E8] flex items-center justify-center text-[#176B52]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#202824]">At-Home Mattress Repair</h3>
            <p className="text-xs text-[#718078] leading-relaxed">
              Eliminate heavy lifting and risks of vehicle transit damage. We perform every step inside your bedroom or spare room.
            </p>
          </div>

          <div className="clay-card p-6 bg-white space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-[#EAF1E8] flex items-center justify-center text-[#176B52]">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#202824]">Convenient Appointment Booking</h3>
            <p className="text-xs text-[#718078] leading-relaxed">
              Choose your preferred date and time slot across morning, afternoon, or evening to fit your busy Pune work schedule.
            </p>
          </div>

          <div className="clay-card p-6 bg-white space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-[#EAF1E8] flex items-center justify-center text-[#176B52]">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#202824]">Mattress Restoration Solutions</h3>
            <p className="text-xs text-[#718078] leading-relaxed">
              We restore sagged cores, squeaking coils, collapsed sidewalls, and torn stitching back to supportive health.
            </p>
          </div>

          <div className="clay-card p-6 bg-white space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-[#EAF1E8] flex items-center justify-center text-[#176B52]">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#202824]">Foam Replacement Expertise</h3>
            <p className="text-xs text-[#718078] leading-relaxed">
              We carry certified 32D, 40D, 50D, memory foam, and orthopedic rebonded foams directly to your doorstep.
            </p>
          </div>

          <div className="clay-card p-6 bg-white space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-[#EAF1E8] flex items-center justify-center text-[#176B52]">
              <Sliders className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#202824]">Personalized Repair Solutions</h3>
            <p className="text-xs text-[#718078] leading-relaxed">
              Whether doctor advised a firmer orthopedic surface or you need a custom length cut for a cot, we adjust to you.
            </p>
          </div>

          <div className="clay-card p-6 bg-white space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-[#EAF1E8] flex items-center justify-center text-[#176B52]">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#202824]">Professional Service Experience</h3>
            <p className="text-xs text-[#718078] leading-relaxed">
              Polite, punctual technicians who respect your home environment, clean up after work, and leave no residue behind.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 5: BEFORE & AFTER SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="clay-badge uppercase tracking-wider text-xs">
            Visual Proof
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#202824]">
            Before & After Mattress Restoration
          </h2>
          <p className="text-xs sm:text-sm text-[#718078]">
            See how our at-home repair techniques eliminate hollow depressions and structural slumping.
          </p>
        </div>

        <BeforeAfterSlider />
      </section>

      {/* SECTION 6: CUSTOMER REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div>
            <span className="clay-badge uppercase tracking-wider text-xs mb-1">
              Customer Feedback
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#202824]">
              What Our Customers Say
            </h2>
            <p className="text-xs sm:text-sm text-[#718078] mt-0.5">
              Real experiences from homeowners across Pune localities.
            </p>
          </div>

          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="clay-button-secondary text-xs px-5 py-2.5 font-bold"
          >
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Submit Your Review</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div key={rev.id} className="clay-card p-6 bg-white flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  {rev.isDemo && (
                    <span className="text-[10px] font-bold tracking-wider text-[#718078] bg-[#EAF1E8] px-2 py-0.5 rounded-md">
                      DEMO
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-[#202824]/90 italic leading-relaxed mb-4">
                  "{rev.reviewText}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#EAF1E8]">
                <h4 className="text-xs font-bold text-[#202824]">{rev.authorName}</h4>
                <div className="text-[11px] text-[#176B52] font-medium">{rev.serviceUsed}</div>
                <div className="text-[10px] text-[#718078]">{rev.puneLocality}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => {
              onNavigate('reviews');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-bold text-[#176B52] hover:underline inline-flex items-center gap-1"
          >
            <span>View All Customer Reviews</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* SECTION 7: DIRECT HOMEPAGE BOOKING SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BookingForm />
      </section>

      {/* Service Details Modal */}
      <ServiceModal
        service={selectedServiceForModal}
        onClose={() => setSelectedServiceForModal(null)}
        onBook={(id) => {
          setSelectedServiceForModal(null);
          onBookService(id);
        }}
      />

      {/* Review Submission Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onReviewSubmitted={() => {
          // reviews state refreshed
        }}
      />

    </div>
  );
};
