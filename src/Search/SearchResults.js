import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { Card } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';

const SearchResults = ({ searchResults, values, createQuote }) => {
  return searchResults.map((property) => {
    const {
      id,
      physicalAddress: { address1, address2, city, state, zip },
    } = property;
    return (
      <Box sx={{ flexGrow: 1, p: 2 }} key={property.id}>
        <Grid container spacing={8} justifyContent="center">
          <Grid item xs={6}>
            <Card sx={{ margin: 2, p: 2 }}>
              <CardActionArea
                onClick={() => createQuote({ propertyId: id, ...values })}
              >
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
  });
};

export default SearchResults;
