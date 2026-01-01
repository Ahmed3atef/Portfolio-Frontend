import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import Particles from 'react-particles';
import { loadSlim } from 'tsparticles-slim';
import { particlesOptions } from './particles-config';
import apiClient from './services/api'; // Import your API client

// Import Components
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import Pages
import Home from './pages/Home';
import Skills from './pages/Skills';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Rewards from './pages/Rewards';
import Contact from './pages/Contact';

function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [profileName, setProfileName] = useState(''); // State for the name

  // Fetch the profile data when the app starts
  useEffect(() => {
    apiClient.get('/profile-data/')
      .then(response => {
        // Assuming your API returns { name: "Your Name", ... }
        setProfileName(response.data.name);
      })
      .catch(error => {
        console.error("Error fetching global profile data:", error);
        setProfileName('DEV_SYSTEM'); // Fallback name
      });
  }, []);
  
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  if (isBooting) {
    return <LoadingScreen onBootComplete={() => setIsBooting(false)} />;
  }

  return (
    <>
      <Particles
        id="particles-js"
        init={particlesInit}
        options={particlesOptions}
      />

      <div id="app" className="relative" style={{ opacity: 1, visibility: 'visible' }}>
        {/* Pass the name to Navbar */}
        <Navbar name={profileName} />
        
        <main className="container mx-auto px-4 py-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        {/* Pass the name to Footer */}
        <Footer name={profileName} />
      </div>
    </>
  );
}

export default App;