import axiosApi from 'axios';

const axios = axiosApi.create({
  baseURL: `https://${process.env.REACT_APP_MOCKAPI_KEY}.mockapi.io`,
});

function getContacts() {
  return axios.get('/contacts');
}

function addContact(data) {
  return axios.post('/contacts', data);
}

function deleteContact({ id }) {
  return axios.delete('/contacts/' + id);
}

const mockApi = {
  getContacts,
  addContact,
  deleteContact,
};
export default mockApi;
