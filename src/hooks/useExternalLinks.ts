"use client"

import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  getEnvDownloadLinks,
  mergeDownloadLinks,
  type DownloadLinksConfig,
} from '@/lib/download-links';
import { getEnvContactInfo } from '@/lib/contact';

export interface ExternalLinks {
  downloadLinks: DownloadLinksConfig;
  contact: {
    email: string;
    phone: string;
    hours?: string;
  };
  donation: {
    url: string | null;
  };
}

const FALLBACK_LINKS: ExternalLinks = {
  downloadLinks: mergeDownloadLinks(undefined, getEnvDownloadLinks()),
  contact: getEnvContactInfo(),
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
      const envDownloads = getEnvDownloadLinks();
      const envContact = getEnvContactInfo();

      try {
        setLoading(true);

        if (!db) {
          setLinks({
            ...FALLBACK_LINKS,
            downloadLinks: mergeDownloadLinks(undefined, envDownloads),
            contact: envContact,
          });
          setError(null);
          return;
        }

        const [downloadLinksDoc, contactDoc, donationDoc] = await Promise.all([
          getDoc(doc(db, 'config', 'downloadlinks')),
          getDoc(doc(db, 'config', 'contact')),
          getDoc(doc(db, 'config', 'donation'))
        ]);

        const firestoreDownloads = downloadLinksDoc.exists()
          ? (downloadLinksDoc.data() as Partial<DownloadLinksConfig>)
          : undefined;

        const fetchedLinks: ExternalLinks = {
          downloadLinks: mergeDownloadLinks(firestoreDownloads, envDownloads),
          contact: {
            email:
              (contactDoc.exists() && contactDoc.data().email) || envContact.email,
            phone:
              (contactDoc.exists() && contactDoc.data().phone) || envContact.phone,
            hours: envContact.hours,
          },
          donation: {
            url: donationDoc.exists() && donationDoc.data().url
              ? donationDoc.data().url
              : FALLBACK_LINKS.donation.url,
          }
        };

        setLinks(fetchedLinks);
        setError(null);
      } catch {
        setError('Failed to load links');
        setLinks({
          ...FALLBACK_LINKS,
          downloadLinks: mergeDownloadLinks(undefined, envDownloads),
          contact: envContact,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  return { links, loading, error };
}
