import PropTypes from "prop-types";

export default function Spacer({ height = "30px" }) {
  return <div style={{ height: height }} />;
}

Spacer.propTypes = {
  height: PropTypes.string,
}