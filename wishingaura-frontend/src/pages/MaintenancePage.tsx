import React from 'react';

const MaintenancePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-800 text-white p-4 text-center">
      <div className="animate-bounce text-6xl mb-6">
        🛠️
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Under Maintenance
      </h1>
      <p className="text-lg md:text-xl max-w-2xl opacity-90">
        We're currently performing some magical upgrades to bring you an even better experience. 
        We'll be back online shortly!
      </p>
      <p className="mt-8 text-sm opacity-70">
        Thank you for your patience.
      </p>
    </div>
  );
};

export default MaintenancePage; 