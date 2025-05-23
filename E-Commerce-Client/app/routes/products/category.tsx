import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import ProductService from "../../services/products";
import type { Product, ProductQueryParams } from "../../services/products";

export default function CategoryPage() {
  const { categoryId } = useParams();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryData, setCategoryData] = useState<{ 
    id: string;
    name: string;
    description: string;
    imageSrc: string;
  } | null>(null);
  
  const [filters, setFilters] = useState<ProductQueryParams>({
    category: categoryId,
    sort: "-createdAt", // Default sort by newest
    page: 1,
    limit: 12, // Number of products per page
  });

  // Fetch category data
  useEffect(() => {
    const category = categories.find(c => c.id === categoryId);
    if (category) {
      setCategoryData(category);
    } else {
      // If we don't have predefined category data, try to get it from API
      // or use a default
      setCategoryData({
        id: categoryId || "",
        name: categoryId ? `${categoryId.charAt(0).toUpperCase()}${categoryId.slice(1)}` : "Products",
        description: "Browse our collection of high-quality products.",
        imageSrc: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      });
    }
  }, [categoryId]);

  // Update filters when categoryId changes
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      category: categoryId,
      page: 1, // Reset to first page
    }));
  }, [categoryId]);
  
  // Fetch products when filters or categoryId change
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await ProductService.getProducts(filters);
        setProducts(response.data.products);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    if (categoryId) {
      fetchProducts();
    }
  }, [filters, categoryId]);

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
    });
  };
  
  return (
    <div className="bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="pt-8 pb-24">
          {/* Hero section */}
          {categoryData && (
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
          )}

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

          <div className="pt-12">
            {/* Product grid header with sorting */}
            <div className="flex items-center justify-between pb-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Products {!loading && `(${products.length})`}
              </h2>
              
              <div className="flex items-center">
                <label htmlFor="sort" className="mr-2 text-sm text-gray-700 dark:text-gray-300">
                  Sort by
                </label>
                <select
                  id="sort"
                  name="sort"
                  className="block rounded-md border-gray-300 py-1.5 pl-3 pr-10 text-base focus:border-black focus:outline-none focus:ring-black sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  value={
                    filters.sort === "-createdAt" ? "newest" :
                    filters.sort === "price" ? "price-low-high" :
                    filters.sort === "-price" ? "price-high-low" :
                    filters.sort === "-sold" ? "best-selling" :
                    "newest"
                  }
                  onChange={handleSortChange}
                  disabled={loading}
                >
                  <option value="newest">Newest</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="best-selling">Best Selling</option>
                </select>
              </div>
            </div>

            {/* Product grid */}
            {loading ? (
              <div className="mt-12 flex justify-center">
                <svg className="animate-spin h-10 w-10 text-black dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
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