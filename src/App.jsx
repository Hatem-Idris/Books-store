import { BrowserRouter } from "react-router-dom";
import Approuter from "./routes/Approuter";
import Header from "./pages/Header";
import Headersm from "./pages/Headersm";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
      <>
      <Toaster/>
      <BrowserRouter>
      <Header/>
      <Headersm/>
      <Approuter/>
      </BrowserRouter>
      </>
  )
}

