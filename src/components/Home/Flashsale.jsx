export default function Flashsale() {
  return (
    <div className="container mx-auto py-20">
      <div className="w-full md:w-8/12 xl:w-4/12 flex flex-col gap-2 p-3 mb-10">
        <h2 className="font-[700] text-[26px] text-black">Flash Sale</h2>
        <p className="text-[16px] text-black/50">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et
          ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada
          leo.
        </p>
      </div>
      <div className="flex flex-wrap gap-4 p-3 justify-center ">
        <div className="w-full md:w-4/12 h-60 bg-[#3B2F4A]"></div>
        <div className="w-full md:w-4/12 h-60 bg-[#3B2F4A]"></div>
      </div>
    </div>
  );
}
