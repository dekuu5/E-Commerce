import { useState } from "react";
import { Link } from "react-router";

export default function WishlistPage() {
  // In a real app, this would be fetched from the API
  const [items, setItems] = useState(initialWishlistItems);
  
  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };
  
  const addToCart = (item: WishlistItem) => {
    // This would add the item to cart in a real app
    console.log("Adding to cart:", item);
    
    // Show success message
    alert(`${item.name} added to cart!`);
  };
  
  return (
    <div className="bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Wishlist</h1>
        
        {items.length === 0 ? (
          <div className="mt-12">
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 p-12 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">Your wishlist is empty</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Save items you love to your wishlist. Review them anytime and easily move them to your cart.
              </p>
              <div className="mt-6">
                <Link
                  to="/products"
                  className="inline-flex items-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:bg-white dark:text-black dark:hover:bg-gray-300"
                >
                  Browse Products
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-12">
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {items.map((item) => (
                <div key={item.id} className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75 dark:bg-gray-800">
                    <img
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-gray-200">
                        <Link to={`/products/${item.id}`}>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {item.name}
                        </Link>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.color}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">${item.price}</p>
                  </div>
                  
                  <div className="mt-4 flex space-x-2">
                    <button
                      type="button"
                      className="flex-1 rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:bg-white dark:text-black dark:hover:bg-gray-300"
                      onClick={() => addToCart(item)}
                    >
                      Add to Cart
                    </button>
                    <button
                      type="button"
                      className="flex-none rounded-md border border-gray-300 py-2 px-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                      onClick={() => removeItem(item.id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

type WishlistItem = {
  id: number;
  name: string;
  price: number;
  color: string;
  imageSrc: string;
  imageAlt: string;
};

const initialWishlistItems: WishlistItem[] = [
  {
    id: 2,
    name: "Modern Blouse",
    price: 89,
    color: "White",
    imageSrc: "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=672&q=80",
    imageAlt: "White modern blouse.",
  },
  {
    id: 4,
    name: "Slim Fit Pants",
    price: 69,
    color: "Navy",
    imageSrc: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
    imageAlt: "Navy slim fit pants.",
  },
  {
    id: 6,
    name: "Casual Sneakers",
    price: 79,
    color: "Gray",
    imageSrc: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    imageAlt: "Gray casual sneakers.",
  },
  {
    id: 9,
    name: "Minimal Watch",
    price: 149,
    color: "Silver",
    imageSrc: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
    imageAlt: "Silver minimal watch.",
  },
]; 