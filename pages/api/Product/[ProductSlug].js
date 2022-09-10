import { useRouter } from 'next/router';
import { products } from '../../../lib/Data';

export default function handler(req, res) {
  const { ProductSlug } = req.query;
  if (req.method === 'GET') {
    res.status(200).json(products);
  } else if (req.method === 'DELETE') {
    const DeletedProductSlug = products.find(
      (product) => product.slug === ProductSlug
    );
    const index = products.indexOf(DeletedProductSlug, 0);
    products.splice(index, 1);
    res.status(200).json(DeletedProductSlug);
  }
}
