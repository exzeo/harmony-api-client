import Radio from "./Radio";

const BillingSchema = ({ schema, value, section, path }) => {
    const properties = schema.oneOf[0].properties;
    const propertyKeys = Object.keys(properties)
    return (
        <div>
            <h4>{section}</h4>
            {propertyKeys.map(key => {
                return (
                    <div key={key + section}>
                        {properties[key].enum ? <Radio
                            label={key}
                            name={path}
                            type={properties[key].type}
                            radioList={properties[key].enum}
                            defaultValue={value[key]}
                            />
                            : null}
                    </div>
                );
            })}
        </div>
    )
}

export default BillingSchema;