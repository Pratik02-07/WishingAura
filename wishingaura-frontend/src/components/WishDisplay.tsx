import React from 'react';
import { AnimatedCardBorder, AnimatedText } from './Animations';

interface WishDisplayProps {
  recipientName?: string;
  senderName?: string;
  message: string;
  photos?: string[];
  music?: string | null;
}

const WishDisplay: React.FC<WishDisplayProps> = ({
  recipientName,
  senderName,
  message,
  photos = [],
  music = null
}) => {
  return (
    <AnimatedCardBorder color="#a1c4fd">
      <div className="p-6 md:p-12 flex flex-col items-center justify-center min-h-[350px]">
        {/* Recipient/Sender Label Section */}
        <div className="w-full flex justify-between items-center mb-4 text-base md:text-lg font-semibold text-gray-700">
          <span>To: {recipientName || 'Someone Special'}</span>
          <span>From: {senderName || 'Anonymous'}</span>
        </div>
        {/* Headline */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-center mb-4 text-gray-900 drop-shadow-lg">
          <AnimatedText
            text={recipientName ? `Happy Birthday, ${recipientName}!` : 'Happy Birthday!'}
            effect="neon"
            className=""
          />
        </h1>
        {/* Message */}
        <div className="w-full max-w-xl text-center text-lg md:text-2xl text-gray-800 mb-6">
          <AnimatedText text={message} effect="typewriter" />
        </div>
        {/* Photos */}
        {photos.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            {photos.slice(0, 6).map((photo, i) => (
              <img
                key={i}
                src={photo}
                alt="Wish Photo"
                className="rounded-xl shadow-md object-cover w-28 h-28 md:w-32 md:h-32"
                style={{ animation: `fadeIn 0.7s ${0.2 * i}s both` }}
              />
            ))}
          </div>
        )}
        {/* Music */}
        {music && (
          <div className="mb-4 w-full flex justify-center">
            <audio controls className="w-full max-w-xs">
              <source src={music} type="audio/mpeg" />
            </audio>
          </div>
        )}
        {/* Sender */}
        {senderName && (
          <div className="mt-4 text-gray-600 italic text-base md:text-lg">
            <AnimatedText text={`With love from ${senderName}`} effect="wave" />
          </div>
        )}
      </div>
    </AnimatedCardBorder>
  );
};

export default WishDisplay; 