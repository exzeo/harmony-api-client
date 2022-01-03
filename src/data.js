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
            headers: {Authorization: 'bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImhuVmF3NzRVcVhTdHA5RkRRbHc0QWQtb2RFQkJJaFcxUVBBZUxuNzN4ekkifQ.eyJ1c2VybmFtZSI6ImFmM2JldGEiLCJraW5kIjoiYWNjZXNzX3Rva2VuIiwianRpIjoiRjF3WEtuOGx1S0ZwaHRPU2p4VWJsIiwic3ViIjoiOTdXQnliSEpQRlV5QTJ5ajBXRS0iLCJpYXQiOjE2NDEyMjA2MjQsImV4cCI6MTY0MTMwNzAyNCwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImlzcyI6Imh0dHBzOi8vaWQudHJ5Y2MudGVjaC8iLCJhdWQiOiJJNExRcE1RQnhBdzdVLW0tVjh1UzUifQ.YgWd9-nkzw9dAEnCPIJpwXiL8MLvS_Gs0NCikujjoweSYS_Vx9LshqdSLZ83GaATZdIk2vT0fuU5eZBs21CfYAFEvOy0kLXm6bGp1UfcGIShMCbdtf90sKg2NKQWyxaFma27MRUFJuZoM0tF_2vxT4USlKkV5fUWC3Pq-_JSVa2HHBJc19CcYc9TsWGuAFpUyHLIrnmYyzOqjZdOU0kPgcF7sam0FKc4KQjQ5mpURu5oVerJy8SuxOeUw-GQ4JZH9Jt8xNlrzRHiQFdmO7paBXwTgDnyrxkaBOvQR_naU4uSgp2rpchsoCAaH2mLVtSTUQJbg7lXC-ZDFQPJ1T_8Hg'},
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
            headers: {Authorization: 'bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImhuVmF3NzRVcVhTdHA5RkRRbHc0QWQtb2RFQkJJaFcxUVBBZUxuNzN4ekkifQ.eyJ1c2VybmFtZSI6ImFmM2JldGEiLCJraW5kIjoiYWNjZXNzX3Rva2VuIiwianRpIjoiRjF3WEtuOGx1S0ZwaHRPU2p4VWJsIiwic3ViIjoiOTdXQnliSEpQRlV5QTJ5ajBXRS0iLCJpYXQiOjE2NDEyMjA2MjQsImV4cCI6MTY0MTMwNzAyNCwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImlzcyI6Imh0dHBzOi8vaWQudHJ5Y2MudGVjaC8iLCJhdWQiOiJJNExRcE1RQnhBdzdVLW0tVjh1UzUifQ.YgWd9-nkzw9dAEnCPIJpwXiL8MLvS_Gs0NCikujjoweSYS_Vx9LshqdSLZ83GaATZdIk2vT0fuU5eZBs21CfYAFEvOy0kLXm6bGp1UfcGIShMCbdtf90sKg2NKQWyxaFma27MRUFJuZoM0tF_2vxT4USlKkV5fUWC3Pq-_JSVa2HHBJc19CcYc9TsWGuAFpUyHLIrnmYyzOqjZdOU0kPgcF7sam0FKc4KQjQ5mpURu5oVerJy8SuxOeUw-GQ4JZH9Jt8xNlrzRHiQFdmO7paBXwTgDnyrxkaBOvQR_naU4uSgp2rpchsoCAaH2mLVtSTUQJbg7lXC-ZDFQPJ1T_8Hg'},
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

export async function updateQuote({
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
            method: 'put',
            url: `${process.env.REACT_APP_API_URL}/quote`,
            data: {
                companyCode,
                state,
                product,
                propertyId,
            },
        }).then(response => {
            setLoadingData(false);
            setQuoteValues(response);
            setTab(1);
        });
    } catch (error) {
        throw error;
    }
};


