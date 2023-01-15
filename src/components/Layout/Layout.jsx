import { Outlet } from 'react-router-dom';
import Header from 'components/Header';
import { useDocumentTitleRenamer } from 'helpers/hooks';

const Layout = () => {
  useDocumentTitleRenamer(); // This takes care about document title

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
