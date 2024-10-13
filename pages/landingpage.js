"use client";

import { useRouter } from "next/navigation"; // Import the useRouter hook
import { v4 as uuidv4 } from 'uuid'; // Import uuid to generate unique IDs

export default function Home() {
  const router = useRouter(); // Initialize the router

  const handleCreateRoom = () => {
    const roomId = uuidv4(); // Generate a unique room ID
    router.push(`/room/${roomId}`); // Navigate to the new room page with the unique ID
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white font-[var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold text-center mb-4">Welcome To Colook.</h1>
      <button
        className="rounded-full border border-white bg-transparent text-white px-6 py-3 text-lg transition-transform duration-300 ease-in-out"
        onClick={handleCreateRoom} // Call the function on click
      >
        Create Room
      </button>

      <style jsx>{`
        @keyframes shake {
          0% { transform: translate(0); }
          25% { transform: translate(-2px, 0); }
          50% { transform: translate(2px, 0); }
          75% { transform: translate(-2px, 0); }
          100% { transform: translate(0); }
        }

        button:hover {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
