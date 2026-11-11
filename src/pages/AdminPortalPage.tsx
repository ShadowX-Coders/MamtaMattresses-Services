import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MessageSquare, 
  Database, 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  XCircle, 
  Star, 
  Download, 
  RefreshCw, 
  Trash2, 
  Clock, 
  ShieldCheck,
  Code,
  Lock,
  LogOut,
  Key
} from 'lucide-react';
import { storageService } from '../services/storage';
import { wpService, WordPressStatus } from '../services/wordpress';
import { BookingEnquiry, CustomerReview, NavigationPage } from '../types';

interface AdminPortalPageProps {
  onNavigate: (page: NavigationPage) => void;
}

export const AdminPortalPage: React.FC<AdminPortalPageProps> = ({ onNavigate }) => {
  // Authentication State (Session-based, not publicly accessible)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('mmr_admin_auth') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState<'bookings' | 'reviews' | 'wordpress'>('bookings');
  
  // Bookings state
  const [bookings, setBookings] = useState<BookingEnquiry[]>([]);
  const [bookingFilter, setBookingFilter] = useState<string>('All');

  // Reviews state
  const [reviews, setReviews] = useState<CustomerReview[]>([]);

  // WordPress status state
  const [wpStatus, setWpStatus] = useState<WordPressStatus>(wpService.getStatus());
  const [isTestingWp, setIsTestingWp] = useState(false);

  const loadData = () => {
    setBookings(storageService.getBookings());
    setReviews(storageService.getReviews());
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
      wpService.testConnection().then(setWpStatus);
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    // Secure authentication check: accept business owner passkey (phone or secret)
    const validKeys = ['8412937878', 'mamta2026', 'mamta8412'];
    if (validKeys.includes(passcode.trim())) {
      sessionStorage.setItem('mmr_admin_auth', 'true');
      setIsAuthenticated(true);
      setPasscode('');
    } else {
      setAuthError('Invalid credentials. Access restricted to Mamta Mattresses business owner.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('mmr_admin_auth');
    setIsAuthenticated(false);
    onNavigate('home');
  };

  // Booking handlers
  const handleStatusChange = (id: string, status: BookingEnquiry['status']) => {
    storageService.updateBookingStatus(id, status);
    loadData();
  };

  const handleDeleteBooking = (id: string) => {
    if (confirm('Delete this booking record?')) {
      storageService.deleteBooking(id);
      loadData();
    }
  };

  const handleWhatsAppCustomer = (b: BookingEnquiry) => {
    const text = encodeURIComponent(
      `Hello ${b.fullName}, this is Mamta Mattresses Repairing Service Pune regarding your booking request (${b.referenceNumber}) for ${b.serviceName}. We are ready to confirm your at-home repair appointment for ${b.preferredDate} (${b.preferredTimeSlot}).`
    );
    window.open(`https://wa.me/91${b.whatsappNumber.replace(/\D/g, '').slice(-10)}?text=${text}`, '_blank');
  };

  const handleExportCSV = () => {
    if (bookings.length === 0) {
      alert('No booking records to export.');
      return;
    }

    const headers = ['Reference', 'Date Created', 'Customer Name', 'Mobile', 'WhatsApp', 'Email', 'Service', 'Type', 'Size', 'Count', 'Locality', 'Full Address', 'Preferred Date', 'Slot', 'Status'];
    const rows = bookings.map(b => [
      `"${b.referenceNumber}"`,
      `"${b.createdAt}"`,
      `"${b.fullName}"`,
      `"${b.mobileNumber}"`,
      `"${b.whatsappNumber}"`,
      `"${b.email || ''}"`,
      `"${b.serviceName}"`,
      `"${b.mattressType}"`,
      `"${b.mattressSize}"`,
      `"${b.mattressCount}"`,
      `"${b.puneArea}"`,
      `"${(b.fullAddress || '').replace(/"/g, '""')}"`,
      `"${b.preferredDate}"`,
      `"${b.preferredTimeSlot}"`,
      `"${b.status}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `mamta-mattress-bookings-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Review handlers
  const handleReviewStatus = (id: string, status: CustomerReview['status']) => {
    storageService.updateReviewStatus(id, status);
    loadData();
  };

  const handleToggleFeatured = (id: string) => {
    storageService.toggleReviewFeatured(id);
    loadData();
  };

  const handleDeleteReview = (id: string) => {
    if (confirm('Delete this customer review?')) {
      storageService.deleteReview(id);
      loadData();
    }
  };

  // WP test
  const handleTestWordPress = async () => {
    setIsTestingWp(true);
    const res = await wpService.testConnection();
    setWpStatus(res);
    setIsTestingWp(false);
  };

  const filteredBookings = bookings.filter(b => {
    if (bookingFilter === 'All') return true;
    return b.status === bookingFilter;
  });

  // PRIVATE AUTHENTICATION GATE SCREEN
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#EAF1E8] text-[#176B52] mx-auto flex items-center justify-center shadow-clay">
          <Lock className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-[#202824]">
            Private Business Administration
          </h2>
          <p className="text-xs text-[#718078]">
            Restricted access. Please enter the business owner passkey to continue.
          </p>
        </div>

        {authError && (
          <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
            {authError}
          </div>
        )}

        <form onSubmit={handleLogin} className="clay-card p-6 bg-white border border-[#DCEBE2] space-y-4">
          <div className="text-left">
            <label className="block text-xs font-bold text-[#202824] mb-1.5">
              Owner Passkey / PIN
            </label>
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter owner passkey"
              className="w-full clay-input px-3.5 py-2.5 text-xs text-[#202824]"
              autoFocus
              required
            />
          </div>

          <button
            type="submit"
            className="w-full clay-button-primary py-3 text-xs font-bold shadow-md flex items-center justify-center gap-2"
          >
            <Key className="w-4 h-4" />
            <span>Unlock Admin Portal</span>
          </button>
        </form>

        <button
          onClick={() => onNavigate('home')}
          className="text-xs text-[#718078] hover:text-[#176B52] font-semibold"
        >
          ← Return to Public Website
        </button>
      </div>
    );
  }

  // AUTHENTICATED ADMIN DASHBOARD
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#DCEBE2]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF1E8] text-[#176B52] text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Private Management Portal</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#202824]">
            Business Owner Administration
          </h1>
          <p className="text-xs sm:text-sm text-[#718078] mt-0.5">
            Manage doorstep repair enquiries, moderate customer reviews, and inspect WordPress Headless API sync.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('home')}
            className="clay-button-secondary text-xs px-4 py-2"
          >
            View Website
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-full text-xs font-bold bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 flex items-center gap-1.5"
            title="Lock and sign out of admin portal"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock / Sign Out</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#DCEBE2] pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
            activeTab === 'bookings'
              ? 'bg-[#176B52] text-white shadow-sm'
              : 'text-[#718078] hover:bg-[#EAF1E8]'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Repair Enquiries ({bookings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
            activeTab === 'reviews'
              ? 'bg-[#176B52] text-white shadow-sm'
              : 'text-[#718078] hover:bg-[#EAF1E8]'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Review Moderation ({reviews.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('wordpress')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
            activeTab === 'wordpress'
              ? 'bg-[#176B52] text-white shadow-sm'
              : 'text-[#718078] hover:bg-[#EAF1E8]'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>WordPress REST Bridge</span>
          <span className={`w-2 h-2 rounded-full ${wpStatus.isConnected ? 'bg-emerald-400' : 'bg-amber-400'}`} />
        </button>
      </div>

      {/* TAB 1: BOOKING ENQUIRIES */}
      {activeTab === 'bookings' && (
        <div className="space-y-6">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Status Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {['All', 'Pending', 'Contacted', 'Confirmed', 'Completed', 'Cancelled'].map((status) => (
                <button
                  key={status}
                  onClick={() => setBookingFilter(status)}
                  className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                    bookingFilter === status
                      ? 'bg-[#176B52] text-white'
                      : 'bg-white text-[#718078] border border-[#DCEBE2] hover:bg-[#EAF1E8]'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Export Button */}
            <button
              onClick={handleExportCSV}
              className="clay-button-secondary text-xs px-4 py-2 self-start sm:self-auto flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5 text-[#176B52]" />
              <span>Export CSV</span>
            </button>
          </div>

          {/* Bookings List */}
          {filteredBookings.length === 0 ? (
            <div className="clay-card p-12 bg-white text-center space-y-3">
              <Calendar className="w-10 h-10 text-[#718078] mx-auto opacity-50" />
              <h3 className="text-base font-bold text-[#202824]">No repair bookings in this status</h3>
              <p className="text-xs text-[#718078]">
                New customer booking submissions from the website will appear here instantly.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((b) => (
                <div key={b.id} className="clay-card p-6 bg-white border border-[#DCEBE2] space-y-4">
                  
                  {/* Top Line */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EAF1E8] pb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold bg-[#EAF1E8] text-[#176B52] px-2.5 py-1 rounded-md">
                        {b.referenceNumber}
                      </span>
                      <h3 className="text-base font-bold text-[#202824]">
                        {b.fullName}
                      </h3>
                      <span className="text-xs text-[#718078]">({b.puneArea})</span>
                    </div>

                    {/* Status Pill & Selector */}
                    <div className="flex items-center gap-2">
                      <select
                        value={b.status}
                        onChange={(e) => handleStatusChange(b.id, e.target.value as BookingEnquiry['status'])}
                        className="clay-input text-xs font-bold px-3 py-1 bg-white text-[#176B52]"
                      >
                        <option value="Pending">Pending Review</option>
                        <option value="Contacted">Customer Contacted</option>
                        <option value="Confirmed">Confirmed Visit</option>
                        <option value="Completed">Repair Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>

                      <button
                        onClick={() => handleDeleteBooking(b.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Booking Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                    <div>
                      <span className="block text-[#718078] font-medium">Service Requested:</span>
                      <strong className="text-[#202824]">{b.serviceName}</strong>
                    </div>

                    <div>
                      <span className="block text-[#718078] font-medium">Mattress Details:</span>
                      <strong className="text-[#202824]">{b.mattressCount}x {b.mattressType} ({b.mattressSize})</strong>
                    </div>

                    <div>
                      <span className="block text-[#718078] font-medium">Preferred Appointment:</span>
                      <strong className="text-[#176B52]">{b.preferredDate}</strong>
                      <div className="text-[11px] text-[#718078]">{b.preferredTimeSlot}</div>
                    </div>

                    <div>
                      <span className="block text-[#718078] font-medium">Submitted At:</span>
                      <span className="text-[#202824]">{new Date(b.createdAt).toLocaleDateString()} {new Date(b.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>

                  {/* Problem & Address */}
                  <div className="p-3 bg-[#F7F8F4] rounded-2xl border border-[#DCEBE2] text-xs space-y-1.5">
                    <div>
                      <strong className="text-[#176B52]">Problem Description: </strong>
                      <span className="text-[#202824]">{b.problemDescription}</span>
                    </div>
                    <div>
                      <strong className="text-[#176B52]">Doorstep Visit Address: </strong>
                      <span className="text-[#202824]">{b.fullAddress}</span>
                    </div>
                    {b.additionalInstructions && (
                      <div>
                        <strong className="text-[#718078]">Instructions: </strong>
                        <span className="text-[#718078]">{b.additionalInstructions}</span>
                      </div>
                    )}
                  </div>

                  {/* Photos (if attached) */}
                  {b.photos && b.photos.length > 0 && (
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-xs text-[#718078] font-semibold">Attached Photos:</span>
                      {b.photos.map((src, i) => (
                        <a key={i} href={src} target="_blank" rel="noopener noreferrer" className="block w-12 h-12 rounded-lg overflow-hidden border border-[#DCEBE2] hover:opacity-80">
                          <img src={src} alt="Uploaded problem photo" className="w-full h-full object-cover" />
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Fast Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a
                      href={`tel:${b.mobileNumber}`}
                      className="clay-button-primary text-xs px-4 py-2 font-bold"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Customer ({b.mobileNumber})</span>
                    </a>

                    <button
                      onClick={() => handleWhatsAppCustomer(b)}
                      className="clay-button-secondary text-xs px-4 py-2 font-semibold"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>WhatsApp Confirmation to Customer</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* TAB 2: REVIEW MODERATION */}
      {activeTab === 'reviews' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-[#EAF1E8] border border-[#B8DCC5] text-xs text-[#0F4837] flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#176B52] shrink-0" />
            <span>
              <strong>Review Moderation:</strong> Approved reviews display on the customer reviews page. Only genuine customer submissions should be approved.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((rev) => (
              <div key={rev.id} className="clay-card p-6 bg-white border border-[#DCEBE2] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1 text-amber-400">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        rev.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                        rev.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {rev.status}
                      </span>
                      {rev.isDemo && (
                        <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">DEMO</span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-[#202824] italic mb-4 leading-relaxed">
                    "{rev.reviewText}"
                  </p>

                  <div className="text-xs space-y-0.5 border-t border-[#EAF1E8] pt-2 mb-4">
                    <div className="font-bold text-[#202824]">{rev.authorName}</div>
                    <div className="text-[#176B52] font-semibold text-[11px]">{rev.serviceUsed}</div>
                    <div className="text-[#718078] text-[10px]">{rev.puneLocality} • {rev.date}</div>
                  </div>
                </div>

                {/* Moderation Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-[#EAF1E8] text-xs">
                  <div className="flex items-center gap-2">
                    {rev.status !== 'Approved' && (
                      <button
                        onClick={() => handleReviewStatus(rev.id, 'Approved')}
                        className="px-3 py-1.5 bg-emerald-700 text-white rounded-lg font-bold hover:bg-emerald-800 text-[11px]"
                      >
                        Approve
                      </button>
                    )}
                    {rev.status !== 'Rejected' && (
                      <button
                        onClick={() => handleReviewStatus(rev.id, 'Rejected')}
                        className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 text-[11px]"
                      >
                        Reject
                      </button>
                    )}
                    <button
                      onClick={() => handleToggleFeatured(rev.id)}
                      className={`px-3 py-1.5 rounded-lg font-semibold text-[11px] ${
                        rev.isFeatured ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {rev.isFeatured ? '★ Featured on Home' : 'Feature'}
                    </button>
                  </div>

                  <button
                    onClick={() => handleDeleteReview(rev.id)}
                    className="p-1 text-gray-400 hover:text-red-600"
                    title="Delete review"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: WORDPRESS INTEGRATION */}
      {activeTab === 'wordpress' && (
        <div className="space-y-8">
          
          {/* Status Diagnostic Card */}
          <div className="clay-card p-6 sm:p-8 bg-white border border-[#DCEBE2] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${wpStatus.isConnected ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#202824]">
                    WordPress REST API Status: {wpStatus.isConnected ? 'Connected & Live' : 'Disconnected (Local Fallback Active)'}
                  </h3>
                  <p className="text-xs text-[#718078]">
                    Last checked: {wpStatus.checkedAt || 'Just now'}
                  </p>
                </div>
              </div>

              <button
                onClick={handleTestWordPress}
                disabled={isTestingWp}
                className="clay-button-secondary text-xs px-4 py-2"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isTestingWp ? 'animate-spin' : ''}`} />
                <span>{isTestingWp ? 'Testing...' : 'Test Connection'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-[#F7F8F4] p-4 rounded-2xl border border-[#DCEBE2]">
              <div>
                <span className="block text-[#718078] font-bold">VITE_WORDPRESS_URL</span>
                <span className="font-mono text-[#202824]">{wpStatus.wpUrl}</span>
              </div>
              <div>
                <span className="block text-[#718078] font-bold">VITE_WORDPRESS_API_URL</span>
                <span className="font-mono text-[#202824]">{wpStatus.apiUrl}</span>
              </div>
              <div>
                <span className="block text-[#718078] font-bold">Auth Method</span>
                <span className="font-mono text-[#202824]">{wpStatus.authMethod}</span>
              </div>
            </div>

            <div className="text-xs text-[#718078] leading-relaxed">
              <strong>Status Log:</strong> {wpStatus.statusMessage}
            </div>
          </div>

          {/* WordPress Setup Guide */}
          <div className="clay-card p-6 sm:p-8 bg-white border border-[#DCEBE2] space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF1E8] text-[#176B52] text-xs font-bold uppercase tracking-wider mb-1">
                <Code className="w-3.5 h-3.5" />
                <span>Integration Instructions</span>
              </div>
              <h3 className="text-lg font-bold text-[#202824]">
                How to Connect This Website to Your WordPress CMS
              </h3>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#202824]/90 leading-relaxed">
              <div className="p-4 rounded-2xl bg-[#F7F8F4] border border-[#DCEBE2] space-y-2">
                <h4 className="font-bold text-[#176B52]">Step 1: Install Headless REST Bridge Plugin</h4>
                <p>
                  Copy the included PHP file <code>src/wordpress-plugin/mamta-mattress-headless.php</code> and place it inside your WordPress installation directory at <code>wp-content/plugins/mamta-mattress-headless/mamta-mattress-headless.php</code>, then activate it from your WordPress Admin Plugins menu.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F7F8F4] border border-[#DCEBE2] space-y-2">
                <h4 className="font-bold text-[#176B52]">Step 2: Configure Environment Variables</h4>
                <p>
                  Create a <code>.env</code> file in your frontend root (or in your hosting provider settings such as Vercel / Netlify / Hostinger) with the following values:
                </p>
                <pre className="bg-[#202824] text-[#DCEBE2] p-3 rounded-xl font-mono text-xs overflow-x-auto">
{`VITE_WORDPRESS_URL="https://your-wordpress-domain.com"
VITE_WORDPRESS_API_URL="https://your-wordpress-domain.com/wp-json"
VITE_WORDPRESS_AUTH_METHOD="application-passwords"`}
                </pre>
              </div>

              <div className="p-4 rounded-2xl bg-[#F7F8F4] border border-[#DCEBE2] space-y-2">
                <h4 className="font-bold text-[#176B52]">Step 3: What Gets Managed in WordPress</h4>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li><strong>Services (mmr_service):</strong> Edit descriptions, pricing, benefits, and photos directly in WordPress.</li>
                  <li><strong>Reviews (mmr_review):</strong> New website customer reviews save to WordPress with "Pending" status for 1-click admin approval.</li>
                  <li><strong>Bookings (mmr_booking):</strong> Each customer booking creates a record in WordPress and sends an immediate email to <code>SATISHLASHKAR219@GMAIL.COM</code>.</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-[#EAF1E8] border border-[#B8DCC5] text-xs text-[#0F4837]">
                <strong>Offline / Local Guarantee:</strong> Even without WordPress connected, this website runs 100% autonomously. Booking requests and reviews are saved securely in the browser and can be exported as CSV anytime.
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
