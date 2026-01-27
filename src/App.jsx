import { BrowserRouter } from "react-router-dom";
import Approuter from "./routes/Approuter";
import Header from "./pages/Header";
import Headersm from "./pages/Headersm";

export default function App() {
  return (
      <>
      <BrowserRouter>
      <Header/>
      <Headersm/>
      <Approuter/>
      </BrowserRouter>
      </>
  )
}

