import { Link } from 'react-router-dom';
import { GiftIcon, SparklesIcon, CalendarIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Beautiful Templates',
    description: 'Choose from a variety of stunning birthday wish templates.',
    icon: SparklesIcon,
  },
  {
    name: 'Personalization',
    description: 'Add photos, custom messages, and make it truly special.',
    icon: GiftIcon,
  },
  {
    name: 'Schedule Delivery',
    description: 'Set the perfect time for your birthday wish to be delivered.',
    icon: CalendarIcon,
  },
];

const Home = () => {
  return (
    <div className="space-y-12 md:space-y-24 py-6 md:py-12">
      {/* Hero Section */}
      <div className="text-center space-y-6 md:space-y-8 px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
          Create Unforgettable
          <span className="text-primary block mt-2">Birthday Wishes</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Make someone's birthday extra special with personalized wishes, photos, and beautiful animations.
        </p>
        <div className="pt-4">
          <Link 
            to="/create" 
            className="btn btn-primary text-base md:text-lg px-6 md:px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center"
          >
            Create Your First Wish
            <SparklesIcon className="icon-md ml-2" />
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white rounded-3xl shadow-xl p-6 md:p-12 mx-4 sm:mx-6 md:mx-0">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-16 text-gray-900">
          Why Choose <span className="text-primary">WishingAura</span>?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature) => (
            <div 
              key={feature.name} 
              className="text-center space-y-4 md:space-y-6 p-4 md:p-6 rounded-2xl hover:bg-gray-50 transition-all duration-300 group"
            >
              <div className="mx-auto h-14 w-14 md:h-16 md:w-16 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="icon-md md:icon-lg text-primary" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900">{feature.name}</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-6 md:p-12 mx-4 sm:mx-6 md:mx-0">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
          Ready to Make Someone's Day Special?
        </h2>
        <p className="text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto text-sm md:text-base">
          Create your first birthday wish now and spread joy to your loved ones!
        </p>
        <Link 
          to="/create" 
          className="btn btn-primary text-base md:text-lg px-6 md:px-8 py-2 md:py-3 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Home; 