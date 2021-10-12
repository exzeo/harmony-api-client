import './App.css';
import {useState} from 'react';

import {useAuth0} from "./context/auth-context";
import Search from "./components/search";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import {AppBar} from "@material-ui/core";
import UnauthenticatedApp from "./UnauthenticatedApp";
import Wizard from "./Wizard";

function App() {
    const [tabValue, setTabValue] = useState(0);
    const [searchResults, setSearchResults] = useState();

    const {isAuthenticated, loading} = useAuth0();

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    function TabPanel(props) {
        const {children, value, index, ...other} = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{p: 3}}>
                        <Typography component="div">{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    const handleTabChange = (event, newTab) => {
        setTabValue(newTab)
    }

    const onSubmit = (values) => {
        console.log('submitted');
        console.log(values);
    }

    return (
        <div className="App">
            {loading ? (
                <div>Loading</div>
            ) : isAuthenticated ? (
                <div>
                    <AppBar position="static">
                        <Typography variant="h6" sx={{ flexGrow: 1, margin: 2 }} component="div">
                            TypTap Insurance Demo
                        </Typography>
                    </AppBar>

                    <Divider/>
                    <Tabs value={tabValue} onChange={handleTabChange}>
                        <Tab label="Search" {...a11yProps(0)} disabled={tabValue !== 0}/>
                        <Tab label="Create Quote" {...a11yProps(1)} disabled={tabValue !== 1}/>
                    </Tabs>
                    <TabPanel value={tabValue} index={0}>
                        <Search searchResults={searchResults} setSearchResults={setSearchResults} setTab={setTabValue}/>
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}>
                        <Wizard initialValues={{}} onSubmit={onSubmit}>
                            <div>Page one</div>
                            <div>Page two</div>
                            <div>Page 3</div>
                        </Wizard>
                    </TabPanel>
                    <TabPanel value={tabValue} index={2}>
                        Third Tad
                    </TabPanel>
                </div>
            ) : (
                <UnauthenticatedApp />
            )}
        </div>
    );
}

export default App;
