import { MdOutlineBook } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../Store/Index";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";

const domain = "https://bookstore.eraasoft.pro/api";
export default function Header() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (isAuthenticated && token) {
      axios
        .get(`${domain}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [isAuthenticated, token]);
  return (
    <div className="bg-white/20 fixed w-full py-6 px-4 hidden md:flex z-10">
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
        </nav>
        <nav className="flex gap-2.5 md:p-2 lg:p-0">
          {!isAuthenticated && (
            <Link to="/Login">
              <button className="py-3 px-4 bg-[#D9176C] text-white font-sans rounded-lg cursor-pointer">
                login
              </button>
            </Link>
          )}
          {!isAuthenticated && (
            <Link to="/Register">
              <button className="py-3 px-4 bg-white text-[#D9176C] font-sans rounded-lg cursor-pointer">
                Sign Up
              </button>
            </Link>
          )}
          {isAuthenticated && (
            <div className="flex gap-2.5 items-center">
              <div className="flex gap-6">
                <NavLink
                  to="/Wishlist"
                  className={({ isActive }) =>
                    `cursor-pointer transition-all ${
                      isActive
                        ? "text-[#EAA451]"
                        : "text-white hover:text-[#EAA451]"
                    }`
                  }
                >
                  <FaRegHeart className="w-6 h-6" />
                </NavLink>
                <NavLink
                  to="/Cart"
                  className={({ isActive }) =>
                    `cursor-pointer transition-all ${
                      isActive
                        ? "text-[#EAA451]"
                        : "text-white hover:text-[#EAA451]"
                    }`
                  }
                >
                  <BsCart3 className="w-6 h-6 md:mr-2 lg:mr-4 xl:md-6" />
                </NavLink>
              </div>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar w-12 h-12"
                >
                  <div className="w-12 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={
                        user?.image ||
                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      }
                    />
                  </div>
                </div>
                <ul
                  tabIndex="-1"
                  className="flex flex-col items-center menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 p-2 shadow"
                >
                  <li>
                    {isAuthenticated && (
                      <Link to="/Updatingform" className="bg-transparent">
                        <button className="py-3 px-4 bg-white text-[#D9176C] border border-[#D9176C] hover:bg-[#D9176C] transition-colors hover:text-white  font-sans rounded-lg cursor-pointer">
                          Update
                        </button>
                      </Link>
                    )}
                  </li>
                  <li>
                    {isAuthenticated && (
                      <button
                        onClick={logout}
                        className="py-3 px-4 bg-red-600 hover:bg-red-800 text-white border border-[#D9176C] font-sans rounded-lg cursor-pointer"
                      >
                        Logout
                      </button>
                    )}
                  </li>
                </ul>
              </div>
              <div className="flex flex-col">
                <h3 className="text-[16px] font-semibold text-white">
                  {user?.first_name} {user?.last_name}
                </h3>
                <h4 className="font-light text-[14px] text-white/50">
                  {user?.email}
                </h4>
              </div>
            </div>
          )}
        </nav>
      </header>
    </div>
  );
}
