import { Field } from 'react-final-form';

const styles = {
  flexRow: {
    display: 'flex',
    justifyContent: 'center',
  },
  wrapper: {
    margin: '8px',
    marginBottom: '8px',
    width: '450px',
    maxWidth: '450',
    fontSize: '18px',
    textAlign: 'start',
  },
  label: {
    margin: '8px',
    marginBottom: '8px',
  },
};

const InputSelect = ({ title, path, options, type }) => {
  if (path.includes('underwritingAnswers')) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            margin: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div style={styles.wrapper}>{title}</div>
          <Field name={path}>
            {({ input, meta }) => {
              return (
                <div style={{ width: '600px' }}>
                  {options.map((option) => {
                    return (
                      <div key={`${path}.${option.value}`}>
                        <div
                          onClick={() => input.onChange(option.value)}
                          style={{
                            margin: '10px auto',
                            padding: '8px',
                            maxWidth: '200px',
                            fontSize: '16px',
                            border: '1px solid grey',
                            borderRadius: '5px',
                            background:
                              option.value === input.value
                                ? 'lightskyblue'
                                : '',
                          }}
                        >
                          {option.value}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            }}
          </Field>
        </div>
      </div>
    );
  } else
    return (
      <div style={styles.flexRow}>
        <label style={styles.label}>{title}</label>
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
                  <option key={`${path}.${option.value}`} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            );
          }}
        </Field>
      </div>
    );
};

export default InputSelect;
