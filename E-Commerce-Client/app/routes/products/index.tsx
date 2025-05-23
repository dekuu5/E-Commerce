import { useState } from "react";
import { Link } from "react-router";

export default function ProductsIndex() {
  const [filters, setFilters] = useState({
    category: "all",
    price: "all",
    color: "all",
    size: "all",
  });

  const [sortOption, setSortOption] = useState("newest");

  const handleFilterChange = (filter: string, value: string) => {
    setFilters({
      ...filters,
      [filter]: value,
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  // In a real app, this would be fetched from the API
  const filteredProducts = products;

  return (
    <div className="bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="pt-8 pb-24">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">All Products</h1>
          <p className="mt-4 text-base text-gray-500 dark:text-gray-400">
            Browse our collection of modern, stylish clothing and accessories.
          </p>

          <div className="pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
            {/* Mobile filter dialog */}
            <div className="hidden lg:block">
              <div className="divide-y divide-gray-200 dark:divide-gray-700 space-y-10">
                {/* Category filter */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Categories</h3>
                  <ul className="mt-4 space-y-4">
                    {categories.map((category) => (
                      <li key={category.value} className="flex items-center">
                        <input
                          id={`category-${category.value}`}
                          name="category[]"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-white"
                          checked={filters.category === category.value}
                          onChange={() => handleFilterChange("category", category.value)}
                        />
                        <label
                          htmlFor={`category-${category.value}`}
                          className="ml-3 text-sm text-gray-600 dark:text-gray-300"
                        >
                          {category.label}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price filter */}
                <div className="pt-10">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Price</h3>
                  <ul className="mt-4 space-y-4">
                    {prices.map((price) => (
                      <li key={price.value} className="flex items-center">
                        <input
                          id={`price-${price.value}`}
                          name="price[]"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-white"
                          checked={filters.price === price.value}
                          onChange={() => handleFilterChange("price", price.value)}
                        />
                        <label
                          htmlFor={`price-${price.value}`}
                          className="ml-3 text-sm text-gray-600 dark:text-gray-300"
                        >
                          {price.label}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Color filter */}
                <div className="pt-10">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Color</h3>
                  <ul className="mt-4 space-y-4">
                    {colors.map((color) => (
                      <li key={color.value} className="flex items-center">
                        <input
                          id={`color-${color.value}`}
                          name="color[]"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-white"
                          checked={filters.color === color.value}
                          onChange={() => handleFilterChange("color", color.value)}
                        />
                        <label
                          htmlFor={`color-${color.value}`}
                          className="ml-3 text-sm text-gray-600 dark:text-gray-300"
                        >
                          {color.label}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Size filter */}
                <div className="pt-10">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Size</h3>
                  <ul className="mt-4 space-y-4">
                    {sizes.map((size) => (
                      <li key={size.value} className="flex items-center">
                        <input
                          id={`size-${size.value}`}
                          name="size[]"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-white"
                          checked={filters.size === size.value}
                          onChange={() => handleFilterChange("size", size.value)}
                        />
                        <label
                          htmlFor={`size-${size.value}`}
                          className="ml-3 text-sm text-gray-600 dark:text-gray-300"
                        >
                          {size.label}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Product grid */}
            <div className="mt-8 lg:col-span-2 lg:mt-0 xl:col-span-3">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Showing <span className="font-medium">{filteredProducts.length}</span> products
                </p>

                <div className="flex items-center">
                  <label htmlFor="sort" className="sr-only">
                    Sort by
                  </label>
                  <select
                    id="sort"
                    name="sort"
                    className="block w-full rounded-md border-gray-300 py-1.5 pl-3 pr-10 text-base focus:border-black focus:outline-none focus:ring-black sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
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

              <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {filteredProducts.map((product) => (
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

              {/* Pagination */}
              <div className="mt-10 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="flex flex-1 justify-between sm:hidden">
                  <a href="#" className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
                    Previous
                  </a>
                  <a href="#" className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
                    Next
                  </a>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Showing <span className="font-medium">1</span> to <span className="font-medium">12</span> of <span className="font-medium">48</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                      <a href="#" className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:ring-gray-600 dark:hover:bg-gray-700">
                        <span className="sr-only">Previous</span>
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                        </svg>
                      </a>
                      <a href="#" aria-current="page" className="relative z-10 inline-flex items-center bg-black px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:bg-white dark:text-black">
                        1
                      </a>
                      <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:text-white dark:ring-gray-600 dark:hover:bg-gray-700">
                        2
                      </a>
                      <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:text-white dark:ring-gray-600 dark:hover:bg-gray-700">
                        3
                      </a>
                      <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:text-white dark:ring-gray-600 dark:hover:bg-gray-700">
                        4
                      </a>
                      <a href="#" className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:ring-gray-600 dark:hover:bg-gray-700">
                        <span className="sr-only">Next</span>
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const categories = [
  { value: "all", label: "All Categories" },
  { value: "men", label: "Men" },
  { value: "women", label: "Women" },
  { value: "accessories", label: "Accessories" },
];

const prices = [
  { value: "all", label: "All Prices" },
  { value: "under-50", label: "Under $50" },
  { value: "50-100", label: "$50 to $100" },
  { value: "100-200", label: "$100 to $200" },
  { value: "over-200", label: "Over $200" },
];

const colors = [
  { value: "all", label: "All Colors" },
  { value: "black", label: "Black" },
  { value: "white", label: "White" },
  { value: "beige", label: "Beige" },
  { value: "blue", label: "Blue" },
  { value: "gray", label: "Gray" },
];

const sizes = [
  { value: "all", label: "All Sizes" },
  { value: "xs", label: "XS" },
  { value: "s", label: "S" },
  { value: "m", label: "M" },
  { value: "l", label: "L" },
  { value: "xl", label: "XL" },
];

const products = [
  {
    id: 1,
    name: "Minimalist T-Shirt",
    href: "#",
    price: 35,
    color: "Black",
    size: "M",
    imageSrc: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    imageAlt: "Black minimalist t-shirt.",
    isNew: true,
    isSale: false,
  },
  {
    id: 2,
    name: "Modern Blouse",
    href: "#",
    price: 89,
    color: "White",
    size: "S",
    imageSrc: "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=672&q=80",
    imageAlt: "White modern blouse.",
    isNew: false,
    isSale: true,
  },
  {
    id: 3,
    name: "Designer Jacket",
    href: "#",
    price: 125,
    color: "Beige",
    size: "L",
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
    size: "32",
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
    size: "M",
    imageSrc: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
    imageAlt: "White classic button-down shirt.",
    isNew: false,
    isSale: false,
  },
  {
    id: 6,
    name: "Casual Sneakers",
    href: "#",
    price: 79,
    color: "Gray",
    size: "10",
    imageSrc: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    imageAlt: "Gray casual sneakers.",
    isNew: true,
    isSale: false,
  }
]; 