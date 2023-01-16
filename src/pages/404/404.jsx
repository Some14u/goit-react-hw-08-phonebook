import { Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import CenteredContainer from 'components/CenteredContainer';
import { useDocumentTitleRenamer } from 'helpers/hooks';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  useDocumentTitleRenamer("404"); // This takes care about document title

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <CenteredContainer>
      <Typography variant="h5">This page do not exist. Error 404.</Typography>
      <p>
        <Link onClick={goBack} href="#">Go back</Link> or <Link to="/" component={RouterLink}>go home</Link>
      </p>
    </CenteredContainer>
  );
};

export default NotFoundPage;
