import React, { useState, useEffect } from 'react';
import apiClient from '../services/api';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 👇 YOUR ENDPOINT for projects
    // Expects: [{ "title": "...", "description": "...", "image_url": "...", "source_url": "#", "demo_url": "#" }, ...]
    apiClient.get('/projects/')
      .then(response => setProjects(response.data))
      .catch(error => {
        console.error("Error fetching projects:", error);
        setProjects([]); // Set empty to show default
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center text-primary-color">LOADING PROJECTS...</div>;
  }

  return (
    <section id="page-projects">
      <h2
        className="text-4xl font-bold text-center mb-12 glitch"
        data-text="PROJECTS"
      >
        PROJECTS
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <div
              key={index}
              className="cyber-card project-card h-96 flex flex-col justify-end"
              style={{
                backgroundImage: `url('${project.image_url || 'https://placehold.co/600x400/0d0221/00ffff?text=Project'}')`,
              }}
            >
              <div className="card-content p-6">
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="mb-4 text-sm">{project.description}</p>
                <div className="flex space-x-4">
                  <a
                    href={project.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-cyber text-sm py-2 px-4"
                  >
                    Source Code
                  </a>
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-cyber secondary text-sm py-2 px-4"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          // Default message
          <div className="cyber-card p-6 md:col-span-3 text-center">
            <p>&gt; No project data loaded from endpoint.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;