import { useEffect, useRef } from 'react';

interface PetFaceProps {
  speaking: boolean;
  emotion: 'happy' | 'neutral' | 'thinking' | 'excited';
  eyeX: number; // -1 to 1 for eye direction
  eyeY: number; // -1 to 1 for eye direction
}

export const PetFace = ({ speaking, emotion, eyeX, eyeY }: PetFaceProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    let animationTime = 0;
    let mouthScale = speaking ? 1.5 : 1;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      animationTime += 0.1;

      // Face outline (robot-like)
      ctx.strokeStyle = 'hsl(195, 100%, 60%)';
      ctx.lineWidth = 3;
      ctx.fillStyle = 'hsl(220, 25%, 12%)';
      
      // Main face
      ctx.beginPath();
      ctx.roundRect(centerX - 80, centerY - 70, 160, 140, 20);
      ctx.fill();
      ctx.stroke();

      // Eyes
      const eyeOffsetX = eyeX * 8;
      const eyeOffsetY = eyeY * 6;
      
      // Left eye
      ctx.fillStyle = 'hsl(195, 100%, 60%)';
      ctx.beginPath();
      ctx.ellipse(
        centerX - 30 + eyeOffsetX, 
        centerY - 20 + eyeOffsetY, 
        12, 
        emotion === 'happy' ? 8 : 12, 
        0, 
        0, 
        Math.PI * 2
      );
      ctx.fill();

      // Right eye
      ctx.beginPath();
      ctx.ellipse(
        centerX + 30 + eyeOffsetX, 
        centerY - 20 + eyeOffsetY, 
        12, 
        emotion === 'happy' ? 8 : 12, 
        0, 
        0, 
        Math.PI * 2
      );
      ctx.fill();

      // Eye highlights
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath();
      ctx.arc(centerX - 25 + eyeOffsetX, centerY - 25 + eyeOffsetY, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(centerX + 35 + eyeOffsetX, centerY - 25 + eyeOffsetY, 3, 0, Math.PI * 2);
      ctx.fill();

      // Mouth based on speaking state and emotion
      ctx.strokeStyle = 'hsl(195, 100%, 60%)';
      ctx.lineWidth = 3;
      ctx.fillStyle = speaking ? 'hsl(220, 15%, 8%)' : 'transparent';

      if (speaking) {
        // Animated mouth opening
        const mouthHeight = 15 + Math.sin(animationTime * 3) * 8;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY + 30, 20 * mouthScale, mouthHeight, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Sound waves
        for (let i = 1; i <= 3; i++) {
          ctx.strokeStyle = `hsl(195, 100%, 60%, ${0.3 - i * 0.1})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(centerX, centerY + 30, 30 + i * 15 + Math.sin(animationTime * 2) * 5, 0, Math.PI * 2);
          ctx.stroke();
        }
      } else {
        // Static mouth based on emotion
        ctx.beginPath();
        if (emotion === 'happy') {
          ctx.arc(centerX, centerY + 20, 25, 0, Math.PI);
        } else {
          ctx.moveTo(centerX - 15, centerY + 30);
          ctx.lineTo(centerX + 15, centerY + 30);
        }
        ctx.stroke();
      }

      // Antenna/accessories
      ctx.strokeStyle = 'hsl(195, 100%, 60%)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(centerX - 20, centerY - 70);
      ctx.lineTo(centerX - 25, centerY - 90);
      ctx.moveTo(centerX + 20, centerY - 70);
      ctx.lineTo(centerX + 25, centerY - 90);
      ctx.stroke();

      // Antenna tips
      ctx.fillStyle = 'hsl(195, 100%, 60%)';
      ctx.beginPath();
      ctx.arc(centerX - 25, centerY - 90, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(centerX + 25, centerY - 90, 3, 0, Math.PI * 2);
      ctx.fill();

      // Thinking animation
      if (emotion === 'thinking') {
        const bubbleY = centerY - 100 + Math.sin(animationTime * 2) * 5;
        ctx.fillStyle = 'hsl(195, 100%, 60%, 0.3)';
        ctx.beginPath();
        ctx.arc(centerX + 60, bubbleY, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX + 70, bubbleY - 15, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX + 75, bubbleY - 25, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [speaking, emotion, eyeX, eyeY]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <canvas
        ref={canvasRef}
        width={200}
        height={200}
        className="drop-shadow-lg"
      />
      <div className="text-center">
        <h3 className="text-lg font-semibold text-neon-cyan">JARVIS Assistant</h3>
        <p className="text-sm text-muted-foreground">Your AI Companion</p>
      </div>
    </div>
  );
};