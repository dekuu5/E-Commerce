import { Link } from "react-router";

export default function AccountPage() {
  // In a real app, this would be fetched from the API
  const user = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: {
      street: "123 Main St",
      apartment: "Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
    },
  };

  const recentOrders = [
    {
      id: "WU88191111",
      date: "January 22, 2023",
      total: "$129.00",
      status: "Delivered",
      items: 2,
    },
    {
      id: "WU88191112",
      date: "March 14, 2023",
      total: "$89.00",
      status: "Processing",
      items: 1,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">My Account</h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Manage your account settings and view your order history.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Account Information Card */}
            <div className="col-span-2 bg-white p-6 shadow rounded-lg dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Account Information</h2>
                <button
                  type="button"
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                  Edit
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Contact Information</h3>
                  <div className="mt-2 space-y-1 text-sm">
                    <p className="text-gray-900 dark:text-white">{user.firstName} {user.lastName}</p>
                    <p className="text-gray-900 dark:text-white">{user.email}</p>
                    <p className="text-gray-900 dark:text-white">{user.phone}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Shipping Address</h3>
                  <div className="mt-2 space-y-1 text-sm">
                    <p className="text-gray-900 dark:text-white">{user.firstName} {user.lastName}</p>
                    <p className="text-gray-900 dark:text-white">{user.address.street}</p>
                    {user.address.apartment && (
                      <p className="text-gray-900 dark:text-white">{user.address.apartment}</p>
                    )}
                    <p className="text-gray-900 dark:text-white">
                      {user.address.city}, {user.address.state} {user.address.zipCode}
                    </p>
                    <p className="text-gray-900 dark:text-white">{user.address.country}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Settings</h3>
                <div className="mt-2 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:bg-white dark:text-black dark:hover:bg-gray-300"
                  >
                    Change password
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                  >
                    Notification preferences
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Links Card */}
            <div className="bg-white p-6 shadow rounded-lg dark:bg-gray-800">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Quick Links</h2>
              <ul className="mt-6 divide-y divide-gray-200 dark:divide-gray-700">
                <li className="py-4">
                  <Link
                    to="/account/orders"
                    className="flex items-center justify-between text-sm hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <span className="font-medium text-gray-900 dark:text-white">Order History</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </Link>
                </li>
                <li className="py-4">
                  <Link
                    to="/wishlist"
                    className="flex items-center justify-between text-sm hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <span className="font-medium text-gray-900 dark:text-white">Wishlist</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </Link>
                </li>
                <li className="py-4">
                  <button
                    className="w-full flex items-center justify-between text-sm hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <span className="font-medium text-gray-900 dark:text-white">Sign out</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white p-6 shadow rounded-lg dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Orders</h2>
              <Link
                to="/account/orders"
                className="text-sm font-medium text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
              >
                View all orders
              </Link>
            </div>

            <div className="mt-6 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                    <thead>
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                          Order
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                          Date
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                          Status
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                          Total
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                          <span className="sr-only">View</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {recentOrders.map((order) => (
                        <tr key={order.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white">
                            {order.id}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                            {order.date}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <span
                              className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                order.status === "Delivered"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                            {order.total}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <Link
                              to={`/account/orders/${order.id}`}
                              className="text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
                            >
                              View<span className="sr-only">, order {order.id}</span>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 