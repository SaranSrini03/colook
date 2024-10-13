//project location : pages/landingpage.js
"use client";

import { useRouter } from "next/navigation";

// Function to generate a random alphanumeric string of a given length
const generateShortId = (length = 5) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export default function Home() {
  const router = useRouter();

  const handleCreateRoom = () => {
    const roomId = generateShortId(); // Generate a short unique room ID
    router.push(`${roomId}`); // Navigate to the new room page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white font-[var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold text-center mb-4">Welcome To Colook.</h1>
      <button
        className="rounded-full border border-white bg-transparent text-white px-6 py-3 text-lg transition-transform duration-300 ease-in-out"
        onClick={handleCreateRoom}
      >
        Create Room
      </button>
    </div>
  );
}
