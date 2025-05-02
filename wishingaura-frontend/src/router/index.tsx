import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import CreateWish from '../pages/CreateWish';
import ViewWish from '../pages/ViewWish';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/create',
        element: <CreateWish />,
      },
      {
        path: '/wish/:id',
        element: <ViewWish />,
      },
    ],
  },
]); 