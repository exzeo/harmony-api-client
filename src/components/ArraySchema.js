import {Field} from 'react-final-form';
import {FieldArray} from 'react-final-form-arrays'

const ArraySchema = ({ mutators, properties, path, section }) => {
    const addFields = (e) => {
        e.preventDefault();
        mutators.push(path, undefined);
    }
    const removeFields = (e, index) => {
        e.preventDefault();
        mutators.remove(path, index);
    }
    const propertyListKeys = Object.keys(properties);

    return (
        <div key={section}>
            <div>{section}</div>
            <button onClick={(e) => addFields(e)}>Add {section}</button>
            <FieldArray name={path}>
                {({fields}) => (
                    fields.map((name, index) => {
                        return (
                            <div key={name + index}>
                                {propertyListKeys.map(key => {
                                    return (
                                        <div key={key}>
                                            <label>{key}</label>
                                            <Field
                                                name={`${path}[${index}][${key}]`}
                                                component='input'
                                                type={properties[key].type}
                                            />
                                        </div>
                                    )
                                })}
                                <button type='button'
                                        onClick={(e) => removeFields(e, index)}>Remove {section}</button>
                            </div>
                        )
                    })
                )}
            </FieldArray>
        </div>
    );
}

export default ArraySchema;
