"use client";
import { useState, useEffect, useRef } from "react";
import { db } from "../firebase"; // Adjust the import path.
import { ref, push, onValue } from "firebase/database";
import Navbar from "../../components/NavBar.js"; // Import Navbar

export default function Room({ params }) {
  const { id } = params; // Room ID from the URL.
  const [messages, setMessages] = useState([]); // Messages from Firebase.
  const [inputValue, setInputValue] = useState(""); // Input field value.
  const [userName, setUserName] = useState(""); // User's name
  const [isNameModalOpen, setIsNameModalOpen] = useState(false); // Modal visibility for name input
  const messageEndRef = useRef(null); // For scrolling to the latest message.
  const messagesRef = ref(db, `${id}/messages`); // Firebase room reference.

  // Fetch messages from Firebase in real-time.
  useEffect(() => {
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const fetchedMessages = data ? Object.values(data) : [];
      setMessages(fetchedMessages);
    });
  }, [id]);

  // Scroll to the latest message when messages change.
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send a new message to Firebase.
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      // Check if the user name is set
      if (!userName) {
        setIsNameModalOpen(true); // Open the modal if name isn't set
        return;
      }

      const newMessage = {
        text: `${userName}: ${inputValue}`, // Include the user's name with the message
        timestamp: new Date().toLocaleTimeString(),
      };
      push(messagesRef, newMessage); // Add message to Firebase.
      setInputValue(""); // Clear the input field.
    }
  };

  const handleSubmitUserName = () => {
    if (userName.trim()) {
      setIsNameModalOpen(false); // Close the modal
      // You can also store the name in local storage or context if you need it persistently
    }
  };

  const handleModalClose = () => {
    setIsNameModalOpen(false); // Close the modal
    setUserName(""); // Clear user name state
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <Navbar />

      {/* Room Content */}
      <div className="flex flex-col items-center justify-center min-h-screen font-mono px-4 sm:px-0">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">You Joined Room: {id}</h1>

        <div className="w-full max-w-md p-4 rounded-lg shadow-md">
          {/* Messages List */}
          <div className="overflow-y-auto max-h-60 mb-4 hide-scrollbar">
            {messages.map((message, index) => (
              <div key={index} className="text-left mb-2 whitespace-pre-wrap break-words">
                <span className="block text-sm text-gray-400">
                  {message.timestamp}
                </span>
                <span>{message.text}</span>
              </div>
            ))}
            <div ref={messageEndRef} /> {/* Scroll anchor */}
          </div>

          {/* Message Input Form */}
          <form onSubmit={handleSendMessage} className="flex">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-grow p-2 bg-black rounded-l-lg border border-white focus:outline-none focus:ring-1 focus:ring-white"
              placeholder="Say Something"
            />
            <button
              type="submit"
              className="bg-white text-black px-4 py-2 rounded-r-lg hover:bg-black hover:border hover:border-white hover:text-white"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      {/* Modal for entering user name */}
      {isNameModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-black bg-opacity-20 backdrop-blur-md px-32 py-20 rounded-lg shadow-lg relative">
            <h2 className="text-2xl font-bold mb-4">Enter Your Name</h2>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="p-2 mb-4 w-full border border-white bg-transparent rounded"
              placeholder="Your Name"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleSubmitUserName}
                className="rounded-full border border-white bg-transparent text-white px-12 py-3 text-lg transition-transform duration-300 ease-in-out"
              >
                Submit
              </button>
              <button
                onClick={handleModalClose}
                className="rounded-full border border-white bg-transparent text-white px-12 py-3 text-lg transition-transform duration-300 ease-in-out"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSS to Hide Scrollbar */}
      <style jsx>{`
        .hide-scrollbar {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* Internet Explorer and Edge */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari, and Opera */
        }
      `}</style>
    </div>
  );
}
