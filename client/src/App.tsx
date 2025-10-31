import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout/Layout";
import Top from "@/pages/Top";
import Delivery from "@/pages/Delivery";
import ProductList from "@/pages/ProductList";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminLayout from "./components/Layout/admin/AdminLayout";
import AdminProductList from "@/pages/admin/AdminProductList";
import AdminProductCreate from "@/pages/admin/AdminProductCreate";
import AdminProductEdit from "@/pages/admin/AdminProductEdit";

function App() {
  return (
    <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Top />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/product-list" element={<ProductList/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
          </Route>
          <Route path="admin" element={<AdminLayout />}>
            <Route path="products" element={<AdminProductList />} />
            <Route path="products/create" element={<AdminProductCreate />} />
            <Route path="products/:id" element={<AdminProductEdit />} />
            <Route path="products/:id/edit" element={<AdminProductEdit />} />
          </Route>
        </Routes>
    </Router>
  );
}

export default App;
