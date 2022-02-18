import axios from 'axios';
import { useState } from 'react';

const authorizationHeader =
  'bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImhuVmF3NzRVcVhTdHA5RkRRbHc0QWQtb2RFQkJJaFcxUVBBZUxuNzN4ekkifQ.eyJ1c2VybmFtZSI6ImFmM2JldGEiLCJraW5kIjoiYWNjZXNzX3Rva2VuIiwianRpIjoiSGZTbHZnamJjektDNmFNbUp6LWdiIiwic3ViIjoiOTdXQnliSEpQRlV5QTJ5ajBXRS0iLCJpYXQiOjE2NDUxNDYwODksImV4cCI6MTY0NTIzMjQ4OSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImlzcyI6Imh0dHBzOi8vaWQudHJ5Y2MudGVjaC8iLCJhdWQiOiJJNExRcE1RQnhBdzdVLW0tVjh1UzUifQ.D22juVo56IDXYJlLciRkec76pb1LqWUyhELQAb_d6H5y2_Wr_TcAoZWYFXI3BTSWUB5-NmVTeMQvvFvzMA_vjytl-zRh-8V11qr1UpjpHwdTSRqup80pzmP73EllqC6tMy305dDuvZ2qu3aSdW4uPVkAV-4APZ1_K_C4l-b8ttKrbFCcugVwQc7Gxzowm-CClsuraUN_18EWKyyN807HS1LfdR8oaoxzWVAM76o9Ygu5A_PTF9nqHnNjudFHa0z4W7vpkT5bW4pmy0QaWRVO5ptQMG9plVZ-DiILrBWVOuYxWGJJ1R7vg3wSXsdQCzOvheVHiiOdF6fTr-yngCzaLw';

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
