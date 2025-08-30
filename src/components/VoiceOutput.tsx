import { useEffect, useRef } from 'react';

interface VoiceOutputProps {
  text: string;
  onStart?: () => void;
  onEnd?: () => void;
  onBoundary?: () => void;
}

export const VoiceOutput = ({ text, onStart, onEnd, onBoundary }: VoiceOutputProps) => {
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  useEffect(() => {
    if (!text || !synthRef.current) return;

    // Cancel any ongoing speech
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    // Configure voice settings
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;

    // Try to use a more robotic/AI-like voice
    const voices = synthRef.current.getVoices();
    
    // Wait for voices to load if they're not ready
    if (voices.length === 0) {
      synthRef.current.addEventListener('voiceschanged', () => {
        const newVoices = synthRef.current!.getVoices();
        const preferredVoices = newVoices.filter(voice => 
          voice.name.toLowerCase().includes('google') ||
          voice.name.toLowerCase().includes('alex') ||
          voice.name.toLowerCase().includes('daniel') ||
          voice.lang.startsWith('en')
        );
        
        if (preferredVoices.length > 0) {
          utterance.voice = preferredVoices[0];
        }
      });
    } else {
      const preferredVoices = voices.filter(voice => 
        voice.name.toLowerCase().includes('google') ||
        voice.name.toLowerCase().includes('alex') ||
        voice.name.toLowerCase().includes('daniel') ||
        voice.lang.startsWith('en')
      );
      
      if (preferredVoices.length > 0) {
        utterance.voice = preferredVoices[0];
      }
    }

    // Event handlers
    utterance.onstart = () => {
      console.log('Speech started');
      onStart?.();
    };

    utterance.onend = () => {
      console.log('Speech ended');
      onEnd?.();
    };

    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        onBoundary?.();
      }
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event.error);
      onEnd?.();
    };

    // Speak the text
    synthRef.current.speak(utterance);

    // Cleanup function
    return () => {
      if (synthRef.current && utteranceRef.current) {
        synthRef.current.cancel();
      }
    };
  }, [text, onStart, onEnd, onBoundary]);

  // Component doesn't render anything visible
  return null;
};