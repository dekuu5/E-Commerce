import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";
import ProductService from "../../services/products";
import type { Product as ProductType } from "../../services/products";
import CartService from "../../services/cart";
import WishlistService from "../../services/wishlist";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const { addToCart: addToCartContext } = useCart();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addingToWishlist, setAddingToWishlist] = useState(false);
  const [success, setSuccess] = useState<{message: string; type: string} | null>(null);
  
  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const response = await ProductService.getProduct(id);
        setProduct(response);
        
        // Set default selected options if available
        if (response.colors && response.colors.length > 0) {
          setSelectedColor(response.colors[0]);
        }
        
        if (response.sizes && response.sizes.length > 0) {
          setSelectedSize(response.sizes[0]);
        }
        
        // Set default selected image
        if (response.images && response.images.length > 0) {
          setSelectedImage(response.images[0]);
        }
        
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);
  
  const incrementQuantity = () => {
    setQuantity(q => Math.min(q + 1, 10)); // Maximum 10 items
  };
  
  const decrementQuantity = () => {
    setQuantity(q => (q > 1 ? q - 1 : 1));
  };
  
  const addToCart = async () => {
    if (!product) return;
    
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      navigate("/auth/login", { state: { from: `/products/${id}` } });
      return;
    }
    
    try {
      setAddingToCart(true);
      
      const cartItem = {
        productId: product._id,
        quantity,
        ...(selectedSize && { size: selectedSize }),
        ...(selectedColor && { color: selectedColor })
      };
      
      await CartService.addToCart(product._id, quantity, selectedColor, selectedSize);
      
      // Update cart context
      addToCartContext(product._id, quantity, selectedColor, selectedSize);
      
      setSuccess({ 
        message: "Product added to cart successfully!", 
        type: "cart" 
      });
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
      
    } catch (err) {
      console.error("Error adding to cart:", err);
      setError("Failed to add product to cart. Please try again.");
    } finally {
      setAddingToCart(false);
    }
  };
  
  const addToWishlist = async () => {
    if (!product) return;
    
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      navigate("/auth/login", { state: { from: `/products/${id}` } });
      return;
    }
    
    try {
      setAddingToWishlist(true);
      
      await WishlistService.addToWishlist(product._id);
      
      setSuccess({ 
        message: "Product added to wishlist successfully!", 
        type: "wishlist" 
      });
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
      
    } catch (err) {
      console.error("Error adding to wishlist:", err);
      setError("Failed to add product to wishlist. Please try again.");
    } finally {
      setAddingToWishlist(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <svg className="animate-spin h-10 w-10 text-black dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Product Not Found</h3>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          {error || "We couldn't find the product you're looking for."}
        </p>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          View all products
        </Link>
      </div>
    );
  }
  
  // Get the current display image
  const displayImage = selectedImage || (product.images && product.images.length > 0 ? product.images[0] : "https://via.placeholder.com/500x500?text=No+Image");
  
  // Extract category name from categories array or use default
  const categoryName = product.category || "Products";
  
  return (
    <div className="bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {success && (
          <div className="mb-6 rounded-md bg-green-50 p-4 dark:bg-green-900/30">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800 dark:text-green-200">{success.message}</p>
                <div className="mt-2">
                  <Link
                    to={success.type === "cart" ? "/cart" : "/wishlist"}
                    className="text-sm font-medium text-green-800 underline dark:text-green-200"
                  >
                    {success.type === "cart" ? "Go to cart" : "View wishlist"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Product images */}
          <div className="lg:max-w-lg lg:self-end">
            <nav aria-label="Breadcrumb">
              <ol role="list" className="flex items-center space-x-2">
                <li>
                  <div className="flex items-center text-sm">
                    <Link to="/products" className="font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
                      Products
                    </Link>
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300 dark:text-gray-600"
                    >
                      <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                    </svg>
                  </div>
                </li>
                <li>
                  <div className="flex items-center text-sm">
                    <Link to={`/products/category/${product.category?.toLowerCase()}`} className="font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
                      {categoryName}
                    </Link>
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300 dark:text-gray-600"
                    >
                      <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                    </svg>
                  </div>
                </li>
                <li className="text-sm">
                  <span className="font-medium text-gray-500 dark:text-gray-400">{product.name}</span>
                </li>
              </ol>
            </nav>

            <div className="mt-4">
              <div className="overflow-hidden rounded-lg">
                <img
                  src={displayImage}
                  alt={product.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              {product.images && product.images.length > 0 && (
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <div 
                      key={index} 
                      className={`col-span-1 overflow-hidden rounded-lg cursor-pointer ${
                        selectedImage === image ? "ring-2 ring-black dark:ring-white" : ""
                      }`}
                      onClick={() => setSelectedImage(image)}
                    >
                      <img
                        src={image}
                        alt={`${product.name} - Image ${index + 1}`}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{product.name}</h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              {product.discount && product.discount > 0 ? (
                <div className="flex items-center">
                  <p className="text-3xl tracking-tight text-gray-900 dark:text-white">${(product.price * (1 - product.discount / 100)).toFixed(2)}</p>
                  <p className="ml-3 text-2xl text-gray-500 dark:text-gray-400 line-through">${product.price.toFixed(2)}</p>
                  <span className="ml-3 inline-flex items-center rounded-full bg-red-500 px-2.5 py-0.5 text-xs font-medium text-white">
                    {product.discount}% Off
                  </span>
                </div>
              ) : (
                <p className="text-3xl tracking-tight text-gray-900 dark:text-white">${product.price.toFixed(2)}</p>
              )}
            </div>

            {product.ratingsAverage !== undefined && (
              <div className="mt-3">
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <svg
                        key={rating}
                        className={`h-5 w-5 flex-shrink-0 ${
                          (product.ratingsAverage || 0) > rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>
                  <p className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                    {product.ratingsAverage || 0} ({product.ratingsQuantity || 0} reviews)
                  </p>
                </div>
              </div>
            )}

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="text-base text-gray-700 dark:text-gray-300 space-y-6">
                <p>{product.description}</p>
              </div>
            </div>

            {product.colors && product.colors.length > 0 && (
              <div className="mt-6">
                <div>
                  <h3 className="text-sm text-gray-600 dark:text-gray-400">Color</h3>
                  <div className="mt-2">
                    <div className="flex items-center space-x-3">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          className={`relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ${
                            selectedColor === color ? "ring-2 ring-black dark:ring-white" : ""
                          }`}
                          onClick={() => setSelectedColor(color)}
                        >
                          <span
                            className="h-8 w-8 rounded-full border border-black border-opacity-10 dark:border-white dark:border-opacity-10 flex items-center justify-center"
                          >
                            {color}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm text-gray-600 dark:text-gray-400">Size</h3>
                  {product.sizeGuide && (
                    <Link to={product.sizeGuide} className="text-sm font-medium text-gray-900 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-200">
                      Size guide
                    </Link>
                  )}
                </div>

                <div className="mt-2">
                  <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        className={`flex items-center justify-center rounded-md py-3 px-3 text-sm font-medium uppercase focus:outline-none ${
                          selectedSize === size
                            ? "bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                            : "bg-white text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm text-gray-600 dark:text-gray-400">Quantity</h3>
              </div>
              <div className="mt-2 flex items-center border border-gray-200 rounded-md dark:border-gray-700">
                <button
                  type="button"
                  className="p-2 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                  onClick={decrementQuantity}
                >
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
                <span className="px-4 py-2 text-gray-900 dark:text-white">{quantity}</span>
                <button
                  type="button"
                  className="p-2 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                  onClick={incrementQuantity}
                >
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-4">
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:bg-white dark:text-black dark:hover:bg-gray-200 disabled:opacity-70 disabled:cursor-not-allowed"
                onClick={addToCart}
                disabled={addingToCart}
              >
                {addingToCart ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white dark:text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding to cart...
                  </span>
                ) : (
                  "Add to cart"
                )}
              </button>

              <button
                type="button"
                className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-3 text-base font-medium text-black hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 disabled:opacity-70 disabled:cursor-not-allowed"
                onClick={addToWishlist}
                disabled={addingToWishlist}
              >
                {addingToWishlist ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding to wishlist...
                  </span>
                ) : (
                  "Add to wishlist"
                )}
              </button>
            </div>

            {product.inStock !== undefined && (
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                {product.inStock ? (
                  <span className="font-medium text-green-600 dark:text-green-400">In stock</span>
                ) : (
                  <span className="font-medium text-red-600 dark:text-red-400">Out of stock</span>
                )}
              </p>
            )}

            {product.features && product.features.length > 0 && (
              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Features</h3>
                <div className="mt-4">
                  <ul className="list-disc pl-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 