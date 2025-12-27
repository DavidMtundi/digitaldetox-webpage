import { collection, addDoc, serverTimestamp, query, where, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export interface EmailSubscription {
  id?: string;
  email: string;
  subscribedAt: any; // Firestore timestamp
  source: string; // Where the subscription came from
  status: 'active' | 'unsubscribed';
}

/**
 * Save email subscription to Firestore
 */
export async function saveEmailSubscription(email: string, source: string = 'website'): Promise<{ success: boolean; message: string; id?: string }> {
  try {
    const normalizedEmail = email.toLowerCase().trim();
    
    // Check if email already exists by trying to read the document
    const emailDocRef = doc(db, 'email-updates', normalizedEmail);
    const emailDoc = await getDoc(emailDocRef);
    
    if (emailDoc.exists()) {
      const data = emailDoc.data();
      if (data.status === 'active') {
        return {
          success: false,
          message: 'This email is already subscribed to updates.'
        };
      }
      // If unsubscribed, allow re-subscription
    }

    // Use email as document ID to prevent duplicates and match security rules
    await setDoc(emailDocRef, {
      email: normalizedEmail,
      subscribedAt: serverTimestamp(),
      source: source,
      status: 'active'
    }, { merge: true }); // merge allows re-subscription if previously unsubscribed

    return {
      success: true,
      message: 'Successfully subscribed to updates!',
      id: normalizedEmail
    };
  } catch (error: any) {
    console.error('Error saving email subscription:', error);
    
    // Handle specific Firestore errors
    if (error.code === 'permission-denied') {
      return {
        success: false,
        message: 'Permission denied. Please check your email format.'
      };
    }
    
    return {
      success: false,
      message: 'Failed to subscribe. Please try again later.'
    };
  }
}

/**
 * Check if email already exists in the collection
 */
export async function checkEmailExists(email: string): Promise<boolean> {
  try {
    const normalizedEmail = email.toLowerCase().trim();
    const emailDocRef = doc(db, 'email-updates', normalizedEmail);
    const emailDoc = await getDoc(emailDocRef);
    return emailDoc.exists() && emailDoc.data()?.status === 'active';
  } catch (error) {
    console.error('Error checking email existence:', error);
    return false;
  }
}

/**
 * Get all email subscriptions (for admin purposes)
 */
export async function getAllEmailSubscriptions(): Promise<EmailSubscription[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'email-updates'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as EmailSubscription[];
  } catch (error) {
    console.error('Error getting email subscriptions:', error);
    return [];
  }
}
