import { useMemo } from 'react';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';

import ArraySchema from '../components/ArraySchema';
import BillingSchema from '../components/BillingSchema';

import { formatHeading, formatSections, renderInput } from '../utilities';

const QuoteForm = ({ submitQuote, input, quote, sendApplication }) => {
  const quoteSections = useMemo(
    () =>
      Object.entries({
        ...input.categories.quote.properties,
        ...input.categories.billing.properties,
      }).map(([sectionName, section]) =>
        formatSections([sectionName, section])
      ),
    [input]
  );
  console.log(quoteSections);

  return (
    <Form
      onSubmit={submitQuote}
      initialValues={input}
      mutators={{ ...arrayMutators }}
      className="content"
    >
      {({ values, handleSubmit }) => (
        <>
          <form
            id="quote-form"
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              paddingTop: '100px',
            }}
          >
            {quoteSections.map((section) => {
              return (
                <section key={section.key} aria-labelledby="section-key">
                  <h2 id="section-key">{formatHeading(section.key)}</h2>
                  {section.type === 'billing' ? (
                    <BillingSchema input={section} values={values} />
                  ) : section.type === 'array' ? (
                    <ArraySchema
                      inputList={section.inputs}
                      title={formatHeading(section.key)}
                      path={section.path}
                    />
                  ) : (
                    section.inputs.map((input) => renderInput(input))
                  )}
                </section>
              );
            })}

            {/*// SHOW UW EXCEPTIONS*/}
            {quote.underwritingExceptions.length > 0 && (
              <ul
                style={{
                  width: '400px',
                  outline: '#d6909b solid',
                  borderRadius: '4px',
                  margin: 'auto',
                  backgroundColor: '#ffb6c1',
                }}
              >
                {quote?.underwritingExceptions.map((exception) => {
                  return (
                    <li
                      key={exception.customerMessage}
                      style={{ padding: '8px' }}
                    >
                      {exception.customerMessage}
                    </li>
                  );
                })}
              </ul>
            )}

            <div style={{ margin: 'auto', padding: '30px 0px' }}>
              <button type="submit" form="quote-form">
                Submit Form for Re-evaluation
              </button>
            </div>
          </form>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              type="button"
              disabled={quote?.underwritingExceptions?.length > 0}
              onClick={() => sendApplication(quote.quoteNumber)}
            >
              Send Application
            </button>
          </div>
        </>
      )}
    </Form>
  );
};
export default QuoteForm;
