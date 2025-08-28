// contexts/BookingContext.jsx
const bookMultiCity = (bookings) => {
  const trip = {
    id: generateId(),
    type: 'multi-city',
    bookings,
    totalPrice: bookings.reduce((sum, b) => sum + b.price, 0),
    status: 'confirmed'
  };
  setBookings(prev => [...prev, trip]);
};