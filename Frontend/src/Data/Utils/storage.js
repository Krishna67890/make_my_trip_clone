// utils/storage.js
export const saveBooking = (booking) => {
  const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  bookings.push(booking);
  localStorage.setItem('bookings', JSON.stringify(bookings));
};

export const getBookings = () => {
  return JSON.parse(localStorage.getItem('bookings') || '[]');
};