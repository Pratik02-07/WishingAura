import React, { useEffect, useRef } from 'react';

interface ParticleSystemProps {
  active: boolean;
  type: 'elegant' | 'geometric' | 'light';
  density?: number;
}

export const ParticleSystem: React.FC<ParticleSystemProps> = ({ 
  active, 
  type = 'elegant',
  density = 80
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<any[]>([]);
  const animationRef = useRef<number>(0);
  
  useEffect(() => {
    if (!active || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Define particle colors based on type
    let colors: string[] = [];
    switch (type) {
      case 'elegant':
        colors = ['#2D2B3F', '#4A4458', '#8E7AB5', '#B784B7', '#ECA869'];
        break;
      case 'geometric':
        colors = ['#2C3E50', '#3498DB', '#E74C3C', '#ECF0F1', '#F1C40F'];
        break;
      case 'light':
        colors = ['rgba(255,255,255,0.8)', 'rgba(255,255,255,0.6)', 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.2)'];
        break;
      default:
        colors = ['#2D2B3F', '#4A4458', '#8E7AB5', '#B784B7', '#ECA869'];
    }
    
    // Create particles
    const createParticles = () => {
      particlesRef.current = [];
      
      for (let i = 0; i < density; i++) {
        const particle: any = {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 5 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          speedX: Math.random() * 1 - 0.5,
          speedY: Math.random() * 1 - 0.5,
          opacity: Math.random() * 0.5 + 0.3,
        };
        
        // Add special properties based on type
        if (type === 'elegant') {
          particle.shape = Math.random() > 0.7 ? 'circle' : 'line';
          particle.rotation = Math.random() * Math.PI * 2;
          particle.rotationSpeed = (Math.random() * 0.02) - 0.01;
          particle.length = Math.random() * 15 + 5;
        } else if (type === 'geometric') {
          particle.shape = ['triangle', 'square', 'pentagon', 'hexagon'][Math.floor(Math.random() * 4)];
          particle.rotation = Math.random() * Math.PI * 2;
          particle.rotationSpeed = (Math.random() * 0.01) - 0.005;
        } else if (type === 'light') {
          particle.blur = Math.random() * 5 + 2;
          particle.pulseSpeed = Math.random() * 0.02 + 0.01;
          particle.pulseDirection = 1;
          particle.maxSize = particle.size + Math.random() * 3;
          particle.minSize = Math.max(1, particle.size - Math.random() * 2);
        }
        
        particlesRef.current.push(particle);
      }
    };
    
    // Draw and update particles
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;
        
        // Update special properties
        if (type === 'elegant') {
          particle.rotation += particle.rotationSpeed;
        } else if (type === 'geometric') {
          particle.rotation += particle.rotationSpeed;
        } else if (type === 'light') {
          // Pulse size
          if (particle.pulseDirection === 1) {
            particle.size += particle.pulseSpeed;
            if (particle.size >= particle.maxSize) {
              particle.pulseDirection = -1;
            }
          } else {
            particle.size -= particle.pulseSpeed;
            if (particle.size <= particle.minSize) {
              particle.pulseDirection = 1;
            }
          }
        }
        
        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        
        if (type === 'elegant') {
          if (particle.shape === 'circle') {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
          } else {
            ctx.translate(particle.x, particle.y);
            ctx.rotate(particle.rotation);
            ctx.beginPath();
            ctx.moveTo(-particle.length / 2, 0);
            ctx.lineTo(particle.length / 2, 0);
            ctx.lineWidth = particle.size / 2;
            ctx.strokeStyle = particle.color;
            ctx.stroke();
          }
        } else if (type === 'geometric') {
          ctx.translate(particle.x, particle.y);
          ctx.rotate(particle.rotation);
          
          ctx.beginPath();
          if (particle.shape === 'triangle') {
            const size = particle.size * 2;
            ctx.moveTo(0, -size);
            ctx.lineTo(size * Math.cos(Math.PI / 6), size * Math.sin(Math.PI / 6));
            ctx.lineTo(-size * Math.cos(Math.PI / 6), size * Math.sin(Math.PI / 6));
          } else if (particle.shape === 'square') {
            const size = particle.size * 1.5;
            ctx.rect(-size / 2, -size / 2, size, size);
          } else if (particle.shape === 'pentagon') {
            const size = particle.size * 1.5;
            for (let i = 0; i < 5; i++) {
              const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
              const x = size * Math.cos(angle);
              const y = size * Math.sin(angle);
              if (i === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
          } else if (particle.shape === 'hexagon') {
            const size = particle.size * 1.5;
            for (let i = 0; i < 6; i++) {
              const angle = (Math.PI * 2 * i) / 6;
              const x = size * Math.cos(angle);
              const y = size * Math.sin(angle);
              if (i === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
          }
          
          ctx.closePath();
          ctx.fillStyle = particle.color;
          ctx.fill();
        } else if (type === 'light') {
          ctx.filter = `blur(${particle.blur}px)`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();
        }
        
        ctx.restore();
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    createParticles();
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, [active, type, density]);
  
  if (!active) return null;
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-50"
      style={{ opacity: 0.8 }}
    />
  );
};

interface GradientBackgroundProps {
  active: boolean;
  intensity?: 'subtle' | 'medium' | 'strong';
  colorScheme?: 'primary' | 'warm' | 'cool' | 'neutral';
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({ 
  active, 
  intensity = 'medium',
  colorScheme = 'primary'
}) => {
  if (!active) return null;
  
  // Define color schemes
  const colorSchemes = {
    primary: {
      from: '#8E7AB5',
      via: '#B784B7',
      to: '#ECA869',
    },
    warm: {
      from: '#FF9966',
      via: '#FF5E62',
      to: '#FF2525',
    },
    cool: {
      from: '#4158D0',
      via: '#C850C0',
      to: '#FFCC70',
    },
    neutral: {
      from: '#2C3E50',
      via: '#4A4458',
      to: '#6D7B8D',
    }
  };
  
  // Define intensity levels
  const intensityLevels = {
    subtle: 0.1,
    medium: 0.2,
    strong: 0.3,
  };
  
  const colors = colorSchemes[colorScheme];
  const opacityLevel = intensityLevels[intensity];
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Main gradient background */}
      <div 
        className="absolute inset-0 animate-gradient-shift"
        style={{
          background: `linear-gradient(120deg, ${colors.from}${Math.round(opacityLevel * 255).toString(16)} 0%, ${colors.via}${Math.round(opacityLevel * 255).toString(16)} 50%, ${colors.to}${Math.round(opacityLevel * 255).toString(16)} 100%)`,
          backgroundSize: '200% 200%',
        }}
      />
      
      {/* Radial gradient overlays for depth */}
      <div 
        className="absolute inset-0 animate-pulse-slow"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${colors.from}${Math.round(opacityLevel * 100).toString(16)} 0%, transparent 50%)`,
          mixBlendMode: 'overlay',
        }}
      />
      
      <div 
        className="absolute inset-0 animate-pulse-slow"
        style={{
          animationDelay: '2s',
          background: `radial-gradient(circle at 70% 80%, ${colors.to}${Math.round(opacityLevel * 100).toString(16)} 0%, transparent 50%)`,
          mixBlendMode: 'overlay',
        }}
      />
      
      {/* Light beams */}
      <div 
        className="absolute inset-0 animate-rotate-slow"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0%, ${colors.via}${Math.round(opacityLevel * 50).toString(16)} 20%, transparent 40%)`,
          mixBlendMode: 'overlay',
        }}
      />
    </div>
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
  className = '',
  duration = 0.8,
  delay = 0,
  staggerDelay = 0.03
}) => {
  // Split text into individual characters for animation
  const characters = text.split('');
  
  // Base styles for all animations
  const baseStyle = {
    display: 'inline-block',
    animationFillMode: 'both' as const,
    animationDuration: `${duration}s`,
  };
  
  // Effect-specific styles and classes
  const getEffectStyles = (index: number) => {
    const charDelay = delay + (index * staggerDelay);
    
    switch (effect) {
      case 'reveal':
        return {
          ...baseStyle,
          opacity: 0,
          transform: 'translateY(40px)',
          animation: `revealChar ${duration}s ease-out forwards`,
          animationDelay: `${charDelay}s`,
        };
      
      case 'fade':
        return {
          ...baseStyle,
          opacity: 0,
          animation: `fadeIn ${duration}s ease-out forwards`,
          animationDelay: `${charDelay}s`,
        };
      
      case 'typewriter':
        return {
          ...baseStyle,
          opacity: 0,
          borderRight: index === characters.length - 1 ? '2px solid currentColor' : 'none',
          animation: `typewriter ${duration}s steps(1, end) forwards`,
          animationDelay: `${charDelay}s`,
        };
      
      case 'blur':
        return {
          ...baseStyle,
          opacity: 0,
          filter: 'blur(8px)',
          animation: `blurReveal ${duration}s ease-out forwards`,
          animationDelay: `${charDelay}s`,
        };
      
      case 'slide':
        return {
          ...baseStyle,
          opacity: 0,
          transform: 'translateX(20px)',
          animation: `slideReveal ${duration}s ease-out forwards`,
          animationDelay: `${charDelay}s`,
        };
      
      default:
        return baseStyle;
    }
  };
  
  return (
    <span className={`inline-block ${className}`}>
      {characters.map((char, index) => (
        <span 
          key={index} 
          style={getEffectStyles(index)}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

interface LightEffectProps {
  active: boolean;
  type: 'glow' | 'spotlight' | 'ambient';
  intensity?: 'subtle' | 'medium' | 'strong';
  color?: string;
}

export const LightEffect: React.FC<LightEffectProps> = ({
  active,
  type,
  intensity = 'medium',
  color = '#FFFFFF'
}) => {
  if (!active) return null;
  
  // Define intensity levels
  const intensityLevels = {
    subtle: {
      opacity: 0.15,
      blur: '60px',
      size: '40%',
    },
    medium: {
      opacity: 0.25,
      blur: '80px',
      size: '60%',
    },
    strong: {
      opacity: 0.35,
      blur: '100px',
      size: '80%',
    },
  };
  
  const settings = intensityLevels[intensity];
  
  if (type === 'glow') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"
          style={{
            width: settings.size,
            height: settings.size,
            borderRadius: '50%',
            background: color,
            opacity: settings.opacity,
            filter: `blur(${settings.blur})`,
            mixBlendMode: 'overlay',
          }}
        />
      </div>
    );
  }
  
  if (type === 'spotlight') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-0 left-1/2 transform -translate-x-1/2 animate-sway-slow"
          style={{
            width: settings.size,
            height: '200%',
            background: `radial-gradient(ellipse at center, ${color} 0%, transparent 70%)`,
            opacity: settings.opacity,
            mixBlendMode: 'overlay',
          }}
        />
      </div>
    );
  }
  
  if (type === 'ambient') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top left light */}
        <div 
          className="absolute top-0 left-0 animate-pulse-slow"
          style={{
            width: settings.size,
            height: settings.size,
            background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)`,
            opacity: settings.opacity / 2,
            filter: `blur(${settings.blur})`,
            mixBlendMode: 'overlay',
          }}
        />
        
        {/* Bottom right light */}
        <div 
          className="absolute bottom-0 right-0 animate-pulse-slow"
          style={{
            animationDelay: '2s',
            width: settings.size,
            height: settings.size,
            background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)`,
            opacity: settings.opacity / 2,
            filter: `blur(${settings.blur})`,
            mixBlendMode: 'overlay',
          }}
        />
      </div>
    );
  }
  
  return null;
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