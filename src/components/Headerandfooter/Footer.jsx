import { MdOutlineBook } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { PiYoutubeLogo } from "react-icons/pi";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaEarthAmericas } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="w-full bg-[#3B2F4A]">
      <div className="container mx-auto py-20 px-3 md:px-5 flex flex-col gap-8 text-white">
        <div className="flex justify-between">
          <nav className="flex font-[600]">
            <div className="flex gap-6">
              <MdOutlineBook className="text-2xl" />
              <span>Bookshop</span>
              <span className="text-white/30">|</span>
              <ul className="flex flex-col md:flex-row gap-10">
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
                </NavLink>{" "}
              </ul>
            </div>
          </nav>
          <div className="flex flex-col md:flex-row gap-4">
            <FaFacebook className="w-[24px] h-[24px]" />
            <FaInstagram className="w-[24px] h-[24px]" />
            <PiYoutubeLogo className="w-[24px] h-[24px]" />
            <FaSquareXTwitter className="w-[24px] h-[24px]" />
          </div>
        </div>

        <hr className="w-full border-t border-white/20" />
        <div className="flex justify-between items-center text-sm text-white/70">
          <p>Developed By EraaSoft All Copy Rights Reserved @2024</p>
          <div className="flex items-center gap-4">
            <FaEarthAmericas className="w-[24px] h-[24px]" />

            <select
              defaultValue="English"
              className="select appearance-none bg-transparent border border-white/50 rounded-full"
            >
              <option disabled={true}>Pick a language</option>
              <option className="text-black">English</option>
              <option className="text-black">Arabic</option>
              <option className="text-black">Italy</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
}
