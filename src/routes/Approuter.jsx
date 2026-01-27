import { Route, Routes } from "react-router-dom";
import Loginpage from '../pages/Loginpage'
import Registerpage from "../pages/Registerpage";
export default function Approuter() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Loginpage/>} />
        <Route path='/Register' element={<Registerpage/>} />
      </Routes>
    </div>
  )
}
