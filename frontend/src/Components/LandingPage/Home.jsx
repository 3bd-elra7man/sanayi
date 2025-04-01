import React from "react";
import WelcomeSection from "./Components/Sections/WelcomeSection";
import FacilitiesSection from "./Components/Sections/FacilitiesSection";
import WorksSection from "./Components/Sections/WorksSection";
import SPSection from "./Components/Sections/SPSection";
import Footer from "./Components/Footer";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 text-white font-sans">

      <main className="container mx-auto px-4 py-8">
        <WelcomeSection />
        <FacilitiesSection />

        <WorksSection />
        <SPSection />
      </main>

      <Footer />
    </div>
  );
}

export default Home;
