import { useState, useEffect } from 'react';
import { PhotoIcon, MusicalNoteIcon, ArrowLeftIcon, EyeIcon, HeartIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import WishDisplay from './WishDisplay';

const templates = [
  { id: 1, name: 'Classic', preview: '🎂', description: 'Elegant and timeless design', bgClass: 'bg-gradient-to-r from-blue-50 to-purple-50', animation: 'animate-float' },
  { id: 2, name: 'Modern', preview: '🎈', description: 'Contemporary and stylish', bgClass: 'bg-gradient-to-r from-green-50 to-blue-50', animation: 'animate-bounce-slow' },
  { id: 3, name: 'Funny', preview: '🎉', description: 'Playful and humorous', bgClass: 'bg-gradient-to-r from-yellow-50 to-orange-50', animation: 'animate-sway' },
  { id: 4, name: 'Love', preview: '❤️', description: 'Romantic and heartfelt', bgClass: 'bg-gradient-to-r from-red-50 to-pink-50', animation: 'animate-pulse-slow' },
];

// Mock function to generate a unique ID for wishes
const generateWishId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

async function shortenWithTinyURL(longUrl: string) {
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
  return data.data.tiny_url;
}

const CreateWish = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [senderName, setSenderName] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [music, setMusic] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // Handle file upload from device
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    // Limit to 5 photos
    const remainingSlots = 5 - photos.length;
    const filesToProcess = Math.min(files.length, remainingSlots);
    
    if (remainingSlots <= 0) {
      alert('You can only upload up to 5 photos. Please remove some photos first.');
      return;
    }
    
    // Process each file
    for (let i = 0; i < filesToProcess; i++) {
      const file = files[i];
      
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert(`File ${file.name} exceeds the 5MB limit.`);
        continue;
      }
      
      // Create a URL for the file
      const imageUrl = URL.createObjectURL(file);
      setPhotos(prevPhotos => [...prevPhotos, imageUrl]);
    }
    
    // Reset the input value so the same file can be selected again
    event.target.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a wish object
    const wishData = {
      id: generateWishId(),
      template: selectedTemplate ? templates.find(t => t.id === selectedTemplate) : null,
      message,
      recipientName,
      senderName,
      deliveryDate,
      photos,
      music,
      createdAt: new Date().toISOString(),
    };
    
    // Save wish to localStorage
    const wishes = JSON.parse(localStorage.getItem('wishes') || '[]');
    wishes.push(wishData);
    localStorage.setItem('wishes', JSON.stringify(wishes));

    // Generate the long URL for the wish
    const longUrl = `${window.location.origin}/wish/${wishData.id}`;

    // Get the short URL from TinyURL
    let shortUrl = '';
    try {
      shortUrl = await shortenWithTinyURL(longUrl);
      // You can display this to the user, copy to clipboard, or show in a modal
      alert(`Your short wish link: ${shortUrl}`);
    } catch (err) {
      alert('Wish created, but failed to generate short link.');
    }

    // Navigate to the view page for this wish
    navigate(`/wish/${wishData.id}`);
  };

  // Cleanup object URLs when component unmounts
  useEffect(() => {
    return () => {
      // Revoke all object URLs to avoid memory leaks
      photos.forEach(photo => {
        if (photo.startsWith('blob:')) {
          URL.revokeObjectURL(photo);
        }
      });
    };
  }, [photos]);

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  const getSelectedTemplate = () => {
    return templates.find(t => t.id === selectedTemplate);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      <div className="mb-6 md:mb-8">
        <Link 
          to="/" 
          className="inline-flex items-center text-text-secondary hover:text-primary transition-colors duration-300"
        >
          <ArrowLeftIcon className="icon-sm mr-2" />
          Back to Home
        </Link>
      </div>

      {showPreview ? (
        <WishDisplay 
          template={getSelectedTemplate() || null}
          message={message}
          recipientName={recipientName}
          senderName={senderName}
          photos={photos}
          music={music}
          isPreview={true}
          onClose={togglePreview}
        />
      ) : (
        <div className="bg-white rounded-3xl shadow-xl p-4 sm:p-6 md:p-8">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">Create a Birthday Wish</h1>
            <p className="text-base md:text-xl text-gray-600">Make someone's day special with a personalized birthday wish</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            {/* Template Selection */}
            <div>
              <label className="block text-base md:text-lg font-medium text-gray-900 mb-3 md:mb-4">
                Choose a Template
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`p-4 md:p-6 border-2 rounded-2xl text-center transition-all duration-300 hover:shadow-lg group ${
                      selectedTemplate === template.id 
                        ? 'border-primary bg-primary/5 shadow-md' 
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                  >
                    <div className={`text-4xl md:text-5xl mb-3 md:mb-4 transform group-hover:scale-110 transition-transform duration-300 ${template.animation}`}>
                      {template.preview}
                    </div>
                    <div className="font-semibold text-gray-900 mb-1 md:mb-2">{template.name}</div>
                    <div className="text-xs md:text-sm text-gray-600">{template.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recipient Name */}
            <div>
              <label htmlFor="recipientName" className="block text-base md:text-lg font-medium text-gray-900 mb-3 md:mb-4">
                Recipient's Name
              </label>
              <input
                type="text"
                id="recipientName"
                className="input rounded-xl text-base md:text-lg focus:ring-2 focus:ring-primary/50 focus:border-primary w-full"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="Enter the birthday person's name..."
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-base md:text-lg font-medium text-gray-900 mb-3 md:mb-4">
                Your Message
              </label>
              <textarea
                id="message"
                rows={6}
                className="input rounded-xl text-base md:text-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your heartfelt birthday message here..."
              />
            </div>

            {/* Sender Name */}
            <div>
              <label htmlFor="senderName" className="block text-base md:text-lg font-medium text-gray-900 mb-3 md:mb-4">
                Your Name
              </label>
              <input
                type="text"
                id="senderName"
                className="input rounded-xl text-base md:text-lg focus:ring-2 focus:ring-primary/50 focus:border-primary w-full"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Enter your name..."
              />
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-base md:text-lg font-medium text-gray-900 mb-3 md:mb-4">
                Add Photos (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-4 md:p-8 text-center hover:border-primary/50 transition-colors duration-300">
                <PhotoIcon className="icon-md md:icon-lg mx-auto text-gray-400 mb-3 md:mb-4" />
                <div className="mb-2">
                  <label 
                    className="btn btn-secondary rounded-full px-4 md:px-6 py-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 text-sm md:text-base cursor-pointer inline-block"
                  >
                    <input 
                      type="file" 
                      accept="image/*" 
                      multiple 
                      className="hidden" 
                      onChange={handlePhotoUpload}
                    />
                    Upload Photos
                  </label>
                </div>
                <p className="text-xs md:text-sm text-gray-500">Up to 5 photos • Max 5MB each</p>
                
                {photos.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 animate-fadeIn">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                        <img src={photo} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setPhotos(photos.filter((_, i) => i !== index))}
                          className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity duration-300"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                {photos.length > 0 && (
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => setPhotos([])}
                      className="text-red-500 text-sm hover:text-red-700 transition-colors duration-300"
                    >
                      Clear All Photos
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Music Selection */}
            <div>
              <label className="block text-base md:text-lg font-medium text-gray-900 mb-3 md:mb-4">
                Add Background Music (Optional)
              </label>
              <button 
                type="button" 
                className="btn btn-secondary rounded-full px-4 md:px-6 py-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center text-sm md:text-base"
              >
                <MusicalNoteIcon className="icon-sm mr-2" />
                Choose Music
              </button>
            </div>

            {/* Delivery Date */}
            <div>
              <label htmlFor="deliveryDate" className="block text-base md:text-lg font-medium text-gray-900 mb-3 md:mb-4">
                Delivery Date
              </label>
              <input
                type="datetime-local"
                id="deliveryDate"
                className="input rounded-xl text-base md:text-lg focus:ring-2 focus:ring-primary/50 focus:border-primary w-full"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
              />
            </div>

            {/* Preview Button */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button 
                type="button" 
                onClick={togglePreview}
                className="btn btn-secondary w-full sm:w-1/2 rounded-full py-3 md:py-4 text-base md:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
                disabled={!selectedTemplate}
              >
                <EyeIcon className="icon-sm mr-2" />
                Preview Wish
              </button>
              
              {/* Submit Button */}
              <button 
                type="submit" 
                className="btn btn-primary w-full sm:w-1/2 rounded-full py-3 md:py-4 text-base md:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
                disabled={!selectedTemplate || !message}
              >
                <SparklesIcon className="icon-sm mr-2" />
                Create Birthday Wish
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateWish; 