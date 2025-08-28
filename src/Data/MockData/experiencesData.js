// src/data/mockData/experiencesData.js

/**
 * Advanced Experiences Data for Travel Booking Platform
 * Contains curated travel experiences with detailed information
 */

// Utility function to generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// Categories for experiences
export const EXPERIENCE_CATEGORIES = {
  ADVENTURE: 'Adventure',
  CULTURAL: 'Cultural',
  FOOD: 'Food & Drink',
  NATURE: 'Nature & Wildlife',
  WELLNESS: 'Wellness & Retreat',
  URBAN: 'Urban Exploration',
  WATER: 'Water Activities',
  LUXURY: 'Luxury Experiences',
  FAMILY: 'Family Friendly',
  ROMANTIC: 'Romantic Getaways'
};

// Experience difficulty levels
export const DIFFICULTY_LEVELS = {
  EASY: 'Easy',
  MODERATE: 'Moderate',
  CHALLENGING: 'Challenging'
};

// Duration types
export const DURATION_TYPES = {
  HOURS: 'hours',
  DAYS: 'days',
  MULTIDAY: 'multi-day'
};

// Sample locations
export const LOCATIONS = {
  PARIS: { city: 'Paris', country: 'France', continent: 'Europe' },
  BALI: { city: 'Bali', country: 'Indonesia', continent: 'Asia' },
  KYOTO: { city: 'Kyoto', country: 'Japan', continent: 'Asia' },
  ROME: { city: 'Rome', country: 'Italy', continent: 'Europe' },
  NYC: { city: 'New York', country: 'USA', continent: 'North America' },
  COSTA_RICA: { city: 'Manuel Antonio', country: 'Costa Rica', continent: 'Central America' },
  QUEENSTOWN: { city: 'Queenstown', country: 'New Zealand', continent: 'Oceania' },
  CAPE_TOWN: { city: 'Cape Town', country: 'South Africa', continent: 'Africa' },
  SANTORINI: { city: 'Santorini', country: 'Greece', continent: 'Europe' },
  MACHU_PICCHU: { city: 'Aguas Calientes', country: 'Peru', continent: 'South America' }
};

// Sample hosts data
export const HOSTS = [
  {
    id: 'host_1',
    name: 'Marco Rossi',
    rating: 4.9,
    reviews: 287,
    verified: true,
    languages: ['English', 'Italian', 'French'],
    specialty: 'Food & History',
    yearsHosting: 5,
    avatar: 'https://example.com/avatars/marco.jpg'
  },
  {
    id: 'host_2',
    name: 'Aisha Patel',
    rating: 4.95,
    reviews: 412,
    verified: true,
    languages: ['English', 'Hindi', 'Spanish'],
    specialty: 'Cultural Immersion',
    yearsHosting: 7,
    avatar: 'https://example.com/avatars/aisha.jpg'
  },
  {
    id: 'host_3',
    name: 'Luca Bianchi',
    rating: 4.87,
    reviews: 156,
    verified: true,
    languages: ['English', 'Italian'],
    specialty: 'Adventure Sports',
    yearsHosting: 3,
    avatar: 'https://example.com/avatars/luca.jpg'
  },
  {
    id: 'host_4',
    name: 'Sophie Laurent',
    rating: 4.92,
    reviews: 324,
    verified: true,
    languages: ['English', 'French', 'Spanish'],
    specialty: 'Art & Architecture',
    yearsHosting: 6,
    avatar: 'https://example.com/avatars/sophie.jpg'
  }
];

