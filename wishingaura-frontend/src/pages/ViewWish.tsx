import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ShareIcon, 
  ArrowLeftIcon, 
  LinkIcon,
  ClipboardIcon,
  EnvelopeIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline';
import { SparklesIcon } from '@heroicons/react/24/solid';
import WishDisplay from './WishDisplay';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

interface WishTemplate {
  id: number;
  name: string;
  preview: string;
  description: string;
  bgClass: string;
  color: string;
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
  shortUrl?: string;
}

const ViewWish = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [wish, setWish] = useState<Wish | null>(null);
  const [loading, setLoading] = useState(true);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [generatingTinyUrl, setGeneratingTinyUrl] = useState(false);
  const [showWelcomeAnimation, setShowWelcomeAnimation] = useState(true);

  const generateTinyUrl = async (longUrl: string) => {
    try {
      setGeneratingTinyUrl(true);
      const response = await fetch('https://api.tinyurl.com/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_TINYURL_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: longUrl,
          domain: 'tinyurl.com'
        }),
      });
      const data = await response.json();
      if (data.data?.tiny_url) {
        setShortUrl(data.data.tiny_url);
        if (id) {
          await updateDoc(doc(db, "wishes", id), {
            shortUrl: data.data.tiny_url
          });
        }
      }
    } catch (error) {
      console.error('Error generating TinyURL:', error);
    } finally {
      setGeneratingTinyUrl(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(`🎉 Special Birthday Wish for ${wish?.recipientName}!`);
    const body = encodeURIComponent(`I created a special birthday wish for ${wish?.recipientName}! Check it out: ${shortUrl || window.location.href}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const shareViaWhatsApp = () => {
    const text = encodeURIComponent(`🎉 Check out this special birthday wish for ${wish?.recipientName}! ${shortUrl || window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  useEffect(() => {
    const fetchWish = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "wishes", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const wishData = docSnap.data() as any;
          setWish({ id: docSnap.id, ...(wishData as Omit<Wish, "id">) });
          if (wishData.shortUrl) {
            setShortUrl(wishData.shortUrl);
          }
        } else {
          setWish(null);
        }
      } catch (error) {
        console.error('Error fetching wish:', error);
        setWish(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWish();
  }, [id]);

  // Hide welcome animation after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcomeAnimation(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-float opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 3 + 4}s`
              }}
            >
              {['✨', '🎉', '🎈', '💫', '⭐'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
        
        <div className="text-center animate-pulse-soft relative z-10">
          <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-glow shadow-2xl">
            <SparklesIcon className="h-10 w-10 text-white animate-spin-slow" />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white drop-shadow-lg">
              ✨ Preparing Your Magical Wish ✨
            </h2>
            <p className="text-white/80 text-lg">
              Something wonderful is about to appear...
            </p>
            <div className="flex justify-center space-x-2 mt-6">
              <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!wish) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50 relative overflow-hidden">
        {/* Sad animation particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-float opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${Math.random() * 2 + 3}s`
              }}
            >
              😢
            </div>
          ))}
        </div>
        
        <div className="card-elevated text-center max-w-md mx-4 relative z-10">
          <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <SparklesIcon className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-4">Oops! Wish Not Found</h1>
          <p className="text-slate-600 mb-8 leading-relaxed">
            It seems this magical wish has disappeared into the digital cosmos. 
            The link might be broken or the wish may have been removed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn btn-secondary hover-lift">
              <ArrowLeftIcon className="icon-sm" />
              Return Home
            </Link>
            <Link to="/create" className="btn btn-primary hover-lift">
              <SparklesIcon className="icon-sm" />
              Create New Wish
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Enhanced background pattern */}
      <div className="absolute inset-0 bg-pattern-dots opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      
      {/* Welcome animation overlay */}
      {showWelcomeAnimation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center animate-fadeIn">
          <div className="text-center text-white">
            <div className="text-6xl mb-4 animate-bounce">🎉</div>
            <h2 className="text-3xl font-bold mb-2">Welcome to</h2>
            <h1 className="text-4xl font-bold text-gradient mb-4">{wish.recipientName}'s</h1>
            <h1 className="text-4xl font-bold">Birthday Wish!</h1>
            <div className="mt-6 flex justify-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full animate-ping" style={{ animationDelay: '0s' }}></div>
              <div className="w-2 h-2 bg-white rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
              <div className="w-2 h-2 bg-white rounded-full animate-ping" style={{ animationDelay: '0.6s' }}></div>
            </div>
          </div>
        </div>
      )}
      
      {/* Back Button with enhanced styling */}
      <div className="absolute top-6 left-6 z-40">
        <Link 
          to="/"
          className="glass-strong px-6 py-3 rounded-2xl text-white hover:bg-white/30 transition-all duration-300 inline-flex items-center gap-3 shadow-2xl hover:shadow-3xl hover:scale-105 backdrop-blur-md border border-white/20"
        >
          <ArrowLeftIcon className="icon-sm" />
          <span className="hidden sm:inline font-medium">Back to Home</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="container-fluid section-padding flex items-center justify-center min-h-screen">
        <div className="w-full max-w-4xl">
          <WishDisplay 
            template={wish.template}
            message={wish.message}
            recipientName={wish.recipientName}
            senderName={wish.senderName}
            photos={wish.photos}
            music={wish.music}
            showAnimations={true}
            isPreview={false}
          />
        </div>
      </div>

      {/* Enhanced Action Buttons */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
        <div className="flex flex-wrap justify-center gap-3 px-4">
          {/* Share Button */}
          <button 
            onClick={() => setShowShareOptions(!showShareOptions)}
            className="glass-strong px-6 py-4 rounded-2xl text-white hover:bg-white/30 transition-all duration-300 inline-flex items-center gap-3 shadow-2xl hover:shadow-3xl hover:scale-105 backdrop-blur-md border border-white/20"
          >
            <ShareIcon className="icon-sm" />
            <span className="hidden sm:inline font-medium">Share Magic</span>
          </button>

          {/* Copy Link Button */}
          <button
            onClick={() => copyToClipboard(shortUrl || window.location.href)}
            className="glass-strong px-6 py-4 rounded-2xl text-white hover:bg-white/30 transition-all duration-300 inline-flex items-center gap-3 shadow-2xl hover:shadow-3xl hover:scale-105 backdrop-blur-md border border-white/20"
          >
            <ClipboardIcon className="icon-sm" />
            <span className="hidden sm:inline font-medium">{copied ? 'Copied! ✨' : 'Copy Link'}</span>
          </button>

          {/* Generate TinyURL Button */}
          {!shortUrl && (
            <button
              onClick={() => generateTinyUrl(window.location.href)}
              disabled={generatingTinyUrl}
              className="glass-strong px-6 py-4 rounded-2xl text-white hover:bg-white/30 transition-all duration-300 inline-flex items-center gap-3 shadow-2xl hover:shadow-3xl hover:scale-105 backdrop-blur-md border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LinkIcon className="icon-sm" />
              <span className="hidden sm:inline font-medium">
                {generatingTinyUrl ? 'Creating Magic...' : 'Get Short Link'}
              </span>
            </button>
          )}

          {/* WhatsApp Share */}
          <button
            onClick={shareViaWhatsApp}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 px-6 py-4 rounded-2xl text-white transition-all duration-300 inline-flex items-center gap-3 shadow-2xl hover:shadow-3xl hover:scale-105 backdrop-blur-md border border-green-400/20"
          >
            <ChatBubbleLeftIcon className="icon-sm" />
            <span className="hidden sm:inline font-medium">WhatsApp</span>
          </button>

          {/* Create Another */}
          <Link 
            to="/create" 
            className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 px-6 py-4 rounded-2xl text-white transition-all duration-300 inline-flex items-center gap-3 shadow-2xl hover:shadow-3xl hover:scale-105 backdrop-blur-md border border-indigo-400/20"
          >
            <SparklesIcon className="icon-sm" />
            <span className="hidden sm:inline font-medium">Create Another</span>
          </Link>
        </div>
      </div>

      {/* Enhanced Share Options Modal */}
      {showShareOptions && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="card-elevated max-w-sm w-full animate-scaleIn shadow-3xl border border-white/20">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gradient">Share This Magical Wish</h3>
              <button 
                onClick={() => setShowShareOptions(false)}
                className="p-2 hover:bg-slate-100 rounded-xl transition-colors duration-200 hover:scale-110"
              >
                <span className="sr-only">Close</span>
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <button 
                onClick={() => copyToClipboard(shortUrl || window.location.href)}
                className="w-full btn btn-secondary justify-start hover-lift shadow-lg"
              >
                <ClipboardIcon className="icon-sm" />
                {copied ? 'Copied! ✨' : 'Copy Magical Link'}
              </button>
              
              <button 
                onClick={shareViaEmail}
                className="w-full btn btn-secondary justify-start hover-lift shadow-lg"
              >
                <EnvelopeIcon className="icon-sm" />
                Send via Email 📧
              </button>

              <button 
                onClick={shareViaWhatsApp}
                className="w-full btn btn-success justify-start hover-lift shadow-lg"
              >
                <ChatBubbleLeftIcon className="icon-sm" />
                Share on WhatsApp 💚
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewWish;