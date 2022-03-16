import axios from 'axios';
import { useState } from 'react';

export function useQuoteManager() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [searchResults, setSearchResults] = useState();
  const [quoteResult, setQuoteResult] = useState();
  const [applicationSuccess, setApplicationSuccess] = useState();
  const [token, setToken] = useState();

  async function getToken() {
    try {
      const { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } = process.env;

      const response = await axios({
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
          client_id: process.env.REACT_APP_CLIENT_ID,
          client_secret: process.env.REACT_APP_CLIENT_SECRET,
          grant_type: 'client_credentials',
        },
        method: 'POST',
        data: `client_id=${REACT_APP_CLIENT_ID}&client_secret=${REACT_APP_CLIENT_SECRET}&grant_type=client_credentials`,
        url: 'https://id.trycc.tech/oidc/token',
      });
      setToken(response.data.access_token);
    } catch (error) {
      throw error;
    }
  }

  async function searchAddress(query) {
    const {
      address,
      state,
      // TODO enable additional search variables as they become available
    } = query;
    setLoading(true);
    try {
      const cleanAddress = address.trim();
      const response = await axios({
        headers: { apiKey: token },
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

  async function createQuote(
    { companyCode, state, product, propertyId },
    setView
  ) {
    setLoading(true);
    try {
      const response = await axios({
        headers: { apiKey: token },
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
      setView('viewQuote');
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
        headers: { apiKey: token },
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

  async function retrieveQuote(quoteNumber, setView) {
    setLoading(true);
    try {
      const response = await axios({
        headers: { apiKey: token },
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/quote/${quoteNumber}`,
      });
      setQuoteResult(response.data.result);
      setView('viewQuote');
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  async function sendApplication(quoteNumber) {
    setLoading(true);
    try {
      await axios({
        headers: { apiKey: token },
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

  function resetSearchResults() {
    setSearchResults(undefined);
  }

  return {
    createQuote,
    updateQuote,
    fetchQuote: retrieveQuote,
    searchAddress,
    sendApplication,
    resetQuoteState,
    resetSearchResults,
    getToken,
    loading,
    error,
    searchResults,
    quoteResult,
    applicationSuccess,
  };
}

function formatForSubmit(doc) {
  // TODO anything in this function should be fixed bby the backend
  doc.categories.quote.properties.additionalInterests.value =
    doc.categories.quote.properties.additionalInterests.value.map((ai, i) => {
      return {
        active: true,
        order: i,
        name1: ai.name1,
        name2: ai.name2,
        phoneNumber: ai.phoneNumber,
        referenceNumber: ai.referenceNumber,
        mailingAddress: ai.mailingAddress,
      };
    });

  doc.categories.quote.properties.additionalInsureds.value =
    doc.categories.quote.properties.additionalInsureds.value.map(
      (interest, i) => {
        return {
          ...interest,
          order: i,
          active: true,
          country: { code: 'USA', displayText: 'United States of America' },
        };
      }
    );

  doc.categories.quote.properties.billPayers.value =
    doc.categories.quote.properties.billPayers.value.map((interest, i) => {
      return {
        ...interest,
        order: i,
        active: true,
        country: { code: 'USA', displayText: 'United States of America' },
      };
    });
  doc.categories.quote.properties.mortgagees.value =
    doc.categories.quote.properties.mortgagees.value.map((interest, i) => {
      return {
        ...interest,
        order: i,
        active: true,
        country: { code: 'USA', displayText: 'United States of America' },
      };
    });

  doc.categories.quote.properties.premiumFinances.value =
    doc.categories.quote.properties.premiumFinances.value.map((interest, i) => {
      return {
        ...interest,
        order: i,
        active: true,
        country: { code: 'USA', displayText: 'United States of America' },
      };
    });
}
