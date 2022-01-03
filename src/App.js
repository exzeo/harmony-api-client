import './App.css';
import {useState} from 'react';

import {useAuth0} from "./context/auth-context";
import Search from "./components/search";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
// import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import {AppBar} from "@material-ui/core";
import UnauthenticatedApp from "./temp/UnauthenticatedApp";
import BillingSection from "./components/BillingSection";
import QuoteSection from "./components/QuoteSection";

function App() {
    const [tabValue, setTabValue] = useState(0);
    const [searchResults, setSearchResults] = useState();
    const [loadingData] = useState();
    const [loadingQuote, setLoadingQuote] = useState();
    const [quoteValues, setQuoteValues] = useState();

    const {loading} = useAuth0();

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    // function TabPanel(props) {
    //     const {children, value, index, ...other} = props;
    //
    //     return (
    //         <div
    //             role="tabpanel"
    //             hidden={value !== index}
    //             id={`simple-tabpanel-${index}`}
    //             aria-labelledby={`simple-tab-${index}`}
    //             {...other}
    //         >
    //             {value === index && (
    //                 <Box sx={{p: 3}}>
    //                     <Typography component="div">{children}</Typography>
    //                 </Box>
    //             )}
    //         </div>
    //     );
    // }

    const handleTabChange = (event, newTab) => {
        setTabValue(newTab)
    }

    // const onSubmit = (values) => {
    //     console.log(values);
    // }

    return (
        <div className="App">
            {/* set ternary to isAuthenticated */}
            {loading || loadingData ? (
                <div>Loading</div>
            ) : true ? (

                <div>
                    <AppBar position="static">
                        <Typography variant="h6" sx={{ flexGrow: 1, margin: 2 }} component="div">
                            TypTap Insurance Demo
                        </Typography>
                    </AppBar>

                    <Divider/>
                    <Tabs value={tabValue} onChange={handleTabChange}>
                        <Tab label="Search" {...a11yProps(0)} disabled={tabValue !== 0}/>
                    </Tabs>
                    <Search searchResults={searchResults} setSearchResults={setSearchResults} setTab={setTabValue} setLoadingData={setLoadingQuote} setQuoteValues={setQuoteValues}/>
                    {loadingQuote && <div>Loading Quoite</div>}
                    {quoteValues ?
                        <>
                            <BillingSection billing={quoteValues.input.categories.billing} quote={quoteValues.input.categories.quote} />
                            <QuoteSection quote={quoteValues.input.categories.quote} />
                        </>
                        : null}
                </div>
            ) : (
                <UnauthenticatedApp />
            )}
        </div>
    );
}

export default App;
