import { Box } from '@mui/material';
import * as sx from './sx';
import PropTypes from 'prop-types';

const CenteredContainer = ({ children }) => (
  <Box sx={sx.centered}>{children}</Box>
);

CenteredContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CenteredContainer;
