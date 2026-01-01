import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import App from './App';

const RedirectHandler = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(window.location.search);
  const redirectPath = query.get('redirect');

  React.useEffect(() => {
    if (redirectPath) {
      // Replace the current entry in the history stack with the correct path
      navigate('/' + redirectPath, { replace: true });
    }
  }, [navigate, redirectPath]);

  return null; // This component does not render anything
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/Portfolio-Frontend">
      <RedirectHandler />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);