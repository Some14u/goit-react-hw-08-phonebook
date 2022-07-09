import { useMemo } from "react";
import PropTypes from "prop-types";
import Contact from "./Contact/Contact";
import { connect } from "react-redux";
import { getContacts, getFilter } from "redux/redux-contacts";


function Contacts({ contacts, filter }) {
  // buffer contains each element by id with calculated y-index based on filtered status
  // make buffer calculation dependent on contact/filter change
  const [buffer, filteredAmount] = useMemo(() => {
    const normalizedFilter = filter.trim().toLowerCase();
    let [buffer, filteredCounter, unfilteredCounter] = [{}, 0, 0];
    contacts.forEach(({ id, name }) => {
      const isFiltered = name.toLowerCase().includes(normalizedFilter);
      buffer[id] = { isFiltered, idx: isFiltered ? filteredCounter++ : unfilteredCounter++ };
    });
    return [buffer, filteredCounter];
  }, [contacts, filter]);


  return (
    <ul>
      {
        contacts.map(({ id, ...restProps }) =>
        <Contact
          key={id}
          id={id}
          idx={(buffer[id].isFiltered ? 0 : filteredAmount) + buffer[id].idx} // unfiltered should respect filtered amount
          isFiltered={buffer[id].isFiltered}
          {...restProps}
        />)
      }
    </ul>
  );
}

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  filter: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  contacts: getContacts(state),
  filter: getFilter(state),
});

export default connect(mapStateToProps)(Contacts);