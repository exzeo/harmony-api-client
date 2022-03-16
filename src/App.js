import { useState, useEffect } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import { useQuoteManager } from './hooks/useQuoteManager';
import PropertySearch from './Search/PropertySearch';
import QuoteSearch from './Search/QuoteSearch';
import QuoteForm from './Quote/QuoteForm';

import './App.css';

function App() {
  const [view, setView] = useState('propertySearch');

  const {
    loading,
    searchAddress,
    searchResults,
    createQuote,
    fetchQuote,
    updateQuote,
    quoteResult = {},
    sendApplication,
    applicationSuccess,
    resetQuoteState,
    resetSearchResults,
    getToken,
  } = useQuoteManager();
  const { quote, input } = quoteResult;

  useEffect(() => {
    getToken();
  }, []);

  async function startQuote(values) {
    await createQuote(values);
    setView('viewQuote');
  }

  const submitQuote = async (values) => {
    await updateQuote({
      quote,
      input: values,
    });
  };

  if (applicationSuccess) {
    return (
      <div>
        <AppBar position="static">
          <h6 style={{ textAlign: 'center' }}>TypTap Insurance Demo</h6>
        </AppBar>
        <div style={{ fontSize: '20px', textAlign: 'center', margin: '40px' }}>
          Application sent Successfully. Check your email for a document from
          docusign
        </div>
        <button
          onClick={() => {
            resetQuoteState();
            setView('search');
          }}
          style={{ margin: 'auto' }}
        >
          New Quote
        </button>
      </div>
    );
  }

  return (
    <div className="App">
      <div>
        <AppBar className="sticky" style={{ padding: '5px' }}>
          <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex' }}>
              <h6>
                <div>TypTap</div>
                Demo
              </h6>
              <button
                style={{ width: '180px', marginLeft: '10px' }}
                onClick={() => {
                  setView('quoteSearch');
                  resetSearchResults();
                }}
              >
                Quote Search
              </button>
              <button
                style={{ width: '180px' }}
                onClick={() => {
                  setView('propertySearch');
                  resetSearchResults();
                }}
              >
                Property Search
              </button>
              {input && view !== 'viewQuote' && (
                <button
                  style={{ width: '180px' }}
                  onClick={() => {
                    setView('viewQuote');
                  }}
                >
                  View Quote
                </button>
              )}
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                justifyContent: 'space-evenly',
                alignItems: 'end',
              }}
            >
              {quote ? (
                <>
                  <div>
                    Premium:{' '}
                    {quote?.rating.totalPremium
                      ? `$${quote.rating.totalPremium.toLocaleString('en', {
                          minimumFractionDigits: 2,
                        })}`
                      : 'Awaiting additional info'}
                  </div>
                  <div>Quote State: {quote.quoteState}</div>
                  <div>Quote Number: {quote.quoteNumber}</div>
                </>
              ) : null}
            </div>
          </Toolbar>
        </AppBar>

        {loading ? (
          <Backdrop style={{ color: '#fff', zIndex: 999 }} open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : null}

        {view === 'quoteSearch' && (
          <QuoteSearch
            fetchQuote={fetchQuote}
            searchResults={searchResults}
            loading={loading}
            setView={setView}
          />
        )}

        {view === 'propertySearch' && (
          <PropertySearch
            searchAddress={searchAddress}
            searchResults={searchResults}
            createQuote={startQuote}
            loading={loading}
            setView={setView}
          />
        )}

        {view === 'viewQuote' && input && (
          <QuoteForm
            input={input}
            quote={quote}
            sendApplication={sendApplication}
            submitQuote={submitQuote}
          />
        )}
      </div>
    </div>
  );
}

export default App;
