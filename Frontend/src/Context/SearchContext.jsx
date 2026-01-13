import React, { createContext, useContext, useReducer } from 'react';

// Create the context
const SearchContext = createContext();

// Initial state
const initialState = {
  searchData: null,
  recentSearches: [],
  searchHistory: [],
  filters: {
    priceRange: [0, 5000],
    rating: 0,
    amenities: [],
    roomType: '',
    location: ''
  }
};

// Action types
const actionTypes = {
  SET_SEARCH_DATA: 'SET_SEARCH_DATA',
  ADD_RECENT_SEARCH: 'ADD_RECENT_SEARCH',
  CLEAR_RECENT_SEARCHES: 'CLEAR_RECENT_SEARCHES',
  ADD_TO_HISTORY: 'ADD_TO_HISTORY',
  CLEAR_HISTORY: 'CLEAR_HISTORY',
  UPDATE_FILTERS: 'UPDATE_FILTERS',
  CLEAR_FILTERS: 'CLEAR_FILTERS',
  SET_SEARCH_PARAMS: 'SET_SEARCH_PARAMS'
};

// Reducer function
const searchReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_SEARCH_DATA:
      return {
        ...state,
        searchData: action.payload
      };

    case actionTypes.ADD_RECENT_SEARCH:
      const newRecentSearch = {
        ...action.payload,
        timestamp: new Date().toISOString()
      };
      
      // Prevent duplicates
      const existingIndex = state.recentSearches.findIndex(
        search => JSON.stringify(search) === JSON.stringify(newRecentSearch)
      );
      
      if (existingIndex >= 0) {
        // Move to front if exists
        const updatedRecent = [...state.recentSearches];
        updatedRecent.splice(existingIndex, 1);
        return {
          ...state,
          recentSearches: [newRecentSearch, ...updatedRecent].slice(0, 5) // Keep only 5 recent searches
        };
      }
      
      return {
        ...state,
        recentSearches: [newRecentSearch, ...state.recentSearches].slice(0, 5)
      };

    case actionTypes.CLEAR_RECENT_SEARCHES:
      return {
        ...state,
        recentSearches: []
      };

    case actionTypes.ADD_TO_HISTORY:
      const newHistoryItem = {
        ...action.payload,
        timestamp: new Date().toISOString()
      };
      
      // Prevent duplicates in history
      const historyExists = state.searchHistory.some(
        item => JSON.stringify(item) === JSON.stringify(newHistoryItem)
      );
      
      if (!historyExists) {
        return {
          ...state,
          searchHistory: [newHistoryItem, ...state.searchHistory].slice(0, 20) // Keep only 20 history items
        };
      }
      
      return state;

    case actionTypes.CLEAR_HISTORY:
      return {
        ...state,
        searchHistory: []
      };

    case actionTypes.UPDATE_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        }
      };

    case actionTypes.CLEAR_FILTERS:
      return {
        ...state,
        filters: initialState.filters
      };

    case actionTypes.SET_SEARCH_PARAMS:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
};

// Provider component
export const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  // Actions
  const setSearchData = (data) => {
    dispatch({ type: actionTypes.SET_SEARCH_DATA, payload: data });
    
    // Add to recent searches and history
    if (data) {
      addRecentSearch(data);
      addToHistory(data);
    }
  };

  const addRecentSearch = (search) => {
    dispatch({ type: actionTypes.ADD_RECENT_SEARCH, payload: search });
  };

  const clearRecentSearches = () => {
    dispatch({ type: actionTypes.CLEAR_RECENT_SEARCHES });
  };

  const addToHistory = (search) => {
    dispatch({ type: actionTypes.ADD_TO_HISTORY, payload: search });
  };

  const clearHistory = () => {
    dispatch({ type: actionTypes.CLEAR_HISTORY });
  };

  const updateFilters = (filters) => {
    dispatch({ type: actionTypes.UPDATE_FILTERS, payload: filters });
  };

  const clearFilters = () => {
    dispatch({ type: actionTypes.CLEAR_FILTERS });
  };

  const setSearchParams = (params) => {
    dispatch({ type: actionTypes.SET_SEARCH_PARAMS, payload: params });
  };

  const value = {
    ...state,
    setSearchData,
    addRecentSearch,
    clearRecentSearches,
    addToHistory,
    clearHistory,
    updateFilters,
    clearFilters,
    setSearchParams
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook to use the search context
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

// Helper function to get search suggestions
export const getSearchSuggestions = (query, context) => {
  if (!query) return [];
  
  const lowerQuery = query.toLowerCase();
  
  // Combine recent searches and history for suggestions
  const allSearches = [...context.recentSearches, ...context.searchHistory];
  
  // Filter based on query
  return allSearches
    .filter(item => {
      if (typeof item === 'string') {
        return item.toLowerCase().includes(lowerQuery);
      } else if (typeof item === 'object') {
        // Check various properties of search objects
        return Object.values(item).some(value => 
          String(value).toLowerCase().includes(lowerQuery)
        );
      }
      return false;
    })
    .slice(0, 5); // Return only first 5 matches
};