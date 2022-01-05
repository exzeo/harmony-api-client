import InputField from "./inputField";

const PolicyHolderMailingAddress = ({ policyHolderMailingAddressData }) => {
    const {
        address1,
        address2,
        city,
        country,
        state,
        zip,
    } = policyHolderMailingAddressData.schema.properties;

    return (
        <div>
            <InputField
                name
                label
                type
                placeholder
                defaultValue
            />
        </div>
    )
}

export default PolicyHolderMailingAddress;
