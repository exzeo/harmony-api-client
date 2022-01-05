import Grid from "@material-ui/core/Grid";

import Radio from './Radio';

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
                <Radio label={allOtherPerils.displayText} name={'deductibles.allOtherPerils.value'} radioList={allOtherPerils.schema.enum}/>
                {/*<Radio label={hurricane.displayText} name='deductibles.hurricane.value' radioList={hurricane.}*/}

                <Grid item xs={6}>
                    <label>{hurricane.displayText}</label>
                    is required and just shows a value
                    {/* Need to hook this up to a watcher to calculate amount */}
                    {/*<Field*/}
                    {/*    name={'deductibles.hurricane.value.integer'}*/}
                    {/*    component="input"*/}
                    {/*    type={hurricane.schema.type}*/}
                    {/*    placeholder={'Hurricane'}*/}
                    {/*/>*/}
                </Grid>
                <Grid item xs={6}>
                    <label>{sinkhole.displayText}</label>
                    is required and just shows a percentage of the dwelling value at 10%
                {/*    May possible need an option for enums as well */}
                </Grid>
            </Grid>

        </>
    )
}

export default Deductables;
