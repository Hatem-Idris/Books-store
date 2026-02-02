import { MdOutlineBook } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../Store/Index";
export default function Header() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  return (
    <div className="bg-white/20 fixed w-full py-6 hidden md:flex z-10">
      <header className="w-full flex container mx-auto justify-between">
        <nav className="flex items-center gap-6 text-white font-[600]">
          <MdOutlineBook className="text-2xl" />
          <span>Bookshop</span>
          <span className="text-white/30">|</span>
          <ul className="flex gap-10 ">
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
        </nav>
        <nav className="flex gap-2.5 md:p-2 lg:p-0">
          <Link to="/Login">
            <button
              onClick={isAuthenticated ? logout : () => navigate("/Login")}
              className="py-3 px-4 bg-[#D9176C] text-white font-sans rounded-lg cursor-pointer"
            >
              {isAuthenticated ? "logout" : "login"}
            </button>
          </Link>
            {" "}
            {!isAuthenticated && (
              <Link to="/Register">
                <button className="py-3 px-4 bg-white text-[#D9176C] font-sans rounded-lg cursor-pointer">
                  Sign Up
                </button>
              </Link>
            )}
        </nav>
      </header>
    </div>
  );
}
