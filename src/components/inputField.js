import {Field} from 'react-final-form'
import {Grid} from "@material-ui/core";
import Radio from './Radio';

const InputField = ({
                        label,
                        name,
                        component,
                        type,
                        defaultValue,
                        placeholder = "",
                        schema,
                    }) => {
    if (schema.enum) {
        return <Radio label={label} name={name} radioList={schema.enum} defaultValue={schema.defaultValue} schema={schema}/>
    }
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