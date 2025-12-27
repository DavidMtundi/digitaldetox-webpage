"use client"

import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface ExternalLinks {
  downloadLinks: {
    googlePlay: string;
    appStore: string | null;
    windows: string | null;
    mac: string | null;
  };
  contact: {
    email: string;
    phone: string;
  };
  donation: {
    url: string | null;
  };
}

// Fallback values in case Firebase is unavailable
const FALLBACK_LINKS: ExternalLinks = {
  downloadLinks: {
    googlePlay: "",
    appStore: null,
    windows: null,
    mac: null,
  },
  contact: {
    email: "",
    phone: "",
  },
  donation: {
    url: null,
  },
};

export function useExternalLinks() {
  const [links, setLinks] = useState<ExternalLinks>(FALLBACK_LINKS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        setLoading(true);
        
        // Fetch from three separate documents (note: document name is lowercase 'downloadlinks')
        const [downloadLinksDoc, contactDoc, donationDoc] = await Promise.all([
          getDoc(doc(db, 'config', 'downloadlinks')), // lowercase as shown in Firestore
          getDoc(doc(db, 'config', 'contact')),
          getDoc(doc(db, 'config', 'donation'))
        ]);
        
        const fetchedLinks: ExternalLinks = {
          downloadLinks: {
            googlePlay: downloadLinksDoc.exists() && downloadLinksDoc.data().googlePlay 
              ? downloadLinksDoc.data().googlePlay 
              : FALLBACK_LINKS.downloadLinks.googlePlay,
            appStore: downloadLinksDoc.exists() && downloadLinksDoc.data().appStore 
              ? downloadLinksDoc.data().appStore 
              : FALLBACK_LINKS.downloadLinks.appStore,
            windows: downloadLinksDoc.exists() && downloadLinksDoc.data().windows 
              ? downloadLinksDoc.data().windows 
              : FALLBACK_LINKS.downloadLinks.windows,
            mac: downloadLinksDoc.exists() && downloadLinksDoc.data().mac 
              ? downloadLinksDoc.data().mac 
              : FALLBACK_LINKS.downloadLinks.mac,
          },
          contact: {
            email: contactDoc.exists() && contactDoc.data().email 
              ? contactDoc.data().email 
              : FALLBACK_LINKS.contact.email,
            phone: contactDoc.exists() && contactDoc.data().phone 
              ? contactDoc.data().phone 
              : FALLBACK_LINKS.contact.phone,
          },
          donation: {
            url: donationDoc.exists() && donationDoc.data().url 
              ? donationDoc.data().url 
              : FALLBACK_LINKS.donation.url,
          }
        };
        
        // Check if we got any data from Firestore
        const hasFirestoreData = downloadLinksDoc.exists() || contactDoc.exists() || donationDoc.exists();
        
        if (hasFirestoreData) {
          setLinks(fetchedLinks);
        } else {
          setLinks(FALLBACK_LINKS);
        }
        setError(null);
      } catch (err: any) {
        setError('Failed to load links');
        // Use fallback values on error
        setLinks(FALLBACK_LINKS);
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  return { links, loading, error };
}

