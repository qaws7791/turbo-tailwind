import { BrowserRouter, Route, Routes } from "react-router";
import DashboardLayout from "./routes/layouts/dashboard";
import PublicOnlyLayout from "./routes/layouts/public-only";
import DashboardPage from "./routes/pages/dashboard";
import LoginPage from "./routes/pages/login";
import ProductsPage from "./routes/pages/products";
import RootPage from "./routes/pages/root";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<RootPage />} />

        <Route element={<PublicOnlyLayout />}>
          <Route path="login" element={<LoginPage />} />
        </Route>

        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="orders" element={<h1>Orders</h1>} />
          <Route path="customers" element={<h1>Customers</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
