import { Link } from "react-router-dom";
import marqueeimg1 from "../../assets/Homepageimgs/03e6a888f25ecc86e317e35c9f91c8c30c64b35e.jpg";
import marqueeimg2 from "../../assets/Homepageimgs/0d3a1ade0d5cf7e267b48d4ad0b355bac73a3db0.jpg";
import marqueeimg3 from "../../assets/Homepageimgs/28aba63bdc086aa49f1169be9ff5208128b5a8af.jpg";
import marqueeimg4 from "../../assets/Homepageimgs/6d9d091de0e9c20b618cba0b9f935885da4cdb82.jpg";
import marqueeimg5 from "../../assets/Homepageimgs/71cd2100a54a321ee4e0f9170a9485f8f2d1f3d2.jpg";
import marqueeimg6 from "../../assets/Homepageimgs/84c641b61f0b01a81c58e362400f0110095da7e8.png";
import marqueeimg7 from "../../assets/Homepageimgs/93e9747c9160601f7f3a7a57420103fe4025b18a.png";
import marqueeimg8 from "../../assets/Homepageimgs/e7a63dace18f214af63005731d2c8a3964cc30ae.png";
export default function Homebestsellers() {
  const bookImageStyle = {
    width: "173px",
    height: "260px",
    borderRadius: "12px",
  };
  return (
    <div className="bg-[#3B2F4A] py-20 flex flex-col justify-center items-center">
      <div className="container mx-auto w-full flex justify-center">
        <div className="flex flex-col text-center gap-2 w-full md:w-6/12 lg:w-6/12 xl:w-4/12">
          <h2 className="font-bold font-sans text-[26px] text-white">
            Best Seller
          </h2>
          <p className="text-white/50 font-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et
            ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada
            leo.
          </p>
        </div>
      </div>
        <marquee behavior="scroll" direction="left" scrollamount="6">
          <span className="flex gap-6 items-center my-20">
            <img style={bookImageStyle} src={marqueeimg1} />
            <img style={bookImageStyle} src={marqueeimg2} />
            <img style={bookImageStyle} src={marqueeimg3} />
            <img style={bookImageStyle} src={marqueeimg4} />
            <img style={bookImageStyle} src={marqueeimg5} />
            <img style={bookImageStyle} src={marqueeimg6} />
            <img style={bookImageStyle} src={marqueeimg7} />
            <img style={bookImageStyle} src={marqueeimg8} />
          </span>
        </marquee>
        <Link to={"/Shop"}>
        <button className="w-full rounded-lg py-3 px-4 text-white bg-[#D9176C] hover:bg-pink-700 cursor-pointer transition-colors">Shop Now</button>
        </Link>
    </div>
  );
}
