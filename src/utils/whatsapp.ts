export const BUSINESS_WHATSAPP_NUMBER = '918412937878';
export const BUSINESS_WHATSAPP_BASE_URL = 'https://wa.me/918412937878';

export const getWhatsAppUrl = (message?: string): string => {
  if (!message) {
    return BUSINESS_WHATSAPP_BASE_URL;
  }
  return `${BUSINESS_WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
};

export const openWhatsApp = (message?: string): void => {
  const url = getWhatsAppUrl(message);
  window.open(url, '_blank');
};

export const openWhatsAppBooking = (serviceName?: string): void => {
  if (serviceName) {
    openWhatsApp(
      `Hello Mamta Mattresses Repairing Service, I would like to book an at-home mattress repair for: ${serviceName}.\nPlease share availability and pricing for Pune.`
    );
  } else {
    openWhatsApp(
      'Hello Mamta Mattresses Repairing Service, I would like to book an at-home mattress repair appointment in Pune. Please share details and availability.'
    );
  }
};

export const openWhatsAppEnquiry = (serviceName?: string): void => {
  if (serviceName) {
    openWhatsApp(`Hello, I am interested in ${serviceName}. Please share the details and pricing.`);
  } else {
    openWhatsApp('Hello Mamta Mattresses Repairing Service, I would like to enquire about mattress repairing services in Pune.');
  }
};
