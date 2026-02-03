import imghero from "../../../public/533643aa8db82414f48d43a992d009dda3961386.png";
export default function Shopheroimg() {
  const imgsection = {
    backgroundImage: `
    linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),
    url(${imghero})
  `,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
  return(
    <div style={imgsection} className="h-32">

    </div>
  )
}