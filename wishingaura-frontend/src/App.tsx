import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 py-4 sm:py-6 md:py-8">
        <Outlet />
      </main>
      <footer className="py-6 bg-background-dark mt-12 text-center text-sm text-text-secondary">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} WishingAura. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
