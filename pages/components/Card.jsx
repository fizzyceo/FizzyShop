import React, { useContext } from 'react';
import { useState } from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import Link from 'next/link';
import { Store } from '../../Context/Store';
import toast, { Toaster } from 'react-hot-toast';
const Card = React.forwardRef(({ product, loadingProducts }, ref) => {
  const [isfav, setfav] = useState(false);
  const { state, dispatch } = useContext(Store);
  const DeleteProduct = async (slug) => {
    const ProductDeleted = await fetch(`/api/Product/${slug}`, {
      method: 'DELETE',
      body: JSON.stringify({ slug }),
      headers: { 'Content-Type': 'application/json' },
    });
    const res = await ProductDeleted.json();
    console.log(res, ' is deleted');
    loadingProducts();
  };
  const addfav = () => {
    console.log('fav1');

    setfav(!isfav);
  };
  //console.log(product.slug.current);
  const AddToBag = () => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity: 1 } });
    console.log(state.bag);

    toast.success('item added successfully');
  };
  const viewproduct = () => {};
  const [productColors, setProductColors] = useState(product.colors);

  return (
    <div className="max-w-sm  bg-[#edf2f4] rounded-md overflow-hidden min-w-[400px]">
      {/**<img className="" src={product.image} alt="" /> */}
      <Toaster />
      <div className=" relative group">
        <div className=" flex justify-center items-center opacity-0 transition-all bg-gradient-to-t from-gray-800 via-gray-800 to-opacity-30 group-hover:opacity-50 absolute top-0 left-0 h-full w-full"></div>
        <img
          className=" w-full"
          src={product.image[0].image}
          alt="A girl Posing Img"
        />
        <div className=" absolute bottom-0 p-8 w-full opacity-0 transition-all group-hover:opacity-100">
          <button
            onClick={AddToBag}
            className=" font-medium text-base leading-4 text-gray-800 bg-white py-3 w-full rounded-full"
          >
            Add to bag
          </button>

          <Link href={`/product/${product.slug.current}`}>
            <button
              onClick={viewproduct}
              className=" bg-transparent font-medium text-base leading-4 border-2 border-white py-3 w-full mt-2 text-white rounded-full"
            >
              Quick View
            </button>
          </Link>
        </div>
      </div>
      <div className="text-black flex flex-col gap-3 px-5 py-2">
        <div>
          <div className="flex  flex-row justify-between items-center ">
            <h1 className="font-bold text-lg">{product.name}</h1>
            <h3 className="text-lg font-semibold pt-5">{product.price}$</h3>
          </div>
          <p className="text-sm">{product.category}</p>
        </div>
        {/**  <div
          onClick={() => {
            addfav();
          }}
        >
          {!isfav ? (
            <AiOutlineStar className="w-6 h-6" />
          ) : (
            <AiFillStar className="w-6 h-6 fill-black" />
          )}
        </div> */}

        <div className="flex flex-row gap-2 ">
          {product?.image.map((image) => (
            <span
              key={image?.color}
              style={{
                background: `${image?.color}`,
              }}
              //onClick={() => settingColor(color)}              ${selectedColor === color ? ' border-[#2b2d42]' : ''}
              className={`w-8 h-8 rounded-full border-2`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
});

export default Card;
