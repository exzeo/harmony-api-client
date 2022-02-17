import { Field } from 'react-final-form';

const ObjectSchema = ({ value, path, section, inputList }) => {
  const propertyValueKeys = Object.keys(value);
  return (
    <div key={`${path}`}>
      <div>{section}</div>
      {propertyValueKeys.map((key, index) => {
        if (key === 'country') {
          return (
            <div>
              <label>{key}</label>
              <Field name={`${path}.${key}.code`} component={'input'} />
            </div>
          );
        } else
          return (
            <div key={`${key} + ${index}`}>
              <label>{key}</label>
              <Field name={`${path}[${key}]`} component={'input'} />
            </div>
          );
      })}
    </div>
  );
};

export default ObjectSchema;
