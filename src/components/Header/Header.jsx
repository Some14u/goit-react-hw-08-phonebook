import PropTypes from "prop-types";
import "./header.css";

export default function Header({
  text,
  bgColor = "white",
  width = "200px",
  widthLeft,
  widthRight,
  skipSpaceBefore = false,
  skipSpaceAfter = false,
  spaceBefore = "60px",
  spaceAfter = "40px",
}) {
  spaceBefore = skipSpaceBefore ? "0" : spaceBefore;
  spaceAfter = skipSpaceAfter ? "0" : spaceAfter;
  return (
    <div className="header" style={{
      "--bgColor": bgColor,
      "--width": width,
      "--widthLeft": widthLeft,
      "--widthRight": widthRight,
      "--spaceBefore": spaceBefore,
      "--spaceAfter": spaceAfter,
    }}>
      <span></span>
      {text && <div>{text}</div>}
      <span></span>
    </div>
  );
}

Header.propTypes = {
  text: PropTypes.string,
  bgColor: PropTypes.string,
  width: PropTypes.string,
  widthLeft: PropTypes.string,
  widthRight: PropTypes.string,
  skipSpaceBefore: PropTypes.bool,
  skipSpaceAfter: PropTypes.bool,
  spaceBefore: PropTypes.string,
  spaceAfter: PropTypes.string,
}