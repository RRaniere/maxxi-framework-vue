import mock from '../mockAdapter';
// types
import type { Customer, Order, Product, ProductReview } from '@/types/customers/index';

const customers: Customer[] = [
  {
    name: 'Joe Schilder',
    email: 'sip@gmail.com',
    location: 'Canada',
    orders: 39,
    date: '+1 (731) 342-9783',
    status: 2
  },
  {
    name: 'Phoebe Venturi',
    email: 'ke@gmail.com',
    location: 'Thailand',
    orders: 52,
    date: '+1 (887) 744-6950',
    status: 1
  },
  {
    name: 'Caroline Pandolfi',
    email: 'secjavkib@gmail.com',
    location: 'Barbados',
    orders: 45,
    date: '+1 (618) 787-3453',
    status: 1
  },
  {
    name: 'Ricardo Marchetti',
    email: 'ho@gmail.com',
    location: 'Italy',
    orders: 29,
    date: '+1 (415) 628-7505',
    status: 1
  },
  {
    name: 'Dorothy Hussain',
    email: 'socuih@gmail.com',
    location: 'Mauritius',
    orders: 58,
    date: '+1 (856) 459-8945',
    status: 3
  },
  {
    name: 'Eleanor Mann',
    email: 'jonvok@gmail.com',
    location: 'American Samoa',
    orders: 60,
    date: '+1 (507) 561-6927',
    status: 2
  },
  {
    name: 'Nina Francini',
    email: 'uhudadof@gmail.com',
    location: 'Gibraltar',
    orders: 27,
    date: '+1 (722) 952-7792',
    status: 1
  },
  {
    name: 'Caroline Mallet',
    email: 'peg@gmail.com',
    location: 'Central African Republic',
    orders: 26,
    date: '+1 (675) 882-6307',
    status: 2
  },
  {
    name: 'Amy Pratt',
    email: 'vavceriji@gmail.com',
    location: 'Indonesia',
    orders: 47,
    date: '+1 (906) 966-2597',
    status: 1
  },
  {
    name: 'Gene Montero',
    email: 'rouca@gmail.com',
    location: 'Yemen',
    orders: 55,
    date: '+1 (969) 819-7489',
    status: 3
  },
  {
    name: 'Ollie Barbetti',
    email: 'bap@gmail.com',
    location: 'Central African Republic',
    orders: 64,
    date: '+1 (323) 498-6272',
    status: 3
  },
  {
    name: 'Katherine Olivier',
    email: 'newe@gmail.com',
    location: 'Nicaragua',
    orders: 41,
    date: '+1 (740) 673-7034',
    status: 3
  },
  {
    name: 'Fanny Renault',
    email: 'at@gmail.com',
    location: 'Northern Mariana Islands',
    orders: 62,
    date: '+1 (571) 692-3845',
    status: 2
  },
  {
    name: 'Dean McCarthy',
    email: 'bovli@gmail.com',
    location: 'Greenland',
    orders: 31,
    date: '+1 (608) 235-8613',
    status: 3
  },
  {
    name: 'Kyle Papucci',
    email: 'naborga@gmail.com',
    location: 'Afghanistan',
    orders: 47,
    date: '+1 (623) 270-6754',
    status: 1
  },
  {
    name: 'Clifford Hayes',
    email: 'rempesdel@gmail.com',
    location: 'Comoros',
    orders: 51,
    date: '+1 (646) 585-1373',
    status: 3
  },
  {
    name: 'Daisy Andres',
    email: 'watjoap@gmail.com',
    location: 'Pitcairn Islands',
    orders: 35,
    date: '+1 (857) 597-2624',
    status: 2
  },
  {
    name: 'Ronald Bentley',
    email: 'pi@gmail.com',
    location: 'Japan',
    orders: 42,
    date: '+1 (881) 700-1479',
    status: 1
  },
  {
    name: 'Warren Ridolfi',
    email: 'irlizih@gmail.com',
    location: 'Martinique',
    orders: 38,
    date: '+1 (624) 971-8666',
    status: 2
  },
  {
    name: 'Cecelia Le GallGall',
    email: 'bonnollol@gmail.com',
    location: 'Laos',
    orders: 47,
    date: '+1 (407) 444-2699',
    status: 3
  },
  {
    name: 'Bessie James',
    email: 'obi@gmail.com',
    location: 'St. Helena',
    orders: 28,
    date: '+1 (668) 801-3695',
    status: 2
  },
  {
    name: 'Andrew Brown',
    email: 'big@gmail.com',
    location: 'Azerbaijan',
    orders: 62,
    date: '+1 (379) 241-7855',
    status: 1
  },
  {
    name: 'Curtis Lazzeri',
    email: 'ivgukon@gmail.com',
    location: 'Macau SAR China',
    orders: 47,
    date: '+1 (379) 241-7855',
    status: 3
  },
  {
    name: 'Charlie Jensen',
    email: 'ac@gmail.com',
    location: 'Cayman Islands',
    orders: 36,
    date: '+1 (372) 671-4732',
    status: 2
  }
];

