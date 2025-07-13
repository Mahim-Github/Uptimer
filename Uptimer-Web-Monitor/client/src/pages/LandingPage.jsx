import { useState } from "react";
import MenuIcon from "../../public/svg/MenuIcon";
import Menu from "../ui/Menu";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import gsap from "gsap";
import Hero from "../ui/Hero";
import Section2 from "../ui/Section2";
import Section3 from "../ui/Section3";
import Section4 from "../ui/Section4";
import Outro from "../ui/Outro";

// gsap.registerPlugin(ScrollTrigger);

function LandingPage() {
  const [isMenuActive, setIsMenuActive] = useState(false);

  return (
    <div className="h-full w-full">
      <div
        className="fixed left-2 top-2 z-50 cursor-pointer text-sm"
        onClick={() => setIsMenuActive((val) => !val)}
      >
        <MenuIcon />
      </div>
      <Menu isMenuActive={isMenuActive} />
      <Hero />
      <Section2 />
      <Section3 />
      <Section4 />
      <Outro />
    </div>
  );
}

export default LandingPage;
