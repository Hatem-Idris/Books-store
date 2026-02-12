import imghero from "../../../public/533643aa8db82414f48d43a992d009dda3961386.png";
export default function Aboutherosec() {
  const aboutherosection = {
    backgroundImage: `
      linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)),
      url(${imghero})
    `,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div
      id="hero"
      style={aboutherosection}
      className="h-[70vh] md:h-[80vh] flex flex-col justify-center items-center text-white text-center px-4"
    >
      <h2 className="font-bold text-4xl md:text-5xl mb-4">
        About Bookshop
      </h2>

      <p className="text-xl md:text-2xl md:w-8/12 xl:w-4/12 font-[400] text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et
        ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada
        leo.
      </p>
    </div>
  );
}