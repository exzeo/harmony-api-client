import { Field } from 'react-final-form'

const InputField = ({label, name, component, type, placeholder = ""}) => {
    return (
        <>
            <div>
                <label>{label}</label>
                <Field
                    name={name}
                    component={component}
                    type={type}
                    placeholder={placeholder}
                />

            </div>

        </>

    )
}

export default InputField;