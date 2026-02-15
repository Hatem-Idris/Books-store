import { Link } from "react-router-dom";
export default function Authbox() {
  return (
    <div className="h-dvh flex justify-center items-center container mx-auto px-3">
      <div className="w-full md:w-8/12 lg:w-6/12 h-72 flex flex-col justify-center items-center p-3 bg-white rounded-[20px] gap-7">
        <p className="text-black font-[600] text-2xl">
          Your should log in first!
        </p>
        <div className="flex flex-col w-9/12 gap-4">
          <Link to="/Login">
            <button className="w-full btn bg-[#D9176C] hover:bg-pink-700 font-[600] text-[16px] text-white rounded-lg">
              Log in
            </button>
          </Link>
          <Link to="/Register">
            <button className="w-full btn border border-[#D9176C] text-[#D9176C] font-[600] text-[16px] rounded-lg">
              Create account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
