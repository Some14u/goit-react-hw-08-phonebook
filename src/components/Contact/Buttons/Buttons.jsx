import { IconButton, CircularProgress, Tooltip } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import PropTypes from 'prop-types';

const Buttons = ({
  toggleVisibility,
  handleDeleteButton,
  isDeleteLoading,
  isDeleteSuccess,
}) => (
  <>
    <Tooltip title="Edit record">
      <IconButton
        onClick={toggleVisibility}
        disabled={isDeleteLoading || isDeleteSuccess}
      >
        <Edit />
      </IconButton>
    </Tooltip>
    <Tooltip title="Delete record">
      <IconButton
        edge="end"
        onClick={handleDeleteButton}
        disabled={isDeleteLoading || isDeleteSuccess}
      >
        {isDeleteLoading ? (
          <CircularProgress size="1em" />
        ) : (
          <Delete />
        )}
      </IconButton>
    </Tooltip>
  </>
);

Buttons.propTypes = {
  toggleVisibility: PropTypes.func.isRequired,
  handleDeleteButton: PropTypes.func.isRequired,
  isDeleteLoading: PropTypes.bool.isRequired,
  isDeleteSuccess: PropTypes.bool.isRequired,
};

export default Buttons;
