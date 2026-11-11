import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF1E8] text-[#176B52] text-xs font-bold uppercase tracking-wider mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Legal & Transparency</span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#202824]">
          Privacy Policy
        </h1>
        <p className="text-xs text-[#718078] mt-1">
          Last updated: November 2026 • Mamta Mattresses Repairing Service (Pune, Maharashtra, India)
        </p>
      </div>

      <div className="clay-card p-6 sm:p-10 bg-white border border-[#DCEBE2] space-y-6 text-xs sm:text-sm text-[#202824]/90 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#176B52]">1. Introduction</h2>
          <p>
            Mamta Mattresses Repairing Service ("we", "our", or "us") respects your privacy. This Privacy Policy explains how we collect, use, and safeguard personal information submitted by customers requesting at-home mattress repair services in Pune, Maharashtra.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#176B52]">2. Information We Collect</h2>
          <p>When you submit an appointment request, contact form, or review on our website, we may collect:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Customer Full Name</li>
            <li>Mobile and WhatsApp Phone Numbers</li>
            <li>Email address (optional)</li>
            <li>Residential address, apartment details, and Pune locality for technician visit</li>
            <li>Mattress type, dimensions, and photos voluntarily uploaded to demonstrate repair requirements</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#176B52]">3. How We Use Your Information</h2>
          <p>We strictly use the collected information to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Schedule and confirm your at-home mattress repair technician visit</li>
            <li>Contact you via telephone or WhatsApp regarding repair queries and arrival timings</li>
            <li>Prepare suitable materials (foam density, springs, fabrics) for your specific mattress</li>
            <li>Publish customer testimonials (only upon your voluntary submission and approval)</li>
          </ul>
          <p><strong>We never sell, rent, or trade your personal data to third-party telemarketers or advertisers.</strong></p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#176B52]">4. Data Security</h2>
          <p>
            Your information is stored securely. Internal access is strictly limited to authorized coordinators and technicians handling your service request in Pune.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#176B52]">5. Contact Us</h2>
          <p>
            If you have questions regarding this Privacy Policy or wish to request deletion of your booking details from our database, contact us at:
          </p>
          <div className="p-4 bg-[#F7F8F4] rounded-xl border border-[#DCEBE2] text-xs space-y-1 font-medium">
            <p><strong>Mamta Mattresses Repairing Service</strong></p>
            <p>Phone: 8412937878</p>
            <p>Email: SATISHLASHKAR219@GMAIL.COM</p>
            <p>Location: Pune, Maharashtra, India</p>
          </div>
        </section>
      </div>
    </div>
  );
};
