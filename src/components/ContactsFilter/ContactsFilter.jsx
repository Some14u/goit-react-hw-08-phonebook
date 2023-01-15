import { InputAdornment, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';

export const filterSearchParameterName = 'name-contains';

const ContactsFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get(filterSearchParameterName);

  const handleFilterChange = event => {
    const value = event.target.value.trim().toLowerCase();
    if (filter === value) return;
    if (value) setSearchParams({ [filterSearchParameterName]: value });
    else setSearchParams({});
  };

  return (
    <TextField
      id="outlined-basic"
      label="Search by name"
      variant="outlined"
      onChange={handleFilterChange}
      defaultValue={filter}
      size="medium"
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Search />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default ContactsFilter;
