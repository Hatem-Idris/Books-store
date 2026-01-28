import { Route, Routes } from "react-router-dom";
import Loginpage from '../pages/Loginpage'
import Registerpage from "../pages/Registerpage";
import Homepage from "../pages/Homepage";
import Aboutpage from "../pages/Aboutpage";
export default function Approuter() {
  return (
    <div>
      <Routes>
        <Route path='/Login' element={<Loginpage/>} />
        <Route path='/Register' element={<Registerpage/>} />
        <Route path='/' element={<Homepage/>} />
        <Route path='/About' element={<Aboutpage/>} />
      </Routes>
    </div>
  )
}
