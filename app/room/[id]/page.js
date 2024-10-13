// app/room/[id]/page.js

export default function Room({ params }) {
    const { id } = params; // Get the room ID from the URL
  
    return (
      <div className="flex items-center justify-center min-h-screen text-white font-[var(--font-geist-sans)]">
        <h1 className="text-4xl font-bold text-center">Room ID: {id}</h1>
        {/* Additional room content can go here */}
      </div>
    );
  }
  