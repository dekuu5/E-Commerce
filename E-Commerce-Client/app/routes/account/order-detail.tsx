import { Link, useParams } from "react-router";

export default function OrderDetailPage() {
  const { id } = useParams();
  
  // In a real app, this would be fetched from the API based on the ID
  const order = {
    id: id || "WU88191111",
    date: "January 22, 2023",
    total: "$129.00",
    subtotal: "$119.00",
    shipping: "$10.00",
    tax: "$0.00",
    status: "Delivered",
    deliveryDate: "January 28, 2023",
    paymentMethod: "Visa ending in 1234",
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      apartment: "Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
    },
    items: [
      {
        id: 1,
        name: "Minimalist T-Shirt",
        price: "$35.00",
        quantity: 1,
        color: "Black",
        size: "M",
        imageSrc: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
        imageAlt: "Black minimalist t-shirt.",
      },
      {
        id: 3,
        name: "Designer Jacket",
        price: "$84.00",
        quantity: 1,
        color: "Beige",
        size: "L",
        imageSrc: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80",
        imageAlt: "Beige designer jacket.",
      },
    ],
    timeline: [
      { id: 1, status: "Order placed", date: "January 22, 2023 9:30 AM" },
      { id: 2, status: "Processing", date: "January 22, 2023 11:45 AM" },
      { id: 3, status: "Shipped", date: "January 24, 2023 2:15 PM" },
      { id: 4, status: "Delivered", date: "January 28, 2023 3:45 PM" },
    ],
  };

  return (
    <div className="bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div>
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2">
                <li>
                  <Link 
                    to="/account"
                    className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    Account
                  </Link>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </li>
                <li>
                  <Link 
                    to="/account/orders"
                    className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </li>
                <li>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Order {order.id}
                  </span>
                </li>
              </ol>
            </nav>

            <div className="mt-4 flex items-center justify-between">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                Order Details
              </h1>
              <span
                className={`inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : order.status === "Processing"
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                    : order.status === "Shipped"
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                }`}
              >
                {order.status}
              </span>
            </div>
            
            <div className="mt-2 flex flex-col sm:flex-row sm:flex-wrap sm:space-x-6">
              <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                Ordered on {order.date}
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                </svg>
                Total: {order.total}
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                </svg>
                Order ID: {order.id}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Order items */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow overflow-hidden sm:rounded-lg dark:bg-gray-800">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">Order Items</h2>
                </div>
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                  {order.items.map((item) => (
                    <li key={item.id} className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                          <img
                            src={item.imageSrc}
                            alt={item.imageAlt}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-0 mt-4 sm:mt-0 sm:ml-6 flex-1">
                          <div className="flex justify-between">
                            <h3 className="text-base font-medium text-gray-900 dark:text-white">
                              <Link to={`/products/${item.id}`}>{item.name}</Link>
                            </h3>
                            <p className="ml-4 text-base font-medium text-gray-900 dark:text-white">{item.price}</p>
                          </div>
                          <div className="mt-1 flex text-sm">
                            <p className="text-gray-500 dark:text-gray-400">{item.color}</p>
                            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500 dark:text-gray-400 dark:border-gray-700">
                              Size: {item.size}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                          
                          <div className="mt-4 flex space-x-2">
                            <Link
                              to={`/products/${item.id}`}
                              className="text-sm font-medium text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
                            >
                              View Product
                            </Link>
                            <span className="mx-2 text-gray-400">|</span>
                            <button
                              type="button"
                              className="text-sm font-medium text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
                            >
                              Buy Again
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Order timeline */}
              <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg dark:bg-gray-800">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">Order Status</h2>
                </div>
                <div className="p-4 sm:p-6">
                  <ol className="relative border-l border-gray-200 dark:border-gray-700">
                    {order.timeline.map((event, index) => (
                      <li key={event.id} className="mb-10 ml-4 last:mb-0">
                        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-800 dark:bg-gray-700"></div>
                        <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                          {event.date}
                        </time>
                        <h3 className="text-base font-medium text-gray-900 dark:text-white">
                          {event.status}
                        </h3>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
            
            {/* Order summary */}
            <div>
              <div className="bg-white shadow overflow-hidden sm:rounded-lg dark:bg-gray-800">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">Order Summary</h2>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <dl className="space-y-3">
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-600 dark:text-gray-400">Subtotal</dt>
                      <dd className="text-sm font-medium text-gray-900 dark:text-white">{order.subtotal}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-600 dark:text-gray-400">Shipping</dt>
                      <dd className="text-sm font-medium text-gray-900 dark:text-white">{order.shipping}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-600 dark:text-gray-400">Tax</dt>
                      <dd className="text-sm font-medium text-gray-900 dark:text-white">{order.tax}</dd>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-3 dark:border-gray-700">
                      <dt className="text-base font-medium text-gray-900 dark:text-white">Order total</dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">{order.total}</dd>
                    </div>
                  </dl>
                </div>
              </div>
              
              <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg dark:bg-gray-800">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">Shipping Information</h2>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <div className="text-sm">
                    <p className="font-medium text-gray-900 dark:text-white">{order.shippingAddress.name}</p>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">{order.shippingAddress.street}</p>
                    {order.shippingAddress.apartment && (
                      <p className="text-gray-500 dark:text-gray-400">{order.shippingAddress.apartment}</p>
                    )}
                    <p className="text-gray-500 dark:text-gray-400">
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">{order.shippingAddress.country}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg dark:bg-gray-800">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">Payment Information</h2>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <p className="text-sm text-gray-500 dark:text-gray-400">{order.paymentMethod}</p>
                </div>
              </div>
              
              <div className="mt-8 flex flex-col space-y-3">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:bg-white dark:text-black dark:hover:bg-gray-300"
                >
                  Track Order
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                  Return Items
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                  Download Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 