const orders: Order[] = [
  {
    id: '790841',
    name: 'Joseph William 1',
    company: 'Toronto',
    type: 'Credit Card',
    qty: 2500,
    date: '12.07.2018',
    status: 3
  },
  {
    id: '790842',
    name: 'Anshan Handgun 2',
    company: 'Toronto',
    type: 'Paytm',
    qty: 5000,
    date: '12.07.2018',
    status: 2
  },
  {
    id: '798699',
    name: 'Larry Doe 3',
    company: 'Toronto',
    type: 'Net Banking',
    qty: 2500,
    date: '12.07.2018',
    status: 1
  },
  {
    id: '790752',
    name: 'Sara Soudan 4',
    company: 'Toronto',
    type: 'Upi',
    qty: 5000,
    date: '12.07.2018',
    status: 1
  },
  {
    id: '790955',
    name: 'Joseph William 5',
    company: 'Toronto',
    type: 'Credit Card',
    qty: 2500,
    date: '12.07.2018',
    status: 2
  },
  {
    id: '790785',
    name: 'Anshan Handgun 6',
    company: 'Toronto',
    type: 'Upi',
    qty: 5000,
    date: '12.07.2018',
    status: 3
  },
  {
    id: '800837',
    name: 'Larry Doe 7',
    company: 'Toronto',
    type: 'Paytm',
    qty: 2500,
    date: '12.07.2018',
    status: 3
  },
  {
    id: '810365',
    name: 'Sara Soudan 8',
    company: 'Toronto',
    type: 'Net Banking',
    qty: 5000,
    date: '12.07.2018',
    status: 2
  },
  {
    id: '810814',
    name: 'Sara Soudan 20',
    company: 'Toronto',
    type: 'Upi',
    qty: 2500,
    date: '12.07.2018',
    status: 1
  },
  {
    id: '820385',
    name: 'Joseph William 9',
    company: 'Toronto',
    type: 'Net Banking',
    qty: 5000,
    date: '12.07.2018',
    status: 1
  },
  {
    id: '820885',
    name: 'Anshan Handgun 10',
    company: 'Toronto',
    type: 'Credit Card',
    qty: 2500,
    date: '12.07.2018',
    status: 1
  },
  {
    id: '830390',
    name: 'Larry Doe 11',
    company: 'Toronto',
    type: 'Paytm',
    qty: 5000,
    date: '12.07.2018',
    status: 2
  },
  {
    id: '830879',
    name: 'Sara Soudan 12',
    company: 'Toronto',
    type: 'Upi',
    qty: 2500,
    date: '12.07.2018',
    status: 3
  },
  {
    id: '900111',
    name: 'Joseph William 13',
    company: 'Toronto',
    type: 'Upi',
    qty: 5000,
    date: '12.07.2018',
    status: 3
  },
  {
    id: '900836',
    name: 'Anshan Handgun 14',
    company: 'Toronto',
    type: 'Credit Card',
    qty: 2500,
    date: '12.07.2018',
    status: 2
  },
  {
    id: '900112',
    name: 'Larry Doe 15',
    company: 'Toronto',
    type: 'Paytm',
    qty: 5000,
    date: '12.07.2018',
    status: 2
  },
  {
    id: '900871',
    name: 'Sara Soudan 16',
    company: 'Toronto',
    type: 'Upi',
    qty: 2500,
    date: '12.07.2018',
    status: 1
  },
  {
    id: '910232',
    name: 'Joseph William 17',
    company: 'Toronto',
    type: 'Upi',
    qty: 5000,
    date: '12.07.2018',
    status: 2
  },
  {
    id: '910886',
    name: 'Anshan Handgun 18',
    company: 'Toronto',
    type: 'Credit Card',
    qty: 2500,
    date: '12.07.2018',
    status: 3
  },
  {
    id: '910232',
    name: 'Larry Doe 19',
    company: 'Toronto',
    type: 'Net Banking',
    qty: 5000,
    date: '12.07.2018',
    status: 2
  }
];

