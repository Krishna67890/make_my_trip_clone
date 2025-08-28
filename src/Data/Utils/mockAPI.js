// src/utils/mockAPI.js
// Mock API functions for user authentication and profile management

// Simulated user database
const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    phone: '+1234567890',
    dateOfBirth: '1990-01-01',
    passportNumber: 'A12345678',
    loyaltyPoints: 1250,
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    phone: '+0987654321',
    dateOfBirth: '1985-05-15',
    passportNumber: 'B87654321',
    loyaltyPoints: 850,
  },
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
export const mockAPI = {
  // Login simulation
  login: async (email, password) => {
    await delay(1000); // Simulate network delay
    
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      // Remove password from returned user object
      const { password: _, ...userWithoutPassword } = user;
      return {
        success: true,
        user: userWithoutPassword,
        token: `mock-jwt-token-${user.id}-${Date.now()}`,
      };
    }
    
    return {
      success: false,
      message: 'Invalid email or password',
    };
  },

  // Registration simulation
  register: async (userData) => {
    await delay(1000); // Simulate network delay
    
    const existingUser = mockUsers.find(u => u.email === userData.email);
    
    if (existingUser) {
      return {
        success: false,
        message: 'User already exists with this email',
      };
    }
    
    const newUser = {
      id: mockUsers.length + 1,
      ...userData,
      loyaltyPoints: 100, // Starting bonus
    };
    
    mockUsers.push(newUser);
    
    // Remove password from returned user object
    const { password: _, ...userWithoutPassword } = newUser;
    
    return {
      success: true,
      user: userWithoutPassword,
      token: `mock-jwt-token-${newUser.id}-${Date.now()}`,
    };
  },

  // Token verification simulation
  verifyToken: async (token) => {
    await delay(500); // Simulate network delay
    
    // Simple token validation
    return typeof token === 'string' && token.startsWith('mock-jwt-token');
  },

  // Profile update simulation
  updateProfile: async (userId, updates, token) => {
    await delay(800); // Simulate network delay
    
    const userIndex = mockUsers.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return {
        success: false,
        message: 'User not found',
      };
    }
    
    // Update user data
    mockUsers[userIndex] = { ...mockUsers[userIndex], ...updates };
    
    return {
      success: true,
      user: mockUsers[userIndex],
    };
  },
};

export default mockAPI;