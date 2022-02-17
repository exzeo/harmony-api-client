import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import { Card, CardActionArea, FormControl } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Form } from 'react-final-form';

import { createQuote, searchAddress } from '../data';
import Box from '@material-ui/core/Box';

const Search = ({
  searchResults,
  setSearchResults,
  setLoadingData,
  setQuoteValues,
  setInputValues,
  setInputValues2,
}) => {
  const [searchText, setSearchText] = useState('');
  const [selectedState, setSelectedState] = useState('FL');

  function handleChange(e) {
    setSelectedState(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    searchAddress(
      { address: searchText, state: selectedState },
      setSearchResults
    );
  };

  const handleTextChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  const newQuote = (id) => {
    setLoadingData(true);
    createQuote({
      companyCode: 'TTIC',
      state: 'FL',
      product: 'HO3',
      propertyId: id,
      setLoadingData,
      setQuoteValues,
      setInputValues,
      setInputValues2,
    });
  };

  const stateList = ['FL', 'MD', 'NJ', 'PA', 'SC'];
  return (
    <Form initialValues={{}} onSubmit={handleSubmit}>
      {() => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <FormControl>
                <Select
                  value={selectedState}
                  defaultValue="FL"
                  onChange={handleChange}
                >
                  {stateList.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={8}>
              <TextField
                id="search"
                lable="search"
                variant="outlined"
                placeholder="Enter Address"
                value={searchText}
                onChange={(e) => handleTextChange(e)}
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                type="submit"
                disabled={selectedState && searchText ? false : true}
                variant="outlined"
                onClick={handleSubmit}
              >
                Search
              </Button>
            </Grid>
          </Grid>
          {searchResults &&
            searchResults.map((property) => {
              const {
                physicalAddress: { address1, address2, city, state, zip },
              } = property;
              return (
                <Box sx={{ flexGrow: 1 }} key={property.id}>
                  <Grid container spacing={8}>
                    <Grid item xs={8}>
                      <Card sx={{ margin: 2 }}>
                        <CardActionArea onClick={() => newQuote(property.id)}>
                          <Typography align="left">
                            {address1}
                            {address2 && `, ${address2}`}
                          </Typography>
                          <Typography align="left">
                            {city}, {state.toUpperCase()} {zip}
                          </Typography>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  </Grid>
                </Box>
              );
            })}
        </form>
      )}
    </Form>
  );
};

export default Search;
