import React, { useEffect } from 'react';
import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { client } from '../lib/client';
import Card from './components/Card';
import Header from './components/Header';

const Search = ({ products, searchValue }) => {
  const [search, setSearch] = useState(searchValue);
  const [searchProducts, setSearchProducts] = useState(products);
  const interiorSearch = async () => {
    const query = `*[_type == "product" &&  (name match '${search}' ||slug.current match'${search}'|| category match '${search}' || brand match '${search}') ]{
      name,
      price,
      description,
      slug,
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

  return (
    <div>
      <Header />
      <div className=" p-6 bg-[#1c1c1d] flex items-center justify-center flex-col gap-12">
        <div className="flex border-b-2 border-white w-full py-4 flex-col gap-5 items-center justify-center">
          <h1 className="header text-white text-3xl">SEARCH</h1>
          <div className="flex flex-row gap-0">
            <input
              type="text"
              value={search}
              className="px-3 py-1 rounded-l-md outline-none border-none"
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(e) => {
                if (e.key == 'Enter') {
                  interiorSearch();
                }
              }}
            />
            <AiOutlineSearch
              onClick={interiorSearch}
              className="w-11 h-11 fill-slate-100 p-3 rounded-r-lg bg-[#0d0d0e]"
            />
          </div>
        </div>
        <h1 className="text-center header text-white text-3xl">
          {' '}
          {searchProducts.length} PRODUCTS
        </h1>
        <div className="flex flex-row gap-5 flex-wrap w-full items-center justify-center">
          {searchProducts.map((product) => (
            <Card key={product.name} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  console.log(context.query);
  const products = JSON.parse(context.query.searchProducts);
  const searchValue = context.query.searchValue;
  return {
    props: {
      products,
      searchValue,
    },
  };
}
export default Search;
