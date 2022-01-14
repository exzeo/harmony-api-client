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
import InputField from "./components/InputField";

function App() {
    const [searchResults, setSearchResults] = useState();
    const [loadingData] = useState();
    const [loadingQuote, setLoadingQuote] = useState();
    const [quoteValues, setQuoteValues] = useState();
    const [inputValues, setInputValues] = useState([]);

    const {loading} = useAuth0();

    return (
        <div className="App">
            {/* set ternary to isAuthenticated */}
            {loading || loadingData ? (
                <div>Loading</div>
            ) : true ? (

                <div>
                    <AppBar position="static">
                        <Typography variant="h6" sx={{flexGrow: 1, margin: 2}} component="div">
                            TypTap Insurance Demo
                        </Typography>
                    </AppBar>

                    <Divider/>
                    <h3>Property Search</h3>
                    <Search searchResults={searchResults} setSearchResults={setSearchResults}
                            setLoadingData={setLoadingQuote} setQuoteValues={setQuoteValues}
                            setInputValues={setInputValues}/>

                    {loadingQuote && <div>Loading Quote</div>}
                    {quoteValues ?
                        <Form
                            onSubmit={x => x}
                            initialValues={quoteValues.input}
                            mutators={{...arrayMutators}}
                        >
                            {({values, form: {mutators: {push, pop, remove}}, handleSubmit}) => (
                                <form>
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
                                            }
                                            else {
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
                                                                        schema={property.schema}
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
                                        onClick={(e) => updateQuote(e, quoteValues.quote, values)}
                                    >Submit Form for Re-evaluation
                                    </button>
                                </form>
                            )}
                        </Form>
                        : null}
                </div>
            ) : (
                <UnauthenticatedApp/>
            )}
        </div>
    );
}

export default App;
