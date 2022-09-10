import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { client } from '../../lib/client';
import Card from '../components/Card';
import Header from '../components/Header';
import Select from 'react-select';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { Store } from '../Context/Store';
const collection = ({ collection, products, sort }) => {
  const [currentProducts, setcurrentProducts] = useState(
    products ? products : []
  );
  const { state, dispatch } = useContext(Store);
  const { DarkMode } = state;
  const options = [
    { label: 'By price, Low to High', value: 'LowtoHigh' },
    { label: 'By price,High to Low', value: 'HightoLow' },
    { label: 'By Alphabetic,A to Z', value: 'AtoZ' },
    { label: 'By Alphabetic,Z to A', value: 'ZtoA' },
  ];
  const [sortType, setSortType] = useState(
    sort ? options.find((option) => option.value === sort) : ''
  );
  console.log(sortType);

  console.log(currentProducts);
  const router = useRouter();
  const sorting = (e) => {
    router
      .push({
        pathname: `/collection/${collection}`,
        query: {
          ...Router.query,
          sort_by: JSON.stringify(e.value), // PRBLEM GETTING THE RIGHT PRODUCTS
        },
      })
      .then(() => router.reload());
  };
  return (
    <div
      className={`${
        DarkMode
          ? 'bg-[#1c1c1d] text-white border-white'
          : 'bg-slate-100 border-black text-slate-900'
      } w-screen overflow-x-hidden`}
    >
      <Header />
      <div className=" p-6  flex items-center justify-center flex-col gap-12">
        <div className="flex border-b-2  w-full py-4 flex-col gap-5 items-center justify-center">
          <h1 className="font-bold  text-3xl">{collection.toUpperCase()}</h1>
        </div>
        <div className="flex flex-row py-3  w-[85%] justify-between items-center">
          <h1 className="text-center font-bold  text-sm">
            {' '}
            {products.length} PRODUCTS
          </h1>
          <div className={`dropdown w-fit text-black px-3`}>
            <Select
              className={`dropdown w-fit text-black px-3`}
              placeholder={sortType.label ? sortType.label : 'Sort Products...'}
              value={sortType.label} // set selected values
              options={options} // set list of the data
              onChange={(e) => {
                console.log(e);
                setSortType(e.value);
                sorting(e);
              }} // assign onChange function
              isClearable
            />
          </div>
        </div>
        <div className="flex flex-row gap-8 flex-wrap w-full items-center justify-center">
          {currentProducts.map((product) => (
            <Card key={product.slug.current} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ params, query }) {
  const sort = query?.sort_by ? JSON.parse(query?.sort_by) : '';
  const sanityquery = `*[_type == "product" && ( category match '${params.category}' || brand match '${params.category}') ]{name,description,price,numReviews,rating,countInStock,slug,category,_id,image[]->{
    image,
    color
  }}`;
  const products = await client.fetch(sanityquery);
  console.log(sort);
  let sortedProducts = products;
  if (sort) {
    switch (sort) {
      case 'LowtoHigh': {
        sortedProducts.sort((a, b) => {
          return parseFloat(a.price) - parseFloat(b.price);
        });
        return {
          props: {
            collection: params.category,
            products: sortedProducts,
            sort,
          },
        };
      }
      case 'HightoLow': {
        sortedProducts.sort(
          (a, b) => parseFloat(b.price) - parseFloat(a.price)
        );
        return {
          props: {
            collection: params.category,
            products: sortedProducts,
            sort,
          },
        };
      }
      case 'AtoZ': {
        sortedProducts.sort((a, b) => {
          let fa = a.name.toLowerCase(),
            fb = b.name.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
        return {
          props: {
            collection: params.category,
            products: sortedProducts,
            sort,
          },
        };
      }
      case 'ZtoA': {
        sortedProducts.sort((a, b) => {
          let fa = a.name.toLowerCase(),
            fb = b.name.toLowerCase();

          if (fa < fb) {
            return 1;
          }
          if (fa > fb) {
            return -1;
          }
          return 0;
        });
        return {
          props: {
            collection: params.category,
            products: sortedProducts,
            sort,
          },
        };
      }
    }
  }
  console.log('********************************** ');
  console.log(sortedProducts);
  return {
    props: {
      collection: params.category,
      products: sortedProducts,
      sort,
    },
  };
}
export default collection;

/*useEffect(() => {
    const sortProduct = () => {
      switch (sortType) {
        case 'LowtoHigh': {
          setcurrentProducts((products) =>
            products.sort((a, b) => {
              return parseFloat(a.price) - parseFloat(b.price);
            })
          );
        }
        case 'HightoLow': {
          setcurrentProducts((products) =>
            products.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
          );
        }
        case 'AtoZ': {
          setcurrentProducts((products) =>
            products.sort((a, b) => {
              let fa = a.name.toLowerCase(),
                fb = b.name.toLowerCase();

              if (fa < fb) {
                return -1;
              }
              if (fa > fb) {
                return 1;
              }
              return 0;
            })
          );
        }
        case 'ZtoA': {
          setcurrentProducts((products) =>
            products.sort((a, b) => {
              let fa = a.name.toLowerCase(),
                fb = b.name.toLowerCase();

              if (fa < fb) {
                return 1;
              }
              if (fa > fb) {
                return -1;
              }
              return 0;
            })
          );
        }
      }
    };
    sortProduct();
  }, [sortType]);*/
