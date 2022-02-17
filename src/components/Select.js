import { Field } from 'react-final-form';
import { Grid, Paper } from '@material-ui/core';

const InputSelect = ({ title, path, options, defaultValue, values }) => {
  if (path.includes('underwritingAnswers')) {
    return (
      <Grid container item xs={12} justifyContent={'center'}>
        <div style={{ 'margin-bottom': '30px' }}>
          <div
            style={{
              margin: '8px',
              'margin-bottom': '8px',
              'font-size': '18px',
            }}
          >
            {title}
          </div>
          <Field name={path}>
            {({ input, meta }) => {
              return (
                <Grid container spacing={2}>
                  {options.map((option) => {
                    return (
                      <Grid item xs={6} justifyContent={'center'}>
                        <Paper
                          onClick={() => input.onChange(option.value)}
                          style={{
                            margin: '8px',
                            padding: '8px',
                            'max-width': '200px',
                            'font-size': '16px',
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
        </div>
      </Grid>
    );
  } else
    return (
      <Grid container item xs={6} style={{ 'margin-bottom': '30px' }}>
        <Grid container item xs={12} justifyContent={'space-around'}>
          <Grid item xs={6}>
            <div
              style={{
                margin: '8px',
                'margin-bottom': '8px',
                'font-size': '18px',
              }}
            >
              {title}
            </div>
          </Grid>
          <Grid item xs={6}>
            <Field name={path}>
              {({ input, meta }) => {
                return (
                  <select {...input} defaultValue={defaultValue}>
                    {!defaultValue && <option></option>}
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