// Main experiences data
export const EXPERIENCES_DATA = [
  {
    id: generateId(),
    title: 'Authentic Parisian Food Tour',
    description: 'Discover hidden culinary gems in Paris with a local food expert. Taste authentic French pastries, cheeses, and wines while learning about the city\'s rich food history.',
    category: EXPERIENCE_CATEGORIES.FOOD,
    location: LOCATIONS.PARIS,
    duration: { value: 4, type: DURATION_TYPES.HOURS },
    difficulty: DIFFICULTY_LEVELS.EASY,
    price: 89,
    currency: 'EUR',
    rating: 4.8,
    reviewCount: 342,
    host: HOSTS[0],
    images: [
      'https://example.com/images/paris_food_1.jpg',
      'https://example.com/images/paris_food_2.jpg',
      'https://example.com/images/paris_food_3.jpg'
    ],
    included: [
      '6 food tastings at local establishments',
      'Expert local guide',
      'Small group (max 8 people)',
      'Recipe booklet to take home'
    ],
    requirements: [
      'Comfortable walking shoes',
      'Dietary restrictions must be communicated in advance'
    ],
    languages: ['English', 'French'],
    groupSize: { min: 2, max: 8 },
    availability: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
    meetingPoint: 'In front of Saint-Germain-des-Prés Church',
    seasonality: 'Year-round',
    instantBook: true,
    featured: true,
    tags: ['food', 'wine', 'culture', 'walking tour']
  },
  {
    id: generateId(),
    title: 'Bali Sacred Waterfall Adventure',
    description: 'Embark on a spiritual journey through Bali\'s most beautiful waterfalls. Experience traditional purification rituals and swim in pristine natural pools surrounded by jungle.',
    category: EXPERIENCE_CATEGORIES.ADVENTURE,
    location: LOCATIONS.BALI,
    duration: { value: 2, type: DURATION_TYPES.DAYS },
    difficulty: DIFFICULTY_LEVELS.MODERATE,
    price: 145,
    currency: 'USD',
    rating: 4.9,
    reviewCount: 518,
    host: HOSTS[1],
    images: [
      'https://example.com/images/bali_waterfall_1.jpg',
      'https://example.com/images/bali_waterfall_2.jpg',
      'https://example.com/images/bali_waterfall_3.jpg'
    ],
    included: [
      'Transportation from Ubud',
      'Expert local guide',
      'Traditional Balinese lunch',
      'Purification ceremony offerings'
    ],
    requirements: [
      'Moderate fitness level',
      'Swimwear and change of clothes',
      'Water shoes recommended'
    ],
    languages: ['English', 'Indonesian'],
    groupSize: { min: 4, max: 12 },
    availability: ['Tuesday', 'Thursday', 'Saturday', 'Sunday'],
    meetingPoint: 'Ubud Central Market',
    seasonality: 'April to October',
    instantBook: true,
    featured: true,
    tags: ['waterfalls', 'adventure', 'spiritual', 'nature']
  },
  {
    id: generateId(),
    title: 'Japanese Tea Ceremony in Kyoto',
    description: 'Immerse yourself in the ancient art of the Japanese tea ceremony. Learn about Zen philosophy, traditional rituals, and the cultural significance of matcha in a historic tea house.',
    category: EXPERIENCE_CATEGORIES.CULTURAL,
    location: LOCATIONS.KYOTO,
    duration: { value: 2, type: DURATION_TYPES.HOURS },
    difficulty: DIFFICULTY_LEVELS.EASY,
    price: 65,
    currency: 'USD',
    rating: 4.95,
    reviewCount: 287,
    host: {
      id: 'host_5',
      name: 'Yuki Tanaka',
      rating: 4.97,
      reviews: 203,
      verified: true,
      languages: ['English', 'Japanese'],
      specialty: 'Traditional Japanese Arts',
      yearsHosting: 8,
      avatar: 'https://example.com/avatars/yuki.jpg'
    },
    images: [
      'https://example.com/images/kyoto_tea_1.jpg',
      'https://example.com/images/kyoto_tea_2.jpg',
      'https://example.com/images/kyoto_tea_3.jpg'
    ],
    included: [
      'Traditional tea ceremony demonstration',
      'Hands-on experience preparing matcha',
      'Traditional Japanese sweets',
      'Explanation of tea ceremony philosophy'
    ],
    requirements: [
      'Respectful attire (knees and shoulders covered)',
      'Socks recommended as shoes are removed'
    ],
    languages: ['English', 'Japanese'],
    groupSize: { min: 1, max: 6 },
    availability: ['Daily'],
    meetingPoint: 'Gion District Tea House',
    seasonality: 'Year-round',
    instantBook: false,
    featured: true,
    tags: ['cultural', 'traditional', 'tea', 'zen']
  },
  {
    id: generateId(),
    title: 'Costa Rica Wildlife Night Walk',
    description: 'Explore the mysterious world of tropical rainforest wildlife after dark. With expert guides and specialized equipment, discover nocturnal animals rarely seen during the day.',
    category: EXPERIENCE_CATEGORIES.NATURE,
    location: LOCATIONS.COSTA_RICA,
    duration: { value: 3, type: DURATION_TYPES.HOURS },
    difficulty: DIFFICULTY_LEVELS.EASY,
    price: 55,
    currency: 'USD',
    rating: 4.7,
    reviewCount: 194,
    host: {
      id: 'host_6',
      name: 'Carlos Mendez',
      rating: 4.8,
      reviews: 156,
      verified: true,
      languages: ['English', 'Spanish'],
      specialty: 'Rainforest Ecology',
      yearsHosting: 4,
      avatar: 'https://example.com/avatars/carlos.jpg'
    },
    images: [
      'https://example.com/images/costa_rica_night_1.jpg',
      'https://example.com/images/costa_rica_night_2.jpg',
      'https://example.com/images/costa_rica_night_3.jpg'
    ],
    included: [
      'Expert bilingual naturalist guide',
      'Specialized night vision equipment',
      'Refreshments',
      'Rain poncho if needed'
    ],
    requirements: [
      'Closed-toe shoes',
      'Insect repellent',
      'Dark clothing recommended'
    ],
    languages: ['English', 'Spanish'],
    groupSize: { min: 2, max: 10 },
    availability: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
    meetingPoint: 'Manuel Antonio National Park Entrance',
    seasonality: 'Year-round (best December-April)',
    instantBook: true,
    featured: false,
    tags: ['wildlife', 'night tour', 'rainforest', 'nature']
  },
  {
    id: generateId(),
    title: 'New Zealand Bungee Jumping Experience',
    description: 'Take the plunge at the world\'s first commercial bungee jump site. Experience an adrenaline rush like no other with stunning views of Queenstown\'s landscapes.',
    category: EXPERIENCE_CATEGORIES.ADVENTURE,
    location: LOCATIONS.QUEENSTOWN,
    duration: { value: 2, type: DURATION_TYPES.HOURS },
    difficulty: DIFFICULTY_LEVELS.CHALLENGING,
    price: 195,
    currency: 'NZD',
    rating: 4.85,
    reviewCount: 762,
    host: HOSTS[2],
    images: [
      'https://example.com/images/nz_bungee_1.jpg',
      'https://example.com/images/nz_bungee_2.jpg',
      'https://example.com/images/nz_bungee_3.jpg'
    ],
    included: [
      'Professional bungee jump',
      'All safety equipment',
      'Certificate of achievement',
      'Digital photos of your jump'
    ],
    requirements: [
      'Minimum age: 10 years',
      'Weight between 35-125kg',
      'Medical conditions must be disclosed'
    ],
    languages: ['English'],
    groupSize: { min: 1, max: 15 },
    availability: ['Daily'],
    meetingPoint: 'Kawarau Bridge Bungee Centre',
    seasonality: 'Year-round (weather dependent)',
    instantBook: true,
    featured: true,
    tags: ['adventure', 'extreme sports', 'thrill-seeking', 'bungee']
  },
  {
    id: generateId(),
    title: 'Santorini Sunset Wine Tasting',
    description: 'Enjoy a premium wine tasting experience as you watch the famous Santorini sunset over the caldera. Sample exceptional local wines paired with gourmet bites.',
    category: EXPERIENCE_CATEGORIES.LUXURY,
    location: LOCATIONS.SANTORINI,
    duration: { value: 2.5, type: DURATION_TYPES.HOURS },
    difficulty: DIFFICULTY_LEVELS.EASY,
    price: 120,
    currency: 'EUR',
    rating: 4.9,
    reviewCount: 423,
    host: {
      id: 'host_7',
      name: 'Elena Papadopoulos',
      rating: 4.93,
      reviews: 287,
      verified: true,
      languages: ['English', 'Greek', 'French'],
      specialty: 'Wine Tourism',
      yearsHosting: 6,
      avatar: 'https://example.com/avatars/elena.jpg'
    },
    images: [
      'https://example.com/images/santorini_wine_1.jpg',
      'https://example.com/images/santorini_wine_2.jpg',
      'https://example.com/images/santorini_wine_3.jpg'
    ],
    included: [
      'Tasting of 5 premium Santorini wines',
      'Gourmet food pairings',
      'Expert sommelier guidance',
      'Sunset viewing from premium location'
    ],
    requirements: [
      'Minimum age: 18 years',
      'Booking at least 48 hours in advance recommended'
    ],
    languages: ['English', 'Greek'],
    groupSize: { min: 2, max: 12 },
    availability: ['Daily'],
    meetingPoint: 'Oia Village Main Square',
    seasonality: 'April to October',
    instantBook: false,
    featured: true,
    tags: ['wine', 'sunset', 'luxury', 'gourmet']
  }
];

