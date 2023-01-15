import {
  AppBar,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { Logout } from '@mui/icons-material';
import { Container } from '@mui/system';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import * as sx from './sx';
import PropTypes from 'prop-types';

const LoggedUser = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/logout', { replace: true });
  };

  return (
    <Fragment>
      <AppBar>
        <Toolbar>
          <Container>
            <Typography variant="h6" gutterBottom sx={sx.typography}>
              {user?.name}'s phonebook
            </Typography>
          </Container>
          <Tooltip title="Logout">
            <IconButton onClick={handleLogout} color={'inherit'} edge="end">
              <Logout />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

LoggedUser.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default LoggedUser;
