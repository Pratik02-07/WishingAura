import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShareIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { SparklesIcon } from '@heroicons/react/24/solid';
import WishDisplay from './WishDisplay';
import { Confetti } from '../components/Animations';
import SimpleShareOptions from '../components/SimpleShareOptions';

interface WishTemplate {
  id: number;
  name: string;
  preview: string;
  description: string;
  bgClass: string;
  animation: string;
}

interface Wish {
  id: string;
  template: WishTemplate | null;
  message: string;
  recipientName: string;
  senderName: string;
  deliveryDate: string;
  photos: string[];
  music: string | null;
  createdAt: string;
}

const ViewWish = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [wish, setWish] = useState<Wish | null>(null);
  const [loading, setLoading] = useState(true);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // In a real app, you would fetch this from an API
    // For now, we'll get it from localStorage
    const wishes = JSON.parse(localStorage.getItem('wishes') || '[]');
    const foundWish = wishes.find((w: Wish) => w.id === id);
    
    if (foundWish) {
      setWish(foundWish);
      
      // Show confetti animation when the wish is first loaded
      setShowConfetti(true);
      
      // Create a more dramatic entrance with timed animations
      // We don't need to clear this timeout since it only runs once on mount
      setTimeout(() => {
        // Add a dramatic entrance effect to the page
        document.body.classList.add('overflow-hidden');
        
        // After 10 seconds, allow scrolling again
        setTimeout(() => {
          document.body.classList.remove('overflow-hidden');
        }, 10000);
      }, 500);
    } else {
      // If no wish is found, we could redirect to a 404 page
      console.error('Wish not found');
    }
    
    setLoading(false);
  }, [id]);

  const handleShare = () => {
    setShowShareOptions(!showShareOptions);
  };

  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const shareByEmail = () => {
    const subject = `${wish?.recipientName ? `Birthday Wish for ${wish.recipientName}` : 'A Special Birthday Wish'}`;
    const body = `Check out this birthday wish I created for you: ${window.location.href}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse-slow text-center">
          <SparklesIcon className="h-12 w-12 text-primary mx-auto mb-4" />
          <p className="text-gray-600">Loading your special wish...</p>
        </div>
      </div>
    );
  }

  if (!wish) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Wish Not Found</h1>
        <p className="text-gray-600 mb-8">Sorry, we couldn't find the wish you're looking for.</p>
        <Link 
          to="/create" 
          className="btn btn-primary px-6 py-2 rounded-full"
        >
          Create a New Wish
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Back button - only visible before the full-screen wish is shown */}
      <div className="fixed top-4 left-4 z-40">
        <Link 
          to="/"
          className="inline-flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-primary hover:text-secondary transition-colors shadow-md"
        >
          <ArrowLeftIcon className="icon-sm mr-2" />
          Back to Home
        </Link>
      </div>

      {/* Wish Display - Full Screen */}
      <WishDisplay 
        template={wish.template}
        message={wish.message}
        recipientName={wish.recipientName}
        senderName={wish.senderName}
        photos={wish.photos}
        music={wish.music}
        showAnimations={true}
        fullScreen={true}
        onClose={() => navigate('/')}
      />

      {/* Share and Create Buttons - Fixed at the bottom */}
      <div className="fixed bottom-6 left-0 right-0 z-40 flex justify-center gap-4 md:gap-8">
        <button 
          onClick={handleShare}
          className="btn btn-secondary rounded-full px-6 sm:px-8 py-2 sm:py-3 text-base md:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center bg-white/90 backdrop-blur-sm"
        >
          <ShareIcon className="icon-sm mr-2" />
          Share This Wish
        </button>
        
        <Link 
          to="/create" 
          className="btn btn-primary rounded-full px-6 sm:px-8 py-2 sm:py-3 text-base md:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center bg-white/90 backdrop-blur-sm"
        >
          <SparklesIcon className="icon-sm mr-2" />
          Create Another
        </Link>
        
        {/* Share Options Popup */}
        {showShareOptions && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10 w-64">
            <SimpleShareOptions onClose={() => setShowShareOptions(false)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewWish; 