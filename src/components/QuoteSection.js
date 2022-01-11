import InputField from "./inputField";

const QuoteSection = ({quote, formValues, mutators, inputCategories}) => {

    const categoryList = Object.keys(inputCategories);
    console.log('formValues', formValues.quote)
    return (
        <div>
            {categoryList.map(category => {
                const identifier = inputCategories[category]
                if (identifier.status === 'Ready') {
                    const properties = Object.keys(identifier.properties);
                    return properties.map(property => {
                        if (identifier.properties[property].schema) {
                            // handle different schema types here like additional interests
                            return
                        }
                        let inputProperty = identifier.properties[property];
                        let propertyKeys = Object.keys(inputProperty);

                        // if properties are ordered order them here
                        if (inputProperty[propertyKeys[0]].order) {
                            propertyKeys = propertyKeys.sort((a, b) => inputProperty[a].order - inputProperty[b].order)
                        }
                        return propertyKeys.map(key => {
                            let path = `${category}.properties.${property}.${key}.value`
                            // need to build a path to this location for the form
                            const prop = inputProperty[key]

                            return (
                                <InputField
                                    name={path}
                                    label={prop.displayText || prop.question}
                                    component={'input'}
                                    required={prop.required}
                                    schema={prop.schema}
                                />
                            );
                        });
                    })

                }
            })}
        </div>
    )
}

export default QuoteSection;
