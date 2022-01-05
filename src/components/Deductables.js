import { Field } from 'react-final-form'
import Grid from "@material-ui/core/Grid";

const Deductables = ({deductiblesData}) => {
    const {
        allOtherPerils,
        hurricane,
        sinkhole,
    } = deductiblesData;

    return (
        <>
            <Grid container>
                <Grid item xs={12}>Deductibles</Grid>
                <Grid item xs={6}>
                    <label>{allOtherPerils.displayText}</label>
                    <Field
                        name={'deductibles.allOtherPerils.value.integer'}
                        component="input"
                        type={allOtherPerils.schema.type}
                        placeholder={'All Other Perils'}
                    />
                </Grid>
                <Grid item xs={6}>
                    <label>{hurricane.displayText}</label>
                    <Field
                        name={'deductibles.hurricane.value.integer'}
                        component="input"
                        type={hurricane.schema.type}
                        placeholder={'Hurricane'}
                    />
                </Grid>
                <Grid item xs={6}>
                    <label>{sinkhole.displayText}</label>
                    <Field
                        name={'deductibles.sinkhole.value.integer'}
                        component="input"
                        type={sinkhole.schema.type}
                        placeholder={'Sinkhole'}
                    />
                </Grid>
            </Grid>

        </>
    )
}

export default Deductables;
