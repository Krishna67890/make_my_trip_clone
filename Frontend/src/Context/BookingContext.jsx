import React, { createContext, useContext, useReducer } from 'react';

// Create the context
const BookingContext = createContext();

// Initial state
const initialState = {
  bookings: [],
  currentBooking: null,
  bookingStep: 1, // Step in the booking process
  passengerInfo: {},
  paymentInfo: {}
};

// Action types
const actionTypes = {
  SET_CURRENT_BOOKING: 'SET_CURRENT_BOOKING',
  ADD_BOOKING: 'ADD_BOOKING',
  UPDATE_BOOKING_STEP: 'UPDATE_BOOKING_STEP',
  SET_PASSENGER_INFO: 'SET_PASSENGER_INFO',
  SET_PAYMENT_INFO: 'SET_PAYMENT_INFO',
  RESET_BOOKING: 'RESET_BOOKING',
  REMOVE_BOOKING: 'REMOVE_BOOKING'
};

// Reducer function
const bookingReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_BOOKING:
      return {
        ...state,
        currentBooking: action.payload
      };
    
    case actionTypes.ADD_BOOKING:
      return {
        ...state,
        bookings: [...state.bookings, action.payload]
      };
    
    case actionTypes.UPDATE_BOOKING_STEP:
      return {
        ...state,
        bookingStep: action.payload
      };
    
    case actionTypes.SET_PASSENGER_INFO:
      return {
        ...state,
        passengerInfo: {
          ...state.passengerInfo,
          ...action.payload
        }
      };
    
    case actionTypes.SET_PAYMENT_INFO:
      return {
        ...state,
        paymentInfo: {
          ...state.paymentInfo,
          ...action.payload
        }
      };
    
    case actionTypes.RESET_BOOKING:
      return {
        ...initialState
      };
    
    case actionTypes.REMOVE_BOOKING:
      return {
        ...state,
        bookings: state.bookings.filter(booking => booking.id !== action.payload)
      };
    
    default:
      return state;
  }
};

// Provider component
export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  // Actions
  const setCurrentBooking = (booking) => {
    dispatch({ type: actionTypes.SET_CURRENT_BOOKING, payload: booking });
  };

  const addBooking = (booking) => {
    dispatch({ type: actionTypes.ADD_BOOKING, payload: booking });
  };

  const updateBookingStep = (step) => {
    dispatch({ type: actionTypes.UPDATE_BOOKING_STEP, payload: step });
  };

  const setPassengerInfo = (info) => {
    dispatch({ type: actionTypes.SET_PASSENGER_INFO, payload: info });
  };

  const setPaymentInfo = (info) => {
    dispatch({ type: actionTypes.SET_PAYMENT_INFO, payload: info });
  };

  const resetBooking = () => {
    dispatch({ type: actionTypes.RESET_BOOKING });
  };

  const removeBooking = (id) => {
    dispatch({ type: actionTypes.REMOVE_BOOKING, payload: id });
  };

  const bookMultiCity = (bookings) => {
    const trip = {
      id: generateId(),
      type: 'multi-city',
      bookings,
      totalPrice: bookings.reduce((sum, b) => sum + b.price, 0),
      status: 'confirmed'
    };
    addBooking(trip);
  };

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const value = {
    ...state,
    setCurrentBooking,
    addBooking,
    updateBookingStep,
    setPassengerInfo,
    setPaymentInfo,
    resetBooking,
    removeBooking,
    bookMultiCity
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

// Custom hook to use the booking context
export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};