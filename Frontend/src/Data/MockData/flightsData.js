// data/mockData/flightsData.js
export const flightsData = [
  {
    id: "FL-001",
    airline: "IndiGo",
    flightNo: "6E-123",
    from: "DEL", to: "BOM",
    departure: "2024-08-24T08:00:00",
    arrival: "2024-08-24T10:30:00",
    duration: "2h 30m",
    price: 3499,
    seats: { economy: 120, business: 24 },
    amenities: ["WiFi", "Meal", "Entertainment"],
    aircraft: "A320neo"
  }
];

// data/mockData/trainsData.js  
export const trainsData = [
  {
    id: "TR-001",
    name: "Rajdhani Express",
    number: "12301",
    from: "NDLS", to: "BCT",
    departure: "16:00", arrival: "08:00",
    duration: "16h",
    classes: ["1A", "2A", "3A", "SL"],
    availability: { "1A": 10, "2A": 24, "3A": 45, "SL": 120 },
    amenities: ["Bedding", "Meal", "Charging"]
  }
];