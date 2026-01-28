import { MdOutlineBook } from "react-icons/md";
export default function Footer() {
  return (
    <footer className="bg-white/20 w-full py-6">
      <div className="w-full flex container mx-auto justify-between bg-[#3B2F4A] py-20 ">
        <nav className="flex w-full items-center gap-6 text-white font-[600] border-b-2 border-b-white/20">
          <MdOutlineBook className="text-2xl" />
          <span>Bookshop</span>
          <span className="text-white/30">|</span>
          <ul className="flex gap-10 ">
            <li>Home</li>
            <li>Books</li>
            <li>About Us</li>
          </ul>
        </nav>
        <div className="w-full flex justify-between">
            <p>
                
            </p>
        </div>
      </div>
    </footer>
  );
}
