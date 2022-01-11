import {Field} from "react-final-form";
import Grid from "@material-ui/core/Grid";

const Radio = ({label, name, type, radioList, defaultValue, schema}) => {

    const Radio = ({input, children}) => (
        <label>
            <input type="radio" {...input} checked={input.checked}/>
            {children}
        </label>
    );

    return (
        <Grid item xs={6}>
            <div>{label}</div>
            {radioList.map(item => {
                return <Field
                    name={name}
                    type='radio'
                    value={item}
                    parse={value => {
                        if (schema.type === 'number') {
                            return Number(item)
                        } else if (schema.type === 'string') {
                            return item.toString();
                        }
                    }}
                    component={Radio}
                    defaultValue={defaultValue}
                >
                    {typeof item === 'boolean' ? String(item) : item}
                </Field>
            })}
        </Grid>
    );
}

export default Radio;
