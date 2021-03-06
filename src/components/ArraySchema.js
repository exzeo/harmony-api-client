import { Fragment } from 'react';
import _ from 'lodash';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

const styles = {
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
  },
  labelWidth: {
    width: '200px',
  },
  centerItem: {
    margin: '0 auto',
  },
};

const ArraySchema = ({ inputList, path, title }) => {
  const addFields = () => {
    let fields = {};
    inputList.forEach((input) => _.set(fields, input.name, ''));

    return fields;
  };

  return (
    <div style={styles.flexCenter}>
      <FieldArray name={path}>
        {({ fields }) => {
          return (
            <div style={{ display: 'flex' }}>
              <div>
                {fields.map((name, index) => {
                  return (
                    <Fragment key={name}>
                      <div>
                        {index > 0 && (
                          <hr
                            style={{
                              border: 'solid 2px grey',
                              borderRadius: '2px',
                              width: '400px',
                              color: '#ffff00',
                              marginBottom: '24px',
                            }}
                          />
                        )}
                        {inputList.map((input) => {
                          return (
                            <div key={input.name} style={{ display: 'flex' }}>
                              <label style={styles.labelWidth}>
                                {input.title || input.name}
                              </label>
                              <Field
                                name={`${name}.${input.name}`}
                                component="input"
                                type={
                                  input.type === 'string' ? 'text' : 'number'
                                }
                              />
                            </div>
                          );
                        })}
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={() => fields.remove(index)}
                          style={{ margin: '0 auto' }}
                        >
                          Remove
                        </button>
                      </div>
                    </Fragment>
                  );
                })}
              </div>
              <div style={styles.centerItem}>
                <button type="button" onClick={() => fields.push(addFields())}>
                  Add {title}
                </button>
              </div>
            </div>
          );
        }}
      </FieldArray>
    </div>
  );
};

export default ArraySchema;
