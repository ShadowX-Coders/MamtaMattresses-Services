import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, MapPin, Clock, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { PUNE_LOCALITIES } from '../data/puneLocalities';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [locality, setLocality] = useState(PUNE_LOCALITIES[0]);
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) return;

    // Encode WhatsApp message for instant direct enquiry
    const text = encodeURIComponent(
      `Hello Mamta Mattresses, I am contacting you from your website.\nName: ${name}\nPhone: ${phone}\nPune Locality: ${locality}\nMessage: ${message}`
    );
    window.open(`https://wa.me/918412937878?text=${text}`, '_blank');
    setIsSent(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-14">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="clay-badge uppercase tracking-wider text-xs">
          Direct Contact & Support
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#202824] tracking-tight">
          Contact Mamta Mattresses Repairing Service
        </h1>
        <p className="text-sm sm:text-base text-[#718078]">
          Serving Pune, Maharashtra with professional at-home mattress repair and foam replacement.
        </p>
      </div>

      {/* 3 Contact Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Phone Call Card */}
        <div className="clay-card p-6 bg-white space-y-4 text-center flex flex-col justify-between">
          <div className="w-12 h-12 rounded-2xl bg-[#EAF1E8] text-[#176B52] mx-auto flex items-center justify-center shadow-clay-sm">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#202824]">Call Directly</h3>
            <p className="text-xs text-[#718078] mt-1">Speak immediately with our repair technician</p>
            <a
              href="tel:8412937878"
              className="text-lg font-extrabold text-[#176B52] hover:underline block mt-2"
            >
              8412937878
            </a>
          </div>
          <a
            href="tel:8412937878"
            className="clay-button-primary text-xs py-2.5 w-full font-bold"
          >
            Call Now
          </a>
        </div>

        {/* WhatsApp Card */}
        <div className="clay-card p-6 bg-white space-y-4 text-center flex flex-col justify-between">
          <div className="w-12 h-12 rounded-2xl bg-[#DCEBE2] text-[#25D366] mx-auto flex items-center justify-center shadow-clay-sm">
            <MessageCircle className="w-6 h-6 fill-current" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#202824]">Chat on WhatsApp</h3>
            <p className="text-xs text-[#718078] mt-1">Send mattress photos & get estimated pricing</p>
            <a
              href="https://wa.me/918412937878"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-extrabold text-[#176B52] hover:underline block mt-2"
            >
              +91 8412937878
            </a>
          </div>
          <a
            href="https://wa.me/918412937878"
            target="_blank"
            rel="noopener noreferrer"
            className="clay-button-secondary text-xs py-2.5 w-full font-bold"
          >
            WhatsApp Us
          </a>
        </div>

        {/* Email Card */}
        <div className="clay-card p-6 bg-white space-y-4 text-center flex flex-col justify-between">
          <div className="w-12 h-12 rounded-2xl bg-[#EAF1E8] text-[#176B52] mx-auto flex items-center justify-center shadow-clay-sm">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#202824]">Email Us</h3>
            <p className="text-xs text-[#718078] mt-1">For corporate or residential enquiries</p>
            <a
              href="mailto:SATISHLASHKAR219@GMAIL.COM"
              className="text-xs font-bold text-[#176B52] hover:underline block mt-2 break-all"
            >
              SATISHLASHKAR219@GMAIL.COM
            </a>
          </div>
          <a
            href="mailto:SATISHLASHKAR219@GMAIL.COM"
            className="clay-button-secondary text-xs py-2.5 w-full font-bold"
          >
            Send Email
          </a>
        </div>

      </div>

      {/* Contact Form & Google Map Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Form */}
        <div className="lg:col-span-7 clay-card p-6 sm:p-8 bg-white border border-[#DCEBE2]">
          <h2 className="text-xl font-bold text-[#202824] mb-2">
            Send Quick Message
          </h2>
          <p className="text-xs text-[#718078] mb-6">
            Leave your contact details and locality. We will call back or chat via WhatsApp promptly.
          </p>

          {isSent ? (
            <div className="p-6 bg-[#EAF1E8] rounded-2xl border border-[#B8DCC5] text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-[#176B52] mx-auto" />
              <h4 className="text-base font-bold text-[#202824]">Enquiry Initiated!</h4>
              <p className="text-xs text-[#718078]">
                WhatsApp has been launched with your enquiry details. Our technician will respond immediately.
              </p>
              <button
                onClick={() => setIsSent(false)}
                className="clay-button-secondary text-xs px-4 py-2"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#202824] mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Anand Shinde"
                  className="w-full clay-input px-3.5 py-2.5 text-xs text-[#202824]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#202824] mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 9822000000"
                    className="w-full clay-input px-3.5 py-2.5 text-xs text-[#202824]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#202824] mb-1">
                    Pune Area / Locality
                  </label>
                  <select
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    className="w-full clay-input px-3 py-2.5 text-xs text-[#202824] bg-white"
                  >
                    {PUNE_LOCALITIES.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#202824] mb-1">
                  How can we help with your mattress? *
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your mattress size, sagging issues, or requirement..."
                  rows={4}
                  className="w-full clay-input p-3 text-xs text-[#202824] resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full clay-button-primary py-3.5 text-sm font-bold shadow-md flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] fill-current" />
                <span>Send Enquiry on WhatsApp (+91 8412937878)</span>
              </button>
            </form>
          )}
        </div>

        {/* Map & Operating Details */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Location & Timings Card */}
          <div className="clay-card p-6 bg-white space-y-4">
            <h3 className="text-base font-bold text-[#202824] flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#176B52]" />
              <span>Service Area & Hours</span>
            </h3>

            <div className="space-y-3 text-xs text-[#718078]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#176B52] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#202824] font-semibold">Citywide At-Home Coverage</strong>
                  <span>Serving Pune, Maharashtra, India and surrounding metropolitan regions.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#176B52] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#202824] font-semibold">Working Hours</strong>
                  <span>Monday to Sunday: 9:00 AM – 8:00 PM</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#176B52] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#202824] font-semibold">Technician Visits Your Doorstep</strong>
                  <span>Mattress repair is conducted at your residence. No pickup or delivery service.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Configurable Pune Map Embed (No fake street address) */}
          <div className="clay-card overflow-hidden bg-white rounded-3xl border border-[#DCEBE2] aspect-[4/3] relative">
            <iframe
              title="Pune Maharashtra Service Coverage Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121059.04360437434!2d73.79292671562499!3d18.524564899999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>

      </div>

    </div>
  );
};
