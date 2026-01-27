import { BrowserRouter } from "react-router-dom";
import Approuter from "./routes/Approuter";
import Header from "./pages/Header";

export default function App() {
  return (
      <>
      <BrowserRouter>
      <Header/>
      <Approuter/>
      </BrowserRouter>
      </>
  )
}

