import React from 'react';
import Link from 'next/link';
import './navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">
          SAO ARS Database
        </Link>
        
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link href="/" className="navbar-link">
              Accueil
            </Link>
          </li>
          <li className="navbar-item">
            <Link href="/character" className="navbar-link">
              Personnages
            </Link>
          </li>
          <li className="navbar-item">
            <Link href="/banner" className="navbar-link">
              Bannières
            </Link>
          </li>
          <li className="navbar-item">
            <Link href="/weapon" className="navbar-link">
              Armes
            </Link>
          </li>
          <li className="navbar-item">
            <Link href="/equipment" className="navbar-link">
              Équipements
            </Link>
          </li>
          <li className="navbar-item">
            <Link href="/about" className="navbar-link">
              À propos
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
