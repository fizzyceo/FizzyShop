import Cookies from 'js-cookie';
import React, { createContext, useReducer, useState } from 'react';

export const Store = createContext();

// THE ADDING AND REMOVING PROCESS REPITION PROBLEM WITH THE QUANTITY !!!!!!!

const InitState = {
  DarkMode: Cookies.get('DarkMode') === 'ON' ? true : false,
  CurrentUser: '',
  totalPrice: Cookies.get('totalPrice') || 0,
  bag: {
    bagItems: Cookies.get('bagItems')
      ? JSON.parse(Cookies.get('bagItems'))
      : [],
    clientId: Cookies.get('bagItems')
      ? JSON.parse(Cookies.get('bagItems'))
      : null,
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'Mode_On':
      return { ...state, DarkMode: true };
    case 'ADD_TO_BAG':
      return {
        ...state,

        /*bag.cliend_id: action.cliend_id,
         bag.bagItems:[...bag.bagItems,action.item]*/
      };
    case 'ADD_ITEM': {
      const newItem = action.payload;
      console.log('newItem : ');
      console.log(newItem);
      const existItem = state.bag.bagItems.find(
        (item) => item.product._id === newItem.product._id
      );
      console.log('existeed item :  : ');
      console.log(existItem);
      const bagItems = existItem
        ? state.bag.bagItems.map((item) =>
            item.product._id === existItem.product._id ? newItem : item
          )
        : [...state.bag.bagItems, newItem];

      console.log('bagItemsss : ');
      console.log(bagItems);
      Cookies.set('bagItems', JSON.stringify(bagItems));

      return { ...state, bag: { ...state.bag, bagItems: bagItems } };
    }
    case 'REMOVE_ITEM': {
      const newItems = state.bag.bagItems.filter(
        (item) => item.product._id != action.payload.product._id
      );
      console.log(newItems);
      console.log(state.bag.bagItems);
      Cookies.set('bagItems', JSON.stringify(newItems));
      return { ...state, bag: { ...state.bag, bagItems: newItems } };
    }
    case 'SWITCH_MODE':
      return { ...state, DarkMode: !state.DarkMode };
    case 'Mode_Off':
      return { ...state, DarkMode: false };
    case 'Log_in':
      return { ...state, CurrentUser: action.username };
    case 'Log_Out':
      return;
    default:
      return state;
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, InitState);

  const value = {
    state,
    dispatch,
  };
  return <Store.Provider value={value}>{children}</Store.Provider>;
};
