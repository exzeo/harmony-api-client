import {Field} from "react-final-form";

const ObjectSchema = ({ value, path, section }) => {
    const propertyValueKeys = Object.keys(value);
    return (
        <div key={`${path}`}>
            <div>{section}</div>
            {propertyValueKeys.map((key, index) => {
                return (
                    <div key={`${key} + ${index}`}>
                        <label>{key}</label>
                        <Field
                            name={`${path}[${key}]`}
                            component={'input'}
                            value={value[key]}
                        />
                    </div>
                )
            })}
        </div>
    );
}

export default ObjectSchema;
