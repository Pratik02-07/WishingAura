import { Link, useNavigate } from 'react-router-dom';
import { 
  GiftIcon, 
  SparklesIcon, 
  CalendarIcon, 
  PhotoIcon,
  MusicalNoteIcon,
  ShareIcon,
  ArrowRightIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useEffect, useState } from 'react';

interface Wish {
  id: string;
  recipientName: string;
  createdAt: string;
}

const features = [
  {
    name: 'Beautiful Templates',
    description: 'Choose from stunning, professionally designed birthday wish templates.',
    icon: SparklesIcon,
    color: 'from-indigo-500 to-purple-500',
  },
  {
    name: 'Photo Memories',
    description: 'Add personal photos to make your wishes truly memorable and special.',
    icon: PhotoIcon,
    color: 'from-pink-500 to-rose-500',
  },
  {
    name: 'Schedule Delivery',
    description: 'Set the perfect time for your birthday wish to surprise your loved ones.',
    icon: CalendarIcon,
    color: 'from-emerald-500 to-teal-500',
  },
  {
    name: 'Easy Sharing',
    description: 'Share your wishes instantly via WhatsApp, email, or social media.',
    icon: ShareIcon,
    color: 'from-blue-500 to-cyan-500',
  },
];

const steps = [
  {
    step: '01',
    title: 'Choose Template',
    description: 'Select from our collection of beautiful templates',
    icon: SparklesIcon,
  },
  {
    step: '02',
    title: 'Personalize',
    description: 'Add photos, messages, and personal touches',
    icon: PhotoIcon,
  },
  {
    step: '03',
    title: 'Share & Celebrate',
    description: 'Send your wish and make someone smile',
    icon: GiftIcon,
  },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    text: 'WishingAura helped me create the most beautiful birthday surprise for my mom. She was in tears!',
    avatar: '👩‍💼',
  },
  {
    name: 'Mike Chen',
    text: 'The templates are gorgeous and so easy to customize. My friends loved their birthday wishes!',
    avatar: '👨‍💻',
  },
  {
    name: 'Emma Davis',
    text: 'I use WishingAura for all my family birthdays now. It makes every celebration special.',
    avatar: '👩‍🎨',
  },
];

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userWishes, setUserWishes] = useState<Wish[]>([]);
  const [loadingWishes, setLoadingWishes] = useState(false);

  useEffect(() => {
    const fetchUserWishes = async () => {
      if (user) {
        setLoadingWishes(true);
        try {
          const q = query(collection(db, "wishes"), where("userId", "==", user.uid));
          const querySnapshot = await getDocs(q);
          const wishes = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Wish[];
          setUserWishes(wishes);
        } catch (error) {
          console.error('Error fetching wishes:', error);
        }
        setLoadingWishes(false);
      }
    };

    fetchUserWishes();
  }, [user]);

  const handleCreateWish = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate('/create');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dots opacity-30"></div>
        <div className="container-fluid relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="animate-fadeIn">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
                Create
                <span className="text-gradient block mt-2">Unforgettable</span>
                Birthday Wishes
              </h1>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Transform ordinary birthdays into extraordinary celebrations with personalized wishes, 
                stunning animations, and heartfelt memories.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={handleCreateWish}
                  className="btn btn-primary text-lg px-8 py-4 hover-lift"
                >
                  <SparklesIcon className="icon-md" />
                  Start Creating
                  <ArrowRightIcon className="icon-sm" />
                </button>
                <Link
                  to="/wish/demo"
                  className="btn btn-secondary text-lg px-8 py-4"
                >
                  View Demo
                </Link>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
              <div className="text-center animate-slideInUp" style={{ animationDelay: '0.2s' }}>
                <div className="text-3xl font-bold text-gradient">10K+</div>
                <div className="text-slate-600">Wishes Created</div>
              </div>
              <div className="text-center animate-slideInUp" style={{ animationDelay: '0.4s' }}>
                <div className="text-3xl font-bold text-gradient">50+</div>
                <div className="text-slate-600">Templates</div>
              </div>
              <div className="text-center animate-slideInUp" style={{ animationDelay: '0.6s' }}>
                <div className="text-3xl font-bold text-gradient">99%</div>
                <div className="text-slate-600">Happy Users</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-fluid">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Why Choose <span className="text-gradient">WishingAura</span>?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Everything you need to create magical birthday experiences that your loved ones will treasure forever.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.name} 
                className="group text-center p-8 rounded-3xl hover:shadow-large transition-all duration-500 hover:-translate-y-2 animate-slideInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`mx-auto h-16 w-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon className="icon-lg text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800">{feature.name}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-gradient-to-br from-slate-50 to-indigo-50">
        <div className="container-fluid">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-slate-600">Create beautiful birthday wishes in just three simple steps</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.step} className="relative text-center animate-scaleIn" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow">
                    <step.icon className="icon-lg text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-slate-600">{step.description}</p>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 -right-4 w-8 h-0.5 bg-gradient-to-r from-indigo-300 to-purple-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-white">
        <div className="container-fluid">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-slate-600">Join thousands of happy users creating magical moments</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.name} 
                className="card-elevated text-center hover-lift animate-slideInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-4">{testimonial.avatar}</div>
                <p className="text-slate-600 mb-4 italic">"{testimonial.text}"</p>
                <div className="font-semibold text-slate-800">{testimonial.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-indigo-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-grid opacity-10"></div>
        <div className="container-fluid relative text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Create Something Amazing?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of users who are already creating unforgettable birthday experiences. 
              Start your journey today and make someone's day extraordinary!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleCreateWish}
                className="btn bg-white text-indigo-600 hover:bg-slate-50 text-lg px-8 py-4 hover-lift"
              >
                <SparklesIcon className="icon-md" />
                Create Your First Wish
              </button>
              <Link
                to="/login"
                className="btn border-2 border-white text-white hover:bg-white hover:text-indigo-600 text-lg px-8 py-4"
              >
                Sign Up Free
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;