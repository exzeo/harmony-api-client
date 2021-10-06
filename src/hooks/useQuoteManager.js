import axios from 'axios';
import { useState } from 'react';

const AUTH_TOKEN = `bearer ${process.env.REACT_APP_API_TOKEN}`;

export function useQuoteManager() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [searchResults, setSearchResults] = useState();
  const [quoteResult, setQuoteResult] = useState();
  const [applicationSuccess, setApplicationSuccess] = useState();

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
        headers: { Authorization: AUTH_TOKEN },
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
        headers: { Authorization: AUTH_TOKEN },
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
        headers: { Authorization: AUTH_TOKEN },
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
        headers: { Authorization: AUTH_TOKEN },
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
        headers: { Authorization: AUTH_TOKEN },
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
