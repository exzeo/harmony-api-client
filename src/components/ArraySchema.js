import { useEffect } from 'react';
import { Field, useField } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { Grid } from '@material-ui/core';

const ArraySchema = ({ formApi, inputList, path, title }) => {
  const { mutators } = formApi;
  const addFields = () => {
    let fields = {};
    inputList.forEach((input) => (fields[input.name] = ''));

    return fields;
  };
  const removeFields = (index) => {
    mutators.remove(path, index);
  };

  const currentField = useField(path);
  useEffect(() => {
    if (
      currentField?.input?.value?.length === 0 &&
      !path.includes('additionalInterests')
    ) {
      mutators.push(path, addFields());
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container item xs={12} justifyContent={'center'} direction={'column'}>
      <Grid
        container
        item
        xs={12}
        justifyContent={'center'}
        direction={'column'}
      >
        <FieldArray name={path}>
          {({ fields }) => {
            const fieldLength = fields.length;
            return (
              <>
                <Grid container>
                  {fields.map((name, index) => {
                    if (fields.length === 0) {
                      fields.push(addFields());
                    }
                    return (
                      <Grid item xs={12} key={name}>
                        {index > 0 && (
                          <hr
                            style={{
                              border: 'solid 2px grey',
                              borderRadius: '2px',
                              width: '400px',
                              color: '#ffff00',
                              marginBottom: '24px',
                            }}
                          ></hr>
                        )}
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
                                  type={
                                    input.type === 'string' ? 'text' : 'number'
                                  }
                                />
                              </Grid>
                            </Grid>
                          );
                        })}
                      </Grid>
                    );
                  })}
                </Grid>
                <Grid container justifyContent={'center'}>
                  <button
                    type="button"
                    onClick={
                      fieldLength === 1
                        ? () => fields.push(addFields())
                        : () => removeFields(fieldLength - 1)
                    }
                    style={{ maxWidth: '200px' }}
                  >
                    {fields.length === 1 ? `Add ${title}` : `Remove ${title}`}
                  </button>
                </Grid>
              </>
            );
          }}
        </FieldArray>
      </Grid>
    </Grid>
  );
};

export default ArraySchema;
