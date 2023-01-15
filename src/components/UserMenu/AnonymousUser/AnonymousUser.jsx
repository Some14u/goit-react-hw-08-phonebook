import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Container, Tab, Tabs, Typography } from '@mui/material';

const selectTabIdx = (endpoint) => endpoint === '/register' ? 1 : 0

const AnonymousUser = () => {
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(selectTabIdx(location.pathname));

  useEffect(() => {
    setSelectedTab(selectTabIdx(location.pathname));
  },[location.pathname])

  return (
    <Container maxWidth="sm">
      <Typography textAlign="center" pt={4} variant="h5" gutterBottom>
        You're not logged in yet
      </Typography>
      <Tabs value={selectedTab} centered>
        <Tab label="Login" component={Link} to="/login" />
        <Tab label="Register" component={Link} to="/register" />
      </Tabs>
    </Container>
  );
};

export default AnonymousUser;
