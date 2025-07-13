// import TeamName from "./TeamName";

function Menu({ isMenuActive }) {
  return (
    <div
      className={`menu-bar fixed ${!isMenuActive ? "left-[-320px]" : "left-[0]"} left top-0 z-40 flex h-[100vh] w-[320px] flex-col gap-4 border-r-2 border-black bg-gray-50 pl-8 pt-20 text-3xl backdrop-blur-sm md:text-5xl`}
    >
      {/* <TeamName /> */}
      <div className="menu-a schabo w-fit cursor-pointer text-7xl">HOME</div>
      <div className="menu-a schabo w-fit cursor-pointer text-7xl">ABOUT</div>
      <div className="menu-a schabo w-fit cursor-pointer text-7xl">PRODUCT</div>
    </div>
  );
}

export default Menu;
