import { Field } from 'react-final-form';
import { Grid, Paper } from '@material-ui/core';

const InputSelect = ({ title, path, options, type, defaultValue, values }) => {
  if (path.includes('underwritingAnswers')) {
    return (
      <Grid
        container
        item
        xs={12}
        justifyContent="space-around"
        style={{ margin: '20px' }}
      >
        <div
          style={{
            margin: '8px',
            marginBottom: '8px',
            width: '450px',
            maxWidth: '450',
            fontSize: '18px',
          }}
        >
          {title}
        </div>
        <Field name={path}>
          {({ input, meta }) => {
            return (
              <Grid
                container
                spacing={2}
                justifyContent="space-around"
                style={{ width: '600px' }}
              >
                {options.map((option) => {
                  return (
                    <Grid
                      contianer
                      justifyContent="center"
                      item
                      xs={6}
                      key={option.value}
                    >
                      <Paper
                        onClick={() => input.onChange(option.value)}
                        style={{
                          margin: '0 auto',
                          padding: '8px',
                          maxWidth: '200px',
                          fontSize: '16px',
                          background:
                            option.value === input.value ? 'cornsilk' : '',
                        }}
                      >
                        {option.value}
                      </Paper>
                    </Grid>
                  );
                })}
              </Grid>
            );
          }}
        </Field>
      </Grid>
    );
  } else
    return (
      <Grid container item xs={6} style={{ marginBottom: '30px' }}>
        <Grid container item xs={12} justifyContent="space-around">
          <Grid item xs={6}>
            <div
              style={{
                margin: '8px',
                marginBottom: '8px',
                fontSize: '18px',
              }}
            >
              {title}
            </div>
          </Grid>
          <Grid item xs={6}>
            <Field
              name={path}
              parse={(value, name) => {
                if (type === 'number') {
                  return Number(value);
                } else if (type === 'string') {
                  return value.toString();
                } else if (type === 'boolean') {
                  return ['true', 'yes'].includes(value.toLowerCase())
                    ? true
                    : false;
                } else return value.toString();
              }}
            >
              {({ input, meta }) => {
                return (
                  <select {...input}>
                    <option value={''}></option>
                    {options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                );
              }}
            </Field>
          </Grid>
        </Grid>
      </Grid>
    );
};

export default InputSelect;
