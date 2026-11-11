import { CustomerReview } from '../types';

export const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-demo-1',
    authorName: 'Rajesh Kulkarni',
    rating: 5,
    reviewText: 'Technician arrived right on time at our Kothrud flat. Our King-size mattress had a deep sag in the center. In about 2.5 hours, he opened the seam, replaced the worn foam core with 40D high-resilience foam, and stitched it back neatly. Saved us from spending ₹35,000 on a new mattress!',
    serviceUsed: 'Mattress Sagging Repair & Foam Replacement',
    puneLocality: 'Kothrud, Pune',
    date: '2026-10-18',
    isDemo: true,
    status: 'Approved',
    isFeatured: true
  },
  {
    id: 'rev-demo-2',
    authorName: 'Priya Joshi',
    rating: 5,
    reviewText: 'Very transparent at-home service! The technician worked cleanly in our spare room without creating any mess. He replaced our squeaky pocket springs and added an extra layer of soft memory foam. Sleeping comfortably after months.',
    serviceUsed: 'Mattress Spring Repair & Memory Foam',
    puneLocality: 'Baner, Pune',
    date: '2026-10-24',
    isDemo: true,
    status: 'Approved',
    isFeatured: true
  },
  {
    id: 'rev-demo-3',
    authorName: 'Amit Deshmukh',
    rating: 5,
    reviewText: 'We bought a new bed frame and our old mattress was 4 inches too long. Mamta Mattresses technician came to our Hinjewadi home, carefully measured the cot, resized the mattress, and re-quilted the border tape cleanly. Fantastic craftmanship.',
    serviceUsed: 'Mattress Resizing & Edge Repair',
    puneLocality: 'Hinjewadi Phase 2, Pune',
    date: '2026-11-02',
    isDemo: true,
    status: 'Approved',
    isFeatured: true
  }
];
