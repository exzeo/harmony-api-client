import { Field } from 'react-final-form';

const styles = {
  alignRow: {
    display: 'flex',
    justifyContent: 'center',
  },
  labelWidth: {
    width: '400px',
    textAlign: 'start',
  },
  alignStart: {
    textAlign: 'start',
  },
};
const ObjectSchema = ({ value, path, section }) => {
  const propertyValueKeys = Object.keys(value);
  return (
    <div key={`${path}`}>
      <div>{section}</div>
      {propertyValueKeys.map((key, index) => {
        if (key === 'country') {
          return (
            <div key={`${key} + ${index}`} style={styles.alignRow}>
              <label>{key}</label>
              <Field name={`${path}.${key}.code`} component={'input'} />
            </div>
          );
        } else
          return (
            <div key={`${key} + ${index}`} style={styles.alignRow}>
              <div style={styles.labelWidth}>
                <label>{key}</label>
              </div>
              <div>
                <Field name={`${path}.${key}`} component={'input'} />
              </div>
            </div>
          );
      })}
    </div>
  );
};

export default ObjectSchema;
