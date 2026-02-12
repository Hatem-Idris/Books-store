import Timer from "../Home/Timer";
import Flashsalecards from "../Home/Flashsalecards";
export default function Flashsale() {
  return (
    <div className="container mx-auto py-20">
      <div className="w-full flex flex-col md:flex-row items-center md:justify-between gap-5 p-3 mb-10">
      <div className="flex flex-col gap-2 md:w-6/12 xl:w-4/12">
        <h2 className="font-[700] text-[26px] text-black">Flash Sale</h2>
        <p className="text-[16px] text-black/50">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et
          ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada
          leo.
        </p>
        </div>
        <Timer initialHours={30} initialMinutes={0} initialSeconds={0} className="md:w-6/12"/>
      </div>
      <Flashsalecards/>
    </div>
  );
}
