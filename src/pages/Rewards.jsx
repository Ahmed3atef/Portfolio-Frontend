import React, { useState, useEffect } from 'react';
import apiClient from '../services/api';

function Rewards() {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 👇 YOUR ENDPOINT for awards/certificates
    // Your Django backend should return a list, e.g.:
    // [
    //   { 
    //     "title": "AWS Certified Developer", 
    //     "description": "Validated expertise in AWS...", 
    //     "image_url": "https://placehold.co/600x400/1a0c3b/ff00ff?text=AWS",
    //     "credential_url": "[LINK_TO_AWS_CREDENTIAL]"
    //   },
    //   ...
    // ]
    apiClient.get('/rewards/')
      .then(response => {
        setRewards(response.data);
      })
      .catch(error => {
        console.error("Error fetching rewards:", error);
        setRewards([]); // Set empty array on error to show default message
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-primary-color">LOADING AWARDS_DATA...</div>;
  }

  return (
    <section id="page-rewards">
      <h2
        className="text-4xl font-bold text-center mb-12 glitch"
        data-text="AWARDS & CERTS"
      >
        AWARDS & CERTS
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rewards.length > 0 ? (
          // Requirement 5: Loop over the rewards list
          rewards.map((reward, index) => (
            <div key={index} className="cyber-card overflow-hidden">
              <img
                src={reward.image_url || 'https://placehold.co/600x400/1a0c3b/00ff00?text=CERT'}
                alt={`${reward.title} preview`}
                className="w-full h-48 object-cover opacity-80"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">
                  {reward.title}
                </h3>
                <p className="text-sm mb-4">
                  {reward.description}
                </p>
                <a
                  href={reward.credential_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cyber secondary text-sm py-2 px-4 w-full text-center block"
                >
                  VIEW_CREDENTIAL
                </a>
              </div>
            </div>
          ))
        ) : (
          // Requirement 5: Show default if no data
          <div className="cyber-card p-6 md:col-span-3 text-center">
            <p>&gt; No awards data loaded from endpoint.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Rewards;