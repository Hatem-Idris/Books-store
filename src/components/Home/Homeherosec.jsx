import imghero from "../../../public/533643aa8db82414f48d43a992d009dda3961386.png";
import { TiMicrophoneOutline } from "react-icons/ti";
import { IoSearch } from "react-icons/io5";

export default function Homeherosec() {
  const homeherosection = {
    backgroundImage: `
        linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),
        url(${imghero})
      `,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
  return (
    <div id="hero" style={homeherosection} className="h-[70vh] md:h-[80vh] flex justify-center items center">
      <div className="flex items-center justify-center w-full p-2 md:p-0">
        <div className="relative w-full md:w-4/12">
          <input
            type="search"
            placeholder="Search"
            className="
      w-full
      bg-white
      text-black
      px-5 py-3
      rounded-l-full
    "
          />
          <TiMicrophoneOutline className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 cursor-pointer" />
        </div>
        <button
          className="
    bg-[#D9176C]
    text-white
    px-5
    flex items-center justify-center
    rounded-r-full
    cursor-pointer
  "
        >
          <IoSearch className="w-5 h-12" />
        </button>
      </div>
    </div>
  );
}
