import {Field} from 'react-final-form'
import {Grid} from "@material-ui/core";

const InputField = ({
                        label,
                        name,
                        component,
                        type,
                        defaultValue,
                        placeholder = "",
                    }) => {
    return (
        <Grid item xs={6}>
            <label>{label}</label>
            <Field
                name={name}
                component={component}
                type={type}
                placeholder={placeholder}
                defaultValue={defaultValue}
            />
        </Grid>
    )
}

export default InputField;