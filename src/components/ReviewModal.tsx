import React, { useState } from 'react';
import { Star, X, CheckCircle2, ShieldCheck } from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';
import { PUNE_LOCALITIES } from '../data/puneLocalities';
import { wpService } from '../services/wordpress';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReviewSubmitted: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, onReviewSubmitted }) => {
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [serviceUsed, setServiceUsed] = useState(SERVICES_DATA[0].name);
  const [puneLocality, setPuneLocality] = useState(PUNE_LOCALITIES[0]);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!authorName.trim() || authorName.length < 2) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!reviewText.trim() || reviewText.length < 15) {
      setErrorMessage('Please share a few details about your at-home mattress repair experience (min 15 characters).');
      return;
    }

    setIsSubmitting(true);
    try {
      await wpService.submitReview({
        authorName: authorName.trim(),
        rating,
        reviewText: reviewText.trim(),
        serviceUsed,
        puneLocality,
        isFeatured: false
      });

      setIsSuccess(true);
      onReviewSubmitted();
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        // Reset form
        setAuthorName('');
        setReviewText('');
        setRating(5);
      }, 2500);
    } catch {
      setErrorMessage('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl border border-[#DCEBE2] shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#718078] hover:bg-[#EAF1E8] transition-colors"
          aria-label="Close review dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#EAF1E8] text-[#176B52] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#202824]">Review Submitted!</h3>
            <p className="text-xs sm:text-sm text-[#718078] max-w-sm mx-auto">
              Thank you for sharing your genuine feedback. Your review will be reviewed and published shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="text-xs font-bold text-[#176B52] uppercase tracking-wider">
                Community Feedback
              </span>
              <h3 className="text-xl font-bold text-[#202824] mt-0.5">
                Share Your Repair Experience
              </h3>
              <p className="text-xs text-[#718078] mt-1">
                Help other Pune residents know about the quality of our at-home mattress repair service.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                {errorMessage}
              </div>
            )}

            {/* Star Rating Select */}
            <div>
              <label className="block text-xs font-bold text-[#202824] mb-1.5">
                Your Rating
              </label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 text-2xl transition-transform hover:scale-110 focus:outline-none"
                    aria-label={`Rate ${star} star`}
                  >
                    <Star
                      className={`w-7 h-7 ${
                        (hoverRating || rating) >= star
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-[#176B52] ml-2">
                  {rating} of 5 Stars
                </span>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-[#202824] mb-1">
                Your Name *
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. Rahul Patil"
                className="w-full clay-input px-3.5 py-2.5 text-xs text-[#202824]"
                required
              />
            </div>

            {/* Service & Locality Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#202824] mb-1">
                  Service Completed
                </label>
                <select
                  value={serviceUsed}
                  onChange={(e) => setServiceUsed(e.target.value)}
                  className="w-full clay-input px-3 py-2 text-xs text-[#202824] bg-white"
                >
                  {SERVICES_DATA.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#202824] mb-1">
                  Pune Locality
                </label>
                <select
                  value={puneLocality}
                  onChange={(e) => setPuneLocality(e.target.value)}
                  className="w-full clay-input px-3 py-2 text-xs text-[#202824] bg-white"
                >
                  {PUNE_LOCALITIES.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Review Text */}
            <div>
              <label className="block text-xs font-bold text-[#202824] mb-1">
                Your Review *
              </label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Describe the at-home repair quality, technician punctuality, foam feel, etc."
                rows={4}
                className="w-full clay-input p-3 text-xs text-[#202824] resize-none"
                required
              />
            </div>

            <div className="flex items-center gap-2 text-[11px] text-[#718078] bg-[#EAF1E8] p-2.5 rounded-xl">
              <ShieldCheck className="w-3.5 h-3.5 text-[#176B52] shrink-0" />
              <span>We do not post fake reviews. All submissions are moderated before publishing.</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full clay-button-primary py-3 text-sm font-bold shadow-md disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
