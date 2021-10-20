import { useState } from 'react';
import { Field } from 'react-final-form'
import InputField from "./inputField";

const Coverage = ({coverageData, values}) => {
    const {
        dwelling,
        lossOfUse,
        medicalPayments,
        moldLiability,
        moldProperty,
        OrdinanceOrLaw,
        otherStructures,
        personalLiability,
        personalProperty
    } = coverageData;
    const formattedData = Object.entries(coverageData);

    const updateValue = (e, field) => {
        console.log(e.target.value);
        field.value.integer = e.target.value;
        console.log()
    }

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
                {console.log(dwelling)}
            </div>
            <div>
                <label>First Name</label>
                <Field
                    name="firstName"
                    component="input"
                    type="text"
                    placeholder="first Name"
                />

            </div>
            <button>Submit</button>
        </>

    )
}

export default Coverage;