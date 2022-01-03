import {Form, Field} from 'react-final-form'

const QuoteSection = ({ quote }) => {
    return (
        <div>
            <Form onSubmit={x => x}>
                {({handleSubmit, submitting, values}) => (
                    <form>
                        <Field
                            name={quote.properties.coverageLimits.dwelling.name}
                            component='input'
                            type={quote.properties.coverageLimits.dewlling.schema.type}
                        />
                    </form>
                )}
            </Form>
        </div>
    )
}

export default QuoteSection;
