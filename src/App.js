import './App.css';
import { useState } from 'react';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { AppBar, Grid } from '@material-ui/core';

import { useAuth0 } from './context/auth-context';
import Search from './components/search';
import UnauthenticatedApp from './temp/UnauthenticatedApp';

import { updateQuote } from './data';
import ObjectSchema from './components/ObjectSchema';
import ArraySchema from './components/ArraySchema';
import BillingSchema from './components/BillingSchema';
import InputSelect from './components/Select';

function App() {
  const [searchResults, setSearchResults] = useState();
  const [loadingData] = useState();
  const [loadingQuote, setLoadingQuote] = useState();
  const [quoteValues, setQuoteValues] = useState();
  const [inputValues, setInputValues] = useState([]);

  const [inputValues2, setInputValues2] = useState();

  const { loading } = useAuth0();

  const handleSubmit = async (e, values) => {
    console.log(values);
    e.preventDefault();

    await updateQuote(
      quoteValues.quote,
      values,
      setQuoteValues,
      setInputValues
    );
  };
  const testSubmit = async (e, values) => {
    e.preventDefault();

    await updateQuote(
      quoteValues.quote,
      values,
      setQuoteValues,
      setInputValues
    );
  };

  return (
    <div className="App">
      {/* set ternary to isAuthenticated */}
      {loading || loadingData ? (
        <div>Loading</div>
      ) : (
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
          <h3>Property Search</h3>
          <Search
            searchResults={searchResults}
            setSearchResults={setSearchResults}
            setLoadingData={setLoadingQuote}
            setQuoteValues={setQuoteValues}
            setInputValues={setInputValues}
            setInputValues2={setInputValues2}
          />

          {loadingQuote && <div>Loading Quote</div>}
          {quoteValues ? (
            <Form
              onSubmit={(x) => x}
              initialValues={quoteValues.input}
              mutators={{ ...arrayMutators }}
            >
              {({
                form: {
                  mutators: { push, pop, remove },
                },
                handleSubmit,
                values,
              }) => (
                <>
                  {console.log(inputValues)}
                  <form
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    {console.log(values)}
                    {inputValues &&
                      inputValues.map((input) => (
                        <div
                          style={{
                            'margin-bottom': '44px',
                            'font-size': '24px',
                          }}
                        >
                          <h4>{input.title}</h4>
                          <Grid container item>
                            {input.inputs.map((input) => {
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
                                    name={input.path}
                                    type={
                                      input.type === 'string'
                                        ? 'text'
                                        : 'number'
                                    }
                                    component="input"
                                  />
                                );
                              } else if (input.inputHint === 'array') {
                                return (
                                  <ArraySchema
                                    mutators={{ push, pop, remove }}
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
                                  <div>
                                    {input.options.map((option) => {
                                      return (
                                        <>
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
                                        </>
                                      );
                                    })}
                                  </div>
                                );
                              }
                            })}
                          </Grid>
                        </div>
                      ))}
                    <button
                      type="button"
                      onClick={(e) => testSubmit(e, values)}
                    >
                      Submit Form for Re-evaluation
                    </button>
                  </form>
                  <div style={{ paddingTop: '30px', paddingBottom: '30px' }}>
                    Form Values
                  </div>
                  <pre>{JSON.stringify(values, 0, 2)}</pre>
                  <div style={{ paddingTop: '30px', paddingBottom: '30px' }}>
                    Template Data
                  </div>
                  <pre>{JSON.stringify(inputValues2, 0, 2)}</pre>
                </>
              )}
            </Form>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default App;
