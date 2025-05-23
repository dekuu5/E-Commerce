import { useState, useEffect } from "react";
import { Link } from "react-router";
import ProductService from "../../services/products";
import type { Product, ProductQueryParams } from "../../services/products";

export default function ProductsIndex() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 12; // Number of products per page
  
  const [filters, setFilters] = useState<ProductQueryParams>({
    category: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    colors: undefined,
    sizes: undefined,
    sort: "-createdAt", // Default sort by newest
    page: 1,
    limit,
  });

  // Fetch products when filters change
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await ProductService.getProducts(filters);
        setProducts(response.data.products);
        setTotalProducts(response.results);
        setTotalPages(Math.ceil(response.results / limit));
        setCurrentPage(filters.page || 1);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [filters]);

  const handleFilterChange = (filter: string, value: string | undefined) => {
    let newValue: any = value;
    
    // Handle the "all" value
    if (value === "all") {
      newValue = undefined;
    }
    
    // Handle price ranges
    if (filter === "price") {
      const priceRanges: Record<string, {min?: number, max?: number}> = {
        "under-50": { max: 50 },
        "50-100": { min: 50, max: 100 },
        "100-200": { min: 100, max: 200 },
        "over-200": { min: 200 },
      };
      
      if (value && value !== "all" && priceRanges[value]) {
        const range = priceRanges[value];
        setFilters({
          ...filters,
          minPrice: range.min,
          maxPrice: range.max,
          page: 1, // Reset to first page when changing filters
        });
        return;
      } else {
        // Reset price filter
        setFilters({
          ...filters,
          minPrice: undefined,
          maxPrice: undefined,
          page: 1,
        });
        return;
      }
    }
    
    // Handle arrays
    if (filter === "colors" || filter === "sizes") {
      newValue = value === "all" ? undefined : [value];
    }
    
    setFilters({
      ...filters,
      [filter]: newValue,
      page: 1, // Reset to first page when changing filters
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    let sort: string;
    
    switch (value) {
      case "newest":
        sort = "-createdAt";
        break;
      case "price-low-high":
        sort = "price";
        break;
      case "price-high-low":
        sort = "-price";
        break;
      case "best-selling":
        sort = "-sold"; // Assuming the API supports sorting by sales
        break;
      default:
        sort = "-createdAt";
    }
    
    setFilters({
      ...filters,
      sort,
      page: 1, // Reset to first page when changing sort
    });
  };
  
  const handlePageChange = (page: number) => {
    setFilters({
      ...filters,
      page,
    });
    window.scrollTo(0, 0); // Scroll to top when changing page
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.category) count++;
    if (filters.minPrice || filters.maxPrice) count++;
    if (filters.colors && filters.colors.length) count++;
    if (filters.sizes && filters.sizes.length) count++;
    return count;
  };

  return (
    <div className="bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="pt-8 pb-24">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">All Products</h1>
          <p className="mt-4 text-base text-gray-500 dark:text-gray-400">
            Browse our collection of modern, stylish clothing and accessories.
          </p>

          {error && (
            <div className="mt-6 rounded-md bg-red-50 p-4 dark:bg-red-900/30">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800 dark:text-red-200">{error}</p>
                </div>
              </div>
            </div>
          )}

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
                          checked={category.value === "all" ? !filters.category : filters.category === category.value}
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
                    {prices.map((price) => {
                      const isSelected = price.value === "all" 
                        ? !filters.minPrice && !filters.maxPrice
                        : (price.value === "under-50" && filters.maxPrice === 50) ||
                          (price.value === "50-100" && filters.minPrice === 50 && filters.maxPrice === 100) ||
                          (price.value === "100-200" && filters.minPrice === 100 && filters.maxPrice === 200) ||
                          (price.value === "over-200" && filters.minPrice === 200);
                      
                      return (
                        <li key={price.value} className="flex items-center">
                          <input
                            id={`price-${price.value}`}
                            name="price[]"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-white"
                            checked={isSelected}
                            onChange={() => handleFilterChange("price", price.value)}
                          />
                          <label
                            htmlFor={`price-${price.value}`}
                            className="ml-3 text-sm text-gray-600 dark:text-gray-300"
                          >
                            {price.label}
                          </label>
                        </li>
                      );
                    })}
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
                          checked={color.value === "all" 
                            ? !filters.colors 
                            : filters.colors?.includes(color.value)
                          }
                          onChange={() => handleFilterChange("colors", color.value)}
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
                          checked={size.value === "all" 
                            ? !filters.sizes 
                            : filters.sizes?.includes(size.value)
                          }
                          onChange={() => handleFilterChange("sizes", size.value)}
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
                
                {getActiveFilterCount() > 0 && (
                  <div className="pt-10">
                    <button
                      type="button"
                      className="text-sm text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 flex items-center"
                      onClick={() => setFilters({
                        sort: "-createdAt",
                        page: 1,
                        limit,
                      })}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Product grid */}
            <div className="mt-8 lg:col-span-2 lg:mt-0 xl:col-span-3">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Showing <span className="font-medium">{products.length}</span> of <span className="font-medium">{totalProducts}</span> products
                </p>

                <div className="flex items-center">
                  <label htmlFor="sort" className="sr-only">
                    Sort by
                  </label>
                  <select
                    id="sort"
                    name="sort"
                    className="block w-full rounded-md border-gray-300 py-1.5 pl-3 pr-10 text-base focus:border-black focus:outline-none focus:ring-black sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    value={
                      filters.sort === "-createdAt" ? "newest" :
                      filters.sort === "price" ? "price-low-high" :
                      filters.sort === "-price" ? "price-high-low" :
                      filters.sort === "-sold" ? "best-selling" :
                      "newest"
                    }
                    onChange={handleSortChange}
                  >
                    <option value="newest">Newest</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="best-selling">Best Selling</option>
                  </select>
                </div>
              </div>

              {loading ? (
                <div className="mt-12 flex justify-center">
                  <svg className="animate-spin h-10 w-10 text-black dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              ) : products.length === 0 ? (
                <div className="mt-12 flex flex-col items-center justify-center text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">No products found</h3>
                  <p className="mt-1 text-gray-500 dark:text-gray-400">
                    Try adjusting your search or filter to find what you're looking for.
                  </p>
                  {getActiveFilterCount() > 0 && (
                    <button
                      className="mt-4 text-sm font-medium text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
                      onClick={() => setFilters({
                        sort: "-createdAt",
                        page: 1,
                        limit,
                      })}
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
              ) : (
                <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                  {products.map((product) => {
                    // For product image, use the first image from the images array or a placeholder
                    const productImage = product.images && product.images.length > 0 
                      ? product.images[0] 
                      : "https://via.placeholder.com/300x300?text=No+Image";
                    
                    return (
                      <div key={product._id} className="group relative">
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75 dark:bg-gray-800">
                          <img
                            src={productImage}
                            alt={product.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="mt-4 flex justify-between">
                          <div>
                            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-200">
                              <Link to={`/products/${product._id}`}>
                                <span aria-hidden="true" className="absolute inset-0" />
                                {product.name}
                              </Link>
                            </h3>
                            {product.colors && product.colors.length > 0 && (
                              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                {product.colors.length > 1 
                                  ? `${product.colors.length} colors available` 
                                  : product.colors[0]}
                              </p>
                            )}
                          </div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">${product.price.toFixed(2)}</p>
                        </div>
                        <div className="mt-2">
                          {product.isNew && (
                            <span className="inline-flex items-center rounded-full bg-black px-2.5 py-0.5 text-xs font-medium text-white dark:bg-white dark:text-black">
                              New
                            </span>
                          )}
                          {product.discount && product.discount > 0 && (
                            <span className="ml-2 inline-flex items-center rounded-full bg-red-500 px-2.5 py-0.5 text-xs font-medium text-white">
                              {product.discount}% Off
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-6">
                  <div className="flex flex-1 justify-between sm:hidden">
                    <button
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                  <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Showing <span className="font-medium">{Math.min((currentPage - 1) * limit + 1, totalProducts)}</span> to <span className="font-medium">{Math.min(currentPage * limit, totalProducts)}</span> of <span className="font-medium">{totalProducts}</span> results
                      </p>
                    </div>
                    <div>
                      <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <button
                          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                          className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:ring-gray-600 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="sr-only">Previous</span>
                          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                          </svg>
                        </button>
                        
                        {/* Page numbers */}
                        {[...Array(totalPages)].map((_, i) => {
                          const page = i + 1;
                          // Show current page, first and last pages, and pages near current page
                          if (
                            page === 1 || 
                            page === totalPages || 
                            Math.abs(page - currentPage) <= 1
                          ) {
                            return (
                              <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                aria-current={page === currentPage ? "page" : undefined}
                                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                                  page === currentPage
                                    ? "z-10 bg-black text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:bg-white dark:text-black"
                                    : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 dark:text-white dark:ring-gray-600 dark:hover:bg-gray-700"
                                }`}
                              >
                                {page}
                              </button>
                            );
                          }
                          
                          // Show ellipsis for gaps between page numbers
                          if (
                            (page === 2 && currentPage > 3) || 
                            (page === totalPages - 1 && currentPage < totalPages - 2)
                          ) {
                            return (
                              <span
                                key={page}
                                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0 dark:text-gray-300 dark:ring-gray-600"
                              >
                                ...
                              </span>
                            );
                          }
                          
                          return null;
                        })}
                        
                        <button
                          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                          disabled={currentPage === totalPages}
                          className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:ring-gray-600 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="sr-only">Next</span>
                          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
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