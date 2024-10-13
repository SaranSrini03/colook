"use client";

import { useState } from "react";
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
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [roomId, setRoomId] = useState(""); // State to store the room ID

  const handleCreateRoom = () => {
    const newRoomId = generateShortId(); // Generate a short unique room ID
    router.push(`/${newRoomId}`); // Navigate to the new room page
  };

  const handleJoinRoom = () => {
    setIsModalOpen(true); // Open the modal when "Join Room" is clicked
  };

  const handleSubmitRoomId = () => {
    if (roomId) {
      router.push(`/${roomId}`); // Navigate to the room page if roomId is provided
      setIsModalOpen(false); // Close the modal after submission
      setRoomId(""); // Clear the roomId state
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close the modal without submitting
    setRoomId(""); // Clear the roomId state
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white font-mono p-4">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Welcome To Colook.</h1>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
        <button
          className="rounded-full border border-white bg-transparent text-white px-8 py-3 text-lg transition-transform duration-300 ease-in-out w-full sm:w-auto"
          onClick={handleCreateRoom}
        >
          Create Room
        </button>
        <button
          className="rounded-full border border-white bg-transparent text-white px-8 py-3 text-lg transition-transform duration-300 ease-in-out w-full sm:w-auto"
          onClick={handleJoinRoom}
        >
          Join Room
        </button>
      </div>

      {/* Modal for joining room */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-black bg-opacity-20 backdrop-blur-md p-6 md:p-12 rounded-lg shadow-lg relative max-w-md w-full">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Room</h2>
            <p className="mb-4">Enter the room ID:</p>
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="p-2 mb-4 w-full border border-white bg-transparent rounded"
              placeholder="Room ID"
            />
            <div className="flex justify-end space-x-4"> {/* Added space-x-4 for spacing */}
              <button
                onClick={handleSubmitRoomId}
                className="rounded-full border border-white bg-transparent text-white px-8 py-3 text-lg transition-transform duration-300 ease-in-out"
              >
                Join
              </button>
              <button
                onClick={handleModalClose}
                className="rounded-full border border-white bg-transparent text-white px-8 py-3 text-lg transition-transform duration-300 ease-in-out"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
