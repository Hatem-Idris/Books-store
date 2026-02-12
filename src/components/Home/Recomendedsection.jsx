import RichDadAndPoorDad from "../../assets/Homepageimgs/93e9747c9160601f7f3a7a57420103fe4025b18a.png";
import TheDesignOfBooks from "../../assets/Homepageimgs/28aba63bdc086aa49f1169be9ff5208128b5a8af.jpg";
import { IoMdStar } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import axios from "axios";
import { useEffect, useState } from "react";
export default function Recomendedsection() {
  const [recbooks, setRecbooks] = useState([]);
  let domain = "https://bookstore.eraasoft.pro/api";
  const handlebooks = () => {
    let endpoint = "/home";
    let url = domain + endpoint;
    axios
      .get(url)
      .then((res) => {
        setRecbooks(res.data.data.recommended || []);
      })
      .catch((err) => {
        console.log(err.data.data);
      });
  };
  useEffect(() => {
    handlebooks();
  },[]);
  const recomendedImageStyle = {
    height: "260px",
    borderRadius: "12px",
  };
  return (
    <div className="w-full container mx-auto flex flex-col py-24 px-5 md:px-10 gap-2">
      <h2 className="font-bold text-[23px] md:text-[26px] text-black">
        Recomended For You
      </h2>
      <div className="flex flex-col xl:flex-row gap-5">
        {recbooks.map((el, index) => (
          <div
            key={el.bookId}
            className="w-full flex flex-col md:flex-row xl:w-6/12 flex p-5 gap-9 bg-white"
          >
            <img
              className="w-full md:w-4/12"
              style={recomendedImageStyle}
              src={el.image || RichDadAndPoorDad}
              alt=""
            />
            <div className="flex flex-col gap-3">
              <div className="flex flex-col">
                <h3 className="font-bold text-[18px] text-black">
                  {el.bookName}
                </h3>
                <div className="flex gap-1 text-black">
                  <p>Author:</p>
                  <span className="font-medium textarea-md text-black pt-0.5">
                    {el.author}
                  </span>
                </div>
              </div>
              <p className="textarea-md text-black/50">{el.description}</p>
              <div className="flex flex-col md:flex-row justify-between">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-1 items-center">
                    <IoMdStar className="text-[#EBC305] text-xl" />
                    <IoMdStar className="text-[#EBC305] text-xl" />
                    <IoMdStar className="text-[#EBC305] text-xl" />
                    <IoMdStar className="text-[#EBC305] text-xl" />
                    <IoMdStar className="text-black/20 text-xl" />
                    <span className="text-black">(180 Review)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <p className="text-black">Rate:</p>
                    <span className="font-[600] textarea-md text-black">
                      4.2
                    </span>
                  </div>
                </div>
                <h2 className="text-2xl font-[600] text-black">$30.00</h2>
              </div>
              <div className="flex gap-2 md:gap-0 justify-between">
                <button className="w-10/12 bg-[#D9176C] text-white hover:bg-pink-700 flex justify-center items-center rounded-[8px] py-3 px-4 font-[600] text-[16px] cursor-pointer transition-colors">
                  Add to cart
                  <span className="textarea-xl">
                    <CiShoppingCart />
                  </span>
                </button>
                <button className="w-2/12 md:w-1/12 xl:w-2/12 xl:ml-1 flex justify-center items-center p-2 bg-white border-2 border-[#D9176C] text-[#D9176C] rounded-[8px] cursor-pointer hover:bg-[#D9176C] hover:text-white transition-colors">
                  <CiHeart />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
