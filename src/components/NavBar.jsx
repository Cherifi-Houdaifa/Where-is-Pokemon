import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';

export default function NavBar() {
    return (
        <nav>
            <h1>Find The Pokemon</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/">About</Link>
            </div>
        </nav>
    );
}
