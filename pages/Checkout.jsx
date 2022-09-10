import React from 'react';
import { useContext } from 'react';
import { Store } from './Context/Store';

const Checkout = () => {
  const { state, dispatch } = useContext(Store);

  console.log(state.bag.bagItems);
  return (
    <div>
      <h1>VERIFY YOUR BAG</h1>
    </div>
  );
};

export default Checkout;
