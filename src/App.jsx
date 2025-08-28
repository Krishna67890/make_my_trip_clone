// App.jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Context Providers
import { SearchProvider } from './Contexts/SearchContext';
import { BookingProvider } from './Contexts/BookingContext';
import { UserProvider } from './Contexts/UserContext';
import { FilterProvider } from './Contexts/FilterContext';
import { CartProvider } from './Contexts/CartContext';

// Layouts
import MainLayout from 'src/components/common/layout/MainLayout.jsx';

import AuthLayout from 'src/Components/Common/Layout/AuthLayout';

// UI
import Loader from 'src/Components/Common/UI/Loader';

// Global Styles
import './Styles/Globals.css';
import './Styles/utils/animations.css';
import './Styles/utils/responsive.css';
import './Styles/utils/variables.css';

// Lazy-loaded pages (ensure default exports in these files)
const Home = lazy(() => import('src/Pages/Home/Home'));
const FlightResults = lazy(() => import('src/Pages/Search/FlightResults'));
const HotelResults = lazy(() => import('src/Pages/Search/HotelResults'));
const TrainResults = lazy(() => import('src/Pages/Search/TrainResults'));
const BusResults = lazy(() => import('src/Pages/Search/BusResults'));
const TourResults = lazy(() => import('src/Pages/Search/TourResults'));

const FlightBooking = lazy(() => import('src/Pages/Booking/FlightBooking'));
const HotelBooking = lazy(() => import('src/Pages/Booking/HotelBooking'));
const TrainBooking = lazy(() => import('src/Pages/Booking/TrainBooking'));
const BusBooking = lazy(() => import('src/Pages/Booking/BusBooking'));
const TourBooking = lazy(() => import('src/Pages/Booking/TourBooking'));

const CityGuide = lazy(() => import('src/Pages/Destinations/CityGuide'));
const PlaceDetails = lazy(() => import('src/Pages/Destinations/PlaceDetails'));

const UpcomingTrips = lazy(() => import('src/Pages/MyTrips/UpcomingTrips'));
const PastTrips = lazy(() => import('src/Pages/MyTrips/PastTrips'));
const SavedItems = lazy(() => import('src/Pages/MyTrips/SavedItems'));
const Wallet = lazy(() => import('src/Pages/MyTrips/Wallet'));

const About = lazy(() => import('src/Pages/Info/About'));
const Contact = lazy(() => import('src/Pages/Info/Contact'));
const FAQ = lazy(() => import('src/Pages/Info/FAQ'));
const Terms = lazy(() => import('src/Pages/Info/Terms'));
const Privacy = lazy(() => import('src/Pages/Info/Privacy'));


function App() {
  return (
    <Router>
      <UserProvider>
        <CartProvider>
          <SearchProvider>
            <FilterProvider>
              <BookingProvider>
                <div className="app">
                  <Routes>
                    {/* Public routes with main layout */}
                    <Route path="/" element={<MainLayout />}>
                      <Route index element={
                        <Suspense fallback={<Loader />}>
                          <Home />
                        </Suspense>
                      } />
                      <Route path="flights" element={
                        <Suspense fallback={<Loader />}>
                          <FlightResults />
                        </Suspense>
                      } />
                      <Route path="hotels" element={
                        <Suspense fallback={<Loader />}>
                          <HotelResults />
                        </Suspense>
                      } />
                      <Route path="trains" element={
                        <Suspense fallback={<Loader />}>
                          <TrainResults />
                        </Suspense>
                      } />
                      <Route path="buses" element={
                        <Suspense fallback={<Loader />}>
                          <BusResults />
                        </Suspense>
                      } />
                      <Route path="tours" element={
                        <Suspense fallback={<Loader />}>
                          <TourResults />
                        </Suspense>
                      } />
                      <Route path="destinations" element={
                        <Suspense fallback={<Loader />}>
                          <CityGuide />
                        </Suspense>
                      } />
                      <Route path="destination/:id" element={
                        <Suspense fallback={<Loader />}>
                          <PlaceDetails />
                        </Suspense>
                      } />
                      <Route path="about" element={
                        <Suspense fallback={<Loader />}>
                          <About />
                        </Suspense>
                      } />
                      <Route path="contact" element={
                        <Suspense fallback={<Loader />}>
                          <Contact />
                        </Suspense>
                      } />
                      <Route path="faq" element={
                        <Suspense fallback={<Loader />}>
                          <FAQ />
                        </Suspense>
                      } />
                      <Route path="terms" element={
                        <Suspense fallback={<Loader />}>
                          <Terms />
                        </Suspense>
                      } />
                      <Route path="privacy" element={
                        <Suspense fallback={<Loader />}>
                          <Privacy />
                        </Suspense>
                      } />
                    </Route>

                    {/* Booking routes with main layout but different styling */}
                    <Route path="/booking" element={<MainLayout hideSearch={true} />}>
                      <Route path="flight/:id" element={
                        <Suspense fallback={<Loader />}>
                          <FlightBooking />
                        </Suspense>
                      } />
                      <Route path="hotel/:id" element={
                        <Suspense fallback={<Loader />}>
                          <HotelBooking />
                        </Suspense>
                      } />
                      <Route path="train/:id" element={
                        <Suspense fallback={<Loader />}>
                          <TrainBooking />
                        </Suspense>
                      } />
                      <Route path="bus/:id" element={
                        <Suspense fallback={<Loader />}>
                          <BusBooking />
                        </Suspense>
                      } />
                      <Route path="tour/:id" element={
                        <Suspense fallback={<Loader />}>
                          <TourBooking />
                        </Suspense>
                      } />
                    </Route>

                    {/* My Trips routes */}
                    <Route path="/my-trips" element={<MainLayout />}>
                      <Route path="upcoming" element={
                        <Suspense fallback={<Loader />}>
                          <UpcomingTrips />
                        </Suspense>
                      } />
                      <Route path="past" element={
                        <Suspense fallback={<Loader />}>
                          <PastTrips />
                        </Suspense>
                      } />
                      <Route path="saved" element={
                        <Suspense fallback={<Loader />}>
                          <SavedItems />
                        </Suspense>
                      } />
                      <Route path="wallet" element={
                        <Suspense fallback={<Loader />}>
                          <Wallet />
                        </Suspense>
                      } />
                    </Route>

                    {/* Auth routes with different layout */}
                    <Route path="/auth" element={<AuthLayout />}>
                      {/* Auth routes would be added here */}
                    </Route>
                  </Routes>
                </div>
              </BookingProvider>
            </FilterProvider>
          </SearchProvider>
        </CartProvider>
      </UserProvider>
    </Router>
  );
}

export default App;