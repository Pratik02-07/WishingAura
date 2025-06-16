import React, { useEffect, useState, useRef } from 'react';

interface ParticleSystemProps {
  active: boolean;
  type: 'elegant' | 'geometric' | 'light';
  density: number;
}

export const ParticleSystem: React.FC<ParticleSystemProps> = ({ active, type, density }) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);

  useEffect(() => {
    if (active) {
      const newParticles = Array.from({ length: density }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 3
      }));
      setParticles(newParticles);
    }
  }, [active, density]);

  if (!active) return null;

  const getParticleClass = () => {
    switch (type) {
      case 'elegant':
        return 'bg-white/30 rounded-full animate-pulse';
      case 'geometric':
        return 'bg-blue-400/40 rotate-45 animate-spin';
      case 'light':
        return 'bg-yellow-300/50 rounded-full animate-bounce';
      default:
        return 'bg-white/30 rounded-full animate-pulse';
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute ${getParticleClass()}`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}
    </div>
  );
};

interface GradientBackgroundProps {
  active: boolean;
  intensity: 'low' | 'medium' | 'high';
  colorScheme: 'warm' | 'cool' | 'primary' | 'neutral';
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({ active, intensity, colorScheme }) => {
  if (!active) return null;

  const getGradientClass = () => {
    const intensityMap = {
      low: 'opacity-20',
      medium: 'opacity-40',
      high: 'opacity-60'
    };

    const colorMap = {
      warm: 'from-red-500 via-pink-500 to-orange-500',
      cool: 'from-blue-500 via-purple-500 to-indigo-500',
      primary: 'from-purple-500 via-blue-500 to-cyan-500',
      neutral: 'from-gray-500 via-slate-500 to-zinc-500'
    };

    return `bg-gradient-to-br ${colorMap[colorScheme]} ${intensityMap[intensity]}`;
  };

  return (
    <div className={`absolute inset-0 ${getGradientClass()} animate-pulse`} />
  );
};

interface AnimatedTextProps {
  text: string;
  effect: 'reveal' | 'fade' | 'typewriter' | 'blur' | 'slide';
  className?: string;
  duration?: number;
  delay?: number;
  staggerDelay?: number;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ 
  text, 
  effect, 
  duration = 1, 
  delay = 0, 
  staggerDelay = 0.05,
  className = '' 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

  const getEffectClass = () => {
    switch (effect) {
      case 'fade':
        return isVisible ? 'opacity-100 animate-fade-in' : 'opacity-0';
      case 'slide':
        return isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0';
      case 'blur':
        return isVisible ? 'blur-none opacity-100' : 'blur-sm opacity-0';
      case 'typewriter':
        return isVisible ? 'animate-fade-in' : 'opacity-0';
      default:
        return isVisible ? 'animate-fade-in' : 'opacity-0';
    }
  };

  if (effect === 'typewriter') {
    return (
      <span 
        className={`${className} transition-all duration-${Math.round(duration * 1000)} ${getEffectClass()}`}
        style={{ animationDelay: `${delay}s` }}
      >
        {text.split('').map((char, index) => (
          <span
            key={index}
            className={isVisible ? 'opacity-100' : 'opacity-0'}
            style={{
              animationDelay: `${delay + (index * staggerDelay)}s`,
              transition: 'opacity 0.1s ease-in-out'
            }}
          >
            {char}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span 
      className={`${className} transition-all duration-${Math.round(duration * 1000)} ${getEffectClass()}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {text}
    </span>
  );
};

interface LightEffectProps {
  active: boolean;
  type: 'glow' | 'spotlight' | 'ambient';
  intensity: 'low' | 'medium' | 'high';
  color: string;
}

export const LightEffect: React.FC<LightEffectProps> = ({ active, type, intensity, color }) => {
  if (!active) return null;

  const getIntensityValue = () => {
    switch (intensity) {
      case 'low': return 0.2;
      case 'medium': return 0.4;
      case 'high': return 0.6;
      default: return 0.4;
    }
  };

  const getEffectStyle = () => {
    const alpha = getIntensityValue();
    
    switch (type) {
      case 'glow':
        return {
          background: `radial-gradient(circle at center, ${color}${Math.round(alpha * 255).toString(16)} 0%, transparent 70%)`,
          filter: 'blur(20px)'
        };
      case 'spotlight':
        return {
          background: `radial-gradient(ellipse at center, ${color}${Math.round(alpha * 255).toString(16)} 0%, transparent 50%)`,
          filter: 'blur(10px)'
        };
      case 'ambient':
        return {
          background: `linear-gradient(45deg, ${color}${Math.round(alpha * 255).toString(16)}, transparent)`,
          filter: 'blur(30px)'
        };
      default:
        return {};
    }
  };

  return (
    <div 
      className="absolute inset-0 animate-pulse"
      style={getEffectStyle()}
    />
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
        
        // Create balloon shape with gradient
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
        
        // Create balloon knot
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
        
        // Create string
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
        
        // Create shine effect
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
  BalloonAnimation,
};