// App.jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Context Providers
import { SearchProvider } from './Context/SearchContext';
import { BookingProvider } from './Context/BookingContext';
import { UserProvider } from './Context/UserContext';
import { CartProvider } from './Context/CartContext';

// Layouts
import MainLayout from './Components/Common/Layout/MainLayout.jsx';

import AuthLayout from './Components/Common/Layout/AuthLayout.jsx';

// UI
import Loader from './Components/common/UI/Loader.jsx';

// Global Styles
import './Styles/Globals.css';
import './Styles/Utils/animations.css';
import './Styles/Utils/responsive.css';
import './Styles/Utils/variables.css';

// Lazy-loaded pages (ensure default exports in these files)
const Home = lazy(() => import('./Pages/Home/Home.jsx'));
const FlightResults = lazy(() => import('./Pages/Search/FlightResults.jsx'));
const HotelResults = lazy(() => import('./Pages/Search/HotelResults.jsx'));
const TrainResults = lazy(() => import('./Pages/Search/TrainResults.jsx'));
const BusResults = lazy(() => import('./Pages/Search/BusResults.jsx'));
const TourResults = lazy(() => import('./Pages/Search/TourResults.jsx'));

const FlightBooking = lazy(() => import('./Pages/Booking/FlightBooking.jsx'));
const HotelBooking = lazy(() => import('./Pages/Booking/HotelBooking.jsx'));
const TrainBooking = lazy(() => import('./Pages/Booking/TrainBooking.jsx'));
const BusBooking = lazy(() => import('./Pages/Booking/BusBooking.jsx'));
const TourBooking = lazy(() => import('./Pages/Booking/TourBooking.jsx'));

const CityGuide = lazy(() => import('./Pages/Destinations/CityGuide.jsx'));
const PlaceDetails = lazy(() => import('./Pages/Destinations/PlaceDetails.jsx'));

const UpcomingTrips = lazy(() => import('./Pages/Mytrips/UpcomingTrips.jsx'));
const PastTrips = lazy(() => import('./Pages/Mytrips/PastTrips.jsx'));
const SavedItems = lazy(() => import('./Pages/Mytrips/SavedItems.jsx'));
const Wallet = lazy(() => import('./Pages/Mytrips/Wallet.jsx'));

const About = lazy(() => import('./Pages/Info/About.jsx'));
const Contact = lazy(() => import('./Pages/Info/Contact.jsx'));
const FAQ = lazy(() => import('./Pages/Info/FAQ.jsx'));
const Terms = lazy(() => import('./Pages/Info/Terms.jsx'));
const Privacy = lazy(() => import('./Pages/Info/Privacy.jsx'));
  
// Travel Guide and Tips
const TravelGuide = lazy(() => import('./Pages/TravelGuide/TravelGuide.jsx'));
const TravelTips = lazy(() => import('./Pages/TravelTips/TravelTips.jsx'));

// Advanced components
const AdvancedSearchWidget = lazy(() => import('./Components/Common/SearchWidget/AdvancedSearchWidget.jsx'));
const AdvancedBookingConfirmation = lazy(() => import('./Components/Bookings/BookingConfirmation.jsx'));
const AdvancedPaymentOptions = lazy(() => import('./Components/Bookings/PlaymentOptions.jsx'));
const AdvancedTicket = lazy(() => import('./Components/Bookings/Ticket.jsx'));
const AdvancedMyTrips = lazy(() => import('./Pages/Mytrips/UpcomingTrips.jsx'));
const AdvancedHotelSelection = lazy(() => import('./Components/Hotels/RoomSelection.jsx'));
const AdvancedBusSelection = lazy(() => import('./Components/Busses/BusSeatLayout.jsx'));
const AdvancedTourSelection = lazy(() => import('./Components/Tours/TourPakage.jsx'));
const AdvancedSeatMap = lazy(() => import('./Components/Flights/FlightSeatMap.jsx'));

function App() {
  return (
    <Router>
      <UserProvider>
        <CartProvider>
          <SearchProvider>
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
                      <Route path="travel-guide" element={
                        <Suspense fallback={<Loader />}>  
                          <TravelGuide />
                        </Suspense>
                      } />
                      <Route path="travel-tips" element={
                        <Suspense fallback={<Loader />}>  
                          <TravelTips />
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
                      <Route path="advanced" element={
                        <Suspense fallback={<Loader />}>
                          <AdvancedMyTrips />
                        </Suspense>
                      } />
                    </Route>

                    {/* Advanced component routes */}
                    <Route path="/search-advanced" element={<MainLayout />}>
                      <Route index element={
                        <Suspense fallback={<Loader />}>
                          <AdvancedSearchWidget />
                        </Suspense>
                      } />
                    </Route>
                    <Route path="/booking-confirmation-advanced" element={<MainLayout />}>
                      <Route index element={
                        <Suspense fallback={<Loader />}>
                          <AdvancedBookingConfirmation />
                        </Suspense>
                      } />
                    </Route>
                    <Route path="/payment-advanced" element={<MainLayout />}>
                      <Route index element={
                        <Suspense fallback={<Loader />}>
                          <AdvancedPaymentOptions />
                        </Suspense>
                      } />
                    </Route>
                    <Route path="/ticket-advanced" element={<MainLayout />}>
                      <Route index element={
                        <Suspense fallback={<Loader />}>
                          <AdvancedTicket />
                        </Suspense>
                      } />
                    </Route>
                    <Route path="/hotel-selection-advanced" element={<MainLayout />}>
                      <Route index element={
                        <Suspense fallback={<Loader />}>
                          <AdvancedHotelSelection />
                        </Suspense>
                      } />
                    </Route>
                    <Route path="/bus-selection-advanced" element={<MainLayout />}>
                      <Route index element={
                        <Suspense fallback={<Loader />}>
                          <AdvancedBusSelection />
                        </Suspense>
                      } />
                    </Route>
                    <Route path="/tour-selection-advanced" element={<MainLayout />}>
                      <Route index element={
                        <Suspense fallback={<Loader />}>
                          <AdvancedTourSelection />
                        </Suspense>
                      } />
                    </Route>
                    <Route path="/seat-map-advanced" element={<MainLayout />}>
                      <Route index element={
                        <Suspense fallback={<Loader />}>
                          <AdvancedSeatMap />
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
          </SearchProvider>
        </CartProvider>
      </UserProvider>
    </Router>
  );
}

export default App;