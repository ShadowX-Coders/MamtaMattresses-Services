import React from 'react';
import { ShieldCheck, AlertCircle } from 'lucide-react';

export const TermsConditionsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF1E8] text-[#176B52] text-xs font-bold uppercase tracking-wider mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Service Terms</span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#202824]">
          Terms & Conditions
        </h1>
        <p className="text-xs text-[#718078] mt-1">
          Effective: November 2026 • Mamta Mattresses Repairing Service (Pune, Maharashtra)
        </p>
      </div>

      <div className="clay-card p-6 sm:p-10 bg-white border border-[#DCEBE2] space-y-6 text-xs sm:text-sm text-[#202824]/90 leading-relaxed">
        
        {/* Important Doorstep Service Clause */}
        <div className="p-4 rounded-2xl bg-[#EAF1E8] border border-[#B8DCC5] flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#176B52] shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-[#176B52] text-sm">Doorstep At-Home Repair Model</h3>
            <p className="mt-1 text-xs text-[#0F4837]">
              All repair work is carried out strictly at the customer's residence in Pune. We do not provide, operate, or offer mattress pickup or mattress delivery services. Customers must ensure an adequate indoor space for the technician to carry out on-site inspection and repair work.
            </p>
          </div>
        </div>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#176B52]">1. Appointment Requests</h2>
          <p>
            Submissions through our online booking form represent an <strong>appointment request</strong> and do not constitute an immediate confirmed booking. Our team will contact the customer by phone or WhatsApp to verify availability, address details, and material requirements before final scheduling.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#176B52]">2. Service Scope & Inspection</h2>
          <p>
            The technician conducts an initial physical assessment of the mattress core upon arrival at the customer's home. Any unforeseen internal damage (such as severely rusted bonnell spring units or water-damaged substrate) will be discussed transparently with the customer prior to commencing repair.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#176B52]">3. Material Selection</h2>
          <p>
            Customers are invited to inspect replacement foam density (e.g. 32D, 40D, 50D, memory foam) and fabric covers before installation. Work proceeds once the customer agrees upon the chosen comfort specification and quotation.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#176B52]">4. Payments</h2>
          <p>
            Payments are made directly upon completion and inspection of the repair work at the customer's home via UPI, Cash, or agreed electronic methods.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#176B52]">5. Contact & Support</h2>
          <p>
            For any queries or assistance, contact Mamta Mattresses Repairing Service at:
          </p>
          <div className="p-3 bg-[#F7F8F4] rounded-xl border border-[#DCEBE2] text-xs">
            <p><strong>Phone:</strong> 8412937878</p>
            <p><strong>WhatsApp:</strong> +91 8412937878</p>
            <p><strong>Email:</strong> SATISHLASHKAR219@GMAIL.COM</p>
            <p><strong>Location:</strong> Pune, Maharashtra, India</p>
          </div>
        </section>
      </div>
    </div>
  );
};
