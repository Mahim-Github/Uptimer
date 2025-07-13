import { useNavigate } from "react-router-dom";
import Marquee from "./Marquee";

function Outro() {
  const navigate = useNavigate();
  function goToProduct() {
    navigate("/signin");
  }
  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-100">
      <Marquee
        bottom={"100px"}
        right={"100px"}
        transform={"rotate(10deg)"}
        width={"100vw"}
        text={"UPTIMER - YOUR WEB MONITOR • "}
        scale={"2"}
      />
      <Marquee
        bottom={"80px"}
        right={"-10px"}
        transform={"rotate(0deg)"}
        width={"100vw"}
        text={"UPTIMER - YOUR WEB MONITOR • "}
        scale={"2"}
      />
      <Marquee
        bottom={"50px"}
        right={"100px"}
        transform={"rotate(-10deg)"}
        width={"100vw"}
        text={"UPTIMER - YOUR WEB MONITOR • "}
        scale={"2"}
      />
      <div className="absolute left-[50%] top-[20%] translate-x-[-50%]">
        <button onClick={goToProduct} className="styled-primary2">
          <span className="span-wrapper">
            <span className="span11">Check Product</span>
            <span className="span22">Check Product</span>
          </span>
        </button>
      </div>
    </div>
  );
}

export default Outro;
