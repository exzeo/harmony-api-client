import { Field, Form } from 'react-final-form';

const QuoteSearch = ({ fetchQuote, loading, setView }) => {
  const handleSubmit = async ({ quoteNumber }) => {
    await fetchQuote(quoteNumber, setView);
  };
  // TODO what about when 0 results?
  return (
    <Form onSubmit={handleSubmit} className="content">
      {({ handleSubmit, invalid, values }) => (
        <>
          <form className="quote-search content" onSubmit={handleSubmit}>
            <h1 style={{ fontSize: '20px', margin: '10px 10px' }}>
              Quote Search
            </h1>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignContent: 'center',
                alignItems: 'center',
              }}
            >
              <Field
                name="quoteNumber"
                placeholder={'Quote Number'}
                component={'input'}
                style={{ margin: '0px' }}
              />
              <button
                style={{ marginTop: '16px' }}
                onClick={handleSubmit}
                type="submit"
                disabled={invalid || loading}
              >
                SEARCH
              </button>
            </div>
          </form>
        </>
      )}
    </Form>
  );
};

export default QuoteSearch;
