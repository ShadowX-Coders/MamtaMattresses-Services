import React, { useState, useEffect } from 'react';
import { wpService, WordPressStatus } from '../services/wordpress';
import { Database, CheckCircle2, AlertTriangle, RefreshCw, ExternalLink } from 'lucide-react';

export const WordPressStatusBadge: React.FC = () => {
  const [status, setStatus] = useState<WordPressStatus>(wpService.getStatus());
  const [isChecking, setIsChecking] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check connection once on mount
    wpService.testConnection().then(setStatus);
  }, []);

  const handleTestNow = async () => {
    setIsChecking(true);
    const newStatus = await wpService.testConnection();
    setStatus(newStatus);
    setIsChecking(false);
  };

  return (
    <>
      {/* Discrete Badge */}
      <button
        onClick={() => setShowModal(true)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#EAF1E8] border border-[#DCEBE2] hover:border-[#176B52] transition-colors"
        title="View WordPress REST API status"
      >
        <span className={`w-2 h-2 rounded-full ${status.isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
        <span className="text-[#202824]">
          CMS: {status.isConnected ? 'WordPress Live' : 'Local Fallback'}
        </span>
      </button>

      {/* Diagnostic Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl border border-[#DCEBE2] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCEBE2]">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-[#176B52]" />
                <h3 className="text-base font-bold text-[#202824]">WordPress REST API Integration Status</h3>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-[#718078]">Connection State:</span>
                <span className={`font-bold ${status.isConnected ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {status.isConnected ? '● Connected (REST API Active)' : '○ Disconnected (Local Fallback Mode Active)'}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-[#718078]">Configured URL:</span>
                <span className="font-mono text-[11px] text-[#202824]">{status.wpUrl}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-[#718078]">API Endpoint:</span>
                <span className="font-mono text-[11px] text-[#202824]">{status.apiUrl}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-[#718078]">Status Message:</span>
                <span className="text-[#202824] text-right max-w-xs">{status.statusMessage}</span>
              </div>
            </div>

            <div className="p-3 bg-[#F7F8F4] rounded-2xl border border-[#DCEBE2] text-xs text-[#718078] leading-relaxed">
              {status.isConnected ? (
                <div className="flex items-center gap-2 text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Changes made in your WordPress Admin will reflect automatically.</span>
                </div>
              ) : (
                <div className="flex items-start gap-2 text-amber-800">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">Local Data Fallback Active</strong>
                    All services, booking requests, and reviews function seamlessly. Enquiries are saved in browser storage and can be managed directly in the Admin Portal.
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={handleTestNow}
                disabled={isChecking}
                className="clay-button-secondary text-xs px-4 py-2"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isChecking ? 'animate-spin' : ''}`} />
                <span>{isChecking ? 'Checking...' : 'Re-test Connection'}</span>
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="clay-button-primary text-xs px-4 py-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
