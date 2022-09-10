import React from 'react';
import { Autoplay, Pagination, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import { products } from '../../lib/Data';

const Banner = ({ banners }) => {
  return (
    <>
      <Swiper
        // install Swiper modules
        modules={[Pagination, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true }}
        className="w-[100%]   flex flex-row items-center mx-auto max-h-[500px]"
        autoplay={{
          delay: 4000,
        }}
      >
        {banners?.length > 0 ? (
          banners.map((banner) => (
            <SwiperSlide
              className="swipe text-white       relative "
              key={banner.slug.current}
            >
              <div className="relative before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-0 before:z-10 before:right-0 before:bg-gradient-to-l before:from-[#0000001b] before:to-[#000000a6] z-0 ">
                {' '}
                <img
                  src={banner.image}
                  alt=""
                  className="w-full h-full object-contain"
                />{' '}
                <div className="absolute z-20 flex flex-col gap-5 left-6 xl:w-[40%] lg:w-[50%] w-[60%] xl:top-[40%] top-4 lg:top-[20%]">
                  <h1 className="header font-bold text-5xl tracking-widest">
                    {banner.title.toUpperCase()}
                  </h1>
                  <h2 className="font-semibold text-2xl tracking-widest ">
                    {banner.subtitle.toUpperCase()}
                  </h2>
                  <p className="font-serif tracking-widest">
                    {banner.description}
                  </p>
                  <button className="py-2   text-lg w-fit px-5  tracking-widest font-medium rounded-full text-white outline-none bg-[#1c1c1d]">
                    {banner.buttonText.toUpperCase()}
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide className="swipe text-white       relative " key={1}>
            <div className="relative before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-0 before:z-10 before:right-0 before:bg-gradient-to-l before:from-[#0000001b] before:to-[#000000a6] z-0 ">
              {' '}
              <img
                src={products[0].featuredImage}
                alt=""
                className="w-full h-full object-contain"
              />{' '}
              <div className="absolute z-20 flex flex-col gap-5 left-6 w-[40%] top-[40%]">
                <h1 className="font-bold text-3xl tracking-widest">Title</h1>
                <h2 className="font-semibold text-xl tracking-widest ">
                  subTitle
                </h2>
                <p className="font-serif">
                  Description Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Molestiae ducimus eum delectus sequi necessitatibus sed
                  hic culpa pariatur consequatur dolore?
                </p>
                <button className="py-2   text-lg w-fit px-5  tracking-widest font-medium rounded-full text-white outline-none bg-[#1c1c1d]">
                  the Button
                </button>
              </div>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </>
  );
};

export default Banner;
