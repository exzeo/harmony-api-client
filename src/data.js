import axios from "axios";

const trimWhiteSpace = value =>
    value ? value.replace(/\s+/g, ' ').trim() : value;
const authorizationHeader = 'bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImhuVmF3NzRVcVhTdHA5RkRRbHc0QWQtb2RFQkJJaFcxUVBBZUxuNzN4ekkifQ.eyJ1c2VybmFtZSI6ImFmM2JldGEiLCJraW5kIjoiYWNjZXNzX3Rva2VuIiwianRpIjoiNzNOZXo3ZFZGSkgtaC1xYktDVXlHIiwic3ViIjoiOTdXQnliSEpQRlV5QTJ5ajBXRS0iLCJpYXQiOjE2NDE4MjI2MDksImV4cCI6MTY0MTkwOTAwOSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImlzcyI6Imh0dHBzOi8vaWQudHJ5Y2MudGVjaC8iLCJhdWQiOiJJNExRcE1RQnhBdzdVLW0tVjh1UzUifQ.R_tllQDv56QzYc1VXLh88uPLo-DDvo1yLWVom3wSUyGKm51CAbPI9avUpS2kfP8SMEhj18walPvE3oyVBrRBGyGVM-4puJcY5rC2ljfb7KZgQrHmowOzw8fdPiMY5TtNUn4evsoo7XQhUxa_62FtKdDEckVQ2gN8Yg_qzhFf3NDpgXY3T2t-7azuyWzYkI69cZLKvdETyucZT23VWkfjBREWI3bAtvHpTILHomqbCTACFe3NCbBW9QkCCxIQIqxkQpRxNG5QlQ8AUpdjiFLX-OsAeWgW4OFyNWJHZ1CKZq8i4pNXeOKaTHFcTdzwbS88u7NsomtlbdiTKU51FEyq0w';

export async function searchAddress({
                                        address,
                                        state,
                                        // TODO enable these once service recognizes them
                                        // companyCode,
                                        // product = 'HO3',
                                        tor = 'single family',
                                        page = '1',
                                        pageSize = '10'
                                    }, setResponse) {
    try {
        const cleanAddress = trimWhiteSpace(address);
        axios({
            headers: {Authorization: authorizationHeader},
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/property?searchText=${cleanAddress}&state=${state}`,
        }).then((response) => setResponse(response.data.result.IndexResult));
    } catch (error) {
        throw error;
    }
}

export async function createQuote({
                                      companyCode,
                                      state,
                                      product,
                                      propertyId,
                                      setLoadingData,
                                      setQuoteValues,
                                      setTab
                                  }) {
    try {
        axios({
            headers: {Authorization: authorizationHeader},
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/quote`,
            data: {
                companyCode,
                state,
                product,
                propertyId,
            },
        }).then(response => {
            setLoadingData(false);
            setQuoteValues(response.data.result);
            setTab(1);
        });
    } catch (error) {
        throw error;
    }
};

export async function updateQuote(e, input, quote) {
    e.preventDefault();

    try {
        axios({
            headers: {Authorization: authorizationHeader},
            method: 'put',
            url: `${process.env.REACT_APP_API_URL}/quote/${quote.quoteNumber}`,
            data: {
                quote,
                input
            },
        }).then(response => {
            console.log('response',response);
            // setLoadingData(false);
            // setQuoteValues(response);
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};
