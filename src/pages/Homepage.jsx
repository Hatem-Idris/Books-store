import Flashsale from "../components/Home/Flashsale";
import Homebestsellers from "../components/Home/Homebestsellers";
import Homefeatures from "../components/Home/Homefeatures";
import Homeherosec from "../components/Home/Homeherosec";
import Recomendedsection from "../components/Home/Recomendedsection";

export default function Homepage() {
  return (
    <div>
      <Homeherosec/>
      <Homefeatures/>
      <Homebestsellers/>
      <Recomendedsection/>
      <Flashsale/>
    </div>
  )
}
