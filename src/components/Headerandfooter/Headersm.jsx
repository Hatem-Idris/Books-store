import { useState } from "react";
import { MdOutlineBook } from "react-icons/md";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function Headermdsm() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed w-full py-4 z-50 md:hidden">
      <header className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center gap-3 text-white font-semibold">
          <MdOutlineBook className="text-2xl" />
          <span>Bookshop</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-white font-[600]">
          <ul className="flex gap-10">
                <Link to="/" className="cursor-pointer hover:text-[#EAA451]">Home</Link>
                <li>Books</li>
                <Link to="/About" className="cursor-pointer hover:text-[#EAA451]">About us</Link>
          </ul>
        </nav>
        <div className="hidden md:flex gap-2.5">
          <Link to="/">
            <button className="py-3 px-4 bg-[#D9176C] text-white rounded-lg">
              Log in
            </button>
          </Link>
          <Link to="/Register">
            <button className="py-3 px-4 bg-white text-[#D9176C] rounded-lg">
              Sign Up
            </button>
          </Link>
        </div>
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setOpen(!open)}
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </header>
      {open && (
        <div className="md:hidden bg-white/20 backdrop-blur-xs shadow-lg mt-3 animate__animated animate__fadeIn">
          <ul className="flex flex-col gap-6 text-center py-6 font-semibold text-white">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">Books</li>
            <li className="cursor-pointer">About Us</li>
          </ul>

          <div className="flex flex-col gap-3 px-6 pb-6">
            <Link to="/">
              <button className="w-full py-3 bg-[#D9176C] text-white rounded-lg">
                Log in
              </button>
            </Link>
            <Link to="/Register">
              <button className="w-full py-3 bg-white text-[#D9176C] border border-[#D9176C] rounded-lg">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}