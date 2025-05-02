import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShareIcon, ArrowLeftIcon, LinkIcon } from '@heroicons/react/24/outline';
import { SparklesIcon } from '@heroicons/react/24/solid';
import WishDisplay from './WishDisplay';
import SimpleShareOptions from '../components/SimpleShareOptions';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

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

  useEffect(() => {
    const fetchWish = async () => {
      const docRef = doc(db, "wishes", id || "");
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
      setLoading(false);
    };
    fetchWish();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse-slow text-center">
          <SparklesIcon className="h-12 w-12 text-primary mx-auto mb-4" />
          <p className="text-gray-600">Loading your special wish...</p>
        </div>
      </div>
    );
  }

  if (!wish) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white/80 rounded-3xl shadow-2xl p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Wish Not Found</h1>
          <p className="text-gray-600 mb-8">Sorry, we couldn't find the wish you're looking for.</p>
          <Link 
            to="/create" 
            className="btn btn-primary px-6 py-2 rounded-full"
          >
            Create a New Wish
          </Link>
        </div>
      </div>
    );
  }

  const borderColor = wish.template?.name === 'Love'
    ? 'border-pink-400'
    : wish.template?.name === 'Modern'
      ? 'border-blue-400'
      : 'border-white/30';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#22223B] via-[#4A4E69] to-[#9A8C98] px-2 sm:px-4 md:px-8 overflow-x-hidden" style={{ minHeight: '110vh' }}>
      <div className={`relative w-full max-w-4xl min-h-[70vh] mx-auto rounded-3xl shadow-2xl bg-[#F2E9E4] backdrop-blur-lg border-4 ${borderColor} p-2 sm:p-6 md:p-12 flex flex-col justify-center items-center overflow-hidden box-border`}>
        {/* Glow effect */}
        <div className="absolute -inset-4 sm:-inset-8 md:-inset-12 rounded-3xl bg-[#9A8C98]/30 blur-2xl z-0 pointer-events-none"></div>
        {/* Back button */}
        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-50">
          <Link 
            to="/"
            className="inline-flex items-center bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full text-primary hover:text-secondary transition-colors shadow-md"
          >
            <ArrowLeftIcon className="icon-sm mr-2" />
            Back to Home
          </Link>
        </div>
        <div className="relative z-10 w-full flex flex-col items-center justify-center">
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
      {/* Share and Create Buttons */}
      <div className="flex flex-wrap flex-col sm:flex-row justify-center gap-2 mt-8 w-full max-w-2xl px-2">
        <button 
          onClick={() => setShowShareOptions(!showShareOptions)}
          className="btn btn-secondary rounded-full px-6 py-2 text-sm mb-2 shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
        >
          <ShareIcon className="icon-sm mr-2" />
          Share This Wish
        </button>
        {!shortUrl ? (
          <button
            onClick={() => generateTinyUrl(window.location.href)}
            disabled={generatingTinyUrl}
            className="btn btn-secondary rounded-full px-6 py-2 text-sm mb-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 w-full sm:w-auto"
          >
            <LinkIcon className="icon-sm mr-2" />
            {generatingTinyUrl ? "Generating..." : "Get TinyURL"}
          </button>
        ) : (
          <button
            onClick={() => {
              navigator.clipboard.writeText(shortUrl);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="btn btn-secondary rounded-full px-6 py-2 text-sm mb-2 shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
          >
            {copied ? "Copied!" : "Copy TinyURL"}
          </button>
        )}
        <a
          href={`https://wa.me/?text=${encodeURIComponent('Check out this birthday wish! ' + (shortUrl || window.location.href))}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-success rounded-full px-6 py-2 text-sm mb-2 shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
        >
          Share on WhatsApp
        </a>
        <Link 
          to="/create" 
          className="btn btn-primary rounded-full px-6 py-2 text-sm mb-2 shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
        >
          <SparklesIcon className="icon-sm mr-2" />
          Create Another
        </Link>
      </div>
      {/* Share Options Popup */}
      {showShareOptions && (
        <div className="absolute left-0 right-0 mx-auto mt-4 z-10 w-full max-w-xs">
          <SimpleShareOptions 
            onClose={() => setShowShareOptions(false)} 
            shortUrl={shortUrl || window.location.href}
          />
        </div>
      )}
    </div>
  );
};

export default ViewWish; 