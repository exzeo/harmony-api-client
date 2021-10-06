import { useMemo } from 'react';
import { Field, Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';

import InputSelect from '../components/Select';
import ArraySchema from '../components/ArraySchema';
import ObjectSchema from '../components/ObjectSchema';
import BillingSchema from '../components/BillingSchema';

import { parseInputData } from '../utilities';

const QuoteForm = ({ submitQuote, input, quote, sendApplication }) => {
  const formSections = useMemo(() => {
    return parseInputData(input);
  }, [input]);

  return (
    <Form
      onSubmit={submitQuote}
      initialValues={input}
      mutators={{ ...arrayMutators }}
      className="content"
    >
      {({ form, values, handleSubmit }) => (
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
            {formSections &&
              formSections.map((section) => (
                <div
                  key={section.title}
                  style={{
                    marginBottom: '44px',
                    fontSize: '24px',
                  }}
                >
                  <h4>{section.title}</h4>
                  <div>
                    {section.inputs.map((input) => {
                      if (input.inputHint === 'select') {
                        return (
                          <InputSelect
                            options={input.options}
                            type={input.type}
                            title={input.title}
                            path={input.path}
                            defaultValue={input.default}
                            formValues={values}
                            key={input.path}
                          />
                        );
                      } else if (input.inputHint === 'textbox') {
                        return (
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                            }}
                          >
                            <label>{input.title}</label>
                            <div>
                              <Field
                                key={input.path}
                                name={input.path}
                                type={
                                  input.type === 'string' ? 'text' : 'number'
                                }
                                component="input"
                              />
                            </div>
                          </div>
                        );
                      } else if (input.inputHint === 'array') {
                        return (
                          <ArraySchema
                            inputList={input.inputList}
                            path={input.path}
                            title={input.title}
                            key={input.path}
                          />
                        );
                      } else if (input.inputHint === 'object') {
                        return (
                          <ObjectSchema
                            value={input.value}
                            path={input.path}
                            title={input.title}
                            inputList={input.inputList}
                            key={input.path}
                          />
                        );
                      } else if (input.inputHint === 'billing') {
                        return <BillingSchema input={input} values={values} />;
                      }
                      return null;
                    })}
                  </div>
                </div>
              ))}
            {/*TODO HANDLE ERRORS*/}
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
                      style={{ padding: '8px' }}
                      key={exception.customerMessage}
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

          <div style={{ paddingTop: '30px', paddingBottom: '30px' }}>
            Form Values
          </div>
          <pre>{JSON.stringify(values, 0, 2)}</pre>
        </>
      )}
    </Form>
  );
};
export default QuoteForm;
