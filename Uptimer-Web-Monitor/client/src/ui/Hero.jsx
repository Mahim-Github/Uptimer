import LandingPageMarquee from "../ui/LandingPageMarquee";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const navigate = useNavigate();
  function goToProduct() {
    navigate("/signin");
  }
  return (
    <>
      <div className="hero relative flex h-screen w-[100vw] items-center justify-center overflow-hidden bg-slate-50 backdrop-blur-md">
        <LandingPageMarquee />

        <div className="round8 main-txt hero-txt relative pl-[5vw] pr-[5vw] text-[23vw] uppercase not-italic">
          UPTIMER
        </div>
        <div className="dreams absolute left-[50%] rotate-[-15deg] text-[8vw]">
          your-web-monitor
        </div>
        <div className="absolute left-[20%] top-[70%]">
          <button onClick={goToProduct} className="styled-primary">
            <span className="span-wrapper">
              <span className="span1">Check Product</span>
              <span className="span2">Check Product</span>
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Hero;
