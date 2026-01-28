import { BiPhoneCall } from "react-icons/bi";
import { LuMessageSquareMore } from "react-icons/lu";
import { FiMapPin } from "react-icons/fi";

import contactbg from "../../../public/d14d7655b7dfc0cacd1072cd70a68c579726248e.jpg";
export default function Contactsection() {
  const contactstyle = {
    backgroundImage: `
    linear-gradient(
      rgba(59, 47, 74, 0.85),
      rgba(59, 47, 74, 0.85)
    ),
          url(${contactbg})
        `,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
  return (
    <div style={contactstyle} className="flex container mx-auto py-10 md:py-20 px-3 md:px-10 lg:px-20 h-[70vh]">
      <div className="w-full flex flex-col md:flex-row justify-between">
        <div className="w-full md:w-7/12 flex flex-col justify-between">
          <div className="flex flex-col">
            <h2 className="font-bold text-3xl md:text-[40px] text-white">
              Have a Questions?
            </h2>
            <h3 className="text-3xl md:text-[40px] font-bold text-white">Get in Touch</h3>
            <p className="w-10/12 text-[18px] mt-2 text-white/50">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et
              ultricies est. Aliquam in justo varius, sagittis neque ut,
              malesuada leo.
            </p>
          </div>
          <form className="flex flex-col items-center gap-5">
            <div className="w-full flex justify-between">
              <input
                className="border rounded-[8px] border-white/20 p-4 w-[49%] placeholder:text-gray-300 text-white"
                type="text"
                placeholder="Name"
              />
              <input
                className="border rounded-[8px] border-white/20 p-4 w-[49%] placeholder:text-gray-300 text-white"
                type="email"
                placeholder="Email Address"
              />
            </div>
            <textarea
              placeholder="Your Message"
              rows={5}
              className="
    w-full
    bg-transparent
    border
    border-white/20
    rounded-xl
    px-4
    py-3
    text-white
    placeholder:text-gray-300
    resize-none
    focus:outline-none
    focus:border-white/40
    transition
  "
            ></textarea>
            <button className="w-5/12 lg:w-3/12 bg-[#D9176C] text-white flex justify-center items-center rounded-[8px] py-3 px-4 font-[600] text-[16px]">
              Add to cart
            </button>
          </form>
        </div>
        <div className="w-full md:w-4/12 flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <div className="border-2 flex justify-center items-center rounded-[8px] border-white/20 w-12 h-12 bg-white">
              <BiPhoneCall className="w-5 h-5 text-[#D9176C]" />
            </div>
            <p className="text-white text-[16px]">01123456789</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="border-2 flex justify-center items-center rounded-[8px] border-white/20 w-12 h-12 bg-white">
              <LuMessageSquareMore className="w-5 h-5 text-[#D9176C]" />
            </div>
            <p className="text-white text-[16px]">Example@gmail.com</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="border-2 flex justify-center items-center rounded-[8px] border-white/20 w-2/7 h-6/6 md:h-4/6 md:w-6/12 lg:w-4/12 xl:w-12 lg:h-12 bg-white">
              <FiMapPin className="w-5 h-5 text-[#D9176C]" />
            </div>
            <p className="text-white text-[16px]">
              adipiscing elit. Mauris et ultricies est. Aliquam in justo varius,
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
