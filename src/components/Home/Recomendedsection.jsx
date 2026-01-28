import book from "../../assets/Homepageimgs/03e6a888f25ecc86e317e35c9f91c8c30c64b35e.jpg";
import { IoMdStar } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";

export default function Recomendedsection() {
  const recomendedImageStyle = {
    height: "260px",
    borderRadius: "12px",
  };
  return (
    <div className="w-full container mx-auto flex flex-col py-24 px-5 md:px-10 gap-2">
      <h2 className="font-bold text-[23px] md:text-[26px] text-black">Recomended For You</h2>
      <div className="flex flex-col xl:flex-row gap-5">
      <div className="w-full flex flex-col md:flex-row xl:w-6/12 flex p-5 gap-9 bg-white">
        <img className="w-full md:w-4/12" style={recomendedImageStyle} src={book} alt="" />
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <h3 className="font-bold text-[18px]">Rich Dad And Poor Dad</h3>
            <div className="flex gap-1">
              <p>Author:</p>
              <span className="font-medium textarea-md">Robert T. Kiyosanki</span>
            </div>
          </div>
          <p className="textarea-md text-black/50">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et
            ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada
            leo. Aliquam in justo varius, Aliquam in justo varius,
          </p>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex gap-1 items-center">
                <IoMdStar className="text-[#EBC305] text-xl" />
                <IoMdStar className="text-[#EBC305] text-xl" />
                <IoMdStar className="text-[#EBC305] text-xl" />
                <IoMdStar className="text-[#EBC305] text-xl" />
                <IoMdStar className="text-black/20 text-xl" />
                <span>(180 Review)</span>
              </div>
              <div className="flex gap-1">
                <p>Rate:</p>
                <span className="font-[600] textarea-md">4.2</span>
              </div>
            </div>
            <h2 className="text-2xl font-[600]">$30.00</h2>
          </div>
          <div className="flex gap-2 md:gap-0 justify-between">
            <button className="w-10/12 bg-[#D9176C] text-white flex justify-center items-center rounded-[8px] py-3 px-4 font-[600] text-[16px]">
              Add to cart
              <span className="textarea-xl">
                <CiShoppingCart />
              </span>
            </button>
            <button className="w-2/12 md:w-1/12 flex justify-center items-center p-2 bg-white border-2 border-[#D9176C] text-[#D9176C] rounded-[8px] cursor-pointer hover:bg-[#D9176C] hover:text-white transition-all">
              <CiHeart />
            </button>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row xl:w-6/12 flex p-5 gap-9 bg-white">
        <img className="w-full md:w-4/12" style={recomendedImageStyle} src={book} alt="" />
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <h3 className="font-bold text-[18px]">Rich Dad And Poor Dad</h3>
            <div className="flex gap-1">
              <p>Author:</p>
              <span className="font-medium textarea-md">Robert T. Kiyosanki</span>
            </div>
          </div>
          <p className="textarea-md text-black/50">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et
            ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada
            leo. Aliquam in justo varius, Aliquam in justo varius,
          </p>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex gap-1 items-center">
                <IoMdStar className="text-[#EBC305] text-xl" />
                <IoMdStar className="text-[#EBC305] text-xl" />
                <IoMdStar className="text-[#EBC305] text-xl" />
                <IoMdStar className="text-[#EBC305] text-xl" />
                <IoMdStar className="text-black/20 text-xl" />
                <span>(180 Review)</span>
              </div>
              <div className="flex gap-1">
                <p>Rate:</p>
                <span className="font-[600] textarea-md">4.2</span>
              </div>
            </div>
            <h2 className="text-2xl font-[600]">$30.00</h2>
          </div>
          <div className="flex gap-2 md:gap-0 justify-between">
            <button className="w-10/12 bg-[#D9176C] text-white flex justify-center items-center rounded-[8px] py-3 px-4 font-[600] text-[16px]">
              Add to cart
              <span className="textarea-xl">
                <CiShoppingCart />
              </span>
            </button>
            <button className="w-2/12 md:w-1/12 flex justify-center items-center p-2 bg-white border-2 border-[#D9176C] text-[#D9176C] rounded-[8px] cursor-pointer hover:bg-[#D9176C] hover:text-white transition-all">
              <CiHeart />
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
