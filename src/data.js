import axios from 'axios';

const trimWhiteSpace = (value) =>
  value ? value.replace(/\s+/g, ' ').trim() : value;

export async function searchAddress(
  {
    address,
    state,
    // TODO enable these once service recognizes them
    // companyCode,
    // product = 'HO3',
    tor = 'single family',
    page = '1',
    pageSize = '10',
  },
  setResponse
) {
  try {
    const cleanAddress = trimWhiteSpace(address);
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/property?searchText=${cleanAddress}&state=${state}`,
    }).then((response) => setResponse(response.data.result.IndexResult));
  } catch (error) {
    throw error;
  }
}
