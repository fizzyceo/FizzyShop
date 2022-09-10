import React, { useContext, useState } from 'react';
import { client, urlFor } from '../../lib/client';
import {
  AiOutlineStar,
  AiFillStar,
  AiOutlineHeart,
  AiOutlineMinus,
  AiOutlinePlus,
} from 'react-icons/ai';
import { useEffect } from 'react';
import Header from '../components/Header';
import { Store } from '../Context/Store';
import toast, { Toaster } from 'react-hot-toast';
const ProductDetails = ({ product }) => {
  const {
    name,
    image,
    price,
    description,
    category,
    _id,
    numReviews,
    rating,
    countInStock,
    colors,
  } = product;
  console.log(_id);
  //countInStock >0 IN stock (true icon ) else out of stock (X)
  //Ratings check videos rating > 1 show 1 black star and 4 outlined
  const { state, dispatch } = useContext(Store); //CHANGE TO REDUX

  const [quantity, setquantity] = useState(1);
  const [displayError, setDisplayError] = useState(false);
  const [index, setIndex] = useState(0);
  const [selectedColor, setselectedColor] = useState(image[index].color);
  const settingColor = (color) => {
    setselectedColor(color);
  };
  const AddtoBag = () => {
    if (selectedColor) {
      dispatch({
        type: 'ADD_ITEM',
        payload: { product, color: selectedColor, quantity: quantity },
      });
    } else {
      setDisplayError(true);
    }
    toast.success('item added successfully');
  };

  const AddtoFav = () => {};
  console.log(image);
  return (
    <div
      className={` flex flex-col overflow-x-hidden  ${
        state.DarkMode ? 'dark lighttext lightFill' : 'darktext darkFill light'
      } gap-12`}
    >
      <Toaster />
      <Header />
      <div
        className={`flex flex-row  w-full   justify-center  items-start gap-14 mx-auto p-4`}
      >
        <div className="flex flex-col gap-5">
          <img src={image[index]?.image} className="max-w-xl" alt="" />
          <div className="flex flex-row gap-3 items-center">
            {image.map(
              (image, i) =>
                i != index && (
                  <img
                    className="w-32 rounded-md cursor-pointer"
                    onClick={() => {
                      setIndex(i);
                      settingColor(image.color);
                    }}
                    src={image.image}
                    alt=""
                  />
                )
            )}
          </div>
        </div>
        <div className="flex flex-col justify-center w-[30%]  gap-6">
          <div>
            <p>{category}</p>
            <h1 className="text-3xl font-bold ">{name.toUpperCase()}</h1>
          </div>
          <div className="stars flex flex-row gap-1 items-center ">
            <div className="flex flex-row gap-1">
              {Array(parseInt(rating)).fill(<AiFillStar />)}
              {Array(5 - parseInt(rating)).fill(<AiOutlineStar />)}
            </div>{' '}
            {rating}/5
          </div>
          <h3 className="text-xl font-bold">{price}$</h3>
          {countInStock > 0 ? (
            <p className="flex flex-row items-center gap-1">
              {' '}
              In Stock <img
                src="/correct.png"
                className="w-5 h-5"
                alt=""
              />{' '}
            </p>
          ) : (
            <p className="flex flex-row items-center gap-1">
              Out of Stock <img src="/false.png" className="w-5 h-5" alt="" />
            </p>
          )}

          <h2 className="text-2xl font-bold">COLORS</h2>
          <div className="flex flex-row gap-3">
            {image.map((image, i) => (
              <span
                style={{
                  background: `${image.color}`,
                }}
                onClick={() => {
                  settingColor(image.color);
                  setIndex(i);
                }}
                className={`w-8 h-8 bg-[color:var(--bg-dynamic)] rounded-full pt-1 border-2 ${
                  selectedColor === image.color ? ' border-[#ff12d3]' : ''
                }`}
              ></span>
            ))}
          </div>
          <div className="quantity flex flex-row items-center gap-4">
            <h1 className="font-bold text-lg">QUANTITY :</h1>
            <div
              className={`${
                !state.DarkMode && 'border-black'
              } flex flex-row gap-4 items-center border-2  px-3 py-1`}
            >
              <AiOutlineMinus
                onClick={() => {
                  if (countInStock > 0 && quantity > 1)
                    setquantity((quan) => quan - 1);
                }}
              />
              <span>{quantity}</span>
              <AiOutlinePlus
                onClick={() => {
                  if (countInStock > quantity) setquantity((quan) => quan + 1);
                }}
              />
            </div>
          </div>
          <div className="buttons flex flex-row gap-7 w-full items-center justify-center">
            <button
              onClick={AddtoBag}
              className={`text-lg  w-full py-3 hover:shadow-xl shadow-sm shadow-[#b6cad2] rounded-full transition-all  ${
                state.DarkMode ? 'light darktext' : 'dark lighttext'
              }`}
            >
              Add to Bag
            </button>
          </div>
          {displayError && (
            <h1 className="font-bold text-red-600 ">Please Select a color!</h1>
          )}

          <h1 className="text-2xl top-10 font-bold">Description</h1>
          <p>
            {description} Lorem, ipsum dolor sit amet consectetur adipisicing
            elit. Fugiat ipsum culpa accusamus quisquam nulla ea cum praesentium
            necessitatibus minima voluptatum.
          </p>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]{
    name,
    price,
    description,
    category,
    _id,
    numReviews,
    rating,
    countInStock,
    colors,image[]->{
  image,color
}        
  }`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  console.log(product);

  return {
    props: { products, product },
  };
};

export default ProductDetails;