// Utility functions for filtering and sorting experiences
export const filterExperiences = (filters = {}) => {
  let results = [...EXPERIENCES_DATA];
  
  // Category filter
  if (filters.category) {
    results = results.filter(exp => exp.category === filters.category);
  }
  
  // Price range filter
  if (filters.minPrice || filters.maxPrice) {
    results = results.filter(exp => {
      const price = exp.price;
      return (
        (!filters.minPrice || price >= filters.minPrice) &&
        (!filters.maxPrice || price <= filters.maxPrice)
      );
    });
  }
  
  // Rating filter
  if (filters.minRating) {
    results = results.filter(exp => exp.rating >= filters.minRating);
  }
  
  // Location filter
  if (filters.location) {
    results = results.filter(exp => 
      exp.location.city.toLowerCase().includes(filters.location.toLowerCase()) ||
      exp.location.country.toLowerCase().includes(filters.location.toLowerCase())
    );
  }
  
  // Duration filter
  if (filters.duration) {
    results = results.filter(exp => {
      if (filters.duration === 'half-day') return exp.duration.type === 'hours' && exp.duration.value <= 4;
      if (filters.duration === 'full-day') return exp.duration.type === 'hours' && exp.duration.value > 4;
      if (filters.duration === 'multi-day') return exp.duration.type === 'days' || exp.duration.type === 'multi-day';
      return true;
    });
  }
  
  // Difficulty filter
  if (filters.difficulty) {
    results = results.filter(exp => exp.difficulty === filters.difficulty);
  }
  
  return results;
};

