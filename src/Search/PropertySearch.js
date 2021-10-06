import { Form, Field } from 'react-final-form';
import SearchResults from './SearchResults';

const isRequired = (value) => (value ? undefined : 'Field required');

const STATE_LIST = ['FL', 'MD', 'NJ', 'PA', 'SC'];

const PropertySearch = ({
  searchAddress,
  loading,
  createQuote,
  searchResults,
}) => {
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
          <form className="address-search content" onSubmit={handleSubmit}>
            <h1 style={{ fontSize: '20px' }}>Property Search</h1>
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

            <button
              style={{ marginTop: '16px' }}
              onClick={handleSubmit}
              type="button"
              disabled={invalid || loading}
            >
              SEARCH
            </button>
          </form>
          {searchResults && (
            <SearchResults
              searchResults={searchResults}
              values={values}
              createQuote={createQuote}
            />
          )}
        </>
      )}
    </Form>
  );
};

export default PropertySearch;
