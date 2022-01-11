import Grid from "@material-ui/core/Grid";

import Radio from './Radio';

const Deductables = ({deductiblesData}) => {
    const {
        allOtherPerils,
        hurricane,
        sinkhole,
    } = deductiblesData;

    return (
        <Grid container>
            <Grid item xs={12}>Deductibles</Grid>
            <Radio
                label={allOtherPerils.displayText}
                name={'deductibles.allOtherPerils.value'}
                radioList={allOtherPerils.schema.enum}
            />
            <Radio
                label={hurricane.displayText}
                name='deductibles.hurricane.value'
                radioList={hurricane.schema.enum}
            />
            <Radio
                label={sinkhole.displayText}
                name='deductibles.sinkhole.value'
                radioList={sinkhole.schema.enum}
            />
        </Grid>
    )
}

export default Deductables;
