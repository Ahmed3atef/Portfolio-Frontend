import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

// Accept 'name' as a prop
function Navbar({ name }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Use a default if name isn't loaded yet
  const displayName = name || 'LOADING...';

  const NavItem = ({ to, children, className = '' }) => (
    <NavLink
      to={to}
      className={({ isActive }) => 
        `${className} nav-link ${isActive ? 'active' : ''}`.trim()
      }
      onClick={() => setIsMobileMenuOpen(false)}
    >
      {children}
    </NavLink>
  );

  return (
    <>
      <nav className="w-full h-[80px]">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          {/* Update the Glitch Text and the Link Text */}
          <h1 className="text-2xl font-bold glitch" data-text={displayName}>
            <Link to="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              {displayName}
            </Link>
          </h1>
          
          <div className="hidden md:flex items-center space-x-6">
            <NavItem to="/">HOME</NavItem>
            <NavItem to="/skills">SKILLS</NavItem>
            <NavItem to="/experience">EXPERIENCE</NavItem>
            <NavItem to="/projects">PROJECTS</NavItem>
            <NavItem to="/rewards">REWARDS</NavItem>
            <NavItem to="/contact">CONTACT</NavItem>
          </div>
          
          <div className="md:hidden">
            <button
              id="mobile-menu-btn"
              className="text-white focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      <div id="mobile-menu" className={`${isMobileMenuOpen ? '' : 'hidden'} md:hidden bg-black/90 p-4`}>
        <NavItem to="/" className="block text-center py-2">HOME</NavItem>
        <NavItem to="/skills" className="block text-center py-2">SKILLS</NavItem>
        <NavItem to="/experience" className="block text-center py-2">EXPERIENCE</NavItem>
        <NavItem to="/projects" className="block text-center py-2">PROJECTS</NavItem>
        <NavItem to="/rewards" className="block text-center py-2">REWARDS</NavItem>
        <NavItem to="/contact" className="block text-center py-2">CONTACT</NavItem>
      </div>
    </>
  );
}

export default Navbar;