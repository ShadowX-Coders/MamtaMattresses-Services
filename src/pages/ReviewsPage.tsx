import React, { useState } from 'react';
import { Star, ShieldCheck, Plus, MessageCircle, AlertCircle, HeartHandshake } from 'lucide-react';
import { storageService } from '../services/storage';
import { ReviewModal } from '../components/ReviewModal';
import { CustomerReview, NavigationPage } from '../types';

interface ReviewsPageProps {
  onNavigate: (page: NavigationPage) => void;
  onBookClick: () => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({ onNavigate, onBookClick }) => {
  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    return storageService.getReviews().filter((r) => r.status === 'Approved');
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const refreshReviews = () => {
    setReviews(storageService.getReviews().filter((r) => r.status === 'Approved'));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#DCEBE2]">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF1E8] text-[#176B52] text-xs font-bold uppercase tracking-wider">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Community Feedback</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#202824] tracking-tight">
            What Our Customers Say
          </h1>
          <p className="text-sm text-[#718078] max-w-xl">
            Read verified at-home mattress repair experiences from residents in Pune.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="clay-button-primary px-6 py-3 text-xs sm:text-sm font-bold shadow-md shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Write A Review</span>
        </button>
      </div>

      {/* Authenticity Policy Banner */}
      <div className="p-4 rounded-2xl bg-[#EAF1E8] border border-[#B8DCC5] flex items-start sm:items-center gap-3 text-xs text-[#0F4837]">
        <ShieldCheck className="w-5 h-5 text-[#176B52] shrink-0" />
        <div>
          <strong>Authenticity Commitment:</strong> We never generate fake reviews or publish artificial ratings. During development, illustrative testimonials are marked with a distinct <code>DEMO</code> tag.
        </div>
      </div>

      {/* Reviews Grid */}
      {reviews.length === 0 ? (
        <div className="clay-card p-12 bg-white text-center space-y-4 max-w-md mx-auto">
          <p className="text-sm font-bold text-[#202824]">No reviews currently published</p>
          <p className="text-xs text-[#718078]">
            Be the first customer to share your at-home mattress repair experience with us!
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="clay-button-primary text-xs px-5 py-2.5"
          >
            Submit First Review
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div key={rev.id} className="clay-card p-6 bg-white flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  {rev.isDemo ? (
                    <span className="text-[10px] font-bold text-[#718078] bg-[#EAF1E8] px-2 py-0.5 rounded-md border border-[#DCEBE2]">
                      DEMO SAMPLE
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-[#176B52] bg-[#EAF1E8] px-2 py-0.5 rounded-md flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Verified Pune Customer
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-[#202824]/90 italic leading-relaxed mb-6">
                  "{rev.reviewText}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#EAF1E8] space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#202824]">{rev.authorName}</h4>
                  <span className="text-[10px] text-[#718078]">{rev.date}</span>
                </div>
                <div className="text-[11px] text-[#176B52] font-semibold">{rev.serviceUsed}</div>
                <div className="text-[10px] text-[#718078]">{rev.puneLocality}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Submission Modal */}
      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onReviewSubmitted={refreshReviews}
      />
    </div>
  );
};
