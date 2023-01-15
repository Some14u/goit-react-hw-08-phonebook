import { Typography } from '@mui/material';
import { Dot } from 'react-animated-dots';
import PropTypes from "prop-types";

const LoadingText = ({ text = '', ...props }) => (
  <Typography variant="h2" align="center" color={'lightgray'} {...props}>
    {text}
    <Dot>.</Dot>
    <Dot>.</Dot>
    <Dot>.</Dot>
  </Typography>
);

LoadingText.propTypes = {
  text: PropTypes.string,
  props: PropTypes.arrayOf(PropTypes.any),
}

export default LoadingText;
