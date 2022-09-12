import React, { useContext, useState } from 'react';
import Header from './Header';
import { Store } from '../../Context/Store';

const Bag = () => {
  const { state, dispatch } = useContext(Store);
  const [items, setItems] = useState(state.bag.bagItems);
  const removeitem = (item) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { item } });
    setItems((current) =>
      current.filter((currItem) => {
        // 👇️ remove object that has id equal to 2
        return currItem.product._id !== item.product._id;
      })
    );
    console.log(state.bag.bagItems);
  };
  return (
    <div>
      <Header />
      <div>
        {items.map((item) => (
          <div>
            {item.product.name}{' '}
            <span
              className="cursor-pointer"
              onClick={() => {
                removeitem(item);
              }}
            >
              REMOVE
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bag;
