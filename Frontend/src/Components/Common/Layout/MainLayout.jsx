import React, { useState } from 'react';
import Navbar from '../Header/Navbar';
import SearchBar from '../Header/SearchBar';
import Footer from '../Footer/Footer';
import QuickLinks from '../Footer/QuickLinks';
import './Layout.css';

const MainLayout = ({ children, hideSearch = false }) => {
  const [activeTab, setActiveTab] = useState('flights');

  return (
    <div className="main-layout">
      <header className="layout-header">
        <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
        {!hideSearch && <SearchBar activeTab={activeTab} />}
      </header>

      <main className="layout-main">
        {children}
      </main>

      <QuickLinks />
      <Footer />
    </div>
  );
};

export default MainLayout;