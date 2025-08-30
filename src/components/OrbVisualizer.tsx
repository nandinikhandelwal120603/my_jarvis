import { useEffect, useRef, useState } from 'react';

interface OrbVisualizerProps {
  state: 'idle' | 'listening' | 'thinking' | 'speaking';
  audioEnabled: boolean;
}

export const OrbVisualizer = ({ state, audioEnabled }: OrbVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const audioContextRef = useRef<AudioContext>();
  const analyserRef = useRef<AnalyserNode>();
  const microphoneRef = useRef<MediaStreamAudioSourceNode>();
  const [audioData, setAudioData] = useState<number>(0);

  // Initialize audio context for listening mode
  useEffect(() => {
    if (audioEnabled && state === 'listening') {
      initializeAudio();
    } else {
      stopAudio();
    }

    return () => stopAudio();
  }, [audioEnabled, state]);

  const initializeAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
      
      analyserRef.current.fftSize = 256;
      microphoneRef.current.connect(analyserRef.current);
      
      startAudioAnalysis();
    } catch (error) {
      console.error('Failed to initialize audio:', error);
    }
  };

  const stopAudio = () => {
    if (microphoneRef.current) {
      microphoneRef.current.disconnect();
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
  };

  const startAudioAnalysis = () => {
    const analyser = analyserRef.current;
    if (!analyser) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const analyze = () => {
      analyser.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / bufferLength;
      setAudioData(average / 255); // Normalize to 0-1
      animationRef.current = requestAnimationFrame(analyze);
    };

    analyze();
  };

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const baseRadius = 60;

    let animationTime = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      animationTime += 0.02;

      // Base orb
      let radius = baseRadius;
      let alpha = 0.8;
      let color = 'var(--orb-idle)';

      switch (state) {
        case 'idle':
          radius = baseRadius + Math.sin(animationTime * 0.5) * 3;
          color = 'hsl(195, 80%, 50%)';
          break;
        case 'listening':
          radius = baseRadius + audioData * 20 + Math.sin(animationTime * 2) * 5;
          alpha = 0.9 + audioData * 0.1;
          color = 'hsl(195, 100%, 60%)';
          break;
        case 'thinking':
          radius = baseRadius + Math.sin(animationTime * 1.5) * 8;
          alpha = 0.7 + Math.sin(animationTime * 3) * 0.3;
          color = 'hsl(210, 100%, 65%)';
          break;
        case 'speaking':
          radius = baseRadius + Math.sin(animationTime * 6) * 10;
          alpha = 0.9;
          color = 'hsl(120, 100%, 50%)';
          break;
      }

      // Outer glow
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 2);
      gradient.addColorStop(0, color.replace(')', `, ${alpha})`));
      gradient.addColorStop(0.7, color.replace(')', `, ${alpha * 0.3})`));
      gradient.addColorStop(1, 'transparent');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 2, 0, Math.PI * 2);
      ctx.fill();

      // Main orb
      const mainGradient = ctx.createRadialGradient(
        centerX - radius * 0.3, 
        centerY - radius * 0.3, 
        0, 
        centerX, 
        centerY, 
        radius
      );
      mainGradient.addColorStop(0, color.replace(')', `, ${alpha})`));
      mainGradient.addColorStop(1, color.replace(')', `, ${alpha * 0.5})`));

      ctx.fillStyle = mainGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Inner highlight
      const highlightGradient = ctx.createRadialGradient(
        centerX - radius * 0.4, 
        centerY - radius * 0.4, 
        0, 
        centerX, 
        centerY, 
        radius * 0.6
      );
      highlightGradient.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.4})`);
      highlightGradient.addColorStop(1, 'transparent');

      ctx.fillStyle = highlightGradient;
      ctx.beginPath();
      ctx.arc(centerX - radius * 0.2, centerY - radius * 0.2, radius * 0.3, 0, Math.PI * 2);
      ctx.fill();

      // Audio-reactive particles for listening state
      if (state === 'listening' && audioData > 0.1) {
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2 + animationTime;
          const particleRadius = (radius + 30) + audioData * 40;
          const x = centerX + Math.cos(angle) * particleRadius;
          const y = centerY + Math.sin(angle) * particleRadius;
          
          ctx.fillStyle = color.replace(')', `, ${audioData * 0.5})`);
          ctx.beginPath();
          ctx.arc(x, y, 2 + audioData * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [state, audioData]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={200}
        height={200}
        className="drop-shadow-2xl"
      />
      {state === 'thinking' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-neon-blue rounded-full animate-ping" />
        </div>
      )}
    </div>
  );
};