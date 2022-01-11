import InputField from "./inputField";

const MailingAddress = ({policyHolderMailingAddressData}) => {
    return (
        <div>
            <InputField
                label={'address1'}
                name={'policyHolderMailingAddress.address1'}
                component='input'
                type='text'
                placeholder='Address line 1'
            />
            <InputField
                label={'address2'}
                name={'policyHolderMailingAddress.address2'}
                component='input'
                type='text'
                placeholder='Address line 2'
            />
            <InputField
                label={'city'}
                name={'policyHolderMailingAddress.city'}
                component='input'
                type='text'
                placeholder='City'
            />
            <InputField
                label={'state'}
                name={'policyHolderMailingAddress.state'}
                component='input'
                type='text'
                placeholder='state'
            />
            <InputField
                label={'zip'}
                name={'policyHolderMailingAddress.zip'}
                component='input'
                type='text'
                placeholder='zip'
            />
        </div>
    );
}

export default MailingAddress;
