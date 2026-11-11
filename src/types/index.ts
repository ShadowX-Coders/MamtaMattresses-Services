export type ServiceCategory = 
  | 'Mattress Repair'
  | 'Foam & Comfort Solutions'
  | 'Mattress Customization'
  | 'Restoration & Fabric'
  | 'Cleaning & Hygiene';

export interface ServiceItem {
  id: string;
  name: string;
  category: ServiceCategory;
  shortDesc: string;
  fullDesc: string;
  benefits: string[];
  commonIssues: string[];
  estimatedDuration: string;
  tag?: string;
  iconName: string;
}

export type MattressType = 
  | 'Spring / Pocket Spring'
  | 'Memory Foam'
  | 'High-Density Foam'
  | 'Coir / Coir Foam'
  | 'Latex'
  | 'Dual Comfort / Reversible'
  | 'Traditional Cotton'
  | 'Orthopedic'
  | 'Other';

export type MattressSize = 
  | 'Single (36" x 72" / 75")'
  | 'Double (48" x 72" / 75")'
  | 'Queen (60" x 78" / 72")'
  | 'King (72" x 78" / 72")'
  | 'Custom Size';

export interface BookingEnquiry {
  id: string;
  referenceNumber: string;
  fullName: string;
  mobileNumber: string;
  whatsappNumber: string;
  email?: string;
  serviceId: string;
  serviceName: string;
  mattressType: MattressType;
  mattressSize: MattressSize;
  mattressCount: number;
  problemDescription: string;
  puneArea: string;
  fullAddress: string;
  preferredDate: string;
  preferredTimeSlot: string;
  additionalInstructions?: string;
  photos: string[]; // data URLs or preview URLs
  createdAt: string;
  status: 'Pending' | 'Contacted' | 'Confirmed' | 'Completed' | 'Cancelled';
}

export interface CustomerReview {
  id: string;
  authorName: string;
  rating: number; // 1 to 5
  reviewText: string;
  serviceUsed: string;
  puneLocality: string;
  date: string;
  isDemo?: boolean;
  status: 'Approved' | 'Pending' | 'Rejected';
  isFeatured?: boolean;
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  serviceCategory: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  isIllustrativeDemo?: boolean;
}

export type NavigationPage = 
  | 'home'
  | 'services'
  | 'about'
  | 'reviews'
  | 'book'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'admin';
