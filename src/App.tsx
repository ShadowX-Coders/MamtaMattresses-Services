import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { BookingPage } from './pages/BookingPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsConditionsPage } from './pages/TermsConditionsPage';
import { AdminPortalPage } from './pages/AdminPortalPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { NavigationPage } from './types';
import { openWhatsAppBooking } from './utils/whatsapp';
import { SERVICES_DATA } from './data/servicesData';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('home');
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>(undefined);

  // Sync hash routing for browser back/forward and bookmarking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as NavigationPage;
      const validPages: NavigationPage[] = ['home', 'services', 'about', 'reviews', 'book', 'contact', 'privacy', 'terms', 'admin'];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      } else if (!hash) {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: NavigationPage) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookService = (serviceId?: string) => {
    if (serviceId) {
      setPreselectedServiceId(serviceId);
      const service = SERVICES_DATA.find(s => s.id === serviceId);
      openWhatsAppBooking(service ? service.name : undefined);
    } else {
      openWhatsAppBooking();
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onNavigate={navigateTo}
            onBookService={handleBookService}
          />
        );
      case 'services':
        return <ServicesPage onBookService={handleBookService} />;
      case 'about':
        return <AboutPage onNavigate={navigateTo} onBookClick={() => handleBookService()} />;
      case 'reviews':
        return <ReviewsPage onNavigate={navigateTo} onBookClick={() => handleBookService()} />;
      case 'book':
        return (
          <BookingPage
            initialServiceId={preselectedServiceId}
            onBookingSuccess={() => {}}
          />
        );
      case 'contact':
        return <ContactPage />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'terms':
        return <TermsConditionsPage />;
      case 'admin':
        return <AdminPortalPage onNavigate={navigateTo} />;
      default:
        return <NotFoundPage onNavigate={navigateTo} onBookClick={() => handleBookService()} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8F4] text-[#202824] font-sans">
      
      {/* Sticky Responsive Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onBookClick={() => handleBookService()}
      />

      {/* Main Page Body */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Persistent Floating WhatsApp widget */}
      <FloatingWhatsApp />

      {/* Premium Green Footer */}
      <Footer
        onNavigate={navigateTo}
        onBookClick={() => handleBookService()}
        onSelectService={(serviceId) => handleBookService(serviceId)}
      />

    </div>
  );
};

export default App;
