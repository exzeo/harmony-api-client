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
    applicationSuccess,
    resetQuoteState,
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

  if (applicationSuccess) {
    return (
      <div>
        <AppBar position="static">
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, margin: 2 }}
            component="div"
            style={{ textAlign: 'center' }}
          >
            TypTap Insurance Demo
          </Typography>
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

        <Backdrop style={{ color: '#fff', zIndex: 999 }} open={loading}>
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
                        <Grid container>
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
                                <Grid container direction={'row'} item xs={6}>
                                  <Grid item xs={6}>
                                    <label>{input.title}</label>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Field
                                      key={input.path}
                                      name={input.path}
                                      type={
                                        input.type === 'string'
                                          ? 'text'
                                          : 'number'
                                      }
                                      component="input"
                                    />
                                  </Grid>
                                </Grid>
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
                                <Grid
                                  container
                                  justifyContent={'center'}
                                  direction={'column'}
                                  key="billing"
                                >
                                  {input.options.map((option) => {
                                    return (
                                      <div key={option.firstName}>
                                        <Field
                                          name={
                                            'categories.billing.properties.billing.value.billToId'
                                          }
                                        >
                                          {({ input, meta }) => {
                                            return (
                                              <div
                                                style={{
                                                  display: 'flex',
                                                  flexDirection: 'column',
                                                  justifContent: 'center',
                                                  alignItems: 'center',
                                                }}
                                              >
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
                                              </div>
                                            );
                                          }}
                                        </Field>
                                        {option.id ===
                                        values.categories.billing.properties
                                          .billing.value.billToId ? (
                                          <div
                                            style={{
                                              display: 'flex',
                                              justifyContent: 'center',
                                            }}
                                          >
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
                                      </div>
                                    );
                                  })}
                                </Grid>
                              );
                            }
                            return null;
                          })}
                        </Grid>
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
              </>
            )}
          </Form>
        )}
      </div>
    </div>
  );
}

export default App;
