import { BrowserRouter } from "react-router-dom";
import Approuter from "./routes/Approuter";
import Header from "../src/components/Headerandfooter/Header";
import Headersm from "../src/components/Headerandfooter/Headersm";
import Footer from "./components/Headerandfooter/Footer";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
      <div className="bg-[#F5F5F5]">
      <Toaster/>
      <BrowserRouter>
      <Header/>
      <Headersm/>
      <Approuter/>
      <Footer/>
      </BrowserRouter>
      </div>
  )
}

