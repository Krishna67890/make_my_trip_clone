// Components
import Header from "./components/common/Header/Header.jsx";
import Footer from "./components/common/Footer/Footer.jsx";
import MainLayout from "./components/common/Layout/MainLayout.jsx";
import AuthLayout from "./components/common/Layout/AuthLayout.jsx";

// Contexts
import { UserProvider } from "./Context/UserContext.jsx";
import { SearchProvider } from "./Context/SearchContext.jsx";
import { BookingProvider } from "./Context/BookingContext.jsx";
import { CartProvider } from "./Context/CartContext.jsx";

// Pages
import Home from "./pages/Home/Home.jsx";
import FlightResults from "./pages/Search/FlightResults.jsx";
import HotelResults from "./pages/Search/HotelResults.jsx";
import TrainResults from "./pages/Search/TrainResults.jsx";
import BusResults from "./pages/Search/BusResults.jsx";
import TourResults from "./pages/Search/TourResults.jsx";

import FlightBooking from "./pages/Booking/FlightBooking.jsx";
import HotelBooking from "./pages/Booking/HotelBooking.jsx";
import TrainBooking from "./pages/Booking/TrainBooking.jsx";
import BusBooking from "./pages/Booking/BusBooking.jsx";
import TourBooking from "./pages/Booking/TourBooking.jsx";

import CityGuide from "./pages/Destinations/CityGuide.jsx";
import PlaceDetails from "./pages/Destinations/PlaceDetails.jsx";
import Attractions from "./pages/Destinations/Attractions.jsx";
import LocalExperiences from "./pages/Destinations/LocalExperiences.jsx";
import TravelTips from "./pages/Destinations/TravelTips.jsx";

import UpcomingTrips from "./pages/MyTrips/UpcomingTrips.jsx";
import PastTrips from "./pages/MyTrips/PastTrips.jsx";
import SavedItems from "./pages/MyTrips/SavedItems.jsx";
import Wallet from "./pages/MyTrips/Wallet.jsx";

import About from "./pages/Info/About.jsx";
import Contact from "./pages/Info/Contact.jsx";
import FAQ from "./pages/Info/FAQ.jsx";
import Terms from "./pages/Info/Terms.jsx";
import Privacy from "./pages/Info/Privacy.jsx";

import NotFound from "./pages/NotFound/NotFound.jsx";


const Main = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Simulate app initialization
    const initializeApp = async () => {
      try {
        // Load necessary data, user session, etc.
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error('App initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location]);

  if (loading) {
    return (
      <div className="app-loading">
        <div className="app-loader">
          <div className="plane-loader">
            <i className="fas fa-plane"></i>
          </div>
          <h2>TravelEase</h2>
          <p>Preparing your travel experience...</p>
        </div>
      </div>
    );
  }

  return (
    <UserProvider>
      <SearchProvider>
        <BookingProvider>
          <CartProvider>
            <div className="main-app">
              <Header />
              <main className="main-content">
                <Routes>
                  {/* Public routes with main layout */}
                  <Route path="/" element={<MainLayout><Home /></MainLayout>} />
                  
                  {/* Search routes */}
                  <Route path="/search/flights" element={<MainLayout><FlightResults /></MainLayout>} />
                  <Route path="/search/hotels" element={<MainLayout><HotelResults /></MainLayout>} />
                  <Route path="/search/trains" element={<MainLayout><TrainResults /></MainLayout>} />
                  <Route path="/search/buses" element={<MainLayout><BusResults /></MainLayout>} />
                  <Route path="/search/tours" element={<MainLayout><TourResults /></MainLayout>} />
                  
                  {/* Booking routes */}
                  <Route path="/booking/flights" element={<MainLayout><FlightBooking /></MainLayout>} />
                  <Route path="/booking/hotels" element={<MainLayout><HotelBooking /></MainLayout>} />
                  <Route path="/booking/trains" element={<MainLayout><TrainBooking /></MainLayout>} />
                  <Route path="/booking/buses" element={<MainLayout><BusBooking /></MainLayout>} />
                  <Route path="/booking/tours" element={<MainLayout><TourBooking /></MainLayout>} />
                  
                  {/* Destinations routes */}
                  <Route path="/destinations" element={<MainLayout><CityGuide /></MainLayout>} />
                  <Route path="/destinations/:id" element={<MainLayout><PlaceDetails /></MainLayout>} />
                  <Route path="/attractions" element={<MainLayout><Attractions /></MainLayout>} />
                  <Route path="/experiences" element={<MainLayout><LocalExperiences /></MainLayout>} />
                  <Route path="/travel-tips" element={<MainLayout><TravelTips /></MainLayout>} />
                  
                  {/* My Trips routes (protected) */}
                  <Route path="/my-trips" element={<MainLayout><UpcomingTrips /></MainLayout>} />
                  <Route path="/my-trips/upcoming" element={<MainLayout><UpcomingTrips /></MainLayout>} />
                  <Route path="/my-trips/past" element={<MainLayout><PastTrips /></MainLayout>} />
                  <Route path="/my-trips/saved" element={<MainLayout><SavedItems /></MainLayout>} />
                  <Route path="/my-trips/wallet" element={<MainLayout><Wallet /></MainLayout>} />
                  
                  {/* Info routes */}
                  <Route path="/about" element={<MainLayout><About /></MainLayout>} />
                  <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
                  <Route path="/faq" element={<MainLayout><FAQ /></MainLayout>} />
                  <Route path="/terms" element={<MainLayout><Terms /></MainLayout>} />
                  <Route path="/privacy" element={<MainLayout><Privacy /></MainLayout>} />
                  
                  {/* Auth routes with different layout */}
                  <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
                  <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
                  
                  {/* 404 page */}
                  <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
                </Routes>
              </main>
              <Footer />
            </div>
          </CartProvider>
        </BookingProvider>
      </SearchProvider>
    </UserProvider>
  );
};

// Placeholder components for auth routes
const Login = () => <div>Login Page</div>;
const Register = () => <div>Register Page</div>;

export default Main;