import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../Store/Index";
import { MdOutlineBook } from "react-icons/md";
import { HiMenu, HiX } from "react-icons/hi";

export default function Headermdsm() {
  const [open, setOpen] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
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
            <NavLink
              to="/Shop"
              end
              className={({ isActive }) =>
                `cursor-pointer transition-all ${
                  isActive
                    ? "text-[#EAA451]"
                    : "text-white hover:text-[#EAA451]"
                }`
              }
            >
              Books
            </NavLink>
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
              <button
                onClick={isAuthenticated ? logout : () => navigate("/Login")}
                className="py-3 px-4 w-full bg-[#D9176C] text-white font-sans rounded-lg cursor-pointer"
              >
                {isAuthenticated ? "logout" : "login"}
              </button>
            </Link>
            {!isAuthenticated && (
              <Link to="/Register">
                <button className="py-3 px-4 w-full bg-white text-[#D9176C] font-sans rounded-lg cursor-pointer">
                  Sign Up
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
