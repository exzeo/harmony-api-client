import React, {useState} from 'react'
import { Form } from 'react-final-form'

export const Wizard = (props, {onSubmit, initialValues}) => {

    const [page, setPage] = useState(1);
    const [values, setValues] = useState(initialValues || {});
    const [activePage, setActivePage] = useState();
    const children = props.children;

    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         page: 0,
    //         values: props.initialValues || {}
    //     }
    // }
    const next = values => {
        setPage(Math.min(page + 1, children.length - 1));
        console.log('values', values);
        setValues(values);
    }

    const previous = () =>
        setPage(Math.max(page - 1, 0));

    /**
     * NOTE: Both validate and handleSubmit switching are implemented
     * here because 🏁 Redux Final Form does not accept changes to those
     * functions once the form has been defined.
     */

    // const validate = values => {
    //     const activePage = React.Children.toArray(children)[
    //         page
    //         ]
    //     return activePage.props.validate ? activePage.props.validate(values) : {}
    // }

    const handleSubmit = values => {
        const isLastPage = page === React.Children.count(children) - 1;
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
                // validate={validate}
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
                            {!isLastPage && <button type="submit" onSubmit={next} onClick={next}>Next »</button>}
                            {isLastPage && (
                                <button type="submit" disabled={submitting}>
                                    Submit
                                </button>
                            )}
                        </div>

                        <pre>{JSON.stringify(values, 0, 2)}</pre>
                    </form>
                )}
            </Form>
        )
}

export default Wizard;
