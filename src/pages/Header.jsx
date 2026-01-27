import { MdOutlineBook } from "react-icons/md";
export default function Header() {
  return (
    <div className="bg-white/20 fixed w-full py-6">
        <header className="w-full flex container mx-auto justify-between">
            <nav className="flex items-center gap-6 text-white font-[600]">
                <MdOutlineBook className="text-2xl" />
                <span>Bookshop</span>
                <span className="text-white/30">|</span>
                <ul className="flex gap-10 ">
                    <li>
                        Home
                    </li>
                    <li>
                        Books
                    </li>
                    <li>
                        About Us
                    </li>
                </ul>
            </nav>
            <nav className="flex gap-2.5">
                <button className="py-3 px-4 bg-[#D9176C] text-white font-sans rounded-lg">Log in</button>
                <button className="py-3 px-4 bg-white text-[#D9176C] font-sans rounded-lg">Sign Up</button>
            </nav>
        </header>
    </div>
  )
}
