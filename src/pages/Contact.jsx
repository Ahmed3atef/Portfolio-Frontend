import React, { useState } from 'react';
import apiClient from '../services/api';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState(''); // To show success/error message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    setStatus('SENDING_SIGNAL...');
    
    // 👇 YOUR ENDPOINT for contact form
    apiClient.post('/contact/', formData)
      .then(response => {
        setStatus('SUCCESS: Signal received. I will respond shortly.');
        setFormData({ name: '', email: '', message: '' }); // Clear form
      })
      .catch(error => {
        console.error("Error sending message:", error);
        setStatus('ERROR: Signal transmission failed. Please try again.');
      });
  };

  return (
    <section id="page-contact">
      <h2
        className="text-4xl font-bold text-center mb-12 glitch"
        data-text="CONTACT ME"
      >
        CONTACT ME
      </h2>
      <div className="max-w-xl mx-auto cyber-card p-8">
        <p className="text-center mb-6">
          Got a project or just want to connect? Send a message.
        </p>
        
        {/* We use React's onSubmit, not the form's 'action' attribute */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              NAME:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full cyber-input"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              EMAIL:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full cyber-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              MESSAGE:
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              className="w-full cyber-input"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="btn-cyber secondary"
              disabled={status === 'SENDING_SIGNAL...'}
            >
              {status === 'SENDING_SIGNAL...' ? 'TRANSMITTING...' : 'SEND_SIGNAL'}
            </button>
          </div>
          {/* Status message for the user */}
          {status && (
            <p className="text-center text-sm mt-4 text-tertiary-color">{status}</p>
          )}
        </form>
      </div>
    </section>
  );
}

export default Contact;