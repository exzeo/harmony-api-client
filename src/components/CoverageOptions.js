import { Field } from 'react-final-form'
import Grid from "@material-ui/core/Grid";
import InputField from './inputField';

const CoverageOptions = ({coverageOptions}) => {
    const {
        consentToRate,
        liabilityIncidentalOccupancies,
        personalPropertyReplacementCost,
        propertyIncidentalOccupanciesMainDwelling,
        propertyIncidentalOccupanciesOtherStructures,
        sinkholePerilCoverage
    } = coverageOptions;

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
            <InputField
                name={liabilityIncidentalOccupancies.name}
                label={liabilityIncidentalOccupancies.displayText}
                component='input'
                type={liabilityIncidentalOccupancies.schema.type}
                defaultValue={liabilityIncidentalOccupancies.schema.enum[0]}
            />
            <InputField
                name={personalPropertyReplacementCost.name}
                label={personalPropertyReplacementCost.displayText}
                component='input'
                type={liabilityIncidentalOccupancies.schema.type}
                defaultValue={liabilityIncidentalOccupancies.schema.default}
            />
            <InputField
                name={propertyIncidentalOccupanciesMainDwelling.name}
                label={propertyIncidentalOccupanciesMainDwelling.displayText}
                component='input'
                type={propertyIncidentalOccupanciesMainDwelling.schema.type}
                defaultValue={propertyIncidentalOccupanciesMainDwelling.value}
            />
            <InputField
                name={propertyIncidentalOccupanciesOtherStructures.name}
                label={propertyIncidentalOccupanciesOtherStructures.displayText}
                component='input'
                type={propertyIncidentalOccupanciesOtherStructures.schema.type}
                defaultValue={propertyIncidentalOccupanciesOtherStructures.value}
            />
            <InputField
                name={sinkholePerilCoverage.name}
                label={sinkholePerilCoverage.displayText}
                component='input'
                type={sinkholePerilCoverage.schema.type}
                defaultValue={sinkholePerilCoverage.schema.default}
            />
        </Grid>
    )
}

export default CoverageOptions;