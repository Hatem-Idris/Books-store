import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../Store/Index";
import { MdOutlineBook } from "react-icons/md";
import { HiMenu, HiX } from "react-icons/hi";
import axios from "axios";
import { FaRegHeart } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";

const domain = "https://bookstore.eraasoft.pro/api";

export default function Headermdsm() {
  const [open, setOpen] = useState(false);
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
          <ul className="flex flex-col gap-6 text-center py-6 font-semibold text-white border-b border-b-black/50">
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

          <div className="flex flex-col gap-3 px-4 pb-6 mt-3">
            {!isAuthenticated && (
              <Link to="/Login">
                <button className="w-full py-3 px-4 bg-[#D9176C] text-white font-sans rounded-lg cursor-pointer">
                  login
                </button>
              </Link>
            )}
            {!isAuthenticated && (
              <Link to="/Register">
                <button className="w-full py-3 px-4 bg-white text-[#D9176C] font-sans rounded-lg cursor-pointer">
                  Sign Up
                </button>
              </Link>
            )}
            {isAuthenticated && (
              <div className="flex w-full gap-2.5">
                <div className="w-full mt-3">
                  <div className="flex gap-2">
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
                    <div className="flex flex-col">
                      <h3 className="text-[16px] font-semibold text-white">
                        {user?.first_name} {user?.last_name}
                      </h3>
                      <h4 className="font-light text-[14px] text-white/50">
                        {user?.email}
                      </h4>
                    </div>
                    <div className="flex items-center gap-3">
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
                        <FaRegHeart className="w-6 h-6 ml-3" />
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
                  </div>
                  <ul
                    tabIndex="-1"
                    className="flex w-full flex-col items-center z-1 mt-3 p-2 gap-2 shadow"
                  >
                    <li className="w-full">
                      {isAuthenticated && (
                        <Link to="/Updatingform" className="bg-transparent">
                          <button className="w-full py-3 px-4 bg-white text-[#D9176C] border border-[#D9176C] hover:bg-[#D9176C] transition-colors hover:text-white  font-sans rounded-lg cursor-pointer">
                            Update
                          </button>
                        </Link>
                      )}
                    </li>
                    <li className="w-full">
                      {isAuthenticated && (
                        <button
                          onClick={logout}
                          className="w-full py-3 px-4 bg-red-600 hover:bg-red-800 text-white border border-[#D9176C] font-sans rounded-lg cursor-pointer"
                        >
                          Logout
                        </button>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
