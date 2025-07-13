import gsap from "gsap";
import { useEffect, useRef } from "react";
import insertSectObserve from "../services/insersectObserve";
function Section4() {
  const sectionRef = useRef(null);

  //FADE-IN ANIMATION FOR TEXT
  const animateText = () => {
    gsap.to(".txt3", {
      y: -40,
      opacity: 1, // Optional: fade-in effect
      duration: 1.3,
      ease: "circ.inOut",
    });
  };

  //FADE-IN USE-EFFECT
  useEffect(() => {
    insertSectObserve(sectionRef, animateText, 0.3);
  }, []);

  return (
    <div className="section2-wrapper relative h-screen border-b-2 border-black">
      <img
        className="absolute bottom-[-35px] left-[-10px] z-20 h-[50%] w-[110vw] rotate-[-3deg]"
        src="../images/section-img-all-black.png"
        alt="section-image"
      />
      <img
        className="absolute left-[-10px] top-[-35px] z-20 h-[50%] w-[110vw] rotate-[3deg]"
        src="../images/section-img-all-black.png"
        alt="section-image"
      />
      <div
        className="section2 absolute left-0 top-0 z-30 flex h-screen w-[150vw] flex-col items-center justify-center rounded-none bg-black"
        ref={sectionRef}
      >
        <p className="txt3 nowrap schabo text-[8vw] uppercase text-gray-200 underline opacity-0">
          Multi-Region Analysis
        </p>
        <p className="txt3 schabo w-[70vw] text-center text-[3vw] font-thin text-gray-200 opacity-0">
          Our platform enables comprehensive multi-region analysis, providing
          valuable insights into performance metrics across various geographical
          locations. This capability facilitates informed decision-making by
          highlighting regional trends, optimizing resource distribution, and
          enhancing operational efficiency.
        </p>
      </div>
    </div>
  );
}

export default Section4;
