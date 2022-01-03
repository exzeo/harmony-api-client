import {Form, Field} from 'react-final-form'

const BillingSection = ({billing, quote}) => {
    console.log('billing', billing);

    return (
        <div>
            Billing

            <Form onSubmit={x => x}>
                {({handleSubmit, submitting, values}) => (
                    <form>
                        <div>
                            BillToId
                            <Field
                                name={'billToId'}
                                component='input'
                                type={billing.properties.billing.schema.properties.billToId.type}
                            />
                        </div>
                        <div>
                            <div>Bill Plan</div>
                            {billing.properties.billing.schema.properties.billPlan.enum.map(billPlan =>
                                <label>{billPlan}
                                    <Field
                                        name='billPlan'
                                        type='radio'
                                        component='input'
                                        key={billPlan}
                                        value={billPlan}
                                    />
                                </label>
                            )}
                        </div>
                    </form>
                )}

            </Form>

            {console.log(quote)}
        </div>
    )
}

export default BillingSection;
