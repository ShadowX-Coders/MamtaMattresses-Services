import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  Layers, 
  X,
  FileText
} from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';
import { PUNE_LOCALITIES } from '../data/puneLocalities';
import { MattressType, MattressSize, BookingEnquiry } from '../types';
import { wpService } from '../services/wordpress';

interface BookingFormProps {
  initialServiceId?: string;
  onBookingComplete?: (booking: BookingEnquiry) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ initialServiceId, onBookingComplete }) => {
  // Form State
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [sameAsMobile, setSameAsMobile] = useState(true);
  const [email, setEmail] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState(initialServiceId || SERVICES_DATA[0].id);
  const [mattressType, setMattressType] = useState<MattressType>('Spring / Pocket Spring');
  const [mattressSize, setMattressSize] = useState<MattressSize>('Queen (60" x 78" / 72")');
  const [mattressCount, setMattressCount] = useState(1);
  const [problemDescription, setProblemDescription] = useState('');
  const [puneArea, setPuneArea] = useState(PUNE_LOCALITIES[0]);
  const [customLocality, setCustomLocality] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTimeSlot, setPreferredTimeSlot] = useState('Morning (9:00 AM - 12:00 PM)');
  const [additionalInstructions, setAdditionalInstructions] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  
  // UI / Status state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState<BookingEnquiry | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sync initialServiceId when prop changes
  useEffect(() => {
    if (initialServiceId) {
      setSelectedServiceId(initialServiceId);
    }
  }, [initialServiceId]);

  // Today's date in YYYY-MM-DD for min date attribute
  const todayStr = new Date().toISOString().split('T')[0];

  // Handle WhatsApp checkbox sync
  useEffect(() => {
    if (sameAsMobile) {
      setWhatsappNumber(mobileNumber);
    }
  }, [mobileNumber, sameAsMobile]);

  // Handle Image Upload Preview
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newPhotos: string[] = [];
    const maxFiles = 3;

    Array.from(files).slice(0, maxFiles).forEach(file => {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert(`File "${file.name}" is larger than 5MB. Please choose a smaller photo.`);
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotos(prev => [...prev, event.target!.result as string].slice(0, 4));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  // Indian Phone validation (10 digits starting with 6,7,8,9)
  const validatePhone = (num: string) => {
    const cleaned = num.replace(/[\s\-+]/g, '').slice(-10);
    return /^[6-9]\d{9}$/.test(cleaned);
  };

  // Validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 3) {
      newErrors.fullName = 'Please enter your full name (minimum 3 characters).';
    }

    if (!mobileNumber.trim() || !validatePhone(mobileNumber)) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit Indian mobile number.';
    }

    if (!sameAsMobile && (!whatsappNumber.trim() || !validatePhone(whatsappNumber))) {
      newErrors.whatsappNumber = 'Please enter a valid WhatsApp number.';
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address or leave blank.';
    }

    if (!problemDescription.trim() || problemDescription.trim().length < 10) {
      newErrors.problemDescription = 'Please briefly describe the mattress problem (minimum 10 characters).';
    }

    if (puneArea === 'Other Locality in Pune' && !customLocality.trim()) {
      newErrors.puneArea = 'Please enter your specific Pune area or locality.';
    }

    if (!fullAddress.trim() || fullAddress.trim().length < 10) {
      newErrors.fullAddress = 'Please provide your complete address (building, flat, landmark) for the technician visit.';
    }

    if (!preferredDate) {
      newErrors.preferredDate = 'Please select a preferred appointment date.';
    } else if (preferredDate < todayStr) {
      newErrors.preferredDate = 'Appointment date cannot be in the past.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // scroll to top of form
      const el = document.getElementById('booking-form-header');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedService = SERVICES_DATA.find(s => s.id === selectedServiceId) || SERVICES_DATA[0];
      const finalArea = puneArea === 'Other Locality in Pune' ? customLocality.trim() : puneArea;

      const newBooking = await wpService.submitBooking({
        fullName: fullName.trim(),
        mobileNumber: mobileNumber.trim(),
        whatsappNumber: (sameAsMobile ? mobileNumber : whatsappNumber).trim(),
        email: email.trim() || undefined,
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        mattressType,
        mattressSize,
        mattressCount,
        problemDescription: problemDescription.trim(),
        puneArea: finalArea,
        fullAddress: fullAddress.trim(),
        preferredDate,
        preferredTimeSlot,
        additionalInstructions: additionalInstructions.trim() || undefined,
        photos
      });

      setSubmittedBooking(newBooking);
      if (onBookingComplete) {
        onBookingComplete(newBooking);
      }

      // Automatically launch WhatsApp with the pre-filled booking details
      const msg = encodeURIComponent(
        `Hello Mamta Mattresses Repairing Service, I would like to book an at-home mattress repair in Pune.\n\n` +
        `• Reference ID: ${newBooking.referenceNumber}\n` +
        `• Customer Name: ${newBooking.fullName}\n` +
        `• Mobile: ${newBooking.mobileNumber}\n` +
        `• Service: ${newBooking.serviceName}\n` +
        `• Mattress Type: ${newBooking.mattressType} (${newBooking.mattressSize})\n` +
        `• Number of Mattresses: ${newBooking.mattressCount}\n` +
        `• Pune Area: ${newBooking.puneArea}\n` +
        `• Address: ${newBooking.fullAddress}\n` +
        `• Preferred Date: ${newBooking.preferredDate} (${newBooking.preferredTimeSlot})\n` +
        `• Problem: ${newBooking.problemDescription}\n\n` +
        `Please confirm the technician arrival time and pricing.`
      );
      window.open(`https://wa.me/918412937878?text=${msg}`, '_blank');

      // Celebrate with confetti
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // confetti fallback
      }

    } catch (err) {
      console.error(err);
      setErrors({ submit: 'Failed to record booking enquiry. Please try again or chat on WhatsApp directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenWhatsAppConfirmation = () => {
    if (!submittedBooking) return;
    const msg = encodeURIComponent(
      `Hello Mamta Mattresses, I have submitted an at-home mattress repair request.\n` +
      `Reference: ${submittedBooking.referenceNumber}\n` +
      `Name: ${submittedBooking.fullName}\n` +
      `Service: ${submittedBooking.serviceName}\n` +
      `Locality: ${submittedBooking.puneArea}\n` +
      `Preferred Date: ${submittedBooking.preferredDate} (${submittedBooking.preferredTimeSlot})\n\n` +
      `Please help me confirm the technician visit availability.`
    );
    window.open(`https://wa.me/918412937878?text=${msg}`, '_blank');
  };

  // SUCCESS CONFIRMATION STATE
  if (submittedBooking) {
    return (
      <div className="clay-card p-6 sm:p-10 bg-white border border-[#B8DCC5] max-w-2xl mx-auto text-center space-y-6 shadow-clay">
        
        {/* Success Icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#EAF1E8] text-[#176B52] mx-auto flex items-center justify-center shadow-clay-sm animate-in zoom-in-50">
          <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
        </div>

        <div>
          <span className="clay-badge uppercase tracking-wider text-xs mb-2">
            Booking Request Received
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#202824]">
            Thank You, {submittedBooking.fullName}!
          </h3>
          <p className="text-sm font-semibold text-[#176B52] mt-1">
            Booking Reference ID: <span className="font-mono bg-[#EAF1E8] px-2.5 py-1 rounded-md text-base">{submittedBooking.referenceNumber}</span>
          </p>
        </div>

        {/* Required Disclosure Notice */}
        <div className="p-4 rounded-2xl bg-[#EAF1E8] border border-[#B8DCC5] text-left text-xs sm:text-sm text-[#0F4837] space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm text-[#176B52]">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Important Appointment Notice:</span>
          </div>
          <p className="leading-relaxed">
            "Your appointment request has been received. Our team will contact you shortly on <strong>{submittedBooking.mobileNumber}</strong> to confirm availability and discuss material requirements."
          </p>
          <p className="text-[11px] text-[#718078] pt-1">
            • Note: Mattress repair is performed 100% on-site at your home. We never pick up or transport mattresses away.
          </p>
        </div>

        {/* Booking Summary Box */}
        <div className="p-4 rounded-2xl bg-[#F7F8F4] border border-[#DCEBE2] text-left text-xs space-y-2">
          <div className="flex justify-between border-b border-[#DCEBE2] pb-1.5">
            <span className="text-[#718078]">Requested Service:</span>
            <span className="font-bold text-[#202824]">{submittedBooking.serviceName}</span>
          </div>
          <div className="flex justify-between border-b border-[#DCEBE2] pb-1.5">
            <span className="text-[#718078]">Mattress Type & Size:</span>
            <span className="font-medium text-[#202824]">{submittedBooking.mattressType} • {submittedBooking.mattressSize}</span>
          </div>
          <div className="flex justify-between border-b border-[#DCEBE2] pb-1.5">
            <span className="text-[#718078]">Location in Pune:</span>
            <span className="font-medium text-[#202824]">{submittedBooking.puneArea}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#718078]">Preferred Date & Slot:</span>
            <span className="font-bold text-[#176B52]">{submittedBooking.preferredDate} ({submittedBooking.preferredTimeSlot})</span>
          </div>
        </div>

        {/* WhatsApp & Call CTAs */}
        <div className="space-y-3 pt-2">
          <button
            onClick={handleOpenWhatsAppConfirmation}
            className="w-full clay-button-primary py-3.5 text-sm font-bold shadow-lg"
          >
            <MessageCircle className="w-5 h-5" />
            <span>CONTINUE ON WHATSAPP WITH THIS BOOKING</span>
          </button>

          <div className="flex items-center justify-center gap-4 text-xs">
            <a
              href="tel:8412937878"
              className="inline-flex items-center gap-1.5 text-[#176B52] font-semibold hover:underline"
            >
              <Phone className="w-3.5 h-3.5" /> Call Technician: 8412937878
            </a>
            <span className="text-[#DCEBE2]">•</span>
            <button
              onClick={() => {
                setSubmittedBooking(null);
                setPhotos([]);
                setProblemDescription('');
              }}
              className="text-[#718078] hover:text-[#202824] font-medium"
            >
              Book Another Mattress
            </button>
          </div>
        </div>
      </div>
    );
  }

  // STANDARD FORM VIEW
  return (
    <div className="clay-card p-6 sm:p-10 bg-white border border-[#DCEBE2] max-w-4xl mx-auto shadow-clay">
      
      {/* Header */}
      <div id="booking-form-header" className="border-b border-[#DCEBE2] pb-6 mb-8 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF1E8] text-[#176B52] text-xs font-bold uppercase tracking-wider mb-2">
          <Calendar className="w-3.5 h-3.5" />
          <span>Doorstep Mattress Repair Request</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#202824]">
          Book An At-Home Mattress Repair Appointment
        </h2>
        <p className="text-xs sm:text-sm text-[#718078] mt-1.5 max-w-2xl">
          Complete the details below. Our certified technician visits your home anywhere in Pune with repair tools and materials. Mattress repair is completed on-site.
        </p>

        {/* Strictly At-Home Policy Pill */}
        <div className="mt-4 p-3 rounded-2xl bg-[#EAF1E8]/70 border border-[#B8DCC5] flex items-center gap-2.5 text-xs text-[#0F4837]">
          <ShieldCheck className="w-4 h-4 text-[#176B52] shrink-0" />
          <span>
            <strong>Doorstep Service Policy:</strong> Technician visits & repairs at your home. No pickup or delivery service is ever needed.
          </span>
        </div>
      </div>

      {errors.submit && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errors.submit}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* SECTION 1: Customer Contact Details */}
        <div>
          <h3 className="text-sm font-bold text-[#176B52] uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#EAF1E8] text-[#176B52] text-xs font-black flex items-center justify-center">1</span>
            Your Contact Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-[#202824] mb-1.5">
                Customer Full Name *
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Ramesh Joshi"
                className={`w-full clay-input px-3.5 py-2.5 text-xs text-[#202824] ${errors.fullName ? 'border-red-400' : ''}`}
                required
              />
              {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-xs font-bold text-[#202824] mb-1.5">
                Mobile Number * (10 Digits)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#718078]">+91</span>
                <input
                  type="tel"
                  maxLength={10}
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="8412937878"
                  className={`w-full clay-input pl-11 pr-3 py-2.5 text-xs text-[#202824] font-medium tracking-wide ${errors.mobileNumber ? 'border-red-400' : ''}`}
                  required
                />
              </div>
              {errors.mobileNumber && <p className="text-[11px] text-red-600 mt-1">{errors.mobileNumber}</p>}
            </div>

            {/* WhatsApp Number & Same Checkbox */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-[#202824]">
                  WhatsApp Number *
                </label>
                <label className="inline-flex items-center gap-1.5 text-[11px] text-[#176B52] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sameAsMobile}
                    onChange={(e) => setSameAsMobile(e.target.checked)}
                    className="rounded text-[#176B52] focus:ring-[#176B52]"
                  />
                  <span>Same as Mobile</span>
                </label>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#718078]">+91</span>
                <input
                  type="tel"
                  maxLength={10}
                  disabled={sameAsMobile}
                  value={sameAsMobile ? mobileNumber : whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="WhatsApp phone number"
                  className={`w-full clay-input pl-11 pr-3 py-2.5 text-xs text-[#202824] ${sameAsMobile ? 'bg-gray-50 text-gray-500' : ''} ${errors.whatsappNumber ? 'border-red-400' : ''}`}
                  required
                />
              </div>
              {errors.whatsappNumber && <p className="text-[11px] text-red-600 mt-1">{errors.whatsappNumber}</p>}
            </div>

            {/* Email Address (Optional) */}
            <div>
              <label className="block text-xs font-bold text-[#202824] mb-1.5">
                Email Address <span className="text-[#718078] font-normal">(Optional)</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. name@example.com"
                className={`w-full clay-input px-3.5 py-2.5 text-xs text-[#202824] ${errors.email ? 'border-red-400' : ''}`}
              />
              {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
            </div>
          </div>
        </div>

        {/* SECTION 2: Service & Mattress Specifications */}
        <div>
          <h3 className="text-sm font-bold text-[#176B52] uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#EAF1E8] text-[#176B52] text-xs font-black flex items-center justify-center">2</span>
            Mattress Repair Specifications
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Service Selection */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#202824] mb-1.5">
                Select Mattress Repair Service *
              </label>
              <select
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                className="w-full clay-input px-3.5 py-2.5 text-xs text-[#202824] bg-white font-medium"
              >
                {SERVICES_DATA.map((service) => (
                  <option key={service.id} value={service.id}>
                    [{service.category}] {service.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Mattress Type */}
            <div>
              <label className="block text-xs font-bold text-[#202824] mb-1.5">
                Mattress Type
              </label>
              <select
                value={mattressType}
                onChange={(e) => setMattressType(e.target.value as MattressType)}
                className="w-full clay-input px-3.5 py-2.5 text-xs text-[#202824] bg-white"
              >
                <option value="Spring / Pocket Spring">Spring / Pocket Spring</option>
                <option value="Memory Foam">Memory Foam</option>
                <option value="High-Density Foam">High-Density Foam</option>
                <option value="Coir / Coir Foam">Coir / Coir Foam</option>
                <option value="Latex">Natural Latex</option>
                <option value="Dual Comfort / Reversible">Dual Comfort / Reversible</option>
                <option value="Traditional Cotton">Traditional Cotton Mattress</option>
                <option value="Orthopedic">Doctor-Advised Orthopedic</option>
                <option value="Other">Other / Not Sure</option>
              </select>
            </div>

            {/* Mattress Size */}
            <div>
              <label className="block text-xs font-bold text-[#202824] mb-1.5">
                Mattress Size
              </label>
              <select
                value={mattressSize}
                onChange={(e) => setMattressSize(e.target.value as MattressSize)}
                className="w-full clay-input px-3.5 py-2.5 text-xs text-[#202824] bg-white"
              >
                <option value='Single (36" x 72" / 75")'>Single (36" x 72" / 75")</option>
                <option value='Double (48" x 72" / 75")'>Double (48" x 72" / 75")</option>
                <option value='Queen (60" x 78" / 72")'>Queen (60" x 78" / 72")</option>
                <option value='King (72" x 78" / 72")'>King (72" x 78" / 72")</option>
                <option value="Custom Size">Custom Cot / Unique Size</option>
              </select>
            </div>

            {/* Mattress Count */}
            <div>
              <label className="block text-xs font-bold text-[#202824] mb-1.5">
                Number of Mattresses
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4].map(num => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setMattressCount(num)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                      mattressCount === num
                        ? 'bg-[#176B52] text-white shadow-sm'
                        : 'bg-[#F7F8F4] text-[#718078] border border-[#DCEBE2] hover:bg-[#EAF1E8]'
                    }`}
                  >
                    {num} {num === 1 ? 'Bed' : 'Beds'}
                  </button>
                ))}
              </div>
            </div>

            {/* Describe the Problem */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#202824] mb-1.5">
                Describe the Mattress Problem *
              </label>
              <textarea
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                placeholder="e.g. Center portion has sagged by 2 inches, springs are poking out on the right side, or need foam replaced with firm orthopedic layer..."
                rows={3}
                className={`w-full clay-input p-3 text-xs text-[#202824] resize-none ${errors.problemDescription ? 'border-red-400' : ''}`}
                required
              />
              {errors.problemDescription && <p className="text-[11px] text-red-600 mt-1">{errors.problemDescription}</p>}
            </div>

            {/* Photo Upload (Optional but helpful) */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#202824] mb-1.5">
                Upload Mattress Photos <span className="text-[#718078] font-normal">(Helps technician prepare exact materials)</span>
              </label>
              
              <div className="flex flex-wrap items-center gap-3">
                {/* File input button */}
                <label className="cursor-pointer clay-button-secondary text-xs px-4 py-2.5 rounded-2xl flex items-center gap-2">
                  <Upload className="w-4 h-4 text-[#176B52]" />
                  <span>Choose Photos (Max 3)</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>

                {/* Previews */}
                {photos.map((src, index) => (
                  <div key={index} className="relative w-16 h-16 rounded-xl overflow-hidden border border-[#B8DCC5] shadow-sm">
                    <img src={src} alt="Mattress preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: Pune Locality, Address & Schedule */}
        <div>
          <h3 className="text-sm font-bold text-[#176B52] uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#EAF1E8] text-[#176B52] text-xs font-black flex items-center justify-center">3</span>
            Pune Location & Preferred Appointment
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Pune Area / Locality */}
            <div>
              <label className="block text-xs font-bold text-[#202824] mb-1.5">
                Pune Area / Locality *
              </label>
              <select
                value={puneArea}
                onChange={(e) => setPuneArea(e.target.value)}
                className="w-full clay-input px-3.5 py-2.5 text-xs text-[#202824] bg-white font-medium"
              >
                {PUNE_LOCALITIES.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>

              {puneArea === 'Other Locality in Pune' && (
                <div className="mt-2">
                  <input
                    type="text"
                    value={customLocality}
                    onChange={(e) => setCustomLocality(e.target.value)}
                    placeholder="Enter your Pune locality / landmark"
                    className="w-full clay-input px-3 py-2 text-xs text-[#202824]"
                    required
                  />
                </div>
              )}
              {errors.puneArea && <p className="text-[11px] text-red-600 mt-1">{errors.puneArea}</p>}
            </div>

            {/* Preferred Appointment Date */}
            <div>
              <label className="block text-xs font-bold text-[#202824] mb-1.5">
                Preferred Appointment Date *
              </label>
              <input
                type="date"
                min={todayStr}
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className={`w-full clay-input px-3.5 py-2.5 text-xs text-[#202824] bg-white ${errors.preferredDate ? 'border-red-400' : ''}`}
                required
              />
              {errors.preferredDate && <p className="text-[11px] text-red-600 mt-1">{errors.preferredDate}</p>}
            </div>

            {/* Preferred Time Slot */}
            <div>
              <label className="block text-xs font-bold text-[#202824] mb-1.5">
                Preferred Time Slot
              </label>
              <select
                value={preferredTimeSlot}
                onChange={(e) => setPreferredTimeSlot(e.target.value)}
                className="w-full clay-input px-3.5 py-2.5 text-xs text-[#202824] bg-white"
              >
                <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM - 12:00 PM)</option>
                <option value="Afternoon (12:00 PM - 4:00 PM)">Afternoon (12:00 PM - 4:00 PM)</option>
                <option value="Evening (4:00 PM - 8:00 PM)">Evening (4:00 PM - 8:00 PM)</option>
              </select>
            </div>

            {/* Additional Instructions */}
            <div>
              <label className="block text-xs font-bold text-[#202824] mb-1.5">
                Additional Instructions <span className="text-[#718078] font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                value={additionalInstructions}
                onChange={(e) => setAdditionalInstructions(e.target.value)}
                placeholder="e.g. Call before arriving, lift available, society security gate code..."
                className="w-full clay-input px-3.5 py-2.5 text-xs text-[#202824]"
              />
            </div>

            {/* Complete Address */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#202824] mb-1.5">
                Complete Pune Address for Doorstep Visit *
              </label>
              <textarea
                value={fullAddress}
                onChange={(e) => setFullAddress(e.target.value)}
                placeholder="Flat / House No., Wing, Society / Building Name, Road, Landmark..."
                rows={2}
                className={`w-full clay-input p-3 text-xs text-[#202824] resize-none ${errors.fullAddress ? 'border-red-400' : ''}`}
                required
              />
              {errors.fullAddress && <p className="text-[11px] text-red-600 mt-1">{errors.fullAddress}</p>}
            </div>
          </div>
        </div>

        {/* Confirmation Disclosure & Submit Button */}
        <div className="pt-4 border-t border-[#DCEBE2] space-y-4">
          <div className="p-3.5 rounded-2xl bg-[#F7F8F4] border border-[#DCEBE2] flex items-start gap-3 text-xs text-[#718078]">
            <ShieldCheck className="w-4 h-4 text-[#176B52] shrink-0 mt-0.5" />
            <p>
              By clicking "REQUEST A REPAIR", you submit an at-home service request. Our coordinator will contact you to verify mattress details, provide an estimated quote, and confirm the technician's arrival window.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full clay-button-primary py-4 text-base font-bold shadow-xl tracking-wide disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Opening WhatsApp...</span>
              </span>
            ) : (
              <>
                <MessageCircle className="w-5 h-5 text-[#25D366] fill-current" />
                <span>REQUEST REPAIR ON WHATSAPP (+91 8412937878)</span>
              </>
            )}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                const sName = SERVICES_DATA.find(s => s.id === selectedServiceId)?.name || 'Mattress Repair';
                const msg = encodeURIComponent(`Hello Mamta Mattresses Repairing Service, I would like to book an at-home repair for ${sName} in Pune. Please share availability.`);
                window.open(`https://wa.me/918412937878?text=${msg}`, '_blank');
              }}
              className="text-xs font-semibold text-[#176B52] hover:underline inline-flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Or click here to message technician directly on WhatsApp without filling form</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
