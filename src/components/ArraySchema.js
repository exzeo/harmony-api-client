import {Field} from 'react-final-form';
import {FieldArray} from 'react-final-form-arrays'

const ArraySchema = ({property, propertyName, mutators, category}) => {
    const addFields = (e) => {
        e.preventDefault();
        // create an object from the property values and pass instead of undefined
        mutators.push(`categories.${category}.properties.${propertyName}.value`, undefined);
    }
    const removeFields = (e, index) => {
        e.preventDefault();
        mutators.remove(`categories.${category}.properties.${propertyName}.value`, index);
    }
    const arrayProperties = property.schema.items.properties
    const propertyListKeys = Object.keys(arrayProperties);

    return (
        <div key={propertyName}>
            <div>{propertyName}</div>
            <button onClick={(e) => addFields(e)}>Add {propertyName}</button>
            <FieldArray name={`categories.${category}.properties.${propertyName}.value`}>
                {({fields}) => (
                    fields.map((name, index) => {
                        return (
                            <div key={name + index}>
                                {propertyListKeys.map(key => {
                                    return (
                                        <div key={key}>
                                            <label>{key}</label>
                                            <Field
                                                name={`categories.${category}.properties.${propertyName}.value[${index}][${key}]`}
                                                component='input'
                                                type={arrayProperties[key].type}
                                            />
                                        </div>
                                    )
                                })}
                                <button type='button'
                                        onClick={(e) => removeFields(e, index)}>Remove {propertyName}</button>
                            </div>
                        )
                    })
                )}
            </FieldArray>
        </div>
    );
}

export default ArraySchema;
