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
        // Update Firestore with the short URL
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="text-center animate-pulse-soft">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-glow">
            <SparklesIcon className="h-8 w-8 text-white" />
          </div>
          <p className="text-white text-lg">Loading your magical wish...</p>
        </div>
      </div>
    );
  }

  if (!wish) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50">
        <div className="card-elevated text-center max-w-md mx-4">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <SparklesIcon className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Wish Not Found</h1>
          <p className="text-slate-600 mb-8">Sorry, we couldn't find the wish you're looking for. It may have been removed or the link might be incorrect.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn btn-secondary">
              <ArrowLeftIcon className="icon-sm" />
              Go Home
            </Link>
            <Link to="/create" className="btn btn-primary">
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
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern-dots opacity-10"></div>
      
      {/* Back Button */}
      <div className="absolute top-6 left-6 z-50">
        <Link 
          to="/"
          className="glass-strong px-4 py-2 rounded-xl text-white hover:bg-white/30 transition-all duration-300 inline-flex items-center gap-2"
        >
          <ArrowLeftIcon className="icon-sm" />
          <span className="hidden sm:inline">Back to Home</span>
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

      {/* Action Buttons */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex flex-wrap justify-center gap-3 px-4">
          {/* Share Button */}
          <button 
            onClick={() => setShowShareOptions(!showShareOptions)}
            className="glass-strong px-6 py-3 rounded-xl text-white hover:bg-white/30 transition-all duration-300 inline-flex items-center gap-2 shadow-large"
          >
            <ShareIcon className="icon-sm" />
            <span className="hidden sm:inline">Share</span>
          </button>

          {/* Copy Link Button */}
          <button
            onClick={() => copyToClipboard(shortUrl || window.location.href)}
            className="glass-strong px-6 py-3 rounded-xl text-white hover:bg-white/30 transition-all duration-300 inline-flex items-center gap-2 shadow-large"
          >
            <ClipboardIcon className="icon-sm" />
            <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>

          {/* Generate TinyURL Button */}
          {!shortUrl && (
            <button
              onClick={() => generateTinyUrl(window.location.href)}
              disabled={generatingTinyUrl}
              className="glass-strong px-6 py-3 rounded-xl text-white hover:bg-white/30 transition-all duration-300 inline-flex items-center gap-2 shadow-large disabled:opacity-50"
            >
              <LinkIcon className="icon-sm" />
              <span className="hidden sm:inline">
                {generatingTinyUrl ? 'Generating...' : 'Get Short Link'}
              </span>
            </button>
          )}

          {/* WhatsApp Share */}
          <button
            onClick={shareViaWhatsApp}
            className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl text-white transition-all duration-300 inline-flex items-center gap-2 shadow-large"
          >
            <ChatBubbleLeftIcon className="icon-sm" />
            <span className="hidden sm:inline">WhatsApp</span>
          </button>

          {/* Create Another */}
          <Link 
            to="/create" 
            className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 px-6 py-3 rounded-xl text-white transition-all duration-300 inline-flex items-center gap-2 shadow-large"
          >
            <SparklesIcon className="icon-sm" />
            <span className="hidden sm:inline">Create Another</span>
          </Link>
        </div>
      </div>

      {/* Share Options Modal */}
      {showShareOptions && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card-elevated max-w-sm w-full animate-scaleIn">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Share This Wish</h3>
              <button 
                onClick={() => setShowShareOptions(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
              >
                <span className="sr-only">Close</span>
                ×
              </button>
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={() => copyToClipboard(shortUrl || window.location.href)}
                className="w-full btn btn-secondary justify-start"
              >
                <ClipboardIcon className="icon-sm" />
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
              
              <button 
                onClick={shareViaEmail}
                className="w-full btn btn-secondary justify-start"
              >
                <EnvelopeIcon className="icon-sm" />
                Share via Email
              </button>

              <button 
                onClick={shareViaWhatsApp}
                className="w-full btn btn-success justify-start"
              >
                <ChatBubbleLeftIcon className="icon-sm" />
                Share on WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewWish;