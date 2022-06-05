import PropTypes from "prop-types";
export default function Notification({ message }) {
  return <>{message}</>;
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
}