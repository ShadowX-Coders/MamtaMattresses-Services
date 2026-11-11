import { BookingEnquiry, CustomerReview } from '../types';
import { INITIAL_REVIEWS } from '../data/reviewsData';

const BOOKINGS_STORAGE_KEY = 'mmr_bookings_v1';
const REVIEWS_STORAGE_KEY = 'mmr_reviews_v1';

export const storageService = {
  // --- Bookings Management ---
  getBookings(): BookingEnquiry[] {
    try {
      const data = localStorage.getItem(BOOKINGS_STORAGE_KEY);
      if (!data) return [];
      return JSON.parse(data) as BookingEnquiry[];
    } catch (e) {
      console.error('Failed to parse bookings from storage', e);
      return [];
    }
  },

  saveBooking(booking: Omit<BookingEnquiry, 'id' | 'referenceNumber' | 'createdAt' | 'status'>): BookingEnquiry {
    const bookings = this.getBookings();
    
    // Generate unique reference ID: MMR-YYYY-RANDOM4
    const year = new Date().getFullYear();
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const referenceNumber = `MMR-${year}-${randomDigits}`;

    const newBooking: BookingEnquiry = {
      ...booking,
      id: 'book_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      referenceNumber,
      createdAt: new Date().toISOString(),
      status: 'Pending'
    };

    bookings.unshift(newBooking);
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
    return newBooking;
  },

  updateBookingStatus(id: string, status: BookingEnquiry['status']): boolean {
    const bookings = this.getBookings();
    const index = bookings.findIndex(b => b.id === id);
    if (index === -1) return false;
    bookings[index].status = status;
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
    return true;
  },

  deleteBooking(id: string): boolean {
    const bookings = this.getBookings().filter(b => b.id !== id);
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
    return true;
  },

  // --- Reviews Management ---
  getReviews(): CustomerReview[] {
    try {
      const data = localStorage.getItem(REVIEWS_STORAGE_KEY);
      if (!data) {
        // initialize with demo reviews
        localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(INITIAL_REVIEWS));
        return INITIAL_REVIEWS;
      }
      return JSON.parse(data) as CustomerReview[];
    } catch (e) {
      console.error('Failed to load reviews from storage', e);
      return INITIAL_REVIEWS;
    }
  },

  saveReview(review: Omit<CustomerReview, 'id' | 'date' | 'status'>): CustomerReview {
    const reviews = this.getReviews();
    const newReview: CustomerReview = {
      ...review,
      id: 'rev_' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      status: 'Pending', // Held for moderation
      isDemo: false
    };

    reviews.unshift(newReview);
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
    return newReview;
  },

  updateReviewStatus(id: string, status: CustomerReview['status']): boolean {
    const reviews = this.getReviews();
    const idx = reviews.findIndex(r => r.id === id);
    if (idx === -1) return false;
    reviews[idx].status = status;
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
    return true;
  },

  toggleReviewFeatured(id: string): boolean {
    const reviews = this.getReviews();
    const idx = reviews.findIndex(r => r.id === id);
    if (idx === -1) return false;
    reviews[idx].isFeatured = !reviews[idx].isFeatured;
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
    return true;
  },

  deleteReview(id: string): boolean {
    const reviews = this.getReviews().filter(r => r.id !== id);
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
    return true;
  }
};
