import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/MenuItem";
import Grid from '@material-ui/core/Grid';
import { FormControl} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {searchAddress} from "../data";

const Search = () => {
    const [searchText, setSearchText] = useState('');
    const [selectedState, setSelectedState] = useState('');

    function handleChange(e) {
        setSelectedState(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        searchAddress({address: searchText, state: selectedState});
    }

    const stateList = ['FL', 'MD', 'NJ', 'PA', 'SC']
    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Select value={selectedState} defaultValue="FL" onChange={handleChange}>
                        {stateList.map(state => <MenuItem key={state} value={state}>{state}</MenuItem>)}
                    </Select>
                </Grid>

                <Grid item xs={8}>
                    <FormControl>
                        <TextField
                            id="search"
                            lable="search"
                            variant="outlined"
                            placeholder="Enter Address"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onSubmit={() => console.log('submitting')}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={2}>
                    <Button type="submit" disabled={selectedState && searchText ? false : true} variant="outlined">
                        Search
                    </Button>
                </Grid>

            </Grid>
        </form>

    )
};

export default Search;