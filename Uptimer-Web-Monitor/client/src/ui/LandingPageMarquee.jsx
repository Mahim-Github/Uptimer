import Marquee from "./Marquee";

function LandingPageMarquee() {
  return (
    <>
      <Marquee
        top={"50px"}
        right={"-50px"}
        transform={"rotate(30deg)"}
        text={"REALTIME ALERT NOTIFICATIONS •"}
      />
      <Marquee
        left={"-40px"}
        top={"80px"}
        transform={"rotate(-30deg)"}
        text={"WEBSITE MONIORING •"}
      />
      <Marquee
        bottom={"-50px"}
        right={"-100px"}
        transform={"rotate(-30deg)"}
        text={"MULTI-REGION ANALYSIS •"}
      />
      <Marquee
        left={"-60px"}
        bottom={"-50px"}
        transform={"rotate(30deg)"}
        text={"USER-FRIENDLY DASHBOARD •"}
      />
    </>
  );
}

export default LandingPageMarquee;
