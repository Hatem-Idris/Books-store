import { Route, Routes } from "react-router-dom";
import Loginpage from "../pages/Loginpage";
import Registerpage from "../pages/Registerpage";
import Homepage from "../pages/Homepage";
import Aboutpage from "../pages/Aboutpage";
import Forgetpassword from "../pages/Forgetpass";
import Otpcode from "../pages/Otpcode";
import Newpassword from "../pages/Newpassword";
import Bookspage from "../pages/Bookspage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import Updatingform from "../pages/Updatingform";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Wishlist from "../pages/Wishlist";
export default function Approuter() {
  return (
    <div>
      <Routes>
        <Route path="/Login" element={<Loginpage />} />
        <Route path="/Register" element={<Registerpage />} />
        <Route path="/Forget" element={<Forgetpassword />} />
        <Route path="/OTP" element={<Otpcode />} />
        <Route path="/Newpass" element={<Newpassword />} />
        <Route path="/Updatingform" element={<Updatingform/>} />
        <Route path="/" element={<Homepage />} />
        <Route path="/Shop" element={<Bookspage />} />
        <Route path="/Shop/:id" element={<ProductDetailsPage/>} />
        <Route path="/Cart" element={<Cart/>} />
        <Route path="/Checkout" element={<Checkout/>} />
        <Route path="/Wishlist" element={<Wishlist/>} />
        <Route path="/About" element={<Aboutpage />} />
      </Routes>
    </div>
  );
}
