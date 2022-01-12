import InputField from "./inputField";
import ArraySchema from "./ArraySchema";
import ObjectSchema from "./ObjectSchema";

const QuoteSection = ({quote, formValues, mutators, inputCategories}) => {

    const categoryList = Object.keys(inputCategories);
    console.log('formValues', formValues)
    return (
        <div>
            {categoryList.map(category => {
                const identifier = inputCategories[category]
                if (identifier.status === 'Ready') {
                    const properties = Object.keys(identifier.properties);
                    return properties.map(property => {
                        const propertySchema = identifier.properties[property].schema
                        if (propertySchema) {
                            if (propertySchema.type === 'object') {
                                //build object for array
                                return <ObjectSchema property={identifier.properties[property]} propertyName={property} category={category}/>
                            } else if (propertySchema.type === 'array') {
                                return <ArraySchema property={identifier.properties[property]} propertyName={property} mutators={mutators} category={category}/>
                            }
                        }
                        let inputProperty = identifier.properties[property];
                        let propertyKeys = Object.keys(inputProperty);

                        // if properties are ordered order them here
                        if (inputProperty[propertyKeys[0]].order) {
                            propertyKeys = propertyKeys.sort((a, b) => inputProperty[a].order - inputProperty[b].order)
                        }
                        return propertyKeys.map(key => {
                            let path = `categories.${category}.properties.${property}.${key}.value`
                            const prop = inputProperty[key]

                            return (
                                <div key={path}>
                                    <InputField
                                        name={path}
                                        label={prop.displayText || prop.question}
                                        component={'input'}
                                        required={prop.required}
                                        schema={prop.schema}
                                    />
                                </div>

                            );
                        });
                    })
                } else {return null}
            })}
        </div>
    )
}

export default QuoteSection;
