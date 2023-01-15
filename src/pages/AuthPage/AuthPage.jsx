import { Container } from '@mui/material';
import AuthForm from 'components/AuthForm/AuthForm';

const AuthPage = props => {
  return (
    <Container maxWidth="xs" disableGutters={false}>
      <AuthForm {...props} />
    </Container>
  );
};

export default AuthPage;
