// app/page.js
import Navbar from "../components/NavBar.js"; // Import Navbar component
import LandingPage from "../pages/landingpage.js"; // Import existing landing page

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar at the top */}
      <Navbar />

      {/* Landing Page Content */}
      <LandingPage />
    </div>
  );
}
