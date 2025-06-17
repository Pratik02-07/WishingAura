import React, { useEffect, useRef, useState } from 'react';

// 1. Animated Gradient Background
export const AnimatedGradientBackground: React.FC<{ colors?: string[]; speed?: number }> = ({
  colors = ['#ffecd2', '#fcb69f', '#a1c4fd', '#c2e9fb'],
  speed = 20
}) => {
  const gradient = `bg-gradient-to-br from-[${colors[0]}] via-[${colors[1]}] to-[${colors[2]}]`;
  return (
    <div
      className={`fixed inset-0 -z-20 animate-gradient-move ${gradient}`}
      style={{
        background: `linear-gradient(120deg, ${colors.join(', ')})`,
        backgroundSize: '200% 200%',
        animation: `gradient-move ${speed}s ease-in-out infinite`
      }}
    />
  );
};

// 2. Confetti Burst Animation
export const ConfettiBurst: React.FC<{ active: boolean }> = ({ active }) => {
  const [confetti, setConfetti] = useState<any[]>([]);
  useEffect(() => {
    if (active) {
      setConfetti(
        Array.from({ length: 60 }, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 20 + 40,
          color: [
            '#FFD700', '#FF69B4', '#4ECDC4', '#FF6B6B', '#A1C4FD', '#FBC2EB', '#F7971E', '#FFD200'
          ][Math.floor(Math.random() * 8)],
          rotation: Math.random() * 360,
          delay: Math.random() * 0.8
        }))
      );
    }
  }, [active]);
  if (!active) return null;
  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      {confetti.map((c) => (
        <div
          key={c.id}
          className="absolute animate-confetti"
          style={{
            left: `${c.x}%`,
            top: `-${c.y}%`,
            background: c.color,
            width: 12,
            height: 6,
            borderRadius: 3,
            transform: `rotate(${c.rotation}deg)`,
            animationDelay: `${c.delay}s`
          }}
        />
      ))}
    </div>
  );
};

// 3. Sparkle Layer
export const SparkleLayer: React.FC<{ count?: number; active: boolean }> = ({ count = 30, active }) => {
  const [sparkles, setSparkles] = useState<any[]>([]);
  useEffect(() => {
    if (active) {
      setSparkles(
        Array.from({ length: count }, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 12 + 8,
          delay: Math.random() * 2,
        }))
      );
    }
  }, [active, count]);
  if (!active) return null;
  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      {sparkles.map((s) => (
        <svg
          key={s.id}
          className="absolute animate-sparkle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`
          }}
          viewBox="0 0 24 24"
          fill="#fff8"
        >
          <polygon points="12,2 15,10 23,10 17,15 19,23 12,18 5,23 7,15 1,10 9,10" />
        </svg>
      ))}
    </div>
  );
};

// 4. Animated Text (Typewriter, Neon, Wave)
export const AnimatedText: React.FC<{
  text: string;
  effect?: 'typewriter' | 'neon' | 'wave';
  className?: string;
  delay?: number;
}> = ({ text, effect = 'typewriter', className = '', delay = 0 }) => {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    if (effect === 'typewriter') {
      let i = 0;
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          setDisplayed((prev) => prev + text[i]);
          i++;
          if (i >= text.length) clearInterval(interval);
        }, 40);
        return () => clearInterval(interval);
      }, delay * 1000);
      return () => clearTimeout(timer);
    } else {
      setDisplayed(text);
    }
  }, [text, effect, delay]);
  if (effect === 'typewriter') {
    return <span className={className}>{displayed}<span className="animate-pulse">|</span></span>;
  }
  if (effect === 'neon') {
    return <span className={className + ' animate-neon'}>{text}</span>;
  }
  if (effect === 'wave') {
    return (
      <span className={className}>
        {text.split('').map((char, i) => (
          <span
            key={i}
            style={{
              display: 'inline-block',
              animation: `wave 1.2s infinite`,
              animationDelay: `${i * 0.08}s`,
            }}
          >
            {char}
          </span>
        ))}
      </span>
    );
  }
  return <span className={className}>{text}</span>;
};

// 5. Animated Card Border
export const AnimatedCardBorder: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = '#fff' }) => (
  <div className="relative p-1 rounded-3xl overflow-hidden shadow-2xl">
    <div
      className="absolute inset-0 z-0 animate-border-glow rounded-3xl"
      style={{
        background: `linear-gradient(120deg, ${color}, #fff0, #fff2, ${color})`,
        filter: 'blur(4px)',
        opacity: 0.7
      }}
    />
    <div className="relative z-10 rounded-3xl bg-white/80 backdrop-blur-xl">
      {children}
    </div>
  </div>
);

// 6. Utility: useDelayedMount
export function useDelayedMount(delay: number) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return mounted;
}