import { useState, useEffect } from 'react';
import { 
  PhotoIcon, 
  MusicalNoteIcon, 
  ArrowLeftIcon, 
  EyeIcon, 
  SparklesIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import WishDisplay from './WishDisplay';
import { useAuth } from '../context/AuthContext';
import { createWish } from '../services/wishService';

const templates = [
  { 
    id: 1, 
    name: 'Classic', 
    preview: '🎂', 
    description: 'Elegant and timeless design', 
    bgClass: 'bg-gradient-to-br from-amber-50 to-orange-100',
    color: 'from-amber-500 to-orange-500'
  },
  { 
    id: 2, 
    name: 'Modern', 
    preview: '🎈', 
    description: 'Contemporary and stylish', 
    bgClass: 'bg-gradient-to-br from-blue-50 to-indigo-100',
    color: 'from-blue-500 to-indigo-500'
  },
  { 
    id: 3, 
    name: 'Funny', 
    preview: '🎉', 
    description: 'Playful and humorous', 
    bgClass: 'bg-gradient-to-br from-green-50 to-emerald-100',
    color: 'from-green-500 to-emerald-500'
  },
  { 
    id: 4, 
    name: 'Love', 
    preview: '❤️', 
    description: 'Romantic and heartfelt', 
    bgClass: 'bg-gradient-to-br from-pink-50 to-rose-100',
    color: 'from-pink-500 to-rose-500'
  },
];

async function shortenWithTinyURL(longUrl: string) {
  try {
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
  } catch (error) {
    console.error('Error creating short URL:', error);
    return null;
  }
}

const CreateWish = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [senderName, setSenderName] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [music, setMusic] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingPhotos, setUploadingPhotos] = useState(false);

  const steps = [
    { number: 1, title: 'Choose Template', icon: SparklesIcon },
    { number: 2, title: 'Add Details', icon: PhotoIcon },
    { number: 3, title: 'Personalize', icon: MusicalNoteIcon },
    { number: 4, title: 'Preview & Share', icon: EyeIcon },
  ];

  // Handle file upload from device
  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    setUploadingPhotos(true);
    
    // Limit to 5 photos
    const remainingSlots = 5 - photos.length;
    const filesToProcess = Math.min(files.length, remainingSlots);
    
    if (remainingSlots <= 0) {
      alert('You can only upload up to 5 photos. Please remove some photos first.');
      setUploadingPhotos(false);
      return;
    }
    
    const uploadedUrls: string[] = [];
    for (let i = 0; i < filesToProcess; i++) {
      const file = files[i];
      
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert(`File ${file.name} exceeds the 5MB limit.`);
        continue;
      }
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        alert(`File ${file.name} is not an image. Please upload only image files.`);
        continue;
      }
      
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'wishingaura_upload');
        formData.append('cloud_name', 'dslmp0cde');
        
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dslmp0cde/image/upload`,
          {
            method: 'POST',
            body: formData,
            mode: 'cors',
            credentials: 'omit'
          }
        );
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Cloudinary upload error:', errorData);
          throw new Error(`Upload failed: ${errorData.error?.message || 'Unknown error'}`);
        }
        
        const data = await response.json();
        if (data.secure_url) {
          uploadedUrls.push(data.secure_url);
        } else {
          throw new Error('No secure URL returned from Cloudinary');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        alert(`Failed to upload ${file.name}. Please try again.`);
      }
    }
    
    if (uploadedUrls.length > 0) {
      setPhotos(prev => [...prev, ...uploadedUrls]);
    }
    
    setUploadingPhotos(false);
    // Reset the input value so the same file can be selected again
    event.target.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    
    if (!user) {
      alert('Please sign in to create a wish');
      setSubmitting(false);
      return;
    }
    
    // Create a wish object
    const wishData = {
      template: selectedTemplate ? templates.find(t => t.id === selectedTemplate) : null,
      message,
      recipientName,
      senderName,
      deliveryDate,
      photos,
      music,
      createdAt: new Date().toISOString(),
      userId: user.uid,
    };
    
    try {
      // Save to Firestore using service
      const wishId = await createWish(wishData);

      // Generate the long URL for the wish
      const longUrl = `${window.location.origin}/wish/${wishId}`;

      // Get the short URL from TinyURL
      const shortUrl = await shortenWithTinyURL(longUrl);
      
      if (shortUrl) {
        // Show success message with short URL
        alert(`Wish created successfully! Short link: ${shortUrl}`);
      }

      // Navigate to the view page for this wish
      navigate(`/wish/${wishId}`);
    } catch (error) {
      console.error('Error creating wish:', error);
      alert('Failed to create wish. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return selectedTemplate !== null;
      case 2: return recipientName.trim() !== '' && message.trim() !== '';
      case 3: return true; // Optional step
      case 4: return true;
      default: return false;
    }
  };

  const getSelectedTemplate = () => {
    return templates.find(t => t.id === selectedTemplate);
  };

  // Cleanup object URLs when component unmounts
  useEffect(() => {
    return () => {
      photos.forEach(photo => {
        if (photo.startsWith('blob:')) {
          URL.revokeObjectURL(photo);
        }
      });
    };
  }, [photos]);

  if (showPreview) {
    return (
      <WishDisplay 
        template={getSelectedTemplate() || null}
        message={message}
        recipientName={recipientName}
        senderName={senderName}
        photos={photos}
        music={music}
        isPreview={true}
        onClose={() => setShowPreview(false)}
        fullScreen={true}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container-fluid section-padding">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-slate-600 hover:text-indigo-600 transition-colors duration-300 group"
          >
            <ArrowLeftIcon className="icon-sm mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Home
          </Link>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-4 mb-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                  currentStep >= step.number 
                    ? 'bg-indigo-600 border-indigo-600 text-white' 
                    : 'border-slate-300 text-slate-400'
                }`}>
                  {currentStep > step.number ? (
                    <CheckIcon className="icon-sm" />
                  ) : (
                    <step.icon className="icon-sm" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 transition-colors duration-300 ${
                    currentStep > step.number ? 'bg-indigo-600' : 'bg-slate-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              {steps[currentStep - 1].title}
            </h2>
            <p className="text-slate-600">Step {currentStep} of {steps.length}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="card-elevated">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Template Selection */}
              {currentStep === 1 && (
                <div className="animate-fadeIn">
                  <h3 className="text-xl font-semibold mb-6 text-center">Choose Your Perfect Template</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {templates.map((template) => (
                      <button
                        key={template.id}
                        type="button"
                        onClick={() => setSelectedTemplate(template.id)}
                        className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-large hover:-translate-y-1 ${
                          selectedTemplate === template.id 
                            ? 'border-indigo-500 bg-indigo-50 shadow-glow' 
                            : 'border-slate-200 hover:border-indigo-300'
                        } ${template.bgClass}`}
                      >
                        <div className="text-center">
                          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                            {template.preview}
                          </div>
                          <h4 className="font-semibold text-slate-800 mb-2">{template.name}</h4>
                          <p className="text-sm text-slate-600">{template.description}</p>
                        </div>
                        {selectedTemplate === template.id && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                            <CheckIcon className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Basic Details */}
              {currentStep === 2 && (
                <div className="animate-fadeIn space-y-6">
                  <h3 className="text-xl font-semibold mb-6 text-center">Add Personal Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-group">
                      <label htmlFor="recipientName" className="form-label">
                        Recipient's Name *
                      </label>
                      <input
                        type="text"
                        id="recipientName"
                        className="form-input"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        placeholder="Enter the birthday person's name..."
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="senderName" className="form-label">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="senderName"
                        className="form-input"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="Enter your name..."
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">
                      Your Birthday Message *
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      className="form-input resize-none"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your heartfelt birthday message here..."
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="deliveryDate" className="form-label">
                      Delivery Date (Optional)
                    </label>
                    <input
                      type="datetime-local"
                      id="deliveryDate"
                      className="form-input"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Photos and Music */}
              {currentStep === 3 && (
                <div className="animate-fadeIn space-y-8">
                  <h3 className="text-xl font-semibold mb-6 text-center">Add Personal Touches</h3>
                  
                  {/* Photo Upload */}
                  <div>
                    <label className="form-label mb-4">Add Photos (Optional)</label>
                    <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:border-indigo-400 transition-colors duration-300">
                      <PhotoIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                      <div className="mb-4">
                        <label className="btn btn-secondary cursor-pointer">
                          <input 
                            type="file" 
                            accept="image/*" 
                            multiple 
                            className="hidden" 
                            onChange={handlePhotoUpload}
                            disabled={uploadingPhotos}
                          />
                          {uploadingPhotos ? 'Uploading...' : 'Choose Photos'}
                        </label>
                      </div>
                      <p className="text-sm text-slate-500">Up to 5 photos • Max 5MB each • JPG, PNG, GIF</p>
                      
                      {photos.length > 0 && (
                        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                          {photos.map((photo, index) => (
                            <div key={index} className="relative group aspect-square rounded-xl overflow-hidden">
                              <img src={photo} alt="Preview" className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => setPhotos(photos.filter((_, i) => i !== index))}
                                className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              >
                                <XMarkIcon className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Music Selection */}
                  <div>
                    <label className="form-label mb-4">Background Music (Coming Soon)</label>
                    <button 
                      type="button" 
                      className="btn btn-secondary opacity-50 cursor-not-allowed"
                      disabled
                    >
                      <MusicalNoteIcon className="icon-sm" />
                      Choose Music
                    </button>
                    <p className="text-sm text-slate-500 mt-2">Music selection will be available in a future update</p>
                  </div>
                </div>
              )}

              {/* Step 4: Preview */}
              {currentStep === 4 && (
                <div className="animate-fadeIn text-center space-y-6">
                  <h3 className="text-xl font-semibold mb-6">Ready to Create Your Wish?</h3>
                  
                  <div className="bg-slate-50 rounded-2xl p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                      <div>
                        <span className="font-medium text-slate-700">Template:</span>
                        <span className="ml-2 text-slate-600">{getSelectedTemplate()?.name}</span>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">Recipient:</span>
                        <span className="ml-2 text-slate-600">{recipientName}</span>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">From:</span>
                        <span className="ml-2 text-slate-600">{senderName}</span>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">Photos:</span>
                        <span className="ml-2 text-slate-600">{photos.length} added</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      type="button" 
                      onClick={() => setShowPreview(true)}
                      className="btn btn-secondary"
                    >
                      <EyeIcon className="icon-sm" />
                      Preview Wish
                    </button>
                    
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Creating...
                        </>
                      ) : (
                        <>
                          <SparklesIcon className="icon-sm" />
                          Create Wish
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-slate-200">
                <button
                  type="button"
                  onClick={prevStep}
                  className={`btn btn-secondary ${currentStep === 1 ? 'invisible' : ''}`}
                >
                  Previous
                </button>
                
                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next Step
                    <ArrowRightIcon className="icon-sm" />
                  </button>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateWish;