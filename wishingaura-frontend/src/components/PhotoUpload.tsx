import React, { useState, useRef, useEffect } from 'react';
import { XCircleIcon, PhotoIcon } from '@heroicons/react/24/outline';
import PhotoTemplates, { Template, templates } from './PhotoTemplates';

interface PhotoUploadProps {
  onPhotoSelect: (file: File | null, template: Template | null) => void;
  minTime?: number; // in seconds
  maxTime?: number; // in seconds
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({
  onPhotoSelect,
  minTime = 180, // 3 minutes default
  maxTime = 300, // 5 minutes default
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(maxTime);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('romantic');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<number>();

  const selectedTemplate = templates.find(t => t.id === selectedTemplateId) || templates[0];

  useEffect(() => {
    // Cleanup preview URL when component unmounts or when new file is selected
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  useEffect(() => {
    if (isTimerActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTimerActive]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should not exceed 5MB');
        return;
      }

      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setTimeLeft(maxTime);
      setIsTimerActive(true);
      onPhotoSelect(file, selectedTemplate);
    }
  };

  const handleRemovePhoto = () => {
    setSelectedFile(null);
    setPreview('');
    setIsTimerActive(false);
    setTimeLeft(maxTime);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onPhotoSelect(null, null);
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplateId(templateId);
    if (selectedFile) {
      const template = templates.find(t => t.id === templateId);
      onPhotoSelect(selectedFile, template || null);
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="space-y-4">
        {!selectedFile ? (
          <div
            className={`
              relative border-2 border-dashed border-background-dark rounded-lg p-8 text-center 
              hover:border-primary transition-colors cursor-pointer
              ${selectedTemplate.className}
            `}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              className="hidden"
              aria-label="Upload photo"
              title="Upload photo"
            />
            <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-text-secondary">
              Click to upload a photo
            </p>
            <p className="text-xs text-text-secondary mt-1">
              Maximum file size: 5MB
            </p>
            <div className={`absolute inset-0 pointer-events-none ${selectedTemplate.overlayClass}`} />
          </div>
        ) : (
          <div className={`relative ${selectedTemplate.className} rounded-lg p-1`}>
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className={`w-full h-64 object-cover rounded-lg ${selectedTemplate.animation}`}
              />
              <button
                onClick={handleRemovePhoto}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors"
                aria-label="Remove photo"
                title="Remove photo"
              >
                <XCircleIcon className="h-6 w-6 text-red-500" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg">
                <div className="flex justify-between items-center">
                  <span>Time remaining:</span>
                  <span className={`font-mono ${timeLeft < 60 ? 'text-red-300' : ''}`}>
                    {formatTime(timeLeft)}
                  </span>
                </div>
              </div>
            </div>
            <div className={`absolute inset-0 pointer-events-none ${selectedTemplate.overlayClass}`} />
          </div>
        )}

        {timeLeft === 0 && (
          <p className="text-red-500 text-sm text-center">
            Time expired! Please upload a new photo.
          </p>
        )}

        {selectedFile && timeLeft > 0 && timeLeft < minTime && (
          <p className="text-yellow-500 text-sm text-center">
            Please wait at least {formatTime(minTime - timeLeft)} more before proceeding
          </p>
        )}
      </div>

      <PhotoTemplates
        selectedTemplate={selectedTemplateId}
        onSelectTemplate={handleTemplateSelect}
      />
    </div>
  );
};

export default PhotoUpload; 