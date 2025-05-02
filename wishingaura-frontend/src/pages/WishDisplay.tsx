import React, { useState, useEffect } from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { SparklesIcon } from '@heroicons/react/24/solid';
import { 
  ParticleSystem, 
  GradientBackground, 
  AnimatedText, 
  LightEffect 
} from '../components/Animations';

interface WishTemplate {
  id: number;
  name: string;
  preview: string;
  description: string;
  bgClass: string;
  animation: string;
}

interface WishDisplayProps {
  template: WishTemplate | null;
  message: string;
  recipientName?: string;
  senderName?: string;
  photos?: string[];
  music?: string | null;
  showAnimations?: boolean;
  isPreview?: boolean;
  onClose?: () => void;
  fullScreen?: boolean;
}

const WishDisplay: React.FC<WishDisplayProps> = ({ 
  template,
  message,
  recipientName,
  senderName,
  photos = [],
  music = null,
  showAnimations = true,
  isPreview = false,
  onClose,
  fullScreen = false
}) => {
  const [animationPhase, setAnimationPhase] = useState(0);
  const [showParticles, setShowParticles] = useState(showAnimations);
  const [particleType, setParticleType] = useState<'elegant' | 'geometric' | 'light'>('elegant');
  const [lightType, setLightType] = useState<'glow' | 'spotlight' | 'ambient'>('ambient');
  const [textEffect, setTextEffect] = useState<'reveal' | 'fade' | 'typewriter' | 'blur' | 'slide'>('reveal');
  
  // Sequence of sophisticated animations
  useEffect(() => {
    if (showAnimations) {
      // Initial animation phase
      setShowParticles(true);
      setParticleType('elegant');
      setLightType('ambient');
      
      // After 3 seconds, transition to phase 1
      const phase1Timer = setTimeout(() => {
        setAnimationPhase(1);
        setParticleType('geometric');
        setLightType('spotlight');
      }, 3000);
      
      // After 6 seconds, transition to phase 2
      const phase2Timer = setTimeout(() => {
        setAnimationPhase(2);
        setParticleType('light');
        setLightType('glow');
      }, 6000);
      
      // After 12 seconds, cycle back to beginning
      const cycleTimer = setTimeout(() => {
        setAnimationPhase(0);
        setParticleType('elegant');
        setLightType('ambient');
      }, 12000);
      
      return () => {
        clearTimeout(phase1Timer);
        clearTimeout(phase2Timer);
        clearTimeout(cycleTimer);
      };
    }
  }, [showAnimations]);

  // Determine container classes based on fullScreen prop
  const containerClasses = fullScreen 
    ? "fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-fadeIn overflow-auto"
    : "relative animate-scaleIn";
    
  const wishClasses = fullScreen
    ? "w-full max-w-4xl mx-auto my-4 rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500"
    : "rounded-3xl shadow-xl overflow-hidden transform hover:shadow-2xl transition-all duration-300";

  // Determine background color based on template or use a sophisticated default
  const bgColor = 'bg-gradient-to-r from-gray-900 to-gray-800';
  
  // Determine color scheme based on template
  const getColorScheme = () => {
    if (template?.name === 'Love') return 'warm';
    if (template?.name === 'Modern') return 'cool';
    if (template?.name === 'Funny') return 'primary';
    return 'neutral';
  };
  
  return (
    <div className={containerClasses}>
      {/* Sophisticated particle system */}
      {showParticles && ParticleSystem && <ParticleSystem active={true} type={particleType} density={80} />}
      
      {/* Fallback background in case animations don't load */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-gray-900 to-gray-800 opacity-90"></div>
      
      <div className={wishClasses}>
        <div className={`p-6 sm:p-8 md:p-12 text-center space-y-6 md:space-y-8 min-h-[60vh] relative bg-gradient-to-r from-gray-900 to-gray-800`}>
          {/* Close button */}
          {(isPreview || fullScreen) && onClose && (
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/80 p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 z-20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          
          {/* Sophisticated background effects */}
          {showAnimations && (
            <>
              {GradientBackground && (
                <GradientBackground 
                  active={true} 
                  intensity="medium" 
                  colorScheme={getColorScheme()} 
                />
              )}
              
              {LightEffect && (
                <LightEffect 
                  active={true} 
                  type={lightType} 
                  intensity="medium" 
                  color={template?.name === 'Love' ? '#FF5E62' : '#8E7AB5'} 
                />
              )}
            </>
          )}
          
          {/* Main content with sophisticated animations */}
          <div className="relative z-10">
            {/* Animated heading with sophisticated text effect */}
            <div className="mb-8 md:mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-4">
                {AnimatedText ? (
                  <AnimatedText 
                    text={recipientName ? `Happy Birthday, ${recipientName}!` : 'Happy Birthday!'} 
                    effect={textEffect}
                    duration={1.2}
                    delay={0.5}
                    className="text-shadow-md"
                  />
                ) : (
                  <span className="animate-fadeIn">{recipientName ? `Happy Birthday, ${recipientName}!` : 'Happy Birthday!'}</span>
                )}
                
                {template?.preview && (
                  <span className="block mt-2 text-2xl sm:text-3xl md:text-4xl text-white/80">
                    {AnimatedText ? (
                      <AnimatedText 
                        text={template.preview}
                        effect="fade"
                        duration={1.5}
                        delay={1.5}
                      />
                    ) : (
                      <span className="animate-fadeIn">{template.preview}</span>
                    )}
                  </span>
                )}
              </h1>
            </div>
            
            {/* Message with elegant fade-in */}
            <div className="relative backdrop-blur-sm bg-white/10 rounded-xl p-6 md:p-8 shadow-xl">
              <p className="text-lg sm:text-xl md:text-2xl text-white leading-relaxed">
                {AnimatedText ? (
                  <AnimatedText 
                    text={message || "Your message will appear here..."}
                    effect="blur"
                    duration={1}
                    delay={2}
                    staggerDelay={0.01}
                  />
                ) : (
                  <span className="animate-fadeIn">{message || "Your message will appear here..."}</span>
                )}
              </p>
            </div>

            {/* Photos Grid with sophisticated entrance */}
            {photos.length > 0 && (
              <div className="mt-10 md:mt-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {photos.map((photo, index) => (
                    <div 
                      key={index} 
                      className="aspect-square overflow-hidden rounded-xl shadow-lg transform transition-all duration-700 animate-fadeIn"
                      style={{ 
                        animationDelay: `${1.5 + (index * 0.2)}s` 
                      }}
                    >
                      <img 
                        src={photo} 
                        alt="Birthday" 
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sender Name with elegant animation */}
            {senderName && (
              <div className="mt-10 md:mt-12">
                <p className="text-base md:text-lg text-white/80 italic">
                  {AnimatedText ? (
                    <AnimatedText 
                      text={`With love from ${senderName}`}
                      effect="slide"
                      duration={0.8}
                      delay={3}
                    />
                  ) : (
                    <span className="animate-fadeIn">{`With love from ${senderName}`}</span>
                  )}
                </p>
              </div>
            )}

            {/* Music Player with sophisticated entrance */}
            {music && (
              <div 
                className="mt-10 bg-white/20 backdrop-blur-md rounded-xl p-4 md:p-6 shadow-lg animate-fadeIn"
                style={{ 
                  animationDelay: '3.5s' 
                }}
              >
                <audio controls className="w-full">
                  <source src={music} type="audio/mpeg" />
                </audio>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishDisplay; 