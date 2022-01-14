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
        <Grid item xs={6} key={label}>
            <div>{label}</div>
            {radioList.map((item, index) => {
                return (
                    <div key={`${label} + ${name} + ${index}`}>
                        <Field
                            name={name}
                            type='radio'
                            value={item}
                            parse={value => {
                                if (schema.type === 'number') {
                                    return Number(item)
                                } else if (schema.type === 'string') {
                                    return item.toString();
                                } else if (schema.type === 'boolean') {
                                    return Boolean(item);
                                } else return item.toString();
                            }}
                            component={Radio}
                            defaultValue={defaultValue}
                        >
                            {typeof item === 'boolean' ? String(item) : item}
                        </Field>
                    </div>
                )
            })}
        </Grid>
    );
}

export default Radio;
