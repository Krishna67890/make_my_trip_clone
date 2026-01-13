// src/contexts/UserContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import useLocalStorage from '/src/hooks/useLocalStorage.js';

// Create a mock API since we don't have the actual mockAPI.js
const mockAPI = {
  login: async (email, password) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'john@example.com' && password === 'password123') {
      return {
        success: true,
        user: {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+1234567890',
          loyaltyPoints: 1250,
        },
        token: 'mock-jwt-token-12345',
      };
    } else if (email === 'jane@example.com' && password === 'password123') {
      return {
        success: true,
        user: {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '+0987654321',
          loyaltyPoints: 850,
        },
        token: 'mock-jwt-token-67890',
      };
    } else {
      return {
        success: false,
        message: 'Invalid email or password',
      };
    }
  },
  
  register: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      user: {
        id: Math.floor(Math.random() * 1000),
        ...userData,
        loyaltyPoints: 100,
      },
      token: `mock-jwt-token-${Math.random().toString(36).substr(2, 9)}`,
    };
  },
  
  verifyToken: async (token) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return typeof token === 'string' && token.startsWith('mock-jwt-token');
  },
  
  updateProfile: async (userId, updates, token) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      success: true,
      user: {
        id: userId,
        ...updates,
      },
    };
  },
};

// Create context
const UserContext = createContext();

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  preferences: {
    currency: 'USD',
    language: 'en',
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
    travelPreferences: {
      seatPreference: 'window',
      mealPreference: 'vegetarian',
      accessibilityNeeds: false,
    },
  },
};

// Action types
const USER_ACTION_TYPES = {
  SET_LOADING: 'SET_LOADING',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  UPDATE_USER: 'UPDATE_USER',
  UPDATE_PREFERENCES: 'UPDATE_PREFERENCES',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

// Reducer function
const userReducer = (state, action) => {
  switch (action.type) {
    case USER_ACTION_TYPES.SET_LOADING:
      if (state.isLoading === action.payload) return state;
      return {
        ...state,
        isLoading: action.payload,
      };
    
    case USER_ACTION_TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        preferences: action.payload.preferences || state.preferences,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    
    case USER_ACTION_TYPES.LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    
    case USER_ACTION_TYPES.LOGOUT:
      return {
        ...initialState,
        isLoading: false,
      };
    
    case USER_ACTION_TYPES.UPDATE_USER:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    
    case USER_ACTION_TYPES.UPDATE_PREFERENCES:
      return {
        ...state,
        preferences: {
          ...state.preferences,
          ...action.payload,
        },
      };
    
    case USER_ACTION_TYPES.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    
    default:
      return state;
  }
};

// Provider component
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [storedUser, setStoredUser, removeStoredUser] = useLocalStorage('travelApp_user', null);
  const [storedPreferences, setStoredPreferences] = useLocalStorage('travelApp_preferences', initialState.preferences);

  // Check for stored user on initial load
  useEffect(() => {
    const checkStoredUser = async () => {
      // If already authenticated, don't re-check
      if (state.isAuthenticated) return;

      if (storedUser) {
        try {
          // Verify if the stored token is still valid
          const isValid = await mockAPI.verifyToken(storedUser.token);
          
          if (isValid) {
            dispatch({
              type: USER_ACTION_TYPES.LOGIN_SUCCESS,
              payload: {
                user: storedUser,
                preferences: storedPreferences,
              },
            });
          } else {
            // Token is invalid, remove from storage
            removeStoredUser();
            dispatch({ type: USER_ACTION_TYPES.SET_LOADING, payload: false });
          }
        } catch (error) {
          removeStoredUser();
          dispatch({ type: USER_ACTION_TYPES.SET_LOADING, payload: false });
        }
      } else {
        dispatch({ type: USER_ACTION_TYPES.SET_LOADING, payload: false });
      }
    };

    checkStoredUser();
  }, [storedUser, storedPreferences, removeStoredUser, state.isAuthenticated]);

  // Login function
  const login = async (email, password) => {
    dispatch({ type: USER_ACTION_TYPES.SET_LOADING, payload: true });
    
    try {
      const response = await mockAPI.login(email, password);
      
      if (response.success) {
        const { user, token } = response;
        const userData = { ...user, token };
        
        setStoredUser(userData);
        dispatch({
          type: USER_ACTION_TYPES.LOGIN_SUCCESS,
          payload: {
            user: userData,
            preferences: storedPreferences,
          },
        });
        
        return { success: true };
      } else {
        dispatch({
          type: USER_ACTION_TYPES.LOGIN_FAILURE,
          payload: response.message || 'Login failed',
        });
        
        return { success: false, message: response.message };
      }
    } catch (error) {
      dispatch({
        type: USER_ACTION_TYPES.LOGIN_FAILURE,
        payload: error.message || 'An error occurred during login',
      });
      
      return { success: false, message: error.message };
    }
  };

  // Register function
  const register = async (userData) => {
    dispatch({ type: USER_ACTION_TYPES.SET_LOADING, payload: true });
    
    try {
      const response = await mockAPI.register(userData);
      
      if (response.success) {
        // Auto-login after successful registration
        return await login(userData.email, userData.password);
      } else {
        dispatch({
          type: USER_ACTION_TYPES.LOGIN_FAILURE,
          payload: response.message || 'Registration failed',
        });
        
        return { success: false, message: response.message };
      }
    } catch (error) {
      dispatch({
        type: USER_ACTION_TYPES.LOGIN_FAILURE,
        payload: error.message || 'An error occurred during registration',
      });
      
      return { success: false, message: error.message };
    }
  };

  // Logout function
  const logout = () => {
    removeStoredUser();
    dispatch({ type: USER_ACTION_TYPES.LOGOUT });
  };

  // Update user profile
  const updateProfile = async (updates) => {
    if (!state.isAuthenticated) {
      return { success: false, message: 'User not authenticated' };
    }
    
    try {
      const response = await mockAPI.updateProfile(state.user.id, updates, state.user.token);
      
      if (response.success) {
        const updatedUser = { ...state.user, ...updates };
        setStoredUser(updatedUser);
        
        dispatch({
          type: USER_ACTION_TYPES.UPDATE_USER,
          payload: updates,
        });
        
        return { success: true };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Update user preferences
  const updatePreferences = (newPreferences) => {
    const updatedPreferences = { ...state.preferences, ...newPreferences };
    setStoredPreferences(updatedPreferences);
    
    dispatch({
      type: USER_ACTION_TYPES.UPDATE_PREFERENCES,
      payload: newPreferences,
    });
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: USER_ACTION_TYPES.CLEAR_ERROR });
  };

  // Context value
  const value = {
    // State
    ...state,
    
    // Actions
    login,
    register,
    logout,
    updateProfile,
    updatePreferences,
    clearError,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUser = () => {
  const context = useContext(UserContext);
  
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  
  return context;
};

export default UserContext;