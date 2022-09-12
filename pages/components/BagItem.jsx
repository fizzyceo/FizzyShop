import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { Store } from '../../Context/Store';

const BagItem = ({ totalPrice, settotalPrice, item, setBagItems }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const { state, dispatch } = useContext(Store);
  const DeleteItem = () => {
    settotalPrice((price) => price - quantity * item.product.price);

    setBagItems((bagItems) =>
      bagItems.filter((itemb) => itemb.product._id != item.product._id && itemb)
    );
    dispatch({ type: 'REMOVE_ITEM', payload: { product: item.product } });
    toast.success('item removed successfully');
  };
  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);
  return (
    <div className="flex flex-row gap-7  items-center justify-start   w-full">
      <img
        src={item.product.image[0].image}
        className="w-[130px] h-[120px]"
        alt=""
      />
      <div className="infos w-full  flex flex-col gap-4 ">
        <div className="flex flex-row justify-between items-center">
          <h1 className="font-semibold text-lg ">{item.product.name}</h1>
          <AiOutlineClose
            onClick={DeleteItem}
            className="cursor-pointer my-4 flex self-end"
          />
        </div>
        <p className="text-sm ">{item.product.category}</p>
        <div className="flex flex-row w-full flex-1 justify-between items-center ">
          {/**********  QUANTITY COMPONENT  ************* */}

          <div className="flex flex-row gap-4 items-center border-2 px-3 py-1">
            <AiOutlineMinus
              className="cursor-pointer"
              onClick={() => {
                if (item.product.countInStock > 0 && item.quantity > 1) {
                  setQuantity((quantity) => quantity - 1);
                  item.quantity--;
                  settotalPrice((price) => price - item.product.price);
                  //  setquantity((quan) => quan - 1);
                }
              }}
            />
            <span>{quantity}</span>
            <AiOutlinePlus
              className="cursor-pointer"
              onClick={() => {
                if (item.product.countInStock > item.quantity) {
                  setQuantity((quantity) => quantity + 1);
                  item.quantity++;
                  settotalPrice((price) => price + item.product.price);
                }
              }}
            />
          </div>
          <h3 className="font-semibold ">{item.product.price}$</h3>
        </div>
      </div>
    </div>
  );
};

export default BagItem;
