import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from './HeroSection';
import FeaturedDestinations from './FeaturedDestinations';
import TrendingOffers from './TrendingOffers';
import Testimonials from './Testimonials';
import SearchWidget from '../../components/common/SearchWidget/SearchWidget';
import QuickBook from '../../components/common/QuickBook/QuickBook';
import PromoBanner from '../../components/common/PromoBanner/PromoBanner';
import DestinationInspiration from "../../components/common/DestinationInspiration/DestinationInspiration";
import AppDownload from "../../components/common/AppDownload/AppDownload";
import { useSearch } from '../../hooks/useSearch';
import { useUser } from "../../Context/UserContext.jsx";

import { getFeaturedDestinations, getTrendingOffers } from '../../data/mockData/destinationsData';


import './Home.css';

const Home = () => {
  const [featuredDestinations, setFeaturedDestinations] = useState([]);
  const [trendingOffers, setTrendingOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('flights');
  const { setSearchData } = useSearch();
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API calls
    const loadData = async () => {
      try {
        setLoading(true);
        const destinations = await getFeaturedDestinations();
        const offers = await getTrendingOffers();
        setFeaturedDestinations(destinations);
        setTrendingOffers(offers);
      } catch (error) {
        console.error('Error loading home data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSearch = (searchData) => {
    setSearchData(searchData);
    
    // Navigate to search results page based on search type
    switch (searchData.type) {
      case 'flights':
        navigate('/search/flights', { state: { searchData } });
        break;
      case 'hotels':
        navigate('/search/hotels', { state: { searchData } });
        break;
      case 'trains':
        navigate('/search/trains', { state: { searchData } });
        break;
      case 'buses':
        navigate('/search/buses', { state: { searchData } });
        break;
      default:
        navigate('/search', { state: { searchData } });
    }
  };

  const handleQuickBook = (type, data) => {
    // Handle quick booking actions
    console.log(`Quick booking ${type}`, data);
    navigate(`/booking/${type}`, { state: { bookingData: data } });
  };

  if (loading) {
    return (
      <div className="home-loading">
        <div className="loading-spinner"></div>
        <p>Loading amazing travel experiences...</p>
      </div>
    );
  }

  return (
    <div className="home-page">
      <HeroSection user={user} />
      
      <section className="search-section">
        <div className="container">
          <div className="search-tabs">
            <button 
              className={`tab ${activeTab === 'flights' ? 'active' : ''}`}
              onClick={() => setActiveTab('flights')}
            >
              <i className="fas fa-plane"></i> Flights
            </button>
            <button 
              className={`tab ${activeTab === 'hotels' ? 'active' : ''}`}
              onClick={() => setActiveTab('hotels')}
            >
              <i className="fas fa-hotel"></i> Hotels
            </button>
            <button 
              className={`tab ${activeTab === 'trains' ? 'active' : ''}`}
              onClick={() => setActiveTab('trains')}
            >
              <i className="fas fa-train"></i> Trains
            </button>
            <button 
              className={`tab ${activeTab === 'buses' ? 'active' : ''}`}
              onClick={() => setActiveTab('buses')}
            >
              <i className="fas fa-bus"></i> Buses
            </button>
          </div>
          
          <SearchWidget 
            type={activeTab} 
            onSearch={handleSearch} 
            className="home-search-widget"
          />
        </div>
      </section>

      <QuickBook onQuickBook={handleQuickBook} />
      
      <FeaturedDestinations 
        destinations={featuredDestinations} 
        onDestinationClick={(destination) => navigate(`/destinations/${destination.id}`)}
      />
      
      <TrendingOffers 
        offers={trendingOffers} 
        onOfferClick={(offer) => navigate(`/booking/${offer.type}/${offer.id}`)}
      />
      
      <PromoBanner />
      
      <DestinationInspiration 
        onInspirationSelect={(destination) => navigate(`/destinations/${destination.id}`)}
      />
      
      <Testimonials />
      
      <AppDownload />
    </div>
  );
};

export default Home;