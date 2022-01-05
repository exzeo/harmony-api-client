import {Field} from 'react-final-form'
import Grid from "@material-ui/core/Grid";
import InputField from './inputField';

const CoverageOptions = ({coverageOptions}) => {
    const {
        consentToRate,
    } = coverageOptions;

    const Radio = ({input, children}) => (
        <label>
            <input type="radio" {...input} />
            {children}
        </label>
    );

    return (
        <Grid container>
            {/* what is the consent to rate type and what does it do?*/}
            <InputField
                name={consentToRate.name}
                label={consentToRate.displayText}
                component='input'
                type={consentToRate.schema.type[0]}
                defaultValue={consentToRate.value}
            />

            <Grid item xs={6}>
                <div>Liability Incedental Occupancies</div>
                <Field
                    name={'coverageOptions.liabilityIncidentalOccupancies.value'}
                    component={Radio}
                    type='radio'
                    value={true}
                >
                    True
                </Field>
                {/* radio not getting filled but value is changing*/}
                <Field
                    name={'coverageOptions.liabilityIncidentalOccupancies.value'}
                    type='radio'
                    value={false}
                    component={Radio}
                >
                    False
                </Field>
            </Grid>
            <Grid item xs={6}>
                <div>Personal Property Replacement Cost</div>
                <Field
                    name={'coverageOptions.personalPropertyReplacementCost.value'}
                    type='radio'
                    value={'yes'}
                    component={Radio}
                >
                    Yes
                </Field>
                <Field
                    name={'coverageOptions.personalPropertyReplacementCost.value'}
                    type='radio'
                    value={'no'}
                    component={Radio}
                >
                    No
                </Field>
            </Grid>
            <Grid item xs={6}>
                <div>Property Incidental Occupancies Main Dwelling</div>
                <Field
                    name={'coverageOptions.propertyIncidentalOccupanciesMainDwelling.value'}
                    type='radio'
                    value={true}
                    component={Radio}

                >
                    True
                </Field>
                <Field
                    name={'coverageOptions.propertyIncidentalOccupanciesMainDwelling.value'}
                    type='radio'
                    value={false}
                    component={Radio}
                >
                    False
                </Field>
            </Grid>
            <Grid item xs={6}>
                <div>Property Incidental Occupancies Other Structures</div>
                <Field
                    name={'coverageOptions.propertyIncidentalOccupanciesOtherStructures.value'}
                    type='radio'
                    value={true}
                    component={Radio}

                >
                    True
                </Field>
                <Field
                    name={'coverageOptions.propertyIncidentalOccupanciesOtherStructures.value'}
                    type='radio'
                    value={false}
                    component={Radio}
                >
                    False
                </Field>
            </Grid>
            <Grid item xs={6}>
                <div>Sinkhole Peril Coverage</div>
                <Field
                    name={'coverageOptions.sinkholePerilCoverage.value'}
                    type='radio'
                    value={true}
                    component={Radio}

                >
                    True
                </Field>
                <Field
                    name={'coverageOptions.sinkholePerilCoverage.value'}
                    type='radio'
                    value={false}
                    component={Radio}
                >
                    False
                </Field>
            </Grid>
        </Grid>
    )
}

export default CoverageOptions;