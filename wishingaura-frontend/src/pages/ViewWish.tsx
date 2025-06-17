import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import WishDisplay from '../components/WishDisplay';
import { AnimatedGradientBackground, ConfettiBurst, SparkleLayer, useDelayedMount } from '../components/Animations';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

function stringToColorPair(str: string = ''): [string, string] {
  let hash1 = 0, hash2 = 0;
  for (let i = 0; i < str.length; i++) {
    hash1 = str.charCodeAt(i) + ((hash1 << 5) - hash1);
    hash2 = str.charCodeAt(i) + ((hash2 << 3) - hash2);
  }
  const color1 = `hsl(${hash1 % 360}, 80%, 85%)`;
  const color2 = `hsl(${(hash2 + 120) % 360}, 80%, 80%)`;
  return [color1, color2];
}

const ViewWish: React.FC = () => {
  const { id } = useParams();
  const [wish, setWish] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(true);
  const confettiMounted = useDelayedMount(400);

  useEffect(() => {
    const fetchWish = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const docRef = doc(db, 'wishes', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setWish(docSnap.data());
        } else {
          setWish(null);
        }
      } catch (error) {
        setWish(null);
      } finally {
        setLoading(false);
      }
    };
    fetchWish();
  }, [id]);

  // Use recipient's name for background
  const [color1, color2] = stringToColorPair(wish?.recipientName);

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-x-hidden"
      style={{
        background: `linear-gradient(135deg, ${color1}, ${color2})`,
      }}
    >
      {/* Animated Backgrounds */}
      <AnimatedGradientBackground colors={["#a1c4fd", "#c2e9fb", "#fcb69f", "#ffecd2"]} speed={18} />
      <SparkleLayer active={true} count={36} />
      <ConfettiBurst active={showConfetti && confettiMounted} />

      {/* Top Navigation */}
      <div className="absolute top-6 left-6 z-40">
        <Link to="/" className="bg-white/70 px-5 py-2 rounded-2xl shadow-lg text-gray-800 font-semibold hover:bg-white/90 transition-all">← Home</Link>
      </div>

      {/* Wish Card */}
      <div className="w-full max-w-2xl mx-auto z-20 mt-24 mb-32 px-2">
        {loading ? (
          <div className="text-center text-xl text-gray-700 py-24">Loading wish...</div>
        ) : wish ? (
          <WishDisplay {...wish} />
        ) : (
          <div className="text-center text-xl text-red-500 py-24">Wish not found.</div>
        )}
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex gap-4 flex-wrap justify-center">
        <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-2xl shadow-xl font-bold hover:scale-105 transition-all">Share</button>
        <button className="bg-white/80 text-indigo-700 px-6 py-3 rounded-2xl shadow-xl font-bold hover:bg-white transition-all">Copy Link</button>
        <Link to="/create" className="bg-gradient-to-r from-pink-400 to-yellow-400 text-white px-6 py-3 rounded-2xl shadow-xl font-bold hover:scale-105 transition-all">Create Another</Link>
      </div>
    </div>
  );
};

export default ViewWish;