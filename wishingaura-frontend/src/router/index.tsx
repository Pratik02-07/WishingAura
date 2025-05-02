import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import CreateWish from '../pages/CreateWish';
import ViewWish from '../pages/ViewWish';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <App />
      </AuthProvider>
    ),
    children: [
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