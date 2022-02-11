import {Field} from 'react-final-form'
import {Grid} from "@material-ui/core";
import Radio from './Radio';

const InputField = ({
                        name,
                        label,
                        component,
                        type,
                        defaultValue,
                        placeholder = "",
                        propertyEnum,
                        min,
                        max
                    }) => {
    if (propertyEnum) {
        return <Radio
            label={label}
            name={name}
            type={type}
            radioList={propertyEnum}
            defaultValue={defaultValue}
        />
    }
    return (
        <Grid item xs={6} key={label}>
            <label>{label}</label>
            <Field
                name={name}
                component={component}
                type={type}
                placeholder={placeholder}
                defaultValue={defaultValue}
                min={min}
                max={max}
            />
        </Grid>
    )
}

export default InputField;