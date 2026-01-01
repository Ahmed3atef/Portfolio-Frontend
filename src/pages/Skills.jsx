import React, { useState, useEffect } from 'react';
import apiClient from '../services/api';

// A default card component to show if the API call fails or returns empty
const DefaultSkillCard = () => (
  <div className="cyber-card p-6">
    <h3
      className="text-2xl font-bold mb-4"
      style={{
        color: 'var(--tertiary-color)',
        textShadow: '0 0 5px var(--tertiary-color)',
      }}
    >
      Awaiting Data...
    </h3>
    <ul className="space-y-2">
      <li>&gt; No skill data loaded from endpoint.</li>
    </ul>
  </div>
);

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 👇 YOUR ENDPOINT for skills
    // Expects: [{ "title": "Languages", "items": ["Python", "JavaScript"] }, ...]
    apiClient.get('/skills/')
      .then(response => {
        setSkills(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching skills:", error);
        setSkills([]); // Set to empty array to trigger default
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-primary-color">LOADING SKILLS_MATRIX...</div>;
  }

  return (
    <section id="page-skills">
      <h2
        className="text-4xl font-bold text-center mb-12 glitch"
        data-text="SKILLS & TOOLS"
      >
        SKILLS & TOOLS
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skills.length > 0 ? (
          skills.map((skillCategory, index) => (
            <div key={index} className="cyber-card p-6">
              <h3
                className="text-2xl font-bold mb-4"
                style={{
                  color: 'var(--tertiary-color)',
                  textShadow: '0 0 5px var(--tertiary-color)',
                }}
              >
                {skillCategory.title}
              </h3>
              <ul className="space-y-2">
                {skillCategory.items.map((item, itemIndex) => (
                  <li key={itemIndex}>&gt; {item}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          // Requirement 2: Show default card if no data
          <DefaultSkillCard />
        )}
      </div>
    </section>
  );
}

export default Skills;