import { Refine, Authenticated } from "@refinedev/core";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
//import dataProvider from "@refinedev/simple-rest";
import { LoginPage } from "./pages/login";
import { SalesPerProduct } from "./pages/sales_per_product/list";
import { SalesPerCategory } from "./pages/sales_per_category/list";
import { authProvider } from "./authProvider";
import { Layout } from "./components/layout";
import { dataProvider } from "./dataProvider"; // your custom wrapper

const API_URL = "http://localhost:5001/api";

function App() {
  return (
    <BrowserRouter>
      <Refine
        dataProvider={dataProvider}
        authProvider={authProvider}
        resources={[
          { name: "sales_per_product", list: "/sales_per_product" },
          { name: "sales_per_category", list: "/sales_per_category" },
        ]}
        Layout={Layout}
      >
        <Routes>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Login page */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes */}
          <Route
            path="/sales_per_product"
            element={
              <Authenticated key="auth-endpoint1" fallback={<Navigate to="/login" />}>
                <SalesPerProduct />
              </Authenticated>
            }
          />
          <Route
            path="/sales_per_category"
            element={
              <Authenticated key="auth-endpoint1" fallback={<Navigate to="/login" />}>
               <SalesPerCategory />
              </Authenticated>
            }
          />
        </Routes>
      </Refine>
    </BrowserRouter>
  );
}

export default App;
