import React, { useState } from 'react';
import { Form } from 'react-final-form';
import createDecorator from 'final-form-calculate';

export const Wizard = ({ onSubmit, initialValues, children }) => {
  const [page, setPage] = useState(0);

  const next = () => {
    setPage(page + 1);
  };

  const previous = () => setPage(page - 1);

  const handleSubmit = (values) => {
    const isLastPage = page === children.length - 1;
    if (isLastPage) {
      return onSubmit(values);
    } else {
      next(values);
    }
  };

  const calculator = createDecorator(
    {
      field: 'minimum', // when minimum changes...
      updates: {
        // ...update maximum to the result of this function
        maximum: (minimumValue, allValues) =>
          Math.max(minimumValue || 0, allValues.maximum || 0),
      },
    },
    {
      field: 'coverageLimits.dwelling.value.integer',
      updates: {
        'coverageLimits.lossOfUse.value.integer': (
          dwellingValue,
          allValues
        ) => {
          return (
            (dwellingValue *
              allValues.coverageLimits.lossOfUse.schema.default) /
            100
          );
        },
      },
    },
    {
      field: 'maximum', // when maximum changes...
      updates: {
        // update minimum to the result of this function
        minimum: (maximumValue, allValues) =>
          Math.min(maximumValue || 0, allValues.minimum || 0),
      },
    },
    {
      field: /day\[\d\]/, // when a field matching this pattern changes...
      updates: {
        // ...update the total to the result of this function
        total: (ignoredValue, allValues) =>
          (allValues.day || []).reduce(
            (sum, value) => sum + Number(value || 0),
            0
          ),
      },
    }
  );

  const isLastPage = page === children.length - 1;
  return (
    <Form
      initialValues={initialValues}
      decorators={[calculator]}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, submitting, values }) => (
        <form onSubmit={handleSubmit}>
          {children[page]}
          <div className="buttons">
            {page > 0 && (
              <button type="button" onClick={previous}>
                « Previous
              </button>
            )}
            {!isLastPage && (
              <button type="submit" onSubmit={next}>
                Next »
              </button>
            )}
            {isLastPage && (
              <button
                type="submit"
                disabled={submitting}
                onSubmit={handleSubmit}
              >
                Submit
              </button>
            )}
          </div>
        </form>
      )}
    </Form>
  );
};

export default Wizard;
