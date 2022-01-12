import {Field} from 'react-final-form';
import {FieldArray} from 'react-final-form-arrays'

const PolicyHolders = ({policyHolderData, mutators}) => {
    const addPolicyHolder = (e) => {
        e.preventDefault();
        mutators.push('policyHolders', undefined);
    }
    const removePolicyHolder = (e) => {
        e.preventDefault();
        mutators.pop('policyHolders');
    }
    return (
        <div>
            {/*<button onClick={(e) => addPolicyHolder(e)}>Add PolicyHolder</button>*/}
            {/*<FieldArray name='policyHolders'>*/}
            {/*    {({fields}) => (*/}
            {/*        fields.map((name, index) => (*/}
            {/*            <div>*/}
            {/*                <Field*/}
            {/*                    name={`policyHolders[${index}].firstName`}*/}
            {/*                    component='input'*/}
            {/*                    placeholder='First Name'*/}
            {/*                />*/}
            {/*                <Field*/}
            {/*                    name={`policyHolders[${index}].lastName`}*/}
            {/*                    component='input'*/}
            {/*                    placeholder='Last Name'*/}
            {/*                />*/}
            {/*                <Field*/}
            {/*                    name={`policyHolders[${index}].companyName`}*/}
            {/*                    component='input'*/}
            {/*                    placeholder='Company Name'*/}
            {/*                />*/}
            {/*                <Field*/}
            {/*                    name={`policyHolders[${index}].emailAddress`}*/}
            {/*                    component='input'*/}
            {/*                    placeholder='Email Address'*/}
            {/*                />*/}
            {/*                <Field*/}
            {/*                    name={`policyHolders[${index}].primaryPhoneNumber`}*/}
            {/*                    component='input'*/}
            {/*                    placeholder='Primary PhoneNumber'*/}
            {/*                />*/}
            {/*                <Field*/}
            {/*                    name={`policyHolders[${index}].secondaryPhoneNumber`}*/}
            {/*                    component='input'*/}
            {/*                    placeholder='secondaryPhoneNumber'*/}
            {/*                />*/}
            {/*                <button type='button' onCLick={(e) => removePolicyHolder(e)}>Remove PolicyHolder</button>*/}

            {/*            </div>*/}
            {/*        ))*/}
            {/*    )}*/}
            {/*</FieldArray>*/}
        </div>
    );
}

export default PolicyHolders;
