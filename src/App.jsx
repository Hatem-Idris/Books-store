import { BrowserRouter } from "react-router-dom";
import Approuter from "./routes/Approuter";
import Header from "./pages/Header";
import Headermdsm from "./pages/Headermdsm";

export default function App() {
  return (
      <>
      <BrowserRouter>
      <Header/>
      <Headermdsm/>
      <Approuter/>
      </BrowserRouter>
      </>
  )
}

