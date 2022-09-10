import Cookies from 'js-cookie';
import Link from 'next/link';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import Switch from 'react-switch';
import { Store } from '../Context/Store';
import { BsHandbag } from 'react-icons/bs';
import { TbHanger } from 'react-icons/tb';
import { motion } from 'framer-motion';
import {
  AiOutlineClose,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineSearch,
} from 'react-icons/ai';
import { RiArrowDropDownLine } from 'react-icons/ri';
import Card from './Card';
import { client } from '../../lib/client';
import Router from 'next/router';
import BagItem from './BagItem';
import getStripe from '../../lib/getStripe';

import { useRef } from 'react';
const Header = () => {
  const { state, dispatch } = useContext(Store);
  const contextvalue = useRef(useContext(Store));

  const [bagItems, setBagItems] = useState(state.bag.bagItems);
  const [showheader, setShowHeader] = useState(true);
  const [mode, setMode] = useState(state.DarkMode);
  const [totalPrice, settotalPrice] = useState(0);

  const [showMenu, setShowMenu] = useState(false);

  const [showBag, setShowBag] = useState(false);

  const [search, setSearch] = useState('');

  const [searchProducts, setSearchProducts] = useState([]);

  let Total = 0;

  const styles = {
    darkMode: `bg-[#1c1c1d]`,
    lightMode: `bg-slate-200`,
    lightText: `text-slate-100`,
    darkText: `text-[#1c1c1d]`,
    lightFill: `fill-slate-100`,
    darkFill: `fill-black`,
  };

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch('../api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bagItems),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  const changeMode = () => {
    dispatch({ type: !state.DarkMode ? 'Mode_On' : 'Mode_Off' });

    const newDarkMode = !state.DarkMode;

    Cookies.set('DarkMode', newDarkMode ? 'ON' : 'OFF');
  };

  const ShowSearchBar = () => {
    setShowHeader((header) => !header);
  };

  const SearchItems = async (searchvalue) => {
    setSearch(searchvalue);
  };

  useEffect(() => {
    const calledfun = async () => {
      const query = `*[_type == "product" &&  (name match '${search}' ||slug.current match'${search}'|| category match '${search}' || brand match '${search}') ]{
        name,
        price,slug,
        description,
        category,
        _id,
        numReviews,
        rating,
        countInStock,
        colors,image[]->{
      image,color
    }        
      }`; //slug.current == '${searchvalue}'|| category =='${searchvalue}' || brand=='${searchvalue}')

      const products = await client.fetch(query);

      setSearchProducts(products);
    };
    calledfun();
  }, [search]);

  useEffect(() => {
    settotalPrice(0);

    setBagItems(state.bag.bagItems); //contextvalue.current.

    state.bag.bagItems.map((item) => {
      settotalPrice((total) => total + item.product.price * item.quantity);
    });

    // settotalPrice(Total);
  }, [state.bag.bagItems, totalPrice]);
  const handleKeypress = (e) => {
    //it triggers by pressing the enter key

    if (e.key === 'Enter' && searchProducts.length > 0) {
      setShowHeader(true);

      Router.push({
        pathname: '/Search',
        query: {
          ...Router.query,
          searchValue: search,
          searchProducts: JSON.stringify(searchProducts),
        },
      });
    }
  };

  const ShowMenu = () => {
    setShowMenu((menu) => !menu);
  };

  const ShowBag = () => {
    setShowBag((bag) => !bag);
  };

  const displayCategoryMenu = () => {};

  const variants = {
    openMenu: { opacity: 1, x: 0 },
    closedMenu: { opacity: 0, x: '-100%' },
    closedBag: { opacity: 0, x: '100%' },
    hidden: { opacity: 0, y: '100%' },
    show: { opacity: 1, y: 0 },
  };
  const navigateMenu = (category) => {
    Router.push({
      pathname: `/collection/${category}`,
      query: {
        ...Router.query,
      },
    }).then(() => Router.reload());
  };
  return (
    <div className="relative">
      {/************************ THIS IS THE MENU COMPONENT ...**********************/}
      <motion.div
        animate={showMenu ? 'openMenu' : 'closedMenu'}
        variants={variants}
        className={`Menu  flex flex-col h-screen p-10 ${
          state.DarkMode ? 'dark' : 'light'
        }  w-fit absolute
        left-0 z-10`}
      >
        <AiOutlineClose
          onClick={ShowMenu}
          className="cursor-pointer my-4 flex self-end"
        />

        <motion.div
          animate={showMenu ? 'show' : 'hidden'}
          variants={variants}
          transition={{ duration: 0.7 }}
          className="flex flex-row items-center"
        >
          <motion.h1
            onClick={() => navigateMenu('Men')}
            className="border-r cursor-pointer border-black pr-4"
          >
            ALL CLOTHING
          </motion.h1>

          <RiArrowDropDownLine
            onClick={displayCategoryMenu}
            className="w-7 h-7 mx-2 cursor-pointer hover:bg-slate-100 rounded-full p-1"
          />
        </motion.div>
      </motion.div>
      {/******************* THIS IS THE BAG COMPONENT ...*******************/}
      {/**HYDRATION FAILED BECAUSE OF THE BAG ITEMS + NEED TO ADD DELETE to the item  */}
      {/** */}{' '}
      <motion.div
        animate={showBag ? 'openMenu' : 'closedBag'}
        variants={variants}
        className={`Bag  flex flex-col h-screen p-10 ${
          state.DarkMode ? 'dark' : 'light'
        } w-fit  absolute top-0 bottom-0
        right-0 z-10`}
      >
        <motion.div className="flex h-[10%] flex-row items-center justify-between px-4 py-2 border-b-2  ">
          {' '}
          {/**BAG TITLE */}
          <motion.h1 className="font-bold text-2xl">BAG</motion.h1>
          <AiOutlineClose
            onClick={ShowBag}
            className="cursor-pointer my-4 flex self-end"
          />
        </motion.div>
        {/**BAG ITEMS */}
        <motion.div
          animate={showBag ? 'show' : 'hidden'}
          variants={variants}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-8 my-5 h-[70%]    w-[400px] "
        >
          {bagItems.length > 0 ? (
            bagItems.map((item) => {
              //*********       ITEM's DATA     ******************

              Total += item.product.price * item.quantity;

              return (
                <BagItem
                  key={item.product.name}
                  settotalPrice={settotalPrice}
                  totalPrice={totalPrice}
                  item={item}
                  setBagItems={setBagItems}
                />
              );
            })
          ) : (
            <motion.h3 className="font-serif text-base ">
              Your Bag is Empty...
            </motion.h3>
          )}
        </motion.div>

        <motion.footer className="self-end border-t-2 border-black w-full">
          {' '}
          <motion.div className="flex flex-row justify-between items-center py-3">
            <motion.h3 className="font-serif text-base space-x-2">
              SUBTOTAL
            </motion.h3>
            <motion.p>{totalPrice.toFixed(2)}$</motion.p>
          </motion.div>
          <motion.p className="text-sm mb-2 ">
            Shipping, taxes, and discount codes calculated at checkout.
          </motion.p>
          <motion.button
            onClick={handleCheckout}
            className={` py-2 ${
              bagItems.length > 0 ? 'cursor-pointer' : 'cursor-not-allowed'
            }  text-lg w-full tracking-widest font-medium rounded-full ${
              !state.DarkMode ? 'dark lighttext' : 'light darktext'
            }  outline-none`}
          >
            {' '}
            CHECK OUT
          </motion.button>
        </motion.footer>
      </motion.div>
      {/********************** THIS IS THE SEARCH BAR COMPONENT ...***************************/}
      <motion.div
        animate={!showheader ? 'show' : 'hidden'}
        variants={variants}
        transition={{ duration: 0.5 }}
        className={`Search-bar ${
          !showheader ? 'flex' : 'hidden'
        } relative items-center justify-center w-screen p-10 bg-[#1c1c1d]`}
      >
        <AiOutlineClose
          onClick={ShowSearchBar}
          className="absolute top-3 w-7 h-7 right-10 fill-slate-100"
        />
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-row  rounded-md  gap-5">
            <input
              type="text"
              placeholder="Search for Product..."
              onKeyPress={(e) => handleKeypress(e)}
              className="px-3 py-1 outline-none bg-inherit text-white border-none"
              onChange={(event) => SearchItems(event.target.value)}
            />
            <AiOutlineSearch className="w-7 h-7 fill-slate-100" />
          </div>
          {searchProducts.length > 0 ? (
            <div className="w-full">
              <h1 className="font-bold w-full text-center py-4 my-4 border-b-2 border-white text-white text-2xl">
                Search Results :{' '}
              </h1>
              <div className="flex flex-row gap-5 flex-wrap items-center">
                {searchProducts.slice(0, 3).map((product) => (
                  <Card key={product.name} product={product} />
                ))}
              </div>
            </div>
          ) : (
            /\s/.test(search) && (
              <div className="text-white text-lg font-serif">
                No products Found...{' '}
              </div>
            )
          )}
          {searchProducts.length > 3 && (
            <button
              onClick={handleKeypress}
              className="text-white border border-white px-3 py-1 rounded-md flex flex-row gap-3 items-center "
            >
              <AiOutlinePlus />
              <span className="">More</span>
            </button>
          )}
        </div>
      </motion.div>
      {/** THIS IS THE HEADER COMPONENT ...**/}
      {/*'bg-[#1c1c1d] text-white fill-slate-100' ---------------'fill-black text-black bg-[#edf2f4]'*/}
      <div
        className={`${
          showheader ? 'flex' : 'hidden'
        } flex-row gap-5 justify-between px-10 ${
          state.DarkMode ? 'dark' : 'light'
        } py-6 shadow-md shadow-[#2b2d42] text-[#2b2d42] `}
      >
        <div className="hamburger  cursor-pointer" onClick={ShowMenu}>
          <svg
            className={`w-7 h-7 ${state.DarkMode ? 'lightFill' : 'darkFill'}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM64 256C64 238.3 78.33 224 96 224H480C497.7 224 512 238.3 512 256C512 273.7 497.7 288 480 288H96C78.33 288 64 273.7 64 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z" />
          </svg>
        </div>
        <Link href="/">
          <div
            className={`flex flex-row  ${
              state.DarkMode ? ' lighttext ' : 'darktext'
            } gap-0 items-center justify-center cursor-pointer`}
          >
            {' '}
            <TbHanger className={`rotate-45 w-7 h-7  `} />
            <h1 className="font-['Open_Sans'] text-xl">FizzyShop</h1>
          </div>
        </Link>
        <div className=" flex items-center justify-center gap-8">
          <Switch
            onColor="#d231a7"
            boxShadow="#d231a7"
            onChange={changeMode}
            checked={state.DarkMode}
            uncheckedIcon={false}
            checkedIcon={false}
          ></Switch>
          <div className="flex gap-7 flex-row items-center justify-center">
            <section onClick={ShowSearchBar}>
              {' '}
              <AiOutlineSearch
                className={`w-7 h-7 ${
                  state.DarkMode ? styles.lightText : styles.darkText
                }`}
              />
            </section>
            <section>
              <div className=" fill-white relative">
                {/** <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M112 112C112 50.14 162.1 0 224 0C285.9 0 336 50.14 336 112V160H400C426.5 160 448 181.5 448 208V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V208C0 181.5 21.49 160 48 160H112V112zM160 160H288V112C288 76.65 259.3 48 224 48C188.7 48 160 76.65 160 112V160zM136 256C149.3 256 160 245.3 160 232C160 218.7 149.3 208 136 208C122.7 208 112 218.7 112 232C112 245.3 122.7 256 136 256zM312 208C298.7 208 288 218.7 288 232C288 245.3 298.7 256 312 256C325.3 256 336 245.3 336 232C336 218.7 325.3 208 312 208z" />
                </svg>*/}

                <BsHandbag
                  className={` ${
                    state.DarkMode ? 'lighttext' : 'darktext'
                  } w-6 h-6 cursor-pointer`}
                  onClick={ShowBag}
                />

                <div
                  className={` px-[0.3rem] ${
                    state.DarkMode ? 'light darktext' : 'dark lighttext '
                  }     rounded-full font-bold border border-black absolute top-[-5px] right-[-7px] text-center text-xs flex items-center justify-center`}
                >
                  {bagItems.length}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
