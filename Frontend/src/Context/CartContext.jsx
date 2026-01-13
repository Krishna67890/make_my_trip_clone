import React, { createContext, useContext, useReducer } from 'react';

// Create the context
const CartContext = createContext();

// Initial state
const initialState = {
  items: [],
  totalAmount: 0,
  itemCount: 0
};

// Action types
const actionTypes = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  SET_ITEMS: 'SET_ITEMS'
};

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === newItem.id);
      
      let updatedItems;
      if (existingItemIndex >= 0) {
        // Item already exists, update quantity
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
      } else {
        // New item, add to cart
        updatedItems = [...state.items, { ...newItem, quantity: 1 }];
      }
      
      const updatedTotalAmount = updatedItems.reduce(
        (total, item) => total + item.price * item.quantity, 
        0
      );
      
      const updatedItemCount = updatedItems.reduce(
        (count, item) => count + item.quantity, 
        0
      );
      
      return {
        ...state,
        items: updatedItems,
        totalAmount: updatedTotalAmount,
        itemCount: updatedItemCount
      };
    
    case actionTypes.REMOVE_FROM_CART:
      const itemIdToRemove = action.payload;
      const itemToRemoveIndex = state.items.findIndex(item => item.id === itemIdToRemove);
      
      if (itemToRemoveIndex >= 0) {
        const itemToRemove = state.items[itemToRemoveIndex];
        const updatedItemsAfterRemove = state.items.filter(item => item.id !== itemIdToRemove);
        
        const updatedTotalAfterRemove = updatedItemsAfterRemove.reduce(
          (total, item) => total + item.price * item.quantity, 
          0
        );
        
        const updatedCountAfterRemove = updatedItemsAfterRemove.reduce(
          (count, item) => count + item.quantity, 
          0
        );
        
        return {
          ...state,
          items: updatedItemsAfterRemove,
          totalAmount: updatedTotalAfterRemove,
          itemCount: updatedCountAfterRemove
        };
      }
      return state;
    
    case actionTypes.UPDATE_QUANTITY:
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        // If quantity is 0 or less, remove the item
        return {
          ...state,
          items: state.items.filter(item => item.id !== id),
          totalAmount: state.totalAmount - (state.items.find(item => item.id === id)?.price || 0) * state.items.find(item => item.id === id)?.quantity,
          itemCount: state.itemCount - state.items.find(item => item.id === id)?.quantity
        };
      }
      
      const updatedItemsWithQuantity = state.items.map(item => 
        item.id === id ? { ...item, quantity } : item
      );
      
      const updatedTotalWithQuantity = updatedItemsWithQuantity.reduce(
        (total, item) => total + item.price * item.quantity, 
        0
      );
      
      const updatedCountWithQuantity = updatedItemsWithQuantity.reduce(
        (count, item) => count + item.quantity, 
        0
      );
      
      return {
        ...state,
        items: updatedItemsWithQuantity,
        totalAmount: updatedTotalWithQuantity,
        itemCount: updatedCountWithQuantity
      };
    
    case actionTypes.CLEAR_CART:
      return {
        ...initialState
      };
    
    case actionTypes.SET_ITEMS:
      const items = action.payload;
      const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const count = items.reduce((sum, item) => sum + item.quantity, 0);
      
      return {
        ...state,
        items: items,
        totalAmount: total,
        itemCount: count
      };
    
    default:
      return state;
  }
};

// Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Actions
  const addToCart = (item) => {
    dispatch({ type: actionTypes.ADD_TO_CART, payload: item });
  };

  const removeFromCart = (id) => {
    dispatch({ type: actionTypes.REMOVE_FROM_CART, payload: id });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: actionTypes.UPDATE_QUANTITY, payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: actionTypes.CLEAR_CART });
  };

  const setItems = (items) => {
    dispatch({ type: actionTypes.SET_ITEMS, payload: items });
  };

  const isInCart = (id) => {
    return state.items.some(item => item.id === id);
  };

  const getCartItem = (id) => {
    return state.items.find(item => item.id === id);
  };

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    setItems,
    isInCart,
    getCartItem
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};