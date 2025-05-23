import { useState } from "react";
import { Link } from "react-router";

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Shipping info
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    // Payment info
    cardName: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
  });
  
  // In a real app, this would come from the cart
  const cartItems = initialCartItems;
  
  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
  
  const shipping = subtotal >= 100 ? 0 : 10;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would submit the order in a real app
    console.log("Order submitted:", { formData, cartItems, total });
    
    // Show confirmation and redirect
    alert("Order placed successfully!");
    window.location.href = "/account/orders";
  };
  
  return (
    <div className="bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 pt-8 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Checkout</h1>

          {/* Checkout steps */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 1 ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}>
                  1
                </div>
                <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">Shipping</span>
              </div>
              <div className={`flex-1 border-t-2 mx-4 ${step >= 2 ? 'border-black dark:border-white' : 'border-gray-200 dark:border-gray-700'}`} />
              <div className="flex items-center">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 2 ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}>
                  2
                </div>
                <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">Payment</span>
              </div>
              <div className={`flex-1 border-t-2 mx-4 ${step >= 3 ? 'border-black dark:border-white' : 'border-gray-200 dark:border-gray-700'}`} />
              <div className="flex items-center">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 3 ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}>
                  3
                </div>
                <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">Review</span>
              </div>
            </div>
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            {/* Main content - Forms */}
            <div className="lg:col-span-7">
              {/* Step 1: Shipping information */}
              {step === 1 && (
                <form onSubmit={handleNextStep}>
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-medium text-gray-900 dark:text-white">Contact information</h2>
                      <div className="mt-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Email address
                        </label>
                        <div className="mt-1">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            autoComplete="email"
                            required
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-lg font-medium text-gray-900 dark:text-white">Shipping information</h2>
                      <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            First name
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="firstName"
                              name="firstName"
                              autoComplete="given-name"
                              required
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                              value={formData.firstName}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Last name
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="lastName"
                              name="lastName"
                              autoComplete="family-name"
                              required
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                              value={formData.lastName}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Address
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="address"
                              name="address"
                              autoComplete="street-address"
                              required
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                              value={formData.address}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="apartment" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Apartment, suite, etc. (optional)
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="apartment"
                              name="apartment"
                              autoComplete="address-line2"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                              value={formData.apartment}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            City
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="city"
                              name="city"
                              autoComplete="address-level2"
                              required
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                              value={formData.city}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            State / Province
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="state"
                              name="state"
                              autoComplete="address-level1"
                              required
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                              value={formData.state}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Postal code
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="zipCode"
                              name="zipCode"
                              autoComplete="postal-code"
                              required
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                              value={formData.zipCode}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Phone
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="phone"
                              name="phone"
                              autoComplete="tel"
                              required
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                              value={formData.phone}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-6">
                      <button
                        type="submit"
                        className="rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-50 dark:bg-white dark:text-black dark:hover:bg-gray-300"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* Step 2: Payment information */}
              {step === 2 && (
                <form onSubmit={handleNextStep}>
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-medium text-gray-900 dark:text-white">Payment method</h2>
                      <div className="mt-4">
                        <div className="rounded-md border border-gray-300 bg-white px-6 py-6 dark:border-gray-600 dark:bg-gray-800">
                          <div className="flex items-center">
                            <input
                              id="card"
                              name="paymentMethod"
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-black focus:ring-black dark:border-gray-600 dark:bg-gray-700"
                              checked
                              readOnly
                            />
                            <label htmlFor="card" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Credit Card
                            </label>
                          </div>

                          <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                            <div className="sm:col-span-2">
                              <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Name on card
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  id="cardName"
                                  name="cardName"
                                  autoComplete="cc-name"
                                  required
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                  value={formData.cardName}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-2">
                              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Card number
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  id="cardNumber"
                                  name="cardNumber"
                                  autoComplete="cc-number"
                                  required
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                  value={formData.cardNumber}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>

                            <div>
                              <label htmlFor="expDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Expiration date (MM/YY)
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  id="expDate"
                                  name="expDate"
                                  autoComplete="cc-exp"
                                  required
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                  value={formData.expDate}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>

                            <div>
                              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                CVV
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  id="cvv"
                                  name="cvv"
                                  autoComplete="cc-csc"
                                  required
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                  value={formData.cvv}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6">
                      <button
                        type="button"
                        className="text-sm font-medium text-black hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                        onClick={handlePrevStep}
                      >
                        <span aria-hidden="true">&larr;</span> Back to Shipping
                      </button>
                      <button
                        type="submit"
                        className="rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-50 dark:bg-white dark:text-black dark:hover:bg-gray-300"
                      >
                        Review Order
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* Step 3: Review order */}
              {step === 3 && (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-medium text-gray-900 dark:text-white">Order summary</h2>
                      <ul role="list" className="mt-6 divide-y divide-gray-200 border-t border-b border-gray-200 dark:divide-gray-700 dark:border-gray-700">
                        {cartItems.map((item) => (
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
                                  <h4 className="text-base font-medium text-gray-900 dark:text-white">
                                    {item.name}
                                  </h4>
                                  <p className="ml-4 text-base font-medium text-gray-900 dark:text-white">${item.price}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.color}</p>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Size: {item.size}</p>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-gray-50 px-6 py-6 dark:bg-gray-800 rounded-lg">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Shipping Information</h3>
                        <div className="mt-4 space-y-1 text-sm">
                          <p className="text-gray-700 dark:text-gray-300">{formData.firstName} {formData.lastName}</p>
                          <p className="text-gray-700 dark:text-gray-300">{formData.address}</p>
                          {formData.apartment && <p className="text-gray-700 dark:text-gray-300">{formData.apartment}</p>}
                          <p className="text-gray-700 dark:text-gray-300">{formData.city}, {formData.state} {formData.zipCode}</p>
                          <p className="text-gray-700 dark:text-gray-300">Phone: {formData.phone}</p>
                          <p className="text-gray-700 dark:text-gray-300">Email: {formData.email}</p>
                        </div>
                      </div>

                      <div className="bg-gray-50 px-6 py-6 dark:bg-gray-800 rounded-lg">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Payment Method</h3>
                        <div className="mt-4 space-y-1 text-sm">
                          <p className="text-gray-700 dark:text-gray-300">Credit Card ending in {formData.cardNumber.slice(-4)}</p>
                          <p className="text-gray-700 dark:text-gray-300">Name: {formData.cardName}</p>
                          <p className="text-gray-700 dark:text-gray-300">Expires: {formData.expDate}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6">
                      <button
                        type="button"
                        className="text-sm font-medium text-black hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                        onClick={handlePrevStep}
                      >
                        <span aria-hidden="true">&larr;</span> Back to Payment
                      </button>
                      <button
                        type="submit"
                        className="rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-50 dark:bg-white dark:text-black dark:hover:bg-gray-300"
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* Order summary sidebar */}
            <div className="mt-10 lg:col-span-5 lg:mt-0">
              <div className="sticky top-6">
                <div className="rounded-lg bg-gray-50 px-6 py-6 dark:bg-gray-800">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">Order summary</h2>

                  <dl className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-gray-600 dark:text-gray-400">Subtotal</dt>
                      <dd className="text-sm font-medium text-gray-900 dark:text-white">${subtotal.toFixed(2)}</dd>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
                      <dt className="text-sm text-gray-600 dark:text-gray-400">Shipping</dt>
                      <dd className="text-sm font-medium text-gray-900 dark:text-white">
                        {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
                      <dt className="text-sm text-gray-600 dark:text-gray-400">Tax</dt>
                      <dd className="text-sm font-medium text-gray-900 dark:text-white">${tax.toFixed(2)}</dd>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
                      <dt className="text-base font-medium text-gray-900 dark:text-white">Order total</dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">${total.toFixed(2)}</dd>
                    </div>
                  </dl>

                  <div className="mt-6">
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">Secure checkout</span>
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">Free shipping on orders over $100</span>
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">30-day money back guarantee</span>
                      </li>
                    </ul>
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