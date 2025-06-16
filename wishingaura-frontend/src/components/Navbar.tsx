import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SparklesIcon, Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
      navigate('/');
    } catch (e) {
      // Optionally show error
    } finally {
      setLoggingOut(false);
      setIsDropdownOpen(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-soft">
      <div className="container-fluid">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-xl md:text-2xl font-bold text-gradient hover:scale-105 transition-transform duration-300"
          >
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl shadow-lg">
              <SparklesIcon className="icon-md text-white" />
            </div>
            <span>WishingAura</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="relative text-slate-600 hover:text-indigo-600 font-medium transition-colors duration-300 group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            <Link 
              to="/create" 
              className="btn btn-primary"
            >
              <SparklesIcon className="icon-sm" />
              Create Wish
            </Link>
            
            {/* User Profile/Sign In */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  className="flex items-center space-x-2 p-2 rounded-xl hover:bg-slate-100 transition-colors duration-300 focus-ring"
                  onClick={() => setIsDropdownOpen((open) => !open)}
                  aria-haspopup="true"
                  aria-expanded={isDropdownOpen ? "true" : "false"}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <UserCircleIcon className="w-5 h-5 text-white" />
                  </div>
                  <span className="hidden lg:inline font-medium text-slate-700">
                    {user.displayName || 'User'}
                  </span>
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 glass-strong rounded-xl shadow-large py-2 animate-slideInDown">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-slate-700 hover:bg-white/20 transition-colors duration-200"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      My Wishes
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-slate-700 hover:bg-white/20 transition-colors duration-200 disabled:opacity-50"
                      disabled={loggingOut}
                    >
                      {loggingOut ? 'Logging out...' : 'Logout'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="btn btn-outline"
              >
                Sign in
              </button>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-xl hover:bg-slate-100 transition-colors duration-300 focus-ring"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6 text-slate-600" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-slate-600" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20 animate-slideInDown">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-slate-600 hover:text-indigo-600 font-medium transition-colors duration-300 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              
              <Link 
                to="/create" 
                className="btn btn-primary justify-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <SparklesIcon className="icon-sm" />
                Create Wish
              </Link>
              
              {/* User Profile/Sign In for Mobile */}
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Wishes
                  </Link>
                  <button
                    onClick={async () => { 
                      setLoggingOut(true); 
                      await logout(); 
                      setIsMenuOpen(false); 
                      navigate('/'); 
                      setLoggingOut(false); 
                    }}
                    className="block w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors duration-200 disabled:opacity-50"
                    disabled={loggingOut}
                  >
                    {loggingOut ? 'Logging out...' : 'Logout'}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => { navigate('/login'); setIsMenuOpen(false); }}
                  className="btn btn-outline justify-center"
                >
                  Sign in
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;