const products: Product[] = [
  {
    id: '790841',
    name: 'Samsung TV 32” LED Retina',
    category: 'Television',
    price: 2500,
    date: '12.07.2018',
    qty: 5
  },
  {
    id: '790842',
    name: 'Iphone 11 Pro Max',
    category: 'Television',
    price: 5000,
    date: '12.07.2018',
    qty: 2
  },
  {
    id: '798699',
    name: 'Samsung TV 34” LED Retina',
    category: 'Television',
    price: 2500,
    date: '12.07.2018',
    qty: 5
  },
  {
    id: '790752',
    name: 'Iphone 12 Pro Max',
    category: 'Television',
    price: 5000,
    date: '12.07.2018',
    qty: 2
  },
  {
    id: '790955',
    name: 'Samsung TV 36” LED Retina',
    category: 'Television',
    price: 2500,
    date: '12.07.2018',
    qty: 5
  },
  {
    id: '790785',
    name: 'Iphone 13 Pro Max',
    category: 'Television',
    price: 5000,
    date: '12.07.2018',
    qty: 2
  },
  {
    id: '800837',
    name: 'Samsung TV 38” LED Retina',
    category: 'Television',
    price: 2500,
    date: '12.07.2018',
    qty: 5
  },
  {
    id: '810365',
    name: 'Iphone 14 Pro Max',
    category: 'Television',
    price: 5000,
    date: '12.07.2018',
    qty: 2
  },
  {
    id: '810814',
    name: 'Samsung TV 40” LED Retina',
    category: 'Television',
    price: 2500,
    date: '12.07.2018',
    qty: 5
  },
  {
    id: '820385',
    name: 'Iphone 15 Pro Max',
    category: 'Television',
    price: 5000,
    date: '12.07.2018',
    qty: 2
  },
  {
    id: '820885',
    name: 'Samsung TV 42” LED Retina',
    category: 'Television',
    price: 2500,
    date: '12.07.2018',
    qty: 5
  },
  {
    id: '830390',
    name: 'Iphone 16 Pro Max',
    category: 'Television',
    price: 5000,
    date: '12.07.2018',
    qty: 2
  },
  {
    id: '830879',
    name: 'Samsung TV 44” LED Retina',
    category: 'Television',
    price: 2500,
    date: '12.07.2018',
    qty: 5
  },
  {
    id: '900111',
    name: 'Iphone 17 Pro Max',
    category: 'Television',
    price: 5000,
    date: '12.07.2018',
    qty: 2
  },
  {
    id: '900836',
    name: 'Samsung TV 46” LED Retina',
    category: 'Television',
    price: 2500,
    date: '12.07.2018',
    qty: 5
  },
  {
    id: '900112',
    name: 'Iphone 18 Pro Max',
    category: 'Television',
    price: 5000,
    date: '12.07.2018',
    qty: 2
  },
  {
    id: '900871',
    name: 'Samsung TV 48” LED Retina',
    category: 'Television',
    price: 2500,
    date: '12.07.2018',
    qty: 5
  },
  {
    id: '910232',
    name: 'Iphone 19 Pro Max',
    category: 'Television',
    price: 5000,
    date: '12.07.2018',
    qty: 2
  },
  {
    id: '910886',
    name: 'Samsung TV 50” LED Retina',
    category: 'Television',
    price: 2500,
    date: '12.07.2018',
    qty: 5
  },
  {
    id: '910232',
    name: 'Iphone 20 Pro Max',
    category: 'Television',
    price: 5000,
    date: '12.07.2018',
    qty: 2
  }
];

