import React, { useEffect, useState, useRef } from 'react';

interface ParticleSystemProps {
  active: boolean;
  type: 'elegant' | 'geometric' | 'light' | 'hearts' | 'stars' | 'confetti';
  density: number;
}

export const ParticleSystem: React.FC<ParticleSystemProps> = ({ active, type, density }) => {
  const [particles, setParticles] = useState<Array<{ 
    id: number; 
    x: number; 
    y: number; 
    size: number; 
    delay: number;
    rotation: number;
    speed: number;
    color: string;
  }>>([]);

  useEffect(() => {
    if (active) {
      const colors = {
        elegant: ['rgba(255,255,255,0.8)', 'rgba(147,197,253,0.6)', 'rgba(196,181,253,0.6)'],
        geometric: ['rgba(59,130,246,0.7)', 'rgba(147,51,234,0.7)', 'rgba(236,72,153,0.7)'],
        light: ['rgba(251,191,36,0.8)', 'rgba(248,113,113,0.8)', 'rgba(34,197,94,0.8)'],
        hearts: ['rgba(244,63,94,0.9)', 'rgba(236,72,153,0.9)', 'rgba(219,39,119,0.9)'],
        stars: ['rgba(251,191,36,0.9)', 'rgba(245,158,11,0.9)', 'rgba(217,119,6,0.9)'],
        confetti: ['rgba(239,68,68,0.9)', 'rgba(34,197,94,0.9)', 'rgba(59,130,246,0.9)', 'rgba(251,191,36,0.9)', 'rgba(147,51,234,0.9)']
      };

      const newParticles = Array.from({ length: density }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        delay: Math.random() * 5,
        rotation: Math.random() * 360,
        speed: Math.random() * 3 + 1,
        color: colors[type][Math.floor(Math.random() * colors[type].length)]
      }));
      setParticles(newParticles);
    }
  }, [active, density, type]);

  if (!active) return null;

  const getParticleShape = (particleType: string) => {
    switch (particleType) {
      case 'hearts':
        return '❤️';
      case 'stars':
        return '⭐';
      case 'confetti':
        return '';
      default:
        return '';
    }
  };

  const getParticleClass = () => {
    const baseClasses = 'absolute pointer-events-none';
    switch (type) {
      case 'elegant':
        return `${baseClasses} rounded-full animate-pulse`;
      case 'geometric':
        return `${baseClasses} rotate-45 animate-spin`;
      case 'light':
        return `${baseClasses} rounded-full animate-bounce`;
      case 'hearts':
        return `${baseClasses} animate-pulse`;
      case 'stars':
        return `${baseClasses} animate-spin`;
      case 'confetti':
        return `${baseClasses} animate-bounce`;
      default:
        return `${baseClasses} rounded-full animate-pulse`;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={getParticleClass()}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: type === 'hearts' || type === 'stars' ? 'auto' : `${particle.size}px`,
            height: type === 'hearts' || type === 'stars' ? 'auto' : `${particle.size}px`,
            backgroundColor: type === 'hearts' || type === 'stars' ? 'transparent' : particle.color,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.speed}s`,
            transform: `rotate(${particle.rotation}deg)`,
            fontSize: type === 'hearts' || type === 'stars' ? `${particle.size * 2}px` : 'inherit'
          }}
        >
          {getParticleShape(type)}
        </div>
      ))}
    </div>
  );
};

interface FloatingElementsProps {
  active: boolean;
  type: 'balloons' | 'gifts' | 'cakes' | 'fireworks';
}

export const FloatingElements: React.FC<FloatingElementsProps> = ({ active, type }) => {
  const [elements, setElements] = useState<Array<{
    id: number;
    x: number;
    y: number;
    delay: number;
    duration: number;
    emoji: string;
    size: number;
  }>>([]);

  useEffect(() => {
    if (active) {
      const emojiMap = {
        balloons: ['🎈', '🎀', '🎊'],
        gifts: ['🎁', '🎀', '💝'],
        cakes: ['🎂', '🧁', '🍰'],
        fireworks: ['🎆', '🎇', '✨']
      };

      const newElements = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 90 + 5,
        y: Math.random() * 90 + 5,
        delay: Math.random() * 3,
        duration: Math.random() * 4 + 6,
        emoji: emojiMap[type][Math.floor(Math.random() * emojiMap[type].length)],
        size: Math.random() * 20 + 20
      }));
      setElements(newElements);
    }
  }, [active, type]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {elements.map((element) => (
        <div
          key={element.id}
          className="absolute animate-float"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            animationDelay: `${element.delay}s`,
            animationDuration: `${element.duration}s`,
            fontSize: `${element.size}px`,
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
          }}
        >
          {element.emoji}
        </div>
      ))}
    </div>
  );
};

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  effect: 'typewriter' | 'fadeIn' | 'slideUp' | 'glow' | 'rainbow';
}

export const TextReveal: React.FC<TextRevealProps> = ({ 
  text, 
  className = '', 
  delay = 0, 
  effect 
}) => {
  const [visibleChars, setVisibleChars] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      if (effect === 'typewriter') {
        const interval = setInterval(() => {
          setVisibleChars(prev => {
            if (prev >= text.length) {
              clearInterval(interval);
              return prev;
            }
            return prev + 1;
          });
        }, 50);
        return () => clearInterval(interval);
      }
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [text, delay, effect]);

  const getEffectClass = () => {
    switch (effect) {
      case 'fadeIn':
        return isVisible ? 'opacity-100 animate-fadeIn' : 'opacity-0';
      case 'slideUp':
        return isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0';
      case 'glow':
        return isVisible ? 'animate-glow opacity-100' : 'opacity-0';
      case 'rainbow':
        return isVisible ? 'animate-rainbow opacity-100' : 'opacity-0';
      default:
        return isVisible ? 'opacity-100' : 'opacity-0';
    }
  };

  if (effect === 'typewriter') {
    return (
      <span className={`${className} transition-all duration-300`}>
        {text.slice(0, visibleChars)}
        {visibleChars < text.length && (
          <span className="animate-pulse">|</span>
        )}
      </span>
    );
  }

  return (
    <span className={`${className} transition-all duration-1000 ${getEffectClass()}`}>
      {text}
    </span>
  );
};

interface MagicalBorderProps {
  children: React.ReactNode;
  active: boolean;
  color?: string;
}

export const MagicalBorder: React.FC<MagicalBorderProps> = ({ 
  children, 
  active, 
  color = 'rgb(147, 51, 234)' 
}) => {
  if (!active) return <>{children}</>;

  return (
    <div className="relative">
      <div 
        className="absolute inset-0 rounded-xl animate-spin"
        style={{
          background: `conic-gradient(from 0deg, transparent, ${color}, transparent)`,
          padding: '2px'
        }}
      >
        <div className="w-full h-full bg-gray-900 rounded-xl"></div>
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

interface PulsingHeartProps {
  active: boolean;
  size?: number;
  color?: string;
}

export const PulsingHeart: React.FC<PulsingHeartProps> = ({ 
  active, 
  size = 40, 
  color = '#ef4444' 
}) => {
  if (!active) return null;

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20">
      <div 
        className="animate-ping"
        style={{
          fontSize: `${size}px`,
          color: color,
          animationDuration: '2s'
        }}
      >
        ❤️
      </div>
    </div>
  );
};

export const BalloonAnimation: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 8 }).map((_, i) => {
        const size = Math.floor(Math.random() * 30) + 40;
        const left = `${i * 12 + Math.random() * 5}%`;
        const animationDelay = `${i * 0.3}s`;
        const animationDuration = `${Math.random() * 2 + 4}s`;
        const colors = ['#8E7AB5', '#B784B7', '#ECA869', '#FDF4F5', '#E8D5DA', '#FF9999', '#99CCFF', '#FFCC99'];
        const color = colors[i % colors.length];
        const zIndex = Math.floor(Math.random() * 5);
        
        const balloonStyle = {
          width: size,
          height: size * 1.2,
          background: `radial-gradient(circle at 30% 30%, ${color}, ${color}CC)`,
          borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
          boxShadow: `inset -5px -5px 15px rgba(0,0,0,0.1), 
                     0 5px 10px rgba(0,0,0,0.1), 
                     0 0 20px rgba(255,255,255,0.4)`,
          position: 'relative' as const,
          transform: `rotate(${Math.random() * 10 - 5}deg)`,
        };
        
        const knotStyle = {
          position: 'absolute' as const,
          bottom: '-10px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '15px',
          height: '15px',
          background: color,
          borderRadius: '50%',
          boxShadow: 'inset -2px -2px 5px rgba(0,0,0,0.2)'
        };
        
        const stringLength = 80 + Math.random() * 40;
        const stringStyle = {
          position: 'absolute' as const,
          bottom: '-' + stringLength + 'px',
          left: '50%',
          width: '2px',
          height: stringLength + 'px',
          background: 'rgba(200,200,200,0.7)',
          transformOrigin: 'top',
          transform: 'translateX(-50%)',
          zIndex: -1
        };
        
        const shineStyle = {
          position: 'absolute' as const,
          top: '20%',
          left: '20%',
          width: '20%',
          height: '10%',
          background: 'rgba(255,255,255,0.6)',
          borderRadius: '50%',
          transform: 'rotate(25deg)'
        };
        
        return (
          <div 
            key={i}
            className="absolute bottom-0 animate-float"
            style={{
              left,
              animationDelay,
              animationDuration,
              zIndex,
            }}
          >
            <div style={balloonStyle}>
              <div style={shineStyle}></div>
              <div style={knotStyle}></div>
            </div>
            <div style={stringStyle}></div>
          </div>
        );
      })}
    </div>
  );
};

export default {
  ParticleSystem,
  FloatingElements,
  TextReveal,
  MagicalBorder,
  PulsingHeart,
  BalloonAnimation,
};