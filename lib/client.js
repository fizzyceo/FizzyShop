import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: 'nrdatw2x',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2022-08-12',
  useCdn: true,
  dataset: 'production',
});

const builder = imageUrlBuilder(client);
export const urlFor = (src) => builder.image(src);
