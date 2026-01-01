import React, { useState, useEffect } from 'react';
import apiClient from '../services/api';

// A single timeline item component
const TimelineItem = ({ item, alignment }) => (
  <div className={`timeline-item ${alignment}`}>
    <div className="timeline-dot"></div>
    <div className="cyber-card p-6 timeline-card">
      <h3 className="text-2xl font-bold mb-2 text-primary-color">{item.title} @ {item.company}</h3>
      <p className="text-sm text-tertiary-color mb-4">{item.dates} | {item.location}</p>
      <p className="text-lg font-mono mb-2">/TASK_LOG:</p>
      <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
        {item.tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  </div>
);

// Default items if API fails
const DefaultExperience = () => (
  <>
    <TimelineItem 
      alignment="timeline-item-right"
      item={{
        title: "Senior Backend Engineer",
        company: "[Current Company]",
        dates: "Current",
        location: "[City, Country]",
        tasks: ["Awaiting data from endpoint...", "Led team on core API..."]
      }}
    />
    <TimelineItem 
      alignment="timeline-item-left"
      item={{
        title: "Backend Developer",
        company: "[Previous Company]",
        dates: "[2019] - [2023]",
        location: "[City, Country]",
        tasks: ["Developed RESTful APIs...", "Integrated third-party services..."]
      }}
    />
  </>
);

function Experience() {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 👇 YOUR ENDPOINT for experience
    // Expects: [{ "title": "...", "company": "...", "dates": "...", "location": "...", "tasks": ["...", "..."] }, ...]
    apiClient.get('/experience/')
      .then(response => {
        setExperience(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching experience:", error);
        setExperience([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-primary-color">LOADING WORK_HISTORY...</div>;
  }

  return (
    <section id="page-experience">
      <h2
        className="text-4xl font-bold text-center mb-16 glitch"
        data-text="WORK EXPERIENCE"
      >
        WORK EXPERIENCE
      </h2>
      <div className="timeline-cyberpunk max-w-5xl mx-auto">
        {experience.length > 0 ? (
          experience.map((item, index) => (
            // Requirement 3: Alternate left and right automatically
            <TimelineItem
              key={index}
              item={item}
              alignment={index % 2 === 0 ? 'timeline-item-right' : 'timeline-item-left'}
            />
          ))
        ) : (
          // Requirement 3: Show default values (one left, one right)
          <DefaultExperience />
        )}
      </div>
    </section>
  );
}

export default Experience;