import "./button.scss";
import { Link } from "react-router-dom";

export function Buttons() {
  return (
   <div className="button-container">
        <Link to="/home"><button><i class="fa-regular fa-house"></i>Home</button></Link>
        <Link to="/Archive"><button><i class="fa-regular fa-bookmark"></i>Archive</button></Link>
        <Link to="/Popular"><button><i class="fa-regular fa-star"></i>Popular</button></Link>
        <Link to="/Settings"><button><i class="fa-solid fa-gear"></i>Settings</button></Link>
      </div>
  );
}
