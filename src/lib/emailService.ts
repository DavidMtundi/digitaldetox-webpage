import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
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
    // Check if email already exists
    const existingSubscription = await checkEmailExists(email);
    if (existingSubscription) {
      return {
        success: false,
        message: 'This email is already subscribed to updates.'
      };
    }

    // Add email to Firestore collection
    const docRef = await addDoc(collection(db, 'email-updates'), {
      email: email.toLowerCase().trim(),
      subscribedAt: serverTimestamp(),
      source: source,
      status: 'active'
    });

    return {
      success: true,
      message: 'Successfully subscribed to updates!',
      id: docRef.id
    };
  } catch (error) {
    console.error('Error saving email subscription:', error);
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
    const emailQuery = query(
      collection(db, 'email-updates'),
      where('email', '==', email.toLowerCase().trim())
    );
    
    const querySnapshot = await getDocs(emailQuery);
    return !querySnapshot.empty;
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
