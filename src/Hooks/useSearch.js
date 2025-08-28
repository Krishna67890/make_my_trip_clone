// hooks/useSearch.js
export const useSearch = () => {
  const searchFlights = (filters) => {
    return flightsData.filter(flight => 
      flight.from === filters.source &&
      flight.to === filters.destination &&
      new Date(flight.departure).toDateString() === new Date(filters.date).toDateString() &&
      flight.price >= filters.minPrice &&
      flight.price <= filters.maxPrice
    );
  };
  // Similar for hotels, trains, buses
};