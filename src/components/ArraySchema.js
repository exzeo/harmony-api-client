import { Fragment } from 'react';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { Grid } from '@material-ui/core';

const ArraySchema = ({ mutators, inputList, path, title }) => {
  const addFields = () => {
    let fields = {};
    inputList.forEach((input) => (fields[input.name] = ''));

    return fields;
  };
  const removeFields = (e, index) => {
    mutators.remove(path, index);
  };

  return (
    <Grid
      container
      item
      xs={12}
      key={title}
      justifyContent={'center'}
      direction={'column'}
    >
      <div>{title}</div>
      <Grid
        container
        item
        xs={12}
        justifyContent={'center'}
        direction={'column'}
      >
        <FieldArray name={path}>
          {({ fields }) => (
            <Fragment>
              <button type="button" onClick={() => fields.push(addFields())}>
                Add {title}
              </button>
              {fields.map((name, index) => {
                return (
                  <Grid container item xs={12} key={name} direction={'co'}>
                    {inputList.map((input) => {
                      return (
                        <Grid container item xs={12} key={input.name}>
                          <Grid item xs={6}>
                            <label>{input.title || input.name}</label>
                          </Grid>
                          <Grid item xs={6}>
                            <Field
                              name={`${name}[${input.name}]`}
                              component="input"
                              type={input.type === 'string' ? 'text' : 'number'}
                            />
                          </Grid>
                        </Grid>
                      );
                    })}
                    <button
                      type="button"
                      onClick={(e) => removeFields(e, index)}
                    >
                      Remove {title}
                    </button>
                  </Grid>
                );
              })}
            </Fragment>
          )}
        </FieldArray>
      </Grid>
    </Grid>
  );
};

export default ArraySchema;
