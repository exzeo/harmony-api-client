import './App.css';
import {useState} from 'react';
import {Form} from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import {AppBar} from "@material-ui/core";

import {useAuth0} from "./context/auth-context";
import Search from "./components/search";
import UnauthenticatedApp from "./temp/UnauthenticatedApp";

import {updateQuote} from "./data";
import ObjectSchema from "./components/ObjectSchema";
import ArraySchema from "./components/ArraySchema";
import BillingSchema from "./components/BillingSchema";
import InputField from "./components/InputField";

function App() {
  const [searchResults, setSearchResults] = useState();
  const [loadingData] = useState();
  const [loadingQuote, setLoadingQuote] = useState();
  const [quoteValues, setQuoteValues] = useState();
  const [inputValues, setInputValues] = useState([]);
  const [inputsByCategory, setInputsByCategory] = useState([]);

  const [inputValues2, setInputValues2] = useState()

  const {loading} = useAuth0();

  const handleSubmit = async (values) => {
    await updateQuote(quoteValues.quote, values, setQuoteValues, setInputValues)
  }

  return (
    <div className="App">
      {/* set ternary to isAuthenticated */}
      {loading || loadingData ? (
        <div>Loading</div>
      ) : (

        <div>
          <AppBar position="static">
            <Typography variant="h6" sx={{flexGrow: 1, margin: 2}}
                        component="div">
              TypTap Insurance Demo
            </Typography>
          </AppBar>

          <Divider/>
          <h3>Property Search</h3>
          <Search searchResults={searchResults}
                  setSearchResults={setSearchResults}
                  setLoadingData={setLoadingQuote}
                  setQuoteValues={setQuoteValues}
                  setInputValues={setInputValues}
                  setInputsByCategory={setInputsByCategory}
                  setInputValues2={setInputValues2}
                  />

          {loadingQuote && <div>Loading Quote</div>}
          {quoteValues ?
            <Form
              onSubmit={handleSubmit}
              initialValues={quoteValues.input}
              mutators={{...arrayMutators}}
            >
              {({
                  form: {mutators: {push, pop, remove}},
                  handleSubmit
                }) => (
                <>
                  <form style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}>
                    {
                      inputValues && inputValues.map((input, index) => {
                        if (input.dataType === 'object') {
                          return (<div key={input.path}>
                              <ObjectSchema
                                path={`${input.path}.value`}
                                value={input.value}
                                section={input.section}
                              />
                            </div>
                          );
                        } else if (input.dataType === 'array') {
                          return (<div key={input.path}>
                              <ArraySchema
                                mutators={{push, pop, remove}}
                                path={`${input.path}.value`}
                                properties={input.properties}
                                section={input.section}
                              />
                            </div>
                          );
                        } else if (input.dataType === 'oneOf') {
                          return (
                            <div key={input.path}>
                              {/*Additional Interests and policy holders need billToId passed back, update schema to show oneOfList*/}
                              {/*Only display the billPlan of the option that is selected*/}
                              <BillingSchema schema={input.schema}
                                             section={input.section}
                                             value={input.value}
                                             path={input.path}/>
                            </div>
                          )
                        } else {
                          return (
                            <div key={input.section + index}>
                              <div>{input.section}</div>
                              {input.properties.map(property => {
                                return (<div key={property.path}>
                                    <InputField
                                      name={property.path}
                                      label={property.displayText || property.question}
                                      requierd={property.required}
                                      component='input'
                                      propertyEnum={property.enum}
                                      type={property.inputType}
                                      defaultValue={property.defaultValue}
                                    />
                                  </div>

                                );
                              })}
                            </div>
                          )
                        }
                      })
                    }

                    <button
                      onClick={handleSubmit}
                    >Submit Form for Re-evaluation
                    </button>
                  </form>

                  <pre>{JSON.stringify(inputValues, 0, 2)}</pre>
                  <div style={{ paddingTop: "30px", paddingBottom: "30px" }}>New Stuff</div>
                  <pre>{JSON.stringify(inputValues2, 0, 2)}</pre>

                </>
              )}
            </Form>
            : null}
        </div>
      )}
    </div>
  );
}

export default App;
