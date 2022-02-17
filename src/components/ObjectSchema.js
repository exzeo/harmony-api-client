import { Field } from 'react-final-form';
import Grid from '@material-ui/core/Grid';

const ObjectSchema = ({ value, path, section }) => {
  const propertyValueKeys = Object.keys(value);
  return (
    <Grid container justifyContent={'center'} key={`${path}`}>
      <div>{section}</div>
      {propertyValueKeys.map((key, index) => {
        if (key === 'country') {
          return (
            <Grid
              container
              item
              key={`${key} + ${index}`}
              justifyContent={'center'}
            >
              <Grid item xs={3}>
                <label>{key}</label>
              </Grid>
              <Grid item xs={3}>
                <Field name={`${path}.${key}.code`} component={'input'} />
              </Grid>
            </Grid>
          );
        } else
          return (
            <Grid
              container
              item
              key={`${key} + ${index}`}
              justifyContent={'center'}
            >
              <Grid item xs={3}>
                <label>{key}</label>
              </Grid>
              <Grid item xs={3}>
                <Field name={`${path}[${key}]`} component={'input'} />
              </Grid>
            </Grid>
          );
      })}
    </Grid>
  );
};

export default ObjectSchema;
