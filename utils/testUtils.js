// import casual from 'casual';

// // seed it so we get consistent results
// casual.seed(777);

// export const fakeItem = () => ({
//   __typename: 'Item',
//   id: 'abc123',
//   price: 5000,
//   user: null,
//   image: 'dog-small.jpg',
//   title: 'dogs are best',
//   description: 'dogs',
//   largeImage: 'dog.jpg',
// });

// export const fakeUser = () => ({
//   __typename: 'User',
//   id: '4234',
//   name: casual.name,
//   email: casual.email,
//   permissions: ['ADMIN'],
//   orders: [],
//   cart: [],
// });

// export const fakeOrderItem = () => ({
//   __typename: 'OrderItem',
//   id: casual.uuid,
//   image: `${casual.word}.jpg`,
//   title: casual.words(),
//   price: 4234,
//   quantity: 1,
//   description: casual.words(),
// });

// export const fakeOrder = () => ({
//   __typename: 'Order',
//   id: 'ord123',
//   charge: 'ch_123',
//   total: 40000,
//   items: [fakeOrderItem(), fakeOrderItem()],
//   createdAt: '2018-04 - 06T19: 24: 16.000Z',
//   user: fakeUser(),
// });

// export const fakeCartItem = (overrides) => ({
//   __typename: 'CartItem',
//   id: 'omg123',
//   quantity: 3,
//   item: fakeItem(),
//   user: fakeUser(),
//   ...overrides,
// });

// // Fake LocalStorage
// export const localStorageMock = () => {
//   const store = {};

//   return {
//     clear() {
//       store = {};
//     },
//     getItem(key) {
//       return store[key] || null;
//     },
//     setItem(key, value) {
//       return (store[key] = value.toString());
//     },
//     removeItem(key) {
//       delete store[key];
//     },
//   };
// };

// // From package waait
// export const wait = (amount = 0) =>
//   new Promise((resolve) => setTimeout(resolve, amount));
