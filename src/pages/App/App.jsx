import "./App.css";



import { AppContainer } from "./App.styled";
import { Route, Routes, Navigate } from "react-router-dom";
import Menu from "../../components/Menu/Menu";
import AuthPage from "../Auth/AuthPage";
import Home from "../Homepage/Homepage";
import AllVendors from "../AllVendors/AllVendors";
import VendorDetail from "../VendorDetail/VendorDetail";
import Cart from "../Cart/Cart";
import AddPackage from "../AddPackage/AddPackage";

import Checkout from "../Checkout/Checkout";
import Packages from "../Packages/Packages";
import UserPage from "../UsersPage/UsersPage";

const App = () => {


  return (
    <AppContainer>
      <Menu />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vendors" element={<AllVendors />} />
        <Route path="/vendors/:id" element={<VendorDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/package/add" element={<AddPackage />} />
        <Route path="/package/:id" element={<Packages />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/userpage" element={<UserPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppContainer>
  );
};

export default App;
