import { useState } from 'react';
import { saveEmailSubscription } from '../lib/emailService';

export interface EmailSubscriptionState {
  email: string;
  isSubmitting: boolean;
  isSubmitted: boolean;
  error: string | null;
  successMessage: string | null;
}

export function useEmailSubscription() {
  const [state, setState] = useState<EmailSubscriptionState>({
    email: '',
    isSubmitting: false,
    isSubmitted: false,
    error: null,
    successMessage: null
  });

  const handleEmailChange = (email: string) => {
    setState(prev => ({
      ...prev,
      email,
      error: null,
      successMessage: null
    }));
  };

  const handleSubmit = async (e: React.FormEvent, source: string = 'website') => {
    e.preventDefault();
    
    if (!state.email || !state.email.includes('@')) {
      setState(prev => ({
        ...prev,
        error: 'Please enter a valid email address'
      }));
      return;
    }

    setState(prev => ({
      ...prev,
      isSubmitting: true,
      error: null,
      successMessage: null
    }));

    try {
      const result = await saveEmailSubscription(state.email, source);
      
      if (result.success) {
        setState(prev => ({
          ...prev,
          isSubmitted: true,
          isSubmitting: false,
          successMessage: result.message,
          email: '' // Clear the email field
        }));
      } else {
        setState(prev => ({
          ...prev,
          isSubmitted: false,
          isSubmitting: false,
          error: result.message
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isSubmitted: false,
        isSubmitting: false,
        error: 'An unexpected error occurred. Please try again.'
      }));
    }
  };

  const reset = () => {
    setState({
      email: '',
      isSubmitting: false,
      isSubmitted: false,
      error: null,
      successMessage: null
    });
  };

  return {
    ...state,
    handleEmailChange,
    handleSubmit,
    reset
  };
}
