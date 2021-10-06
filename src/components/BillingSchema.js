import { Field } from 'react-final-form';

const BillingSchema = ({ input, values }) => {
  return (
    <div key="billing">
      {input.options.map((option) => {
        return (
          <div key={option.firstName}>
            <Field
              name={'categories.billing.properties.billing.value.billToId'}
            >
              {({ input, meta }) => {
                return (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      {option.firstName} {option.lastName}
                    </div>
                    <button
                      type="button"
                      onClick={() => input.onChange(option.billToId.const)}
                    >
                      {`Set BillTo: ${option.firstName}`}
                    </button>
                  </div>
                );
              }}
            </Field>
            {option.id ===
            values.categories.billing.properties.billing.value.billToId ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Field
                  name={'categories.billing.properties.billing.value.billPlan'}
                >
                  {({ input, meta }) => {
                    return (
                      <select {...input}>
                        {option.optionPropertyList.enum.map((property) => {
                          return (
                            <option value={property} key={property}>
                              {property}
                            </option>
                          );
                        })}
                      </select>
                    );
                  }}
                </Field>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default BillingSchema;
