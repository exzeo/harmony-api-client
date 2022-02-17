import { Fragment } from 'react';
import { Field } from 'react-final-form';
import { Grid } from '@material-ui/core';

const Radio2 = ({ options, title, path, defaultValue }) => {
  const Radio = ({ input, children }) => (
    <label>
      <input type="radio" {...input} checked={input.checked} />
      {children}
    </label>
  );

  return (
    <Grid container item xs={12} key={title} justifyContent="center">
      <Grid item xs={12}>
        {title}
      </Grid>
      {options.map((option, index) => {
        return (
          <Grid item xs={2} key={`${title} + ${index}`}>
            {option.label}
            <Field
              name={path}
              type="radio"
              component={Radio}
              defaultValue={defaultValue}
              parse={(value) => {
                if (typeof option.answer === 'number') {
                  return Number(option.answer);
                } else if (option.answer === 'string') {
                  return option.answer.toString();
                } else if (option.answer === 'boolean') {
                  return Boolean(option.answer);
                } else return option.answer.toString();
              }}
            ></Field>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Radio2;
