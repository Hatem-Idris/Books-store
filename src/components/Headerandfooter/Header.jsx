import { MdOutlineBook } from "react-icons/md";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <div className="bg-white/20 fixed w-full py-6 hidden md:flex z-10">
      <header className="w-full flex container mx-auto justify-between">
        <nav className="flex items-center gap-6 text-white font-[600]">
          <MdOutlineBook className="text-2xl" />
          <span>Bookshop</span>
          <span className="text-white/30">|</span>
          <ul className="flex gap-10 ">
            <Link to="/" className="cursor-pointer hover:text-[#EAA451] transition-all">
              Home
            </Link>
            <li>Books</li>
            <Link to="/About" className="cursor-pointer hover:text-[#EAA451] transition-all">
              About us
            </Link>
          </ul>
        </nav>
        <nav className="flex gap-2.5 md:p-2 lg:p-0">
          <Link to="/Login">
            <button className="py-3 px-4 bg-[#D9176C] text-white font-sans rounded-lg cursor-pointer">
              Log in
            </button>
          </Link>
          <Link to="/Register">
            {" "}
            <button className="py-3 px-4 bg-white text-[#D9176C] font-sans rounded-lg cursor-pointer">
              Sign Up
            </button>
          </Link>
        </nav>
      </header>
    </div>
  );
}
