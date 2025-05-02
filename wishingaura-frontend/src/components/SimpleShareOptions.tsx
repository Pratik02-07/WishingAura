  import React, { useState } from 'react';
import { ClipboardIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

interface SimpleShareOptionsProps {
  onClose?: () => void;
}

const SimpleShareOptions: React.FC<SimpleShareOptionsProps> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const shareByEmail = () => {
    const subject = 'Check out this birthday wish!';
    const body = `I wanted to share this special birthday wish with you: ${window.location.href}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-4 z-10 w-full animate-fadeIn">
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
      </div>
    </div>
  );
};

export default SimpleShareOptions;