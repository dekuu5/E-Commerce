import { useState } from "react";
import { Link } from "react-router";

export default function CartPage() {
  // In a real app, we'd fetch this from the API
  const [items, setItems] = useState(initialCartItems);
  
  // Calculate subtotal
  const subtotal = items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
  
  // Shipping cost (free over $100)
  const shipping = subtotal >= 100 ? 0 : 10;
  
  // Total cost
  const total = subtotal + shipping;
  
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setItems(
      items.map((item) => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };
  
  return (
    <div className="bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Shopping Cart</h1>
        
        {items.length === 0 ? (
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <div className="lg:col-span-12">
              <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 p-12 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">Your cart is empty</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Looks like you haven't added any items to your cart yet.
                </p>
                <div className="mt-6">
                  <Link
                    to="/products"
                    className="inline-flex items-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:bg-white dark:text-black dark:hover:bg-gray-300"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>

              <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200 dark:divide-gray-700 dark:border-gray-700">
                {items.map((item) => (
                  <li key={item.id} className="flex py-6 sm:py-8">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md sm:h-32 sm:w-32">
                      <img
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-base font-medium text-gray-900 dark:text-white">
                            <Link to={`/products/${item.id}`}>{item.name}</Link>
                          </h3>
                          <p className="ml-4 text-base font-medium text-gray-900 dark:text-white">${item.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.color}</p>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Size: {item.size}</p>
                      </div>

                      <div className="mt-4 flex flex-1 items-end justify-between">
                        <div className="flex">
                          <button
                            type="button"
                            className="rounded-l-md border border-r-0 border-gray-300 dark:border-gray-700 px-2 py-1 text-gray-900 dark:text-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <div className="flex items-center justify-center w-10 border-y border-gray-300 dark:border-gray-700 py-1 px-2 text-base text-gray-900 dark:text-white dark:bg-gray-800">
                            {item.quantity}
                          </div>
                          <button
                            type="button"
                            className="rounded-r-md border border-l-0 border-gray-300 dark:border-gray-700 px-2 py-1 text-gray-900 dark:text-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>

                        <div className="ml-4">
                          <button
                            type="button"
                            className="text-sm font-medium text-black hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                            onClick={() => removeItem(item.id)}
                          >
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="mt-16 rounded-lg bg-gray-50 dark:bg-gray-800 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
            >
              <h2 id="summary-heading" className="text-lg font-medium text-gray-900 dark:text-white">
                Order summary
              </h2>

              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600 dark:text-gray-400">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900 dark:text-white">${subtotal.toFixed(2)}</dd>
                </div>
                
                <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
                  <dt className="text-sm text-gray-600 dark:text-gray-400">Shipping</dt>
                  <dd className="text-sm font-medium text-gray-900 dark:text-white">
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </dd>
                </div>
                
                <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
                  <dt className="text-base font-medium text-gray-900 dark:text-white">Order total</dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-white">${total.toFixed(2)}</dd>
                </div>
              </dl>

              <div className="mt-6">
                <Link
                  to="/checkout"
                  className="w-full rounded-md border border-transparent bg-black px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-50 dark:bg-white dark:text-black dark:hover:bg-gray-300"
                >
                  Checkout
                </Link>
              </div>
              
              <div className="mt-6 text-center text-sm">
                <p className="text-gray-500 dark:text-gray-400">
                  or{' '}
                  <Link to="/products" className="font-medium text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-300">
                    Continue Shopping<span aria-hidden="true"> &rarr;</span>
                  </Link>
                </p>
              </div>
              
              <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500 dark:text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <p className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    Free shipping on orders over $100
                  </p>
                </div>
                <div className="mt-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500 dark:text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <p className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    30-day returns policy
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

const initialCartItems = [
  {
    id: 1,
    name: "Minimalist T-Shirt",
    price: 35,
    quantity: 1,
    color: "Black",
    size: "M",
    imageSrc: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    imageAlt: "Black minimalist t-shirt.",
  },
  {
    id: 3,
    name: "Designer Jacket",
    price: 125,
    quantity: 1,
    color: "Beige",
    size: "L",
    imageSrc: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80",
    imageAlt: "Beige designer jacket.",
  }
]; 