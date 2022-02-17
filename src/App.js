import { Fragment, useState, useMemo } from 'react';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';

// import { useAuth0 } from './context/auth-context';
// import UnauthenticatedApp from './temp/UnauthenticatedApp';

import { useQuoteManager } from './hooks/useQuoteManager';
import Search from './components/Search';
import ObjectSchema from './components/ObjectSchema';
import ArraySchema from './components/ArraySchema';
import InputSelect from './components/Select';
// import BillingSchema from './components/BillingSchema';

import { parseInputData } from './utilities';

import './App.css';

function App() {
  const [view, setView] = useState('search');

  // const { loading: authLoading } = useAuth0();

  const {
    loading,
    searchAddress,
    searchResults,
    sendApplication,
    createQuote,
    quoteResult = {},
    updateQuote,
  } = useQuoteManager();
  const { quote, input } = quoteResult;

  const formSections = useMemo(() => {
    return parseInputData(input);
  }, [input]);

  async function startQuote(values) {
    await createQuote(values);
    setView('quote');
  }

  const submitQuote = async (values) => {
    await updateQuote({
      quote,
      input: values,
    });
  };

  return (
    <div className="App">
      <div>
        <AppBar position="static">
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, margin: 2 }}
            component="div"
          >
            TypTap Insurance Demo
          </Typography>
        </AppBar>

        <Divider />

        <Backdrop sx={{ color: '#fff', zIndex: 10000 }} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>

        {view === 'search' && (
          <>
            <h3>Property Search</h3>
            <Search
              searchAddress={searchAddress}
              searchResults={searchResults}
              createQuote={startQuote}
              loading={loading}
            />
          </>
        )}

        {input && (
          <Form
            onSubmit={submitQuote}
            initialValues={input}
            mutators={{ ...arrayMutators }}
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
                        <Grid container item>
                          {section.inputs.map((input) => {
                            if (input.inputHint === 'select') {
                              return (
                                <InputSelect
                                  options={input.options}
                                  title={input.title}
                                  path={input.path}
                                  defaultValue={input.default}
                                  formValues={values}
                                  key={input.path}
                                />
                              );
                            } else if (input.inputHint === 'textbox') {
                              return (
                                <Field
                                  key={input.path}
                                  name={input.path}
                                  type={
                                    input.type === 'string' ? 'text' : 'number'
                                  }
                                  component="input"
                                />
                              );
                            } else if (input.inputHint === 'array') {
                              return (
                                <ArraySchema
                                  formApi={form}
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
                              return (
                                <div key="billing">
                                  {input.options.map((option) => {
                                    return (
                                      <Fragment>
                                        <Field
                                          name={
                                            'categories.billing.properties.billing.value.billToId'
                                          }
                                        >
                                          {({ input, meta }) => {
                                            return (
                                              <>
                                                <div>
                                                  {option.firstName}{' '}
                                                  {option.lastName}
                                                </div>
                                                <button
                                                  type="button"
                                                  onClick={() =>
                                                    input.onChange(
                                                      option.billToId.const
                                                    )
                                                  }
                                                >
                                                  Set BillToID
                                                </button>
                                              </>
                                            );
                                          }}
                                        </Field>
                                        {option.id ===
                                        values.categories.billing.properties
                                          .billing.value.billToId ? (
                                          <div>
                                            <Field
                                              name={
                                                'categories.billing.properties.billing.value.billPlan'
                                              }
                                            >
                                              {({ input, meta }) => {
                                                return (
                                                  <select {...input}>
                                                    {option.optionPropertyList.enum.map(
                                                      (property) => {
                                                        return (
                                                          <option
                                                            value={property}
                                                            key={property}
                                                          >
                                                            {property}
                                                          </option>
                                                        );
                                                      }
                                                    )}
                                                  </select>
                                                );
                                              }}
                                            </Field>
                                          </div>
                                        ) : null}
                                      </Fragment>
                                    );
                                  })}
                                </div>
                              );
                            }
                            return null;
                          })}
                        </Grid>
                      </div>
                    ))}
                  {/*TODO FIX STYLING SO IT LOOKS NICE*/}
                  {/*TODO SHOW underwriting Exceptions*/}
                  {/*TODO DEAL WITH NUMBERS AND BOOLEANS*/}
                  {/*TODO SHOW SUCCESS ONCE SEND TO DOCUSIGN*/}
                  {/*TODO HANDLE ERRORS*/}
                  <button type="submit" form="quote-form">
                    Submit Form for Re-evaluation
                  </button>
                </form>
                <button
                  type="button"
                  disabled={quote?.underwritingexceptions?.length > 0}
                  onClick={() => sendApplication(quote.quoteNumber)}
                >
                  Send Application
                </button>
                <div style={{ paddingTop: '30px', paddingBottom: '30px' }}>
                  Form Values
                </div>
                <pre>{JSON.stringify(values, 0, 2)}</pre>
                <div style={{ paddingTop: '30px', paddingBottom: '30px' }}>
                  Template Data
                </div>
                <pre>{JSON.stringify(formSections, 0, 2)}</pre>
              </>
            )}
          </Form>
        )}
      </div>
    </div>
  );
}

export default App;