export const sortExperiences = (experiences, sortBy = 'featured') => {
  const sorted = [...experiences];
  
  switch(sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'reviews':
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    case 'duration':
      return sorted.sort((a, b) => {
        const aDuration = a.duration.type === 'days' ? a.duration.value * 24 : a.duration.value;
        const bDuration = b.duration.type === 'days' ? b.duration.value * 24 : b.duration.value;
        return aDuration - bDuration;
      });
    default: // featured
      return sorted.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.rating - a.rating;
      });
  }
};

// Get featured experiences
export const getFeaturedExperiences = () => {
  return EXPERIENCES_DATA.filter(exp => exp.featured);
};

// Get experiences by category
export const getExperiencesByCategory = (category) => {
  return EXPERIENCES_DATA.filter(exp => exp.category === category);
};

// Get experiences by location
export const getExperiencesByLocation = (location) => {
  return EXPERIENCES_DATA.filter(exp => 
    exp.location.city === location.city && exp.location.country === location.country
  );
};

// Get experience by ID
export const getExperienceById = (id) => {
  return EXPERIENCES_DATA.find(exp => exp.id === id);
};

// Get similar experiences
export const getSimilarExperiences = (experienceId, limit = 3) => {
  const currentExp = getExperienceById(experienceId);
  if (!currentExp) return [];
  
  return EXPERIENCES_DATA
    .filter(exp => 
      exp.id !== experienceId && 
      (exp.category === currentExp.category || 
       exp.location.country === currentExp.location.country)
    )
    .slice(0, limit);
};

export default EXPERIENCES_DATA;