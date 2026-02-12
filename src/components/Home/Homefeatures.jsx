import { LiaShippingFastSolid } from "react-icons/lia";
import { BsCreditCard } from "react-icons/bs";
import { RiRefund2Line } from "react-icons/ri";
import { RiCustomerService2Line } from "react-icons/ri";
export default function Homefeatures() {
  return (
    <div className="container mx-auto w-full my-20 text-black">
      <div className="flex flex-wrap justify-between gap-4 p-3 ">
        <div className="w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(24%-0.75rem)] flex flex-col p-2 gap-2">
          <LiaShippingFastSolid  className="text-3xl" />
          <h2 className="font-bold text-[18px]">Fast & Reliable Shipping</h2>
          <p className="text-[16px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et
            ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada
            leo.
          </p>
        </div>
        <div className="w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(24%-0.75rem)] flex flex-col p-2 gap-2">
          <BsCreditCard className="text-3xl" />
          <h2 className="font-bold text-[18px]">Secure Payment</h2>
          <p className="text-[16px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et
            ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada
            leo.
          </p>
        </div>
        <div className="w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(24%-0.75rem)] flex flex-col p-2 gap-2">
          <RiRefund2Line className="text-3xl" />
          <h2 className="font-bold text-[18px]">Easy Returns</h2>
          <p className="text-[16px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et
            ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada
            leo.
          </p>
        </div>
        <div className="w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(24%-0.75rem)] flex flex-col p-2 gap-2">
          <RiCustomerService2Line className="text-3xl" />
          <h2 className="font-bold text-[18px]">24/7 Customer Support</h2>
          <p className="text-[16px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et
            ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada
            leo.
          </p>
        </div>
      </div>
    </div>
  );
}
