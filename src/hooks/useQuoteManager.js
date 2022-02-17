import axios from 'axios';
import { useState } from 'react';

const authorizationHeader =
  'bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImhuVmF3NzRVcVhTdHA5RkRRbHc0QWQtb2RFQkJJaFcxUVBBZUxuNzN4ekkifQ.eyJ1c2VybmFtZSI6ImFmM2JldGEiLCJraW5kIjoiYWNjZXNzX3Rva2VuIiwianRpIjoiVURBZHpuREtwWUZWdmtNRkdjNXBRIiwic3ViIjoiOTdXQnliSEpQRlV5QTJ5ajBXRS0iLCJpYXQiOjE2NDUwNTkzOTMsImV4cCI6MTY0NTE0NTc5Mywic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImlzcyI6Imh0dHBzOi8vaWQudHJ5Y2MudGVjaC8iLCJhdWQiOiJJNExRcE1RQnhBdzdVLW0tVjh1UzUifQ.melJbdUtO0gS_hkB1Fha-P2GY3j7w2wheveidq1-de9U_TNau-sEHHhy-5PsfZ9HotWYU3e2FBCTVfrRlYM2eaA00mXavdzYXyzyMe-5Q8C8kZupwLjwJ65GWnL5nagL0s0Gs4CLeNakMABXCfRnl6qYcR8Gg9ciugSByMdVN1BMje87jMtjfz_lReeBeJPLqJebMrfGCdU4Iax5sWlqsuvMykuD52c9f1xYrXEMXyTjVIYQ6GI4_5vRHLpURxnHuc_-_W3FVMh68-9OYkrmiLFduh3nRW1kc0rx4PvgwH6S1tDQWZckaGD-GUY4hv4LmdQ7qszq83WQbeW017KVLQ';

export function useQuoteManager() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [searchResults, setSearchResults] = useState();
  const [quoteResult, setQuoteResult] = useState();
  const [applicationSuccess, setApplicationSuccess] = useState();

  async function createQuote({ companyCode, state, product, propertyId }) {
    setLoading(true);
    try {
      const response = await axios({
        headers: { Authorization: authorizationHeader },
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/quote`,
        data: {
          companyCode,
          state,
          product,
          propertyId,
        },
      });
      setQuoteResult(response.data.result);
      setSearchResults(undefined);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateQuote({ quote, input }) {
    setLoading(true);
    try {
      formatForSubmit(input);

      const response = await axios({
        headers: { Authorization: authorizationHeader },
        method: 'put',
        url: `${process.env.REACT_APP_API_URL}/quote/${quote.quoteNumber}`,
        data: {
          quote,
          input,
        },
      });
      setQuoteResult(response.data.result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  async function searchAddress({
    address,
    state,
    tor = 'single family',
    page = '1',
    pageSize = '10',
    // TODO enable these once service recognizes them
    // companyCode,
    // product = 'HO3',
  }) {
    setLoading(true);
    try {
      const cleanAddress = address.trim();
      const response = await axios({
        headers: { Authorization: authorizationHeader },
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/property?searchText=${cleanAddress}&state=${state}`,
      });
      setSearchResults(response.data.result.IndexResult);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function sendApplication(quoteNumber) {
    setLoading(true);
    try {
      const response = await axios({
        headers: { Authorization: authorizationHeader },
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/sendApplication`,
        data: {
          quoteNumber,
          sendType: 'docusign',
        },
      });
      setApplicationSuccess(true);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    createQuote,
    updateQuote,
    searchAddress,
    sendApplication,
    loading,
    error,
    searchResults,
    quoteResult,
    applicationSuccess,
  };
}

function formatForSubmit(doc) {
  doc.categories.quote.properties.policyHolders.value =
    doc.categories.quote.properties.policyHolders.value.map((p, i) => ({
      ...p,
      order: i,
      ...(i === 0 && { electronicDelivery: false }),
    }));
}
