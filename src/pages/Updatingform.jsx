import Authbox from "../components/Authbox"
import Heroimg from "../components/User/Heroimg"
import Updateprofile from "../components/User/Updateprofile"
import { useAuthStore } from "../components/Store/Index";
export default function Updatingform() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return (
    <div>
      <Heroimg/>
      {!isAuthenticated && (
        <Authbox/>
      )}
      {isAuthenticated && (  
      <Updateprofile/>
      )}
    </div>
  )
}