const productreviews: ProductReview[] = [
  {
    name: 'Apple Watch Series 1',
    author: 'Joseph William',
    review: 'The Series 4 is a significant step...',
    rating: 3.5,
    date: '12.07.2018',
    status: 1
  },
  {
    name: 'Apple X2 2',
    author: 'Anshan Handgun',
    review: 'The Series 4 is a significant step...',
    rating: 5.0,
    date: '12.07.2018',
    status: 2
  },
  {
    name: 'Apple Watch Series 3',
    author: 'Larry Doe',
    review: 'The Series 4 is a significant step...',
    rating: 4.5,
    date: '12.07.2018',
    status: 2
  },
  {
    name: 'Apple Watch Series 4',
    author: 'Joseph William',
    review: 'The Series 4 is a significant step...',
    rating: 3.0,
    date: '12.07.2018',
    status: 3
  },
  {
    name: 'Apple X2 5',
    author: 'Anshan Handgun',
    review: 'The Series 4 is a significant step...',
    rating: 2.0,
    date: '12.07.2018',
    status: 2
  },
  {
    name: 'Apple X2 6',
    author: 'Larry Doe',
    review: 'The Series 4 is a significant step...',
    rating: 2.5,
    date: '12.07.2018',
    status: 1
  },
  {
    name: 'Apple Watch Series 7',
    author: 'Joseph William',
    review: 'The Series 4 is a significant step...',
    rating: 4.0,
    date: '12.07.2018',
    status: 3
  },
  {
    name: 'Apple X2 8',
    author: 'Anshan Handgun',
    review: 'The Series 4 is a significant step...',
    rating: 5.0,
    date: '12.07.2018',
    status: 3
  },
  {
    name: 'Apple Watch Series 9',
    author: 'Larry Doe',
    review: 'The Series 4 is a significant step...',
    rating: 4.0,
    date: '12.07.2018',
    status: 1
  },
  {
    name: 'Apple Watch Series 10',
    author: 'Joseph William',
    review: 'The Series 4 is a significant step...',
    rating: 3.5,
    date: '12.07.2018',
    status: 2
  },
  {
    name: 'Apple X2 11',
    author: 'Anshan Handgun',
    review: 'The Series 4 is a significant step...',
    rating: 1.0,
    date: '12.07.2018',
    status: 1
  },
  {
    name: 'Apple X2 12',
    author: 'Larry Doe',
    review: 'The Series 4 is a significant step...',
    rating: 1.5,
    date: '12.07.2018',
    status: 1
  },
  {
    name: 'Apple Watch Series 13',
    author: 'Joseph William',
    review: 'The Series 4 is a significant step...',
    rating: 2.5,
    date: '12.07.2018',
    status: 3
  },
  {
    name: 'Apple X2 14',
    author: 'Anshan Handgun',
    review: 'The Series 4 is a significant step...',
    rating: 5.0,
    date: '12.07.2018',
    status: 1
  },
  {
    name: 'Apple Watch Series 15',
    author: 'Larry Doe',
    review: 'The Series 4 is a significant step...',
    rating: 4.0,
    date: '12.07.2018',
    status: 2
  }
];

mock.onGet('/api/data/customers').reply(() => {
  return [200, customers];
});

mock.onGet('/api/data/orders').reply(() => {
  return [200, orders];
});

mock.onGet('/api/data/products').reply(() => {
  return [200, products];
});

mock.onGet('/api/data/productreviews').reply(() => {
  return [200, productreviews];
});

export { customers, orders, products, productreviews };
