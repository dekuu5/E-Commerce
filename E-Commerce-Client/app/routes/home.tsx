import { Link } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ModernWear - Stylish Modern Clothing" },
    { name: "description", content: "Shop the latest trends in modern fashion. Find stylish clothing for men and women." },
  ];
}

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-950">
      {/* Hero section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Fashion"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900 bg-opacity-60"></div>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Modern Style for <br />
            Modern Life
          </h1>
          <p className="mt-6 max-w-lg text-xl text-gray-300">
            Discover the latest trends in contemporary fashion, designed for comfort and style.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link
              to="/products"
              className="rounded-md bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-100"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Categories section */}
      <div className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="sm:flex sm:items-baseline sm:justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Shop by Category</h2>
            <Link to="/products" className="hidden text-sm font-semibold text-gray-900 hover:text-gray-500 dark:text-gray-400 dark:hover:text-white sm:block">
              Browse all categories
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3">
            {categories.map((category) => (
              <div key={category.name} className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white dark:bg-gray-800">
                  <img
                    src={category.imageSrc}
                    alt={category.imageAlt}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-base font-semibold text-gray-900 dark:text-white">
                  <Link to={category.href}>
                    <span className="absolute inset-0" />
                    {category.name}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{category.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 sm:hidden">
            <Link to="/products" className="block text-sm font-semibold text-gray-900 hover:text-gray-500 dark:text-gray-400 dark:hover:text-white">
              Browse all categories
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Featured products section */}
      <div className="bg-gray-50 dark:bg-gray-900/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="sm:flex sm:items-baseline sm:justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Featured Products</h2>
            <Link to="/products" className="hidden text-sm font-semibold text-gray-900 hover:text-gray-500 dark:text-gray-400 dark:hover:text-white sm:block">
              View all products
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-200">
                      <Link to={`/products/${product.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{product.color}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">${product.price}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 sm:hidden">
            <Link to="/products" className="block text-sm font-semibold text-gray-900 hover:text-gray-500 dark:text-gray-400 dark:hover:text-white">
              View all products
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Newsletter section */}
      <div className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 px-6 py-6 sm:py-8 sm:px-12">
            <div className="md:flex md:items-center md:justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white md:w-0 md:flex-1">
                Join our newsletter
              </h2>
              <div className="mt-4 md:ml-4 md:mt-0 md:flex-1">
                <form className="sm:flex">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Enter your email"
                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-5 py-3 placeholder-gray-500 shadow-sm focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white dark:bg-gray-700 dark:text-white text-sm"
                  />
                  <button
                    type="submit"
                    className="mt-3 flex w-full items-center justify-center rounded-md border border-transparent bg-black dark:bg-white px-5 py-3 text-sm font-medium text-white dark:text-black shadow-sm hover:bg-gray-800 dark:hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const categories = [
  {
    name: "Men's Collection",
    description: 'Stylish and comfortable modern wear for men.',
    href: '/products/category/men',
    imageSrc: 'https://images.unsplash.com/photo-1516914589923-f105f1535f88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    imageAlt: "Men's collection",
  },
  {
    name: "Women's Collection",
    description: 'Contemporary and elegant fashion for women.',
    href: '/products/category/women',
    imageSrc: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=720&q=80',
    imageAlt: "Women's collection",
  },
  {
    name: 'Accessories',
    description: 'Complete your look with our modern accessories.',
    href: '/products/category/accessories',
    imageSrc: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
    imageAlt: 'Accessories collection',
  },
];

const products = [
  {
    id: 1,
    name: 'Minimalist T-Shirt',
    href: '#',
    price: 35,
    color: 'Black',
    imageSrc: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
    imageAlt: 'Black minimalist t-shirt.',
  },
  {
    id: 2,
    name: 'Modern Blouse',
    href: '#',
    price: 89,
    color: 'White',
    imageSrc: 'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=672&q=80',
    imageAlt: 'White modern blouse.',
  },
  {
    id: 3,
    name: 'Designer Jacket',
    href: '#',
    price: 125,
    color: 'Beige',
    imageSrc: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80',
    imageAlt: 'Beige designer jacket.',
  },
  {
    id: 4,
    name: 'Slim Fit Pants',
    href: '#',
    price: 69,
    color: 'Navy',
    imageSrc: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80',
    imageAlt: 'Navy slim fit pants.',
  },
];
