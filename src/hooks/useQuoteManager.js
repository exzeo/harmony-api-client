import axios from 'axios';
import { useState } from 'react';

const authorizationHeader = `bearer ${process.env.REACT_APP_API_URL}`;

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
      await axios({
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

  function resetQuoteState() {
    setError(undefined);
    setSearchResults(undefined);
    setQuoteResult(undefined);
    setApplicationSuccess(undefined);
  }

  return {
    createQuote,
    updateQuote,
    searchAddress,
    sendApplication,
    resetQuoteState,
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
