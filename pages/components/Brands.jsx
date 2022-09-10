import React from 'react';
import { Autoplay, Pagination, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import Router from 'next/router';
const Brands = ({ brands }) => {
  const FilterCollection = (brand) => {
    Router.push({
      pathname: `/collection/${brand}`,
      query: {
        ...Router.query,
      },
    });
  };
  return (
    <div className="w-[90%] pl-10 py-6 rounded-md  mx-auto h-80 ">
      <Swiper
        // install Swiper modules
        modules={[Pagination, A11y, Autoplay]}
        spaceBetween={150}
        slidesPerView={2}
        loop={true}
        pagination={{ clickable: true }}
        className="p-3 w-[95%] mx-auto h-[300px] flex flex-wrap"
        autoplay={{
          delay: 8000,
        }}
      >
        {brands.length > 0 &&
          brands.map((brand) => (
            <SwiperSlide key={brand}>
              {' '}
              <div className="shadow-md shadow-[#2b2d42] bg-[url('/brandbg.jpg')] p-5 flex flex-col justify-between h-[250px] w-[350px] rounded-md">
                <img
                  src={`./${brand}.png`}
                  alt=""
                  className="w-24 h-24 p-3 bg-white rounded-full relative top-[0px]"
                />{' '}
                <div className="flex flex-row justify-between items-center text-white  ">
                  <h1 className="font-semibold">{brand}</h1>
                  <button
                    onClick={() => FilterCollection(brand)}
                    className="bg-[#2b2d42] px-3 py-2 rounded-md "
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Brands;
