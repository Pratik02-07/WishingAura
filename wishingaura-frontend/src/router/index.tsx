import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import CreateWish from '../pages/CreateWish';
import ViewWish from '../pages/ViewWish';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import MaintenancePage from '../pages/MaintenancePage';

const MAINTENANCE_MODE = import.meta.env.VITE_MAINTENANCE_MODE === 'true';

export const router = createBrowserRouter([
  {
    path: '/',
    element: MAINTENANCE_MODE ? (
      <MaintenancePage />
    ) : (
      <AuthProvider>
        <App />
      </AuthProvider>
    ),
    children: MAINTENANCE_MODE ? [] : [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      {
        path: '/create',
        element: (
          <ProtectedRoute>
            <CreateWish />
          </ProtectedRoute>
        ),
      },
      { path: '/wish/:id', element: <ViewWish /> },
      {
        path: '/profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
]); 