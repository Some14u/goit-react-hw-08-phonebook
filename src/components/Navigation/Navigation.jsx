import UserMenu from 'components/UserMenu';

/*
  We don't actually need this component because it has no practical use atm.
  I keep it only for sake of task requirements.
  Having such minimalistic design we have to choose,
  wheter we place navigation in Navigation or UserMenu component.
*/
const Navigation = () => {
  return (
    <nav>
      {
        // Redundant
        // {user && <NavLink to="/contacts">Contacts</NavLink>}
      }
      <UserMenu />
    </nav>
  );
};

export default Navigation;
