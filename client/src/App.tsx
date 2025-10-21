import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout/Layout";
import Top from "@/pages/Top";
import Delivery from "@/pages/Delivery";
import ProductList from "@/pages/ProductList";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/product-list" element={<ProductList/>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
