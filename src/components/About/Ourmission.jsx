import { FiArrowRight } from "react-icons/fi";

export default function Ourmission() {
  const missionsData = [
    {
      id: 1,
      title: "Quality Selection",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada leo.Quality SelectionLorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius,",
      isSoon: false,
    },
    {
      id: 2,
      title: "Customer Service",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada leo.Quality SelectionLorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius,",
      isSoon: false,
    },
    {
      id: 3,
      title: "Fast Delivery",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada leo.Quality SelectionLorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius,",
      isSoon: true,
    },
  ];
  return (
    <div className="container mx-auto py-20">
      <div className="w-full flex flex-col gap-2 p-3 items-center mb-10">
        <h2 className="font-[700] text-4xl text-black">Our Mission</h2>
      </div>
      <div className="flex flex-wrap gap-6 p-3 justify-center ">
        {missionsData.map((el) => (
          <div
            key={el.id}
            className="w-full md:w-4/12 lg:w-3/12 flex flex-col border border-black/20 bg-white gap-6 p-6 rounded-xl"
          >
            <h2 className="font-bold text-2xl text-black">{el.title}</h2>
            <p className="text-[16px] text-black">{el.description}</p>
            <div className="flex gap-2 items-center text-[#D9176C]">
              {el.isSoon ? (
                <p>Soon</p>
              ) : (
                <div className="flex items-center gap-2 cursor-pointer hover:underline ">
                  <p>View More</p>
                  <FiArrowRight />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
