import './App.css';
import {useState} from 'react';
import {Form} from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import {AppBar} from "@material-ui/core";

import {useAuth0} from "./context/auth-context";
import Search from "./components/search";
import QuoteSection from "./components/QuoteSection";
import BillingSection from "./components/BillingSection";
import UnauthenticatedApp from "./temp/UnauthenticatedApp";

import { updateQuote } from "./data";

function App() {
    const [tabValue, setTabValue] = useState(0);
    const [searchResults, setSearchResults] = useState();
    const [loadingData] = useState();
    const [loadingQuote, setLoadingQuote] = useState();
    const [quoteValues, setQuoteValues] = useState();

    const {loading} = useAuth0();

    const handleTabChange = (event, newTab) => {
        setTabValue(newTab)
    }

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
                    <Tabs value={tabValue} onChange={handleTabChange}>
                        {/*<Tab label="Search" {...a11yProps(0)} disabled={tabValue !== 0}/>*/}
                    </Tabs>
                    <Search searchResults={searchResults} setSearchResults={setSearchResults} setTab={setTabValue}
                            setLoadingData={setLoadingQuote} setQuoteValues={setQuoteValues}/>

                    {loadingQuote && <div>Loading Quote</div>}
                    {quoteValues ?
                        <Form
                            onSubmit={x => x}
                            initialValues={quoteValues.input.categories}
                            mutators={{...arrayMutators}}
                        >
                            {({values, form: {mutators: {push, pop}}, handleSubmit}) => (
                                <form>
                                    {/*<BillingSection billing={quoteValues.input.categories.billing} quote={quoteValues.input.categories.quote} />*/}
                                    <QuoteSection quote={quoteValues.input.categories.quote} formValues={values} mutators={{push, pop}} inputCategories={quoteValues.input.categories}/>
                                    <button
                                        onClick={(e) => updateQuote(e, quoteValues.input, values)}
                                    >Submit Form for Re-evaluation</button>
                                </form>
                            )
                            }

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
