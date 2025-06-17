import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, X } from 'lucide-react';
import { 
  // ParticleSystem, 
  // FloatingElements,
  // TextReveal,
  // MagicalBorder,
  // PulsingHeart
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
  const [particleIntensity, setParticleIntensity] = useState<'low' | 'medium' | 'high'>('low');
  const [lightIntensity, setLightIntensity] = useState<'low' | 'medium' | 'high'>('low');
  const [textEffect, setTextEffect] = useState<'fade' | 'slide' | 'typewriter' | 'reveal'>('fade');
  
  // Sequence of sophisticated animations
  useEffect(() => {
    if (showAnimations) {
      // Initial animation phase
      setShowParticles(true);
      setParticleIntensity('low');
      setLightIntensity('low');
      
      // After 3 seconds, transition to phase 1
      const phase1Timer = setTimeout(() => {
        setAnimationPhase(1);
        setParticleIntensity('medium');
        setLightIntensity('medium');
      }, 3000);
      
      // After 6 seconds, transition to phase 2
      const phase2Timer = setTimeout(() => {
        setAnimationPhase(2);
        setParticleIntensity('high');
        setLightIntensity('high');
      }, 6000);
      
      // After 12 seconds, cycle back to beginning
      const cycleTimer = setTimeout(() => {
        setAnimationPhase(0);
        setParticleIntensity('low');
        setLightIntensity('low');
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
    ? "fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-fade-in overflow-auto"
    : "relative animate-scale-in w-full";
    
  const wishClasses = fullScreen
    ? "w-full max-w-4xl mx-auto my-4 rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500"
    : "w-full rounded-3xl shadow-xl overflow-hidden transform hover:shadow-2xl transition-all duration-300";

  // Determine color scheme based on template
  const getColorScheme = () => {
    if (template?.name === 'Love') return '#FF5E62';
    if (template?.name === 'Modern') return '#8E7AB5';
    if (template?.name === 'Funny') return '#ECA869';
    return '#8E7AB5';
  };
  
  return (
    <div className={containerClasses + ' px-2'}>
      {/* Particle system */}
      {showAnimations && (
        <>
          {/* Particle system */}
          {/* <ParticleSystem 
            active={true} 
            type={animationPhase === 0 ? 'elegant' : 
                   animationPhase === 1 ? 'hearts' : 
                   animationPhase === 2 ? 'stars' : 'confetti'} 
            density={80} 
          /> */}
          {/* {animationPhase === 1 && <PulsingHeart active={true} />} */}
        </>
      )}
      
      {/* Fallback background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-gray-900 to-gray-800 opacity-90"></div>
      
      {/* <MagicalBorder active={showAnimations} color={getColorScheme()}> */}
      <div className={`p-2 sm:p-4 md:p-8 text-center space-y-4 md:space-y-8 min-h-[60vh] relative bg-gradient-to-r from-gray-900 to-gray-800`}>
        {/* Close button */}
        {(isPreview || fullScreen) && onClose && (
          <button 
            onClick={onClose}
            className="absolute top-2 right-2 bg-white/80 p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 z-20 h-10 w-10 flex items-center justify-center mt-4"
            aria-label="Close wish preview"
            title="Close wish preview"
          >
            <X className="h-7 w-7 text-gray-600" />
          </button>
        )}
        
        {/* Main content with sophisticated animations */}
        <div className="relative z-10">
          {/* Animated heading with sophisticated text effect */}
          <div className="mb-6 md:mb-12">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-4">
              {/* <TextReveal 
                text={recipientName ? `Happy Birthday, ${recipientName}!` : 'Happy Birthday!'} 
                effect={animationPhase === 0 ? 'fadeIn' : 
                        animationPhase === 1 ? 'glow' : 
                        animationPhase === 2 ? 'rainbow' : 'slideUp'}
                delay={0.5}
                className="text-shadow-md"
              /> */}
              
              {template?.preview && (
                <span className="block mt-2 text-2xl sm:text-3xl md:text-4xl text-white/80">
                  {/* <TextReveal 
                    text={template.preview}
                    effect="fadeIn"
                    delay={1.5}
                  /> */}
                </span>
              )}
            </h1>
          </div>
          
          {/* Message with elegant fade-in */}
          <div className="relative backdrop-blur-sm bg-white/10 rounded-xl p-4 md:p-8 shadow-xl">
            <p className="text-base sm:text-xl md:text-2xl text-white leading-relaxed">
              {/* <TextReveal 
                text={message || "Your message will appear here..."}
                effect="typewriter"
                delay={2}
              /> */}
            </p>
          </div>

          {/* Photos Grid with sophisticated entrance */}
          {photos.length > 0 && (
            <div className="mt-8 md:mt-12 overflow-x-auto">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
                {photos.map((photo, index) => (
                  <div 
                    key={index} 
                    className="aspect-square overflow-hidden rounded-xl shadow-lg transform transition-all duration-700 animate-fade-in"
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
            <div className="mt-8 md:mt-12">
              <p className="text-sm md:text-lg text-white/80 italic">
                {/* <TextReveal 
                  text={`With love from ${senderName}`}
                  effect="slideUp"
                  delay={3}
                /> */}
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
      {/* </MagicalBorder> */}
    </div>
  );
};

export default WishDisplay;