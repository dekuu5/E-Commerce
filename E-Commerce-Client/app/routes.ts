import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("products", "routes/products/index.tsx", [
    route(":id", "routes/products/detail.tsx"),
    route("category/:categoryId", "routes/products/category.tsx"),
  ]),
  route("cart", "routes/cart.tsx"),
  route("wishlist", "routes/wishlist.tsx"),
  route("checkout", "routes/checkout.tsx"),
  route("auth", "routes/auth/layout.tsx", [
    route("login", "routes/auth/login.tsx"),
    route("register", "routes/auth/register.tsx"),
  ]),
  route("account", "routes/account/index.tsx", [
    route("orders", "routes/account/orders.tsx"),
    route("orders/:id", "routes/account/order-detail.tsx"),
  ]),
] satisfies RouteConfig;
