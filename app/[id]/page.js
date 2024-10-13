"use client";
import { useState, useEffect, useRef } from "react";
import { db } from "../firebase"; // Adjust the import path.
import { ref, push, onValue } from "firebase/database";
import Navbar from "../../components/NavBar.js"; // Import Navbar

export default function Room({ params }) {
  const { id } = params; // Room ID from the URL.
  const [messages, setMessages] = useState([]); // Messages from Firebase.
  const [inputValue, setInputValue] = useState(""); // Input field value.
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
      const newMessage = {
        text: inputValue,
        timestamp: new Date().toLocaleTimeString(),
      };
      push(messagesRef, newMessage); // Add message to Firebase.
      setInputValue(""); // Clear the input field.
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <Navbar />

      {/* Room Content */}
      <div className="flex flex-col items-center  justify-center min-h-screen font-mono">
        <h1 className="text-4xl font-bold mb-4">You Joined Room: {id}</h1>

        <div className="w-full max-w-md p-4 rounded-lg shadow-md">
          {/* Messages List */}
          <div className="overflow-y-auto max-h-60 mb-4 hide-scrollbar">
            {messages.map((message, index) => (
              <div key={index} className="text-left mb-2">
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
