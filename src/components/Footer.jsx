import React from 'react';

// Accept 'name' as a prop
function Footer({ name }) {
  const currentYear = new Date().getFullYear();
  const displayName = name || 'Developer';

  return (
    <footer className="text-center py-8 mt-16 border-t border-t-primary-color/30">
      <p>&copy; {currentYear} {displayName}. All systems operational.</p>
    </footer>
  );
}

export default Footer;