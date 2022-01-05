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
            headers: {Authorization: 'bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImhuVmF3NzRVcVhTdHA5RkRRbHc0QWQtb2RFQkJJaFcxUVBBZUxuNzN4ekkifQ.eyJ1c2VybmFtZSI6ImFmM2JldGEiLCJraW5kIjoiYWNjZXNzX3Rva2VuIiwianRpIjoiVVhzX3k2TXBTWXI1RUNfSmNoUGF0Iiwic3ViIjoiOTdXQnliSEpQRlV5QTJ5ajBXRS0iLCJpYXQiOjE2NDEzMzA0MDIsImV4cCI6MTY0MTQxNjgwMiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImlzcyI6Imh0dHBzOi8vaWQudHJ5Y2MudGVjaC8iLCJhdWQiOiJJNExRcE1RQnhBdzdVLW0tVjh1UzUifQ.e2-JC9GdLZLaxuhOrRXhk8aSDRV_174Ubuw5NHOXDNkQ-nhC0HooWJDgV1aZMiKBCgQFLCBUx3OZ-S0p8PNd3S3M7f4PC8IrvomuY6BpB_9-El1qiFgFqAcT8zO1xcYHPj_Nq-V8q8vdOTMZMp7B4eYnU2615qnkMNPZL9lq7AluAcmsN3uRURUI8YB1kDyYNuNQInyuHte2_cVuevXMcbLdpTaKa1iSbag0EX2XqZQWJsbZkjbOplp_MhWWbVt_4zP-eY8DYKDwcep3JrLJekpN-i2ZsAcb6s6fLEIyoQcWCjKsaeiupVsqlQ4vOHIMg4MpwDMRTz-etCUO1OQCMw'},
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
            headers: {Authorization: 'bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImhuVmF3NzRVcVhTdHA5RkRRbHc0QWQtb2RFQkJJaFcxUVBBZUxuNzN4ekkifQ.eyJ1c2VybmFtZSI6ImFmM2JldGEiLCJraW5kIjoiYWNjZXNzX3Rva2VuIiwianRpIjoiVVhzX3k2TXBTWXI1RUNfSmNoUGF0Iiwic3ViIjoiOTdXQnliSEpQRlV5QTJ5ajBXRS0iLCJpYXQiOjE2NDEzMzA0MDIsImV4cCI6MTY0MTQxNjgwMiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImlzcyI6Imh0dHBzOi8vaWQudHJ5Y2MudGVjaC8iLCJhdWQiOiJJNExRcE1RQnhBdzdVLW0tVjh1UzUifQ.e2-JC9GdLZLaxuhOrRXhk8aSDRV_174Ubuw5NHOXDNkQ-nhC0HooWJDgV1aZMiKBCgQFLCBUx3OZ-S0p8PNd3S3M7f4PC8IrvomuY6BpB_9-El1qiFgFqAcT8zO1xcYHPj_Nq-V8q8vdOTMZMp7B4eYnU2615qnkMNPZL9lq7AluAcmsN3uRURUI8YB1kDyYNuNQInyuHte2_cVuevXMcbLdpTaKa1iSbag0EX2XqZQWJsbZkjbOplp_MhWWbVt_4zP-eY8DYKDwcep3JrLJekpN-i2ZsAcb6s6fLEIyoQcWCjKsaeiupVsqlQ4vOHIMg4MpwDMRTz-etCUO1OQCMw'},
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


