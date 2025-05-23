import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    passwordconfirm: "",
    phone: "",
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  
  const navigate = useNavigate();
  const { register, error: authError, clearError, isAuthenticated } = useAuth();

  // If user is already authenticated, redirect to home
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Clear any previous auth errors when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setError("");
    clearError();
    
    // Basic validation
    if (formData.password !== formData.passwordconfirm) {
      setError("Passwords do not match");
      return;
    }
    
    if (!agreeToTerms) {
      setError("You must agree to the terms and conditions");
      return;
    }
    
    try {
      setIsSubmitting(true);
      await register(formData);
      setRegisterSuccess(true);
      
      // Redirect to login after a short delay
      setTimeout(() => {
        navigate("/auth/login");
      }, 3000);
      
    } catch (err: any) {
      console.error("Registration failed:", err);
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (registerSuccess) {
    return (
      <div className="text-center py-12">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">Registration Successful!</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Your account has been created successfully.</p>
        <p className="mt-1 text-gray-600 dark:text-gray-400">You'll be redirected to login shortly...</p>
        <div className="mt-6">
          <Link
            to="/auth/login"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Create a new account</h2>
      </div>

      {(error || authError) && (
        <div className="mt-4 rounded-md bg-red-50 p-4 dark:bg-red-900/30">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">{error || authError}</h3>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div>
              <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                First name
              </label>
              <div className="mt-1">
                <input
                  id="firstname"
                  name="firstname"
                  type="text"
                  autoComplete="given-name"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  value={formData.firstname}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div>
              <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Last name
              </label>
              <div className="mt-1">
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  autoComplete="family-name"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  value={formData.lastname}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Phone number
            </label>
            <div className="mt-1">
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                value={formData.phone}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                value={formData.password}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div>
            <label htmlFor="passwordconfirm" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm password
            </label>
            <div className="mt-1">
              <input
                id="passwordconfirm"
                name="passwordconfirm"
                type="password"
                autoComplete="new-password"
                required
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                value={formData.passwordconfirm}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black dark:border-gray-600 dark:bg-gray-700"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              required
              disabled={isSubmitting}
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
              I agree to the{" "}
              <Link to="/terms" className="font-medium text-black hover:text-gray-800 dark:text-white dark:hover:text-gray-300">
                Terms
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="font-medium text-black hover:text-gray-800 dark:text-white dark:hover:text-gray-300">
                Privacy Policy
              </Link>
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:bg-white dark:text-black dark:hover:bg-gray-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white dark:text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                "Create account"
              )}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500 dark:bg-gray-800 dark:text-gray-400">Or</span>
            </div>
          </div>

          <div className="mt-6">
            <Link
              to="/auth/login"
              className="flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            >
              Sign in to existing account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
} 