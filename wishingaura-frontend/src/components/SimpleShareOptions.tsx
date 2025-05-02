import React, { useState } from 'react';
import { 
  ClipboardIcon, 
  EnvelopeIcon, 
  ChatBubbleLeftIcon,
  ShareIcon,
  LinkIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface SimpleShareOptionsProps {
  onClose?: () => void;
  shortUrl?: string;
}

const SimpleShareOptions: React.FC<SimpleShareOptionsProps> = ({ onClose, shortUrl }) => {
  const [copied, setCopied] = useState(false);
  const currentUrl = shortUrl || window.location.href;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const shareByEmail = () => {
    const subject = 'Check out this birthday wish!';
    const body = `I wanted to share this special birthday wish with you: ${currentUrl}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const shareOnWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent('Check out this birthday wish! ' + currentUrl)}`, '_blank');
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=Check out this birthday wish!`, '_blank');
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Popup */}
      <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm">
        <div className="bg-white rounded-xl shadow-2xl p-6 animate-fadeIn">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Share Wish</h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
              aria-label="Close share options"
              title="Close share options"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          
          {/* Share Options */}
          <div className="space-y-3">
            <button 
              onClick={copyToClipboard}
              className="w-full btn bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg py-2 flex items-center justify-center"
            >
              <ClipboardIcon className="icon-sm mr-2" />
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
            
            <button 
              onClick={shareByEmail}
              className="w-full btn bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg py-2 flex items-center justify-center"
            >
              <EnvelopeIcon className="icon-sm mr-2" />
              Email
            </button>

            <button 
              onClick={shareOnWhatsApp}
              className="w-full btn bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg py-2 flex items-center justify-center"
            >
              <ChatBubbleLeftIcon className="icon-sm mr-2" />
              WhatsApp
            </button>

            <button 
              onClick={shareOnFacebook}
              className="w-full btn bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg py-2 flex items-center justify-center"
            >
              <ShareIcon className="icon-sm mr-2" />
              Facebook
            </button>

            <button 
              onClick={shareOnTwitter}
              className="w-full btn bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg py-2 flex items-center justify-center"
            >
              <LinkIcon className="icon-sm mr-2" />
              Twitter
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SimpleShareOptions;