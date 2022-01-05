import {Field} from "react-final-form";
import Grid from "@material-ui/core/Grid";

const Radio = ({label, name, radioList}) => {

    const Radio = ({input, children}) => (
        <label>
            <input type="radio" {...input} />
            {children}
        </label>
    );

    return (
        <Grid item xs={6}>
            <div>{label}</div>
            {radioList.map(item => (
                <>
                    <Field
                        name={name}
                        type='radio'
                        value={item}
                        component={Radio}
                    >
                        {item}
                    </Field>
                </>
            ))}
        </Grid>
    );
}

export default Radio;
