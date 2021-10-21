import { Field } from 'react-final-form'

const Deductables = (deductibles) => {
    const {
        allOtherPerils,
        hurricane,
        sinkhole,
    } = deductibles;


    return (
        <>
            <div>Deductibles</div>
            <div>
                <Field
                    name={'deductibles.allOtherPerils.value.integer'}
                    component="input"
                    type={allOtherPerils.schema.type}
                    placeholder={'Medical Payments'}
                />
            </div>
            <div>
                <Field
                    name={'deductibles.allOtherPerils.value.integer'}
                    component="input"
                    type={allOtherPerils.schema.type}
                    placeholder={'Medical Payments'}
                />
            </div>
            <div>
                <Field
                    name={'deductibles.allOtherPerils.value.integer'}
                    component="input"
                    type={allOtherPerils.schema.type}
                    placeholder={'Medical Payments'}
                />
            </div>
        </>
    )
}

export default Deductables;
