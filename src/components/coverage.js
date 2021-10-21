import { Field } from 'react-final-form'

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

    // const updateValue = (e, field) => {
    //     console.log(e.target.value);
    //     field.value.integer = e.target.value;
    // }
    // const calculatePercentage = (percent, value) => {
    //     console.log('calculate percentage',((percent * value) / 100));
    //     const fieldValue = ((percent * value) / 100);
    //     return fieldValue;
    // }

    return (
        <>
            <div>
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
            </div>
            <div>
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
            </div>
            <div>
                <label>{medicalPayments.displayText}</label>
                <Field
                    name={'coverageLimits.medicalPayments.value.integer'}
                    component="input"
                    type={medicalPayments.schema.type}
                    placeholder={'Medical Payments'}
                />
            </div>
            <div>
                <label>{moldLiability.displayText}</label>
                <Field
                    name={'coverageLimits.moldLiability.value.integer'}
                    component="input"
                    type={moldLiability.schema.type}
                    placeholder={'Mold Liability'}
                />
            </div>
            <div>
                <label>{moldProperty.displayText}</label>
                <Field
                    name={'coverageLimits.moldProperty.value.integer'}
                    component="input"
                    type={moldProperty.schema.type}
                    placeholder={'Mold Property'}
                />
            </div>
            <div>
                <label>{ordinanceOrLaw.displayText}</label>
                <Field
                    name={'coverageLimits.ordinanceOrLaw.value.integer'}
                    component="input"
                    type={ordinanceOrLaw.schema.type}
                    placeholder={'Ordinance or Law'}
                />
            </div>
            <div>
                <label>{otherStructures.displayText}</label>
                <Field
                    name={'coverageLimits.ordinanceOrLaw.value.integer'}
                    component="input"
                    type={otherStructures.schema.type}
                    placeholder={'Other Structures'}
                />
            </div>
            <div>
                <label>{personalLiability.displayText}</label>
                <Field
                    name={'coverageLimits.personalLiability.value.integer'}
                    component="input"
                    type={personalLiability.schema.type}
                    placeholder={'Personal Liability'}
                />
            </div>
            <div>
                <label>{personalProperty.displayText}</label>
                <Field
                    name={'coverageLimits.personalLiability.value.integer'}
                    component="input"
                    type={personalProperty.schema.type}
                    placeholder={'Personal Property'}
                />
            </div>
            <button>Submit</button>
        </>

    )
}

export default Coverage;