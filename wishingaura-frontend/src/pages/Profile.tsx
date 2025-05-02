import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface Wish {
  id: string;
  recipientName: string;
  createdAt: string;
  message: string;
  photos: string[];
}

const Profile = () => {
  const { user } = useAuth();
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishes = async () => {
      if (user) {
        try {
          const q = query(collection(db, "wishes"), where("userId", "==", user.uid));
          const querySnapshot = await getDocs(q);
          const userWishes = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Wish[];
          setWishes(userWishes);
        } catch (error) {
          console.error('Error fetching wishes:', error);
        }
        setLoading(false);
      }
    };

    fetchWishes();
  }, [user]);

  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center text-gray-600 hover:text-primary">
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">My Wishes</h1>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your wishes...</p>
          </div>
        ) : wishes.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No wishes yet</h3>
            <p className="text-gray-600 mb-4">Create your first birthday wish to get started!</p>
            <Link to="/create" className="btn btn-primary">
              Create a Wish
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {wishes.map((wish) => (
              <Link
                key={wish.id}
                to={`/wish/${wish.id}`}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {wish.photos && wish.photos.length > 0 && (
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={wish.photos[0]}
                      alt={wish.recipientName}
                      className="object-cover w-full h-48"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    For: {wish.recipientName}
                  </h3>
                  <p className="text-gray-600 line-clamp-2 mb-4">{wish.message}</p>
                  <p className="text-sm text-gray-500">
                    Created: {new Date(wish.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile; 