import { ServiceItem, CustomerReview, BookingEnquiry } from '../types';
import { SERVICES_DATA } from '../data/servicesData';
import { storageService } from './storage';

// Environment configurations
const WP_URL = import.meta.env.VITE_WORDPRESS_URL || '';
const WP_API_URL = import.meta.env.VITE_WORDPRESS_API_URL || (WP_URL ? `${WP_URL}/wp-json` : '');
const WP_AUTH_METHOD = import.meta.env.VITE_WORDPRESS_AUTH_METHOD || 'application-passwords';

export interface WordPressStatus {
  isConfigured: boolean;
  isConnected: boolean;
  wpUrl: string;
  apiUrl: string;
  authMethod: string;
  statusMessage: string;
  checkedAt?: string;
}

class WordPressService {
  private status: WordPressStatus = {
    isConfigured: Boolean(WP_URL || WP_API_URL),
    isConnected: false,
    wpUrl: WP_URL || 'Not Configured (Demo Mode Active)',
    apiUrl: WP_API_URL || 'Local Storage & Fallback Active',
    authMethod: WP_AUTH_METHOD,
    statusMessage: WP_URL 
      ? 'Configured. Verifying connection...' 
      : 'WordPress CMS not configured. Website running seamlessly in local mode with mock data fallback.'
  };

  getStatus(): WordPressStatus {
    return { ...this.status };
  }

  async testConnection(): Promise<WordPressStatus> {
    if (!WP_API_URL) {
      this.status = {
        isConfigured: false,
        isConnected: false,
        wpUrl: 'Not Configured',
        apiUrl: 'Not Configured',
        authMethod: WP_AUTH_METHOD,
        statusMessage: 'VITE_WORDPRESS_API_URL is empty. Using high-performance local data layer.',
        checkedAt: new Date().toLocaleTimeString()
      };
      return this.status;
    }

    try {
      const response = await fetch(`${WP_API_URL}/wp/v2/types`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(4000)
      });

      if (response.ok) {
        this.status = {
          isConfigured: true,
          isConnected: true,
          wpUrl: WP_URL,
          apiUrl: WP_API_URL,
          authMethod: WP_AUTH_METHOD,
          statusMessage: 'Successfully connected to WordPress REST API!',
          checkedAt: new Date().toLocaleTimeString()
        };
      } else {
        throw new Error(`WordPress returned HTTP status ${response.status}`);
      }
    } catch (err: unknown) {
      const error = err as Error;
      this.status = {
        isConfigured: true,
        isConnected: false,
        wpUrl: WP_URL,
        apiUrl: WP_API_URL,
        authMethod: WP_AUTH_METHOD,
        statusMessage: `Connection attempt failed: ${error.message || 'Network unreachable'}. Fallback data active.`,
        checkedAt: new Date().toLocaleTimeString()
      };
    }

    return this.status;
  }

  // Fetch Services (WP or Fallback)
  async getServices(): Promise<ServiceItem[]> {
    if (this.status.isConnected && WP_API_URL) {
      try {
        const res = await fetch(`${WP_API_URL}/mmr/v1/services?_embed`, { signal: AbortSignal.timeout(3000) });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            return data;
          }
        }
      } catch (e) {
        console.warn('Could not fetch services from WordPress, using local catalogue:', e);
      }
    }
    // Return complete local catalogue
    return SERVICES_DATA;
  }

  // Fetch Reviews (WP or Local Storage)
  async getReviews(): Promise<CustomerReview[]> {
    if (this.status.isConnected && WP_API_URL) {
      try {
        const res = await fetch(`${WP_API_URL}/mmr/v1/reviews`, { signal: AbortSignal.timeout(3000) });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            return data;
          }
        }
      } catch (e) {
        console.warn('Could not fetch reviews from WordPress, using local storage:', e);
      }
    }
    return storageService.getReviews();
  }

  // Submit Booking Request (Posts to WP REST API if live, always saves to local storage)
  async submitBooking(bookingData: Omit<BookingEnquiry, 'id' | 'referenceNumber' | 'createdAt' | 'status'>): Promise<BookingEnquiry> {
    // 1. Always save in reliable local storage
    const saved = storageService.saveBooking(bookingData);

    // 2. If WP is connected, sync via REST API asynchronously
    if (this.status.isConnected && WP_API_URL) {
      try {
        await fetch(`${WP_API_URL}/mmr/v1/bookings`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(saved)
        });
      } catch (e) {
        console.error('Failed to sync booking to WordPress REST endpoint:', e);
      }
    }

    return saved;
  }

  // Submit Customer Review
  async submitReview(reviewData: Omit<CustomerReview, 'id' | 'date' | 'status'>): Promise<CustomerReview> {
    const saved = storageService.saveReview(reviewData);

    if (this.status.isConnected && WP_API_URL) {
      try {
        await fetch(`${WP_API_URL}/mmr/v1/reviews`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(saved)
        });
      } catch (e) {
        console.error('Failed to sync review to WordPress REST endpoint:', e);
      }
    }

    return saved;
  }
}

export const wpService = new WordPressService();
