"use client"

import { useExternalLinks } from '@/hooks/useExternalLinks';

export default function FirestoreTest() {
  const { links, loading, error } = useExternalLinks();

  return (
    <div className="fixed bottom-4 right-4 bg-white border-2 border-gray-300 rounded-lg shadow-lg p-4 max-w-sm z-50">
      <h3 className="font-bold text-sm mb-2">Firestore Test</h3>
      <div className="text-xs space-y-1">
        <div>
          <strong>Status:</strong>{' '}
          {loading ? (
            <span className="text-yellow-600">Loading...</span>
          ) : error ? (
            <span className="text-red-600">Error: {error}</span>
          ) : (
            <span className="text-green-600">✅ Connected</span>
          )}
        </div>
        {!loading && !error && (
          <>
            <div>
              <strong>Email:</strong> {links.contact.email}
            </div>
            <div>
              <strong>Phone:</strong> {links.contact.phone}
            </div>
            <div>
              <strong>Google Play:</strong>{' '}
              {links.downloadLinks.googlePlay ? '✅ Set' : '❌ Not set'}
            </div>
            <div>
              <strong>Donation URL:</strong>{' '}
              {links.donation.url ? '✅ Set' : '❌ Not set'}
            </div>
            <div className="mt-2 text-gray-500 text-[10px]">
              Check browser console for detailed logs
            </div>
          </>
        )}
      </div>
    </div>
  );
}

