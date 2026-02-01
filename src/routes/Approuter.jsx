import { Route, Routes } from "react-router-dom";
import Loginpage from '../pages/Loginpage'
import Registerpage from "../pages/Registerpage";
import Homepage from "../pages/Homepage";
import Aboutpage from "../pages/Aboutpage";
import Forgetpassword from "../pages/Forgetpass";
import Otpcode from "../pages/Otpcode";
import Newpassword from "../pages/Newpassword";
export default function Approuter() {
  return (
    <div>
      <Routes>
        <Route path='/Login' element={<Loginpage/>} />
        <Route path='/Register' element={<Registerpage/>} />
        <Route path='/Forget' element={<Forgetpassword/>} />
        <Route path='/OTP' element={<Otpcode/>} />
        <Route path='/Newpass' element={<Newpassword/>} />
        <Route path='/' element={<Homepage/>} />
        <Route path='/About' element={<Aboutpage/>} />
      </Routes>
    </div>
  )
}
