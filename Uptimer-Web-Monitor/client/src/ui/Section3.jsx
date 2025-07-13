import gsap from "gsap";
import { useEffect, useRef } from "react";
import insertSectObserve from "../services/insersectObserve";
function Section3() {
  const sectionRef2 = useRef(null);
  const textElementRef = useRef(null);

  //FADE-IN ANIMATION FOR TEXT
  const animateText = () => {
    gsap.to(".txt2", {
      y: -40,
      opacity: 1, // Optional: fade-in effect
      duration: 1.3,
      ease: "circ.inOut",
    });
  };

  //FADE-IN USE-EFFECT
  useEffect(() => {
    insertSectObserve(sectionRef2, animateText, 0.3);
  }, []);

  return (
    <div className="section2-wrapper relative h-screen">
      <div
        className="section2 absolute left-0 top-0 flex h-screen w-[150vw] flex-col items-center justify-center rounded-none bg-gray-50"
        ref={sectionRef2}
      >
        <p
          className="txt2 nowrap schabo text-[8vw] uppercase text-black underline opacity-0"
          ref={textElementRef}
        >
          Real-Time Notifications and Alerts
        </p>
        <p className="txt2 schabo w-[70vw] text-center text-[3vw] font-thin text-black opacity-0">
          Our system provides instantaneous notifications and alerts for any
          downtimes or anomalies detected on websites. This feature ensures
          proactive responses to potential issues, minimizing disruptions and
          enhancing overall user experience.
        </p>
      </div>
    </div>
  );
}

export default Section3;
