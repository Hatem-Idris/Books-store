import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineBook } from "react-icons/md";
import { HiMenu, HiX } from "react-icons/hi";

export default function Headermdsm() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed w-full py-4 z-50 md:hidden">
      <header className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center gap-3 text-white font-semibold">
          <MdOutlineBook className="text-2xl" />
          <span>Bookshop</span>
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
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `cursor-pointer transition-all ${
                  isActive
                    ? "text-[#EAA451]"
                    : "text-white hover:text-[#EAA451]"
                }`
              }
            >
              Home
            </NavLink>
            <li>Books</li>
            <NavLink
              to="/About"
              className={({ isActive }) =>
                `cursor-pointer transition-all ${
                  isActive
                    ? "text-[#EAA451]"
                    : "text-white hover:text-[#EAA451]"
                }`
              }
            >
              About us
            </NavLink>
          </ul>

          <div className="flex flex-col gap-3 px-6 pb-6">
            <Link to="/Login">
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
