import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="header-container">
                <div className="logo">
                    <h1>Make My Trip</h1>
                </div>
                <nav className="navigation">
                    <ul>
                        <li><a href="/">Flights</a></li>
                        <li><a href="/hotels">Hotels</a></li>
                        <li><a href="/trains">Trains</a></li>
                        <li><a href="/buses">Buses</a></li>
                        <li><a href="/login">Login</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;