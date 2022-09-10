// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { products } from '../../lib/Data';

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(products);
  } else if (req.method === 'POST') {
    const NewProduct = req.body;
    products.push(NewProduct);
    res.status(201).json(NewProduct);
  }
}
