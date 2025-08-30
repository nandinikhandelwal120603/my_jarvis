import { useEffect, useRef, useState, useCallback } from 'react';

// Extend the Window interface for TypeScript
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface VoiceInputProps {
  enabled: boolean;
  onWakeWordDetected: () => void;
  onTranscribed: (text: string) => void;
  onError: (error: string) => void;
}

export const VoiceInput = ({ enabled, onWakeWordDetected, onTranscribed, onError }: VoiceInputProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const initializeSpeechRecognition = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      onError('Speech recognition not supported in this browser');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
        } else {
          interimTranscript += result[0].transcript;
        }
      }

      const fullTranscript = (finalTranscript || interimTranscript).toLowerCase().trim();
      setTranscript(fullTranscript);

      // Check for wake word
      if (fullTranscript.includes('hey jarvis') || fullTranscript.includes('hey jerry')) {
        onWakeWordDetected();
        
        // Extract command after wake word
        const wakeWordPattern = /(?:hey jarvis|hey jerry)\s*(.*)/i;
        const match = fullTranscript.match(wakeWordPattern);
        
        if (match && match[1].trim()) {
          const command = match[1].trim();
          onTranscribed(command);
          resetTimeout();
        } else {
          // Wait for command after wake word
          resetTimeout();
        }
      } else if (isListening && finalTranscript) {
        // If we're already listening (after wake word), process the command
        onTranscribed(finalTranscript);
        resetTimeout();
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      // Only report non-aborted errors to avoid spam
      if (event.error !== 'no-speech' && event.error !== 'aborted') {
        onError(`Speech recognition error: ${event.error}`);
      }
      // Stop the current recognition to prevent conflicts
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      // Only restart if still enabled and not already restarting
      if (enabled && !recognitionRef.current?.restarting) {
        setTimeout(() => {
          try {
            if (recognitionRef.current && enabled) {
              recognitionRef.current.restarting = true;
              recognitionRef.current.start();
              recognitionRef.current.restarting = false;
            }
          } catch (error) {
            console.warn('Recognition restart failed:', error);
            recognitionRef.current.restarting = false;
          }
        }, 500); // Increased delay to prevent rapid restarts
      }
    };

    return recognition;
  }, [enabled, onWakeWordDetected, onTranscribed, onError, isListening]);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Stop listening after 6 seconds of silence
    timeoutRef.current = setTimeout(() => {
      setTranscript('');
      setIsListening(false);
    }, 6000);
  };

  useEffect(() => {
    if (enabled) {
      try {
        // Clean up any existing recognition first
        if (recognitionRef.current) {
          recognitionRef.current.stop();
          recognitionRef.current = null;
        }
        
        // Initialize new recognition after a short delay
        setTimeout(() => {
          recognitionRef.current = initializeSpeechRecognition();
          if (recognitionRef.current) {
            recognitionRef.current.start();
          }
        }, 200);
      } catch (error) {
        console.error('Failed to start speech recognition:', error);
        onError('Failed to start speech recognition');
      }
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
      setIsListening(false);
      setTranscript('');
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
    };
  }, [enabled, onError]);

  // Keyboard shortcut (Ctrl+J)
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'j') {
        event.preventDefault();
        if (enabled) {
          onWakeWordDetected();
        }
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [enabled, onWakeWordDetected]);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {enabled && (
        <div className="flex items-center gap-2 px-3 py-2 glass-surface rounded-lg text-sm">
          <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-neon-cyan animate-pulse' : 'bg-muted-foreground'}`} />
          <span className="text-muted-foreground">
            {isListening ? 'Listening...' : 'Say "Hey Jarvis"'}
          </span>
          {transcript && (
            <span className="text-neon-cyan ml-2">"{transcript}"</span>
          )}
        </div>
      )}
    </div>
  );
};
