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
                                    }, setResponse) {
    try {
        const cleanAddress = trimWhiteSpace(address);
        axios({
            headers: {Authorization: 'bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImhuVmF3NzRVcVhTdHA5RkRRbHc0QWQtb2RFQkJJaFcxUVBBZUxuNzN4ekkifQ.eyJ1c2VybmFtZSI6ImFmM2JldGEiLCJraW5kIjoiYWNjZXNzX3Rva2VuIiwianRpIjoiM1M0bVdOYk16TGtpaHdXQUFvalgxIiwic3ViIjoiOTdXQnliSEpQRlV5QTJ5ajBXRS0iLCJpYXQiOjE2NDE0MTkzMDksImV4cCI6MTY0MTUwNTcwOSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImlzcyI6Imh0dHBzOi8vaWQudHJ5Y2MudGVjaC8iLCJhdWQiOiJJNExRcE1RQnhBdzdVLW0tVjh1UzUifQ.dPOkEgaIViDP-nn8lajKYq5NkXSCdbhaANYtg9-WNA2P2qJKEwej7OAtzleVVf7oagNggEQjduk1WIZkQYvM81MMdEU9tQrLlh3JE9700wkf9KP066230ZRPv5YH17l8QwK25pD0DMV7eBKNDo3XlvCitbc2AoB7UgeI6Hvf9vYtF6X7cBa7BvLbzmyB96buZVws7UIWI5dhywdgpwgpAdwNLwrW17uxeJFubxEhh3n14dOQFsFmf9hiDUiPgnLgm7ieeXeOTj_8vruRBYyZuutjepq9iy2cj8O1u1M0ntcNRFbf6kkiKt3UzrkH8u9A_8FYx6iX9-WQPkcHFArG2Q'},
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
            headers: {Authorization: 'bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImhuVmF3NzRVcVhTdHA5RkRRbHc0QWQtb2RFQkJJaFcxUVBBZUxuNzN4ekkifQ.eyJ1c2VybmFtZSI6ImFmM2JldGEiLCJraW5kIjoiYWNjZXNzX3Rva2VuIiwianRpIjoiM1M0bVdOYk16TGtpaHdXQUFvalgxIiwic3ViIjoiOTdXQnliSEpQRlV5QTJ5ajBXRS0iLCJpYXQiOjE2NDE0MTkzMDksImV4cCI6MTY0MTUwNTcwOSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImlzcyI6Imh0dHBzOi8vaWQudHJ5Y2MudGVjaC8iLCJhdWQiOiJJNExRcE1RQnhBdzdVLW0tVjh1UzUifQ.dPOkEgaIViDP-nn8lajKYq5NkXSCdbhaANYtg9-WNA2P2qJKEwej7OAtzleVVf7oagNggEQjduk1WIZkQYvM81MMdEU9tQrLlh3JE9700wkf9KP066230ZRPv5YH17l8QwK25pD0DMV7eBKNDo3XlvCitbc2AoB7UgeI6Hvf9vYtF6X7cBa7BvLbzmyB96buZVws7UIWI5dhywdgpwgpAdwNLwrW17uxeJFubxEhh3n14dOQFsFmf9hiDUiPgnLgm7ieeXeOTj_8vruRBYyZuutjepq9iy2cj8O1u1M0ntcNRFbf6kkiKt3UzrkH8u9A_8FYx6iX9-WQPkcHFArG2Q'},
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
