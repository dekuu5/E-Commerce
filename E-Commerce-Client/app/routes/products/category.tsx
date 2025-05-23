import { useState } from "react";
import { Link, useParams } from "react-router";

export default function CategoryPage() {
  const { categoryId } = useParams();
  
  // In a real app, we would fetch these from the API
  const categoryData = categories.find(c => c.id === categoryId) || categories[0];
  
  // Filter products by category
  const categoryProducts = products.filter(
    (product) => product.category.toLowerCase() === categoryId?.toLowerCase()
  );
  
  const [sortOption, setSortOption] = useState("newest");
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };
  
  return (
    <div className="bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="pt-8 pb-24">
          {/* Hero section */}
          <div className="relative overflow-hidden rounded-lg">
            <div className="absolute inset-0">
              <img
                src={categoryData.imageSrc}
                alt={categoryData.name}
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gray-900 bg-opacity-60"></div>
            </div>
            <div className="relative py-24 px-8 sm:px-12 lg:px-16">
              <h1 className="text-4xl font-bold tracking-tight text-white">{categoryData.name}</h1>
              <p className="mt-6 max-w-lg text-xl text-gray-300">{categoryData.description}</p>
            </div>
          </div>

          <div className="pt-12">
            {/* Product grid header with sorting */}
            <div className="flex items-center justify-between pb-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Products ({categoryProducts.length})</h2>
              
              <div className="flex items-center">
                <label htmlFor="sort" className="mr-2 text-sm text-gray-700 dark:text-gray-300">
                  Sort by
                </label>
                <select
                  id="sort"
                  name="sort"
                  className="block rounded-md border-gray-300 py-1.5 pl-3 pr-10 text-base focus:border-black focus:outline-none focus:ring-black sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  value={sortOption}
                  onChange={handleSortChange}
                >
                  <option value="newest">Newest</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="best-selling">Best Selling</option>
                </select>
              </div>
            </div>

            {/* Product grid */}
            {categoryProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {categoryProducts.map((product) => (
                  <div key={product.id} className="group relative">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75 dark:bg-gray-800">
                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="h-full w-full object-cover object-center"
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
                    <div className="mt-2">
                      {product.isNew && (
                        <span className="inline-flex items-center rounded-full bg-black px-2.5 py-0.5 text-xs font-medium text-white dark:bg-white dark:text-black">
                          New
                        </span>
                      )}
                      {product.isSale && (
                        <span className="ml-2 inline-flex items-center rounded-full bg-red-500 px-2.5 py-0.5 text-xs font-medium text-white">
                          Sale
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">No products found</h3>
                <p className="mt-1 text-gray-500 dark:text-gray-400">
                  We couldn't find any products in this category. Please check back later.
                </p>
                <Link
                  to="/products"
                  className="mt-6 inline-flex items-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                >
                  View all products
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const categories = [
  {
    id: "men",
    name: "Men's Collection",
    description: "Explore our stylish and comfortable men's clothing, from casual everyday wear to formal options.",
    imageSrc: "https://images.unsplash.com/photo-1550995694-3f5f4a7e1bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
  },
  {
    id: "women",
    name: "Women's Collection",
    description: "Discover our elegant and contemporary women's clothing for every occasion and season.",
    imageSrc: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1483&q=80",
  },
  {
    id: "accessories",
    name: "Accessories",
    description: "Complete your look with our modern accessories, from jewelry to bags and beyond.",
    imageSrc: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
];

const products = [
  {
    id: 1,
    name: "Minimalist T-Shirt",
    href: "#",
    price: 35,
    color: "Black",
    category: "Men",
    imageSrc: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    imageAlt: "Black minimalist t-shirt.",
    isNew: true,
    isSale: false,
  },
  {
    id: 3,
    name: "Designer Jacket",
    href: "#",
    price: 125,
    color: "Beige",
    category: "Men",
    imageSrc: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80",
    imageAlt: "Beige designer jacket.",
    isNew: true,
    isSale: false,
  },
  {
    id: 4,
    name: "Slim Fit Pants",
    href: "#",
    price: 69,
    color: "Navy",
    category: "Men",
    imageSrc: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
    imageAlt: "Navy slim fit pants.",
    isNew: false,
    isSale: false,
  },
  {
    id: 5,
    name: "Classic White Shirt",
    href: "#",
    price: 49,
    color: "White",
    category: "Men",
    imageSrc: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
    imageAlt: "White classic button-down shirt.",
    isNew: false,
    isSale: false,
  },
  {
    id: 2,
    name: "Modern Blouse",
    href: "#",
    price: 89,
    color: "White",
    category: "Women",
    imageSrc: "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=672&q=80",
    imageAlt: "White modern blouse.",
    isNew: false,
    isSale: true,
  },
  {
    id: 7,
    name: "Summer Dress",
    href: "#",
    price: 79,
    color: "Floral",
    category: "Women",
    imageSrc: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=746&q=80",
    imageAlt: "Floral summer dress.",
    isNew: true,
    isSale: false,
  },
  {
    id: 8,
    name: "Elegant Pants",
    href: "#",
    price: 95,
    color: "Black",
    category: "Women",
    imageSrc: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    imageAlt: "Black elegant pants.",
    isNew: false,
    isSale: false,
  },
  {
    id: 6,
    name: "Casual Sneakers",
    href: "#",
    price: 79,
    color: "Gray",
    category: "Accessories",
    imageSrc: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    imageAlt: "Gray casual sneakers.",
    isNew: true,
    isSale: false,
  },
  {
    id: 9,
    name: "Minimal Watch",
    href: "#",
    price: 149,
    color: "Silver",
    category: "Accessories",
    imageSrc: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
    imageAlt: "Silver minimal watch.",
    isNew: false,
    isSale: true,
  },
  {
    id: 10,
    name: "Leather Bag",
    href: "#",
    price: 199,
    color: "Brown",
    category: "Accessories",
    imageSrc: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=738&q=80",
    imageAlt: "Brown leather bag.",
    isNew: false,
    isSale: false,
  },
]; 