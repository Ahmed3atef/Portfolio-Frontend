import React, { useState, useEffect } from 'react';
import useTypingEffect from '../hooks/useTypingEffect';
import apiClient from '../services/api';

const wordsToType = ['coding', 'problem solving', 'software development', 'gaming'];
const prefix = "I Like ";

function Home() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const dynamicText = useTypingEffect(wordsToType);
  
  useEffect(() => {
    // 👇 YOUR ENDPOINT for home page data
    apiClient.get('/profile-data/') 
      .then(response => {
        setProfile(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching profile data:", error);
        // Set default data on error
        setProfile({
          name: "[YOUR NAME HERE]",
          title: "Backend Developer",
          image_url: "https://placehold.co/180x180/0d0221/00ffff?text=DEV",
          description: "I build robust, scalable, and secure server-side applications. Welcome to my digital terminal.",
          phone: "[YOUR PHONE NUMBER]",
          email: "[YOUR EMAIL ADDRESS]",
          location: "[YOUR CITY, COUNTRY]",
          facebook_url: "https://facebook.com",
          github_url: "https://github.com",
          instagram_url: "https://instagram.com",
          linkedin_url: "https://linkedin.com",
          cv_url: "path/to/your/cv.pdf",
          game_url: "https://your-game-url.com"
        });
        setLoading(false);
      });
  }, []);

  // Placeholder alerts from your script.js
  const handleDownloadCV = (e) => {
    if (profile.cv_url === "path/to/your/cv.pdf") {
      e.preventDefault();
      alert("Placeholder: Update the CV link in your backend to enable download.");
    }
  };

  const handlePlayGame = (e) => {
    if (profile.game_url === "https://your-game-url.com") {
      e.preventDefault();
      alert("Placeholder: Update the game link in your backend to enable game access.");
    }
  };

  if (loading) {
    return <div className="text-center text-primary-color">LOADING USER_PROFILE...</div>;
  }

  return (
    // Note: The 'page' and 'active' classes are no longer needed
    <section id="page-home"> 
      <div className="flex flex-col items-center justify-center text-center min-h-[70vh]">
        <div className="developer-section">
          <img
            src={profile.image_url}
            alt="Developer Picture"
            className="developer-picture"
          />
          <div className="name-section">
            <h1
              className="text-5xl md:text-7xl font-bold glitch"
              data-text={profile.name}
            >
              {profile.name}
            </h1>
            <h2
              className="text-2xl md:text-4xl text-secondary-color mt-4 mb-8"
              style={{
                color: 'var(--secondary-color)',
                textShadow: '0 0 5px var(--secondary-color)',
              }}
            >
              {profile.title}
            </h2>
            {/* 4. ADD THE NEW TYPING ELEMENT HERE */}
            <div className="typing-container text-2xl md:text-4xl mb-8">
              <span className="typing-text">
                {prefix}
                {dynamicText}
              </span>
              <span className="typing-cursor"></span>
            </div>
          </div>
        </div>

        <p className="text-lg md:text-xl max-w-2xl mb-8">
          {profile.description}
        </p>

        <div className="cyber-card p-6 mb-12 w-full max-w-md">
          <h3
            className="text-xl font-bold mb-4"
            style={{
              color: 'var(--primary-color)',
              textShadow: '0 0 5px var(--primary-color)',
            }}
          >
            /USER_PROFILE/
          </h3>
          <div className="text-left space-y-2 text-sm md:text-base">
            <p><span className="text-tertiary-color">Name:</span> {profile.name}</p>
            <p><span className="text-tertiary-color">Phone:</span> {profile.phone}</p>
            <p><span className="text-tertiary-color">Email:</span> {profile.email}</p>
            <p><span className="text-tertiary-color">Location:</span> {profile.location}</p>
          </div>
        </div>

        <div className="social-icons">
          <ul>
            <li>
              <a rel="noopener" href={profile.facebook_url} target="_blank">
                <span></span><span></span><span></span><span></span>
                <span className="fa fa-facebook"></span>
              </a>
            </li>
            <li>
              <a rel="noopener" href={profile.github_url} target="_blank">
                <span></span><span></span><span></span><span></span>
                <span className="fa fa-github"></span>
              </a>
            </li>
            <li>
              <a rel="noopener" href={profile.instagram_url} target="_blank">
                <span></span><span></span><span></span><span></span>
                <span className="fa fa-instagram"></span>
              </a>
            </li>
            <li>
              <a rel="noopener" href={profile.linkedin_url} target="_blank">
                <span></span><span></span><span></span><span></span>
                <span className="fa fa-linkedin"></span>
              </a>
            </li>
          </ul>
        </div>

        <div className="button-container">
          <a
            href={profile.cv_url}
            download
            className="btn-cyber"
            id="download-cv"
            onClick={handleDownloadCV}
          >
            DOWNLOAD_CV.PDF
          </a>
          <a
            rel="noopener"
            href={profile.game_url}
            target="_blank"
            className="btn-cyber tertiary"
            id="play-game"
            onClick={handlePlayGame}
          >
            PLAY_GAME
          </a>
        </div>
      </div>
    </section>
  );
}

export default Home;