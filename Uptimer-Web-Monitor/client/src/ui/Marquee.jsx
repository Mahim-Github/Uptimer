import "../stylesheets/marquee.css";

function Marquee({ top, left, bottom, right, transform, text, width, scale }) {
  return (
    <div
      className="marquee-wrapper"
      style={{ top, left, bottom, right, transform, width, scale }}
    >
      <div className="marquee">
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  );
}

export default Marquee;
