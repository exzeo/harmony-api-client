import React, {useState} from 'react'
import { Form } from 'react-final-form'

export const Wizard = (props) => {
    const { onSubmit, initialValues, children } = props;
    const [page, setPage] = useState(0);

    const next = () => {
        setPage(page + 1);
    }

    const previous = () => setPage(page - 1);

    const handleSubmit = values => {
        const isLastPage = page === children.length - 1;
        if (isLastPage) {
            return onSubmit(values)
        } else {
            next(values)
        }
    }
        const isLastPage = page === children.length - 1;
        return (
            <Form
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit, submitting, values }) => (
                    <form onSubmit={handleSubmit}>
                        {children[page]}
                        <div className="buttons">
                            {page > 0 && (
                                <button type="button" onClick={previous}>
                                    « Previous
                                </button>
                            )}
                            {!isLastPage && <button type="submit" onSubmit={next}>Next »</button>}
                            {isLastPage && (
                                <button type="submit" disabled={submitting} onSubmit={handleSubmit}>
                                    Submit
                                </button>
                            )}
                        </div>
                    </form>
                )}
            </Form>
        )
}

export default Wizard;
