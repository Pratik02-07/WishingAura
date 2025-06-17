import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, X } from 'lucide-react';
import { 
  ParticleSystem, 
  FloatingElements,
  TextReveal,
  MagicalBorder,
  PulsingHeart
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
  const [particleType, setParticleType] = useState<'elegant' | 'geometric' | 'light' | 'hearts' | 'stars' | 'confetti'>('elegant');
  const [floatingType, setFloatingType] = useState<'balloons' | 'gifts' | 'cakes' | 'fireworks'>('balloons');
  const [showHeart, setShowHeart] = useState(false);
  const [showMagicalBorder, setShowMagicalBorder] = useState(false);
  
  // Enhanced animation sequence
  useEffect(() => {
    if (showAnimations) {
      // Phase 0: Initial elegant particles
      setShowParticles(true);
      setParticleType('elegant');
      setFloatingType('balloons');
      
      // Phase 1: Hearts and romantic elements (3s)
      const phase1Timer = setTimeout(() => {
        setAnimationPhase(1);
        setParticleType('hearts');
        setFloatingType('gifts');
        setShowHeart(true);
        setShowMagicalBorder(true);
      }, 3000);
      
      // Phase 2: Stars and celebration (6s)
      const phase2Timer = setTimeout(() => {
        setAnimationPhase(2);
        setParticleType('stars');
        setFloatingType('cakes');
        setShowHeart(false);
      }, 6000);
      
      // Phase 3: Confetti celebration (9s)
      const phase3Timer = setTimeout(() => {
        setAnimationPhase(3);
        setParticleType('confetti');
        setFloatingType('fireworks');
        setShowMagicalBorder(false);
      }, 9000);
      
      // Phase 4: Return to elegant (12s)
      const phase4Timer = setTimeout(() => {
        setAnimationPhase(0);
        setParticleType('elegant');
        setFloatingType('balloons');
      }, 12000);
      
      return () => {
        clearTimeout(phase1Timer);
        clearTimeout(phase2Timer);
        clearTimeout(phase3Timer);
        clearTimeout(phase4Timer);
      };
    }
  }, [showAnimations]);

  // Determine container classes based on fullScreen prop
  const containerClasses = fullScreen 
    ? "fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md animate-fadeIn overflow-auto"
    : "relative animate-scaleIn w-full";
    
  const wishClasses = fullScreen
    ? "w-full max-w-4xl mx-auto my-4 rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500"
    : "w-full rounded-3xl shadow-xl overflow-hidden transform hover:shadow-2xl transition-all duration-300";

  // Enhanced background gradients based on template
  const getBackgroundGradient = () => {
    switch (template?.name) {
      case 'Love':
        return 'bg-gradient-to-br from-pink-900 via-rose-800 to-red-900';
      case 'Modern':
        return 'bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900';
      case 'Funny':
        return 'bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900';
      case 'Classic':
        return 'bg-gradient-to-br from-amber-900 via-orange-800 to-red-900';
      default:
        return 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900';
    }
  };

  // Get text effect based on animation phase
  const getTextEffect = () => {
    switch (animationPhase) {
      case 0: return 'fadeIn';
      case 1: return 'glow';
      case 2: return 'rainbow';
      case 3: return 'slideUp';
      default: return 'fadeIn';
    }
  };
  
  return (
    <div className={containerClasses + ' px-2'}>
      {/* Enhanced particle systems */}
      {showParticles && (
        <>
          <ParticleSystem active={true} type={particleType} density={60} />
          <FloatingElements active={true} type={floatingType} />
        </>
      )}
      
      {/* Pulsing heart for romantic moments */}
      <PulsingHeart active={showHeart} size={60} color="#ef4444" />
      
      {/* Magical border wrapper */}
      <MagicalBorder active={showMagicalBorder} color="rgb(236, 72, 153)">
        <div className={`${wishClasses} w-full max-w-[95vw] sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto mt-4 border border-white/30 shadow-2xl box-border rounded-xl sm:rounded-3xl overflow-hidden`}>
          <div className={`p-2 sm:p-4 md:p-8 text-center space-y-4 md:space-y-8 min-h-[60vh] relative ${getBackgroundGradient()} backdrop-blur-sm`}>
            {/* Close button with enhanced styling */}
            {(isPreview || fullScreen) && onClose && (
              <button 
                onClick={onClose}
                className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 z-20 h-10 w-10 flex items-center justify-center mt-4 hover:scale-110"
                aria-label="Close wish preview"
                title="Close wish preview"
              >
                <X className="h-5 w-5 text-gray-700" />
              </button>
            )}
            
            {/* Enhanced background effects */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)] pointer-events-none"></div>
            
            {/* Main content with enhanced animations */}
            <div className="relative z-10">
              {/* Animated heading with sophisticated text effects */}
              <div className="mb-6 md:mb-12">
                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-4 drop-shadow-2xl">
                  <TextReveal 
                    text={recipientName ? `Happy Birthday, ${recipientName}!` : 'Happy Birthday!'} 
                    effect={getTextEffect() as any}
                    delay={0.5}
                    className="text-shadow-glow"
                  />
                  
                  {template?.preview && (
                    <div className="block mt-4 text-4xl sm:text-5xl md:text-6xl">
                      <TextReveal 
                        text={template.preview}
                        effect="fadeIn"
                        delay={1.5}
                        className="animate-bounce"
                      />
                    </div>
                  )}
                </h1>
              </div>
              
              {/* Message with elegant presentation */}
              <div className="relative backdrop-blur-md bg-white/15 rounded-2xl p-4 md:p-8 shadow-2xl border border-white/20 mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>
                <p className="text-base sm:text-xl md:text-2xl text-white leading-relaxed relative z-10 font-medium">
                  <TextReveal 
                    text={message || "Your message will appear here..."}
                    effect="typewriter"
                    delay={2}
                    className="drop-shadow-lg"
                  />
                </p>
              </div>

              {/* Enhanced Photos Grid */}
              {photos.length > 0 && (
                <div className="mt-8 md:mt-12 overflow-x-auto">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
                    {photos.map((photo, index) => (
                      <div 
                        key={index} 
                        className="group aspect-square overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-700 hover:scale-105 hover:rotate-1 border-2 border-white/20"
                        style={{ 
                          animationDelay: `${2 + (index * 0.3)}s` 
                        }}
                      >
                        <img 
                          src={photo} 
                          alt="Birthday memory" 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-110" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Enhanced Sender Name */}
              {senderName && (
                <div className="mt-8 md:mt-12">
                  <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                    <p className="text-sm md:text-lg text-white/90 italic font-medium">
                      <TextReveal 
                        text={`With love from ${senderName} ❤️`}
                        effect="slideUp"
                        delay={3.5}
                        className="drop-shadow-md"
                      />
                    </p>
                  </div>
                </div>
              )}

              {/* Enhanced Music Player */}
              {music && (
                <div 
                  className="mt-10 bg-white/15 backdrop-blur-md rounded-2xl p-4 md:p-6 shadow-2xl border border-white/20 animate-fadeIn"
                  style={{ 
                    animationDelay: '4s' 
                  }}
                >
                  <div className="flex items-center justify-center mb-3">
                    <Sparkles className="w-5 h-5 text-white/80 mr-2" />
                    <span className="text-white/80 text-sm font-medium">Birthday Music</span>
                    <Sparkles className="w-5 h-5 text-white/80 ml-2" />
                  </div>
                  <audio controls className="w-full">
                    <source src={music} type="audio/mpeg" />
                  </audio>
                </div>
              )}

              {/* Decorative elements */}
              <div className="absolute top-4 left-4 text-2xl animate-spin-slow opacity-60">✨</div>
              <div className="absolute top-8 right-8 text-xl animate-bounce opacity-60">🎉</div>
              <div className="absolute bottom-8 left-8 text-lg animate-pulse opacity-60">💫</div>
              <div className="absolute bottom-4 right-4 text-2xl animate-spin-slow opacity-60">🎈</div>
            </div>
          </div>
        </div>
      </MagicalBorder>
    </div>
  );
};

export default WishDisplay;