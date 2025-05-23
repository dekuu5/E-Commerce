import { useState } from "react";
import { Link, useParams } from "react-router";

export default function ProductDetail() {
  const { id } = useParams();
  
  // In a real app, we would fetch the product data based on the ID
  const product = products.find(p => p.id.toString() === id) || products[0];
  
  const [selectedSize, setSelectedSize] = useState(product.sizes[0].value);
  const [selectedColor, setSelectedColor] = useState(product.colors[0].value);
  const [quantity, setQuantity] = useState(1);
  
  const incrementQuantity = () => {
    setQuantity(q => q + 1);
  };
  
  const decrementQuantity = () => {
    setQuantity(q => (q > 1 ? q - 1 : 1));
  };
  
  const addToCart = () => {
    // This would add to cart in a real app
    console.log("Adding to cart:", {
      product,
      size: selectedSize,
      color: selectedColor,
      quantity,
    });
    
    // Show success message
    alert("Product added to cart!");
  };
  
  const addToWishlist = () => {
    // This would add to wishlist in a real app
    console.log("Adding to wishlist:", product);
    
    // Show success message
    alert("Product added to wishlist!");
  };
  
  return (
    <div className="bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
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
                    <Link to={`/products/category/${product.category.toLowerCase()}`} className="font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
                      {product.category}
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
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="mt-4 grid grid-cols-4 gap-2">
                <div className="col-span-1 overflow-hidden rounded-lg">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center cursor-pointer"
                  />
                </div>
                {product.additionalImages?.map((image, index) => (
                  <div key={index} className="col-span-1 overflow-hidden rounded-lg">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover object-center cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{product.name}</h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900 dark:text-white">${product.price}</p>
            </div>

            <div className="mt-3">
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <svg
                      key={rating}
                      className={`h-5 w-5 flex-shrink-0 ${
                        product.rating > rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
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
                  {product.reviewCount} reviews
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="text-base text-gray-700 dark:text-gray-300 space-y-6">
                <p>{product.description}</p>
              </div>
            </div>

            <div className="mt-6">
              <div>
                <h3 className="text-sm text-gray-600 dark:text-gray-400">Color</h3>
                <div className="mt-2">
                  <div className="flex items-center space-x-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.value}
                        className={`relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ${
                          selectedColor === color.value ? "ring-2 ring-black dark:ring-white" : ""
                        }`}
                        onClick={() => setSelectedColor(color.value)}
                      >
                        <span
                          className="h-8 w-8 rounded-full border border-black border-opacity-10 dark:border-white dark:border-opacity-10"
                          style={{ backgroundColor: color.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm text-gray-600 dark:text-gray-400">Size</h3>
                  <a href="#" className="text-sm font-medium text-gray-900 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-200">
                    Size guide
                  </a>
                </div>

                <div className="mt-2">
                  <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
                    {product.sizes.map((size) => (
                      <button
                        key={size.value}
                        type="button"
                        className={`flex items-center justify-center rounded-md py-3 px-3 text-sm font-medium uppercase focus:outline-none ${
                          selectedSize === size.value
                            ? "bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                            : "bg-white text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                        } ${
                          size.inStock
                            ? ""
                            : "cursor-not-allowed bg-gray-50 text-gray-200 dark:bg-gray-900 dark:text-gray-700"
                        }`}
                        onClick={() => size.inStock && setSelectedSize(size.value)}
                        disabled={!size.inStock}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm text-gray-600 dark:text-gray-400">Quantity</h3>
                </div>
                <div className="mt-2 flex rounded-md">
                  <button
                    type="button"
                    className="rounded-l-md border border-r-0 border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
                    onClick={decrementQuantity}
                  >
                    -
                  </button>
                  <div className="flex items-center justify-center w-16 border-y border-gray-300 dark:border-gray-700 py-2 px-4 text-base text-gray-900 dark:text-white dark:bg-gray-800">
                    {quantity}
                  </div>
                  <button
                    type="button"
                    className="rounded-r-md border border-l-0 border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
                    onClick={incrementQuantity}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                  onClick={addToCart}
                >
                  Add to cart
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-800"
                  onClick={addToWishlist}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                  <span className="sr-only">Add to wishlist</span>
                </button>
              </div>

              <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
                <div className="space-y-6">
                  <div className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500 dark:text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                    <p className="ml-3 text-sm text-gray-500 dark:text-gray-400">
                      Free shipping on orders over $100
                    </p>
                  </div>
                  <div className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500 dark:text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                    <p className="ml-3 text-sm text-gray-500 dark:text-gray-400">
                      Returns accepted within 30 days
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product details, reviews, etc. */}
        <div className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-10">
          <div className="lg:grid lg:grid-cols-3 lg:gap-x-8">
            <div>
              <h2 className="text-xl font-medium text-gray-900 dark:text-white">Product Details</h2>
            </div>
            <div className="mt-4 lg:col-span-2 lg:mt-0">
              <div className="prose prose-sm max-w-none text-gray-500 dark:text-gray-400">
                <p>{product.fullDescription}</p>
                <ul className="mt-4 space-y-2">
                  {product.details?.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Similar products */}
        <div className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-10">
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">Customers also viewed</h2>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {similarProducts.map((product) => (
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const products = [
  {
    id: 1,
    name: "Minimalist T-Shirt",
    category: "Men",
    price: 35,
    rating: 4,
    reviewCount: 117,
    imageSrc: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    imageAlt: "Black minimalist t-shirt.",
    description: "A classic minimalist t-shirt with a modern fit, perfect for everyday wear.",
    fullDescription: "Crafted from 100% organic cotton, this t-shirt offers both comfort and style. The minimalist design makes it versatile for various occasions, from casual outings to layering under a jacket for a more polished look.",
    details: [
      "100% organic cotton",
      "Medium weight, 180 GSM",
      "Pre-shrunk fabric",
      "Relaxed fit",
      "Machine wash cold"
    ],
    colors: [
      { value: "black", label: "Black", hex: "#000000" },
      { value: "white", label: "White", hex: "#FFFFFF" },
      { value: "gray", label: "Gray", hex: "#808080" }
    ],
    sizes: [
      { value: "xs", label: "XS", inStock: true },
      { value: "s", label: "S", inStock: true },
      { value: "m", label: "M", inStock: true },
      { value: "l", label: "L", inStock: true },
      { value: "xl", label: "XL", inStock: false }
    ],
    additionalImages: [
      { src: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80", alt: "Model wearing t-shirt front view" },
      { src: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80", alt: "Model wearing t-shirt side view" }
    ]
  },
  {
    id: 2,
    name: "Modern Blouse",
    category: "Women",
    price: 89,
    rating: 5,
    reviewCount: 42,
    imageSrc: "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=672&q=80",
    imageAlt: "White modern blouse.",
    description: "An elegant blouse with modern detailing, perfect for both work and evening events.",
    fullDescription: "This sophisticated blouse features a flattering silhouette and contemporary details. Made from high-quality silk blend, it offers a luxurious feel and elegant drape that transitions seamlessly from office to evening wear.",
    details: [
      "85% silk, 15% cotton blend",
      "Lightweight, breathable fabric",
      "Button closure",
      "Regular fit",
      "Dry clean only"
    ],
    colors: [
      { value: "white", label: "White", hex: "#FFFFFF" },
      { value: "cream", label: "Cream", hex: "#FFFDD0" },
      { value: "blue", label: "Light Blue", hex: "#ADD8E6" }
    ],
    sizes: [
      { value: "xs", label: "XS", inStock: true },
      { value: "s", label: "S", inStock: true },
      { value: "m", label: "M", inStock: true },
      { value: "l", label: "L", inStock: false },
      { value: "xl", label: "XL", inStock: true }
    ],
    additionalImages: [
      { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=720&q=80", alt: "Model wearing blouse front view" },
      { src: "https://images.unsplash.com/photo-1602810317536-4f1dddce4c32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80", alt: "Model wearing blouse side view" }
    ]
  }
];

const similarProducts = [
  {
    id: 3,
    name: "Designer Jacket",
    category: "Men",
    price: 125,
    imageSrc: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80",
    imageAlt: "Beige designer jacket.",
    color: "Beige"
  },
  {
    id: 4,
    name: "Slim Fit Pants",
    category: "Men",
    price: 69,
    imageSrc: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
    imageAlt: "Navy slim fit pants.",
    color: "Navy"
  },
  {
    id: 5,
    name: "Classic White Shirt",
    category: "Men",
    price: 49,
    imageSrc: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
    imageAlt: "White classic button-down shirt.",
    color: "White"
  },
  {
    id: 6,
    name: "Casual Sneakers",
    category: "Accessories",
    price: 79,
    imageSrc: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    imageAlt: "Gray casual sneakers.",
    color: "Gray"
  }
]; 