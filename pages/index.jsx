import Cookies from 'js-cookie';
import { useContext, useEffect } from 'react';
import Header from './components/Header';
import Card from './components/Card';
import Link from 'next/link';
import { ModeContext } from '../Context/DarkMode';
import { Store } from '../Context/Store';
import { useState } from 'react';
import Banner from './components/Banner';
import Brands from './components/Brands';
import { client } from '../lib/client';
import { parseCookies } from '../lib/parseCookies';
import Head from 'next/head';
export default function Home({ Products, brands, banners }) {
  const LoadProducts = async () => {
    const products = await fetch('/api/Products');
    const res = await products.json();
  };

  const { state, dispatch } = useContext(Store); //CHANGE TO REDUX
  const { DarkMode } = state;
  const [currMode, setCurrMode] = useState(DarkMode);
  useEffect(() => {
    setCurrMode(DarkMode);
  }, [DarkMode]);

  return (
    <div
      className={`flex flex-col overflow-x-hidden gap-5  ${
        currMode
          ? 'bg-[#1c1c1d] text-white border-white'
          : 'bg-slate-100 border-black text-slate-900'
      }`}
    >
      <div>
        <Head>
          <title>FizzyShop</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Header />
        <Banner banners={banners} />
      </div>
      <h1 className="text-center text-3xl header font-bold py-6 border-b-2">
        BRANDS
      </h1>

      <Brands brands={brands} />
      <h1 className="text-center text-3xl header font-bold py-6 border-b-2 ">
        PRODUCTS
      </h1>

      <div className="flex flex-row justify-center items-center gap-4 flex-wrap">
        {Products?.length === 0 ? (
          <p>Loading...</p>
        ) : (
          Products?.map((product) => (
            <Card
              product={product}
              key={product.slug.current}
              loadingProducts={LoadProducts}
            />
          ))
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps(cxt) {
  const Cookieees = parseCookies(cxt.req);

  Cookies.set('DarkMode', Cookieees.DarkMode);

  const query =
    '*[_type =="product"]{slug, name,price,description,category,_id,numReviews,rating,countInStock,colors,image[]->{image,color}  }';
  const products = await client.fetch(query); //fetch('http://localhost:3000/api/Products');
  const bannerQuery = '*[_type =="banner"]';
  const banners = await client.fetch(bannerQuery); //fetch('http://localhost:3000/api/Products');

  const brandsQuery = '*[_type=="product" ]{brand}';
  const result = (await client.fetch(brandsQuery)).map((brand) => brand.brand);
  console.log(products);
  const removeDuplicates = (arr) => {
    const map = [];
    for (let value of arr) {
      if (map.indexOf(value) === -1) {
        map.push(value);
      }
    }

    return map;
  };

  const brands = removeDuplicates(result);

  return {
    props: {
      Products: products,
      brands: brands,
      banners: banners,
    },
  };
}
/* const PostProduct = async () => {
    const productSent = await fetch('/api/Products', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Ilyes S Shirt',
        slug: 'slim-shirt',
        category: 'Shirts',
        image:
          'https://raw.githubusercontent.com/basir/next-amazona/main/public/images/shirt3.jpg',
        price: 150,
        brand: 'Raymond',
        rating: 4.85,
        numReviews: 10,
        countInStock: 20,
        description: 'A popular shirt',
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await productSent.json();
    console.log(data);
  };*/
