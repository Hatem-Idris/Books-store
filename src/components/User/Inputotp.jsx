export default function Inputotp() {
  return (
    <div className="flex flex-col justify-start items-center gap-5 bg-[#F5F5F5] h-[70vh]">
      <p className="font-semibold textarea-lg font-sans text-[#D9176C] mt-20">
        Reset your password!
      </p>
      <p className="font-normal text-[14px] textarea-lg font-sans text-black/50">
        Enter the 4 dights code that you received on your email
      </p>
      <div className="flex flex-col">
        <div className="flex items-center gap-5">
          <input
            type="text"
            maxLength={1}
            className="w-11 h-11 rounded-lg border border-neutral-300 bg-white text-center text-lg font-medium text-neutral-800 outline-none"
          />
          <input
            type="text"
            maxLength={1}
            className="w-11 h-11 rounded-lg border border-neutral-300 bg-white text-center text-lg font-medium text-neutral-800 outline-none"
          />
          <input
            type="text"
            maxLength={1}
            className="w-11 h-11 rounded-lg border border-neutral-200 bg-white text-center text-lg font-medium text-neutral-800 outline-none"
          />
          <input
            type="text"
            maxLength={1}
            className="w-11 h-11 rounded-lg border border-neutral-200 bg-white text-center text-lg font-medium text-neutral-800 outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 rounded-xl bg-[#D9176C] text-white cursor-pointer mt-7"
        >
          Reset password
        </button>
        <div className="flex gap-1 text-[16px] font-[400] justify-center mt-7">
          <p>Didn’t receive a code?</p>
            <span className="text-[#D9176C] hover:underline cursor-pointer">Send again</span>
        </div>
      </div>
    </div>
  );
}
