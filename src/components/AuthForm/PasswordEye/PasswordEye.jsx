import { IconButton, InputAdornment } from '@mui/material';
import PropTypes from 'prop-types';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const PasswordEye = ({ visibility }) => (
  <InputAdornment position="end">
    <IconButton onClick={visibility.toggle} edge="end">
      {visibility.isTrue ? <Visibility /> : <VisibilityOff />}
    </IconButton>
  </InputAdornment>
);

PasswordEye.propTypes = {
  visibility: PropTypes.shape({
    isTrue: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
  }).isRequired,
};

export default PasswordEye;
