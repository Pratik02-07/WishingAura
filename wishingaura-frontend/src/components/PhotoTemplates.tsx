import React from 'react';
import { 
  CakeIcon, 
  SparklesIcon, 
  FaceSmileIcon, 
  HeartIcon,
  StarIcon,
  GiftIcon
} from '@heroicons/react/24/outline';

export interface Template {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
}

export const templates: Template[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Elegant and timeless design',
    icon: <CakeIcon className="w-8 h-8" />,
    bgColor: 'bg-amber-50',
    iconColor: 'text-amber-500'
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary and stylish',
    icon: <SparklesIcon className="w-8 h-8" />,
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-500'
  },
  {
    id: 'funny',
    name: 'Funny',
    description: 'Playful and humorous',
    icon: <FaceSmileIcon className="w-8 h-8" />,
    bgColor: 'bg-green-50',
    iconColor: 'text-green-500'
  },
  {
    id: 'romantic',
    name: 'Romantic',
    description: 'Sweet and loving wishes',
    icon: <HeartIcon className="w-8 h-8" />,
    bgColor: 'bg-pink-50',
    iconColor: 'text-pink-500'
  },
  {
    id: 'magical',
    name: 'Magical',
    description: 'Enchanting and dreamy',
    icon: <StarIcon className="w-8 h-8" />,
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-500'
  },
  {
    id: 'surprise',
    name: 'Surprise',
    description: 'Exciting and unexpected',
    icon: <GiftIcon className="w-8 h-8" />,
    bgColor: 'bg-red-50',
    iconColor: 'text-red-500'
  }
];

interface PhotoTemplatesProps {
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
}

const PhotoTemplates: React.FC<PhotoTemplatesProps> = ({
  selectedTemplate,
  onSelectTemplate,
}) => {
  return (
    <div className="w-full space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">
        Choose a Template
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelectTemplate(template.id)}
            className={`
              group relative p-4 rounded-lg transition-all duration-200
              flex flex-col items-center justify-center text-center
              ${template.bgColor} hover:ring-2 hover:ring-offset-2 hover:ring-gray-200
              ${selectedTemplate === template.id 
                ? 'ring-2 ring-primary ring-offset-2' 
                : 'ring-1 ring-gray-200'}
            `}
            aria-label={`Select ${template.name} template`}
          >
            <div className={`mb-3 ${template.iconColor} transition-transform group-hover:scale-110`}>
              {template.icon}
            </div>
            <h4 className="font-medium text-gray-900">
              {template.name}
            </h4>
            <p className="text-sm text-gray-600 mt-1">
              {template.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PhotoTemplates; 