import axios from "axios";

const trimWhiteSpace = value =>
    value ? value.replace(/\s+/g, ' ').trim() : value;

export async function searchAddress({
                                        address,
                                        state,
                                        // TODO enable these once service recognizes them
                                        // companyCode,
                                        // product = 'HO3',
                                        tor = 'single family',
                                        page = '1',
                                        pageSize = '10'
                                    }) {
    try {
        //property/search
        const cleanAddress = trimWhiteSpace(address);
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/property?searchText=${cleanAddress}&state=${state}`,
        }).then((response) => console.log(response));
        // const cleanQuery = encodeURI(
        //     `/v1/search/${cleanAddress}/${state}/${tor}/HO3/${page}/${pageSize}`
        // );
    } catch (error) {
        throw error;
    }
}