import {Field} from "react-final-form";

const ObjectSchema = ({ property, propertyName, category }) => {
    const propertyValueKeys = Object.keys(property.value);
    return (
        <div key={property}>
            {propertyValueKeys.map(key => {
                return (
                    <div key={key}>
                        <label>{key}</label>
                        <Field
                            name={`categories.${category}.properties.${propertyName}.value[${key}]`}
                            component={'input'}
                            value={property.value[key]}
                        />
                    </div>
                )
            })}
        </div>
    );
}

export default ObjectSchema;
