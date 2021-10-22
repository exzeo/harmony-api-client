import { Field } from 'react-final-form'
import Grid from "@material-ui/core/Grid";

const Coverage = ({coverageData, values}) => {
    const {
        dwelling,
        lossOfUse,
        medicalPayments,
        moldLiability,
        moldProperty,
        ordinanceOrLaw,
        otherStructures,
        personalLiability,
        personalProperty
    } = coverageData;

    return (
        <Grid container>
            <Grid item xs={6}>
                <label>{dwelling.displayText}</label>
                <Field
                    name={'coverageLimits.dwelling.value.integer'}
                    component="input"
                    type={dwelling.schema.type}
                    defaultValue={dwelling.schema.default}
                    value={dwelling.value.integer}
                    min={dwelling.schema.minimum}
                    max={dwelling.schema.maximum}
                    placeholder="$10"
                />
            </Grid>
            <Grid item xs={6}>
                <label>{lossOfUse.displayText}</label>
                <Field
                    name={'coverageLimits.lossOfUse.value.integer'}
                    component="input"
                    readOnly
                    type={lossOfUse.schema.type}
                    initialValue={((lossOfUse.schema.default * dwelling.value.integer) / 100)}
                    placeholder={'Loss of Use'}
                    value={((lossOfUse.schema.default * dwelling.value.integer) / 100)}
                />
            </Grid>
            <Grid item xs={6}>
                <label>{medicalPayments.displayText}</label>
                <Field
                    name={'coverageLimits.medicalPayments.value.integer'}
                    component="input"
                    type={medicalPayments.schema.type}
                    placeholder={'Medical Payments'}
                />
            </Grid>
            <Grid item xs={6}>
                <label>{moldLiability.displayText}</label>
                <Field
                    name={'coverageLimits.moldLiability.value.integer'}
                    component="input"
                    type={moldLiability.schema.type}
                    placeholder={'Mold Liability'}
                />
            </Grid>
            <Grid item xs={6}>
                <label>{moldProperty.displayText}</label>
                <Field
                    name={'coverageLimits.moldProperty.value.integer'}
                    component="input"
                    type={moldProperty.schema.type}
                    placeholder={'Mold Property'}
                />
            </Grid>
            <Grid item xs={6}>
                <label>{ordinanceOrLaw.displayText}</label>
                <Field
                    name={'coverageLimits.ordinanceOrLaw.value.integer'}
                    component="input"
                    type={ordinanceOrLaw.schema.type}
                    placeholder={'Ordinance or Law'}
                />
            </Grid>
            <Grid item xs={6}>
                <label>{otherStructures.displayText}</label>
                <Field
                    name={'coverageLimits.ordinanceOrLaw.value.integer'}
                    component="input"
                    type={otherStructures.schema.type}
                    placeholder={'Other Structures'}
                />
            </Grid>
            <Grid item xs={6}>
                <label>{personalLiability.displayText}</label>
                <Field
                    name={'coverageLimits.personalLiability.value.integer'}
                    component="input"
                    type={personalLiability.schema.type}
                    placeholder={'Personal Liability'}
                />
            </Grid>
            <Grid item xs={6}>
                <label>{personalProperty.displayText}</label>
                <Field
                    name={'coverageLimits.personalLiability.value.integer'}
                    component="input"
                    type={personalProperty.schema.type}
                    placeholder={'Personal Property'}
                />
            </Grid>
        </Grid>

    )
}

export default Coverage;