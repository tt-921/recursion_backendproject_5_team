import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import Top from '@/pages/Top';
import Delivery from '@/pages/Delivery';
import ProductList from '@/pages/ProductList';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminLayout from './components/Layout/admin/AdminLayout';
import AdminProductList from '@/pages/admin/AdminProductList';
import AdminProductCreate from '@/pages/admin/AdminProductCreate';
import AdminProductEdit from '@/pages/admin/AdminProductEdit';
import ProductDetail from './pages/ProductDetail';
import AdminCategoryList from '@/pages/admin/AdminCategoryList';
import AdminCategoryCreate from '@/pages/admin/AdminCategoryCreate';
import AdminCategoryEdit from '@/pages/admin/AdminCategoryEdit';
import FavoriteList from './pages/FavoriteList';
import Cart from './pages/Cart';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Top />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/favorites" element={<FavoriteList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route path="admin" element={<AdminLayout />}>
          <Route path="products" element={<AdminProductList />} />
          <Route path="products/create" element={<AdminProductCreate />} />
          <Route path="products/:id" element={<AdminProductEdit />} />
          <Route path="products/:id/edit" element={<AdminProductEdit />} />
          <Route path="categories" element={<AdminCategoryList />} />
          <Route path="categories/create" element={<AdminCategoryCreate />} />
          <Route path="categories/:id" element={<AdminCategoryEdit />} />
          <Route path="categories/:id/edit" element={<AdminCategoryEdit />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
