export default {
  name: 'bag',
  title: 'Bag',
  type: 'document',
  fields: [
    {
      title: 'User',
      name: 'user',
      type: 'reference',
      to: [{ type: 'user' }],
      options: {
        disableNew: true,
      },
    },
    {
      name: 'userName',
      title: 'User Name',
      type: 'string',
    },
    {
      name: 'itemsPrice',
      title: 'itemsPrice',
      type: 'number',
    },
    {
      name: 'shippingPrice',
      title: 'shippingPrice',
      type: 'number',
    },
    {
      name: 'taxPrice',
      title: 'taxPrice',
      type: 'number',
    },
    {
      name: 'totalPrice',
      title: 'totalPrice',
      type: 'number',
    },
  ],
};
