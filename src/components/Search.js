import { Form, Field } from 'react-final-form';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const isRequired = (value) => (value ? undefined : 'Field required');

const STATE_LIST = ['FL', 'MD', 'NJ', 'PA', 'SC'];

const Search = ({ searchAddress, loading, createQuote, searchResults }) => {
  const handleSubmit = async (values) => {
    await searchAddress(values);
  };

  return (
    <Form
      initialValues={{
        state: STATE_LIST[0],
        companyCode: 'TTIC',
        product: 'HO3',
      }}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, invalid, values }) => (
        <>
          <form className="address-search" onSubmit={handleSubmit}>
            <Field name="state" validate={isRequired}>
              {({ input, meta }) => (
                <div>
                  <label htmlFor="search-state">State</label>
                  <select id="search-state" {...input}>
                    {STATE_LIST.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </Field>

            <Field name="address" validate={isRequired}>
              {({ input, meta }) => (
                <div>
                  <label htmlFor="search-address">Address</label>
                  <input id="search-address" type="text" {...input} />
                </div>
              )}
            </Field>

            <div>
              <button
                onClick={handleSubmit}
                type="button"
                disabled={invalid || loading}
              >
                SEARCH
              </button>
            </div>
          </form>

          {searchResults &&
            searchResults.map((property) => {
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
                          onClick={() =>
                            createQuote({ propertyId: id, ...values })
                          }
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
            })}
        </>
      )}
    </Form>
  );
};

export default Search;
