import axios from "axios";

const trimWhiteSpace = value =>
    value ? value.replace(/\s+/g, ' ').trim() : value;
const authorizationHeader = 'add auth token here';

export async function searchAddress({
                                        address,
                                        state,
                                        // TODO enable these once service recognizes them
                                        // companyCode,
                                        // product = 'HO3',
                                        tor = 'single family',
                                        page = '1',
                                        pageSize = '10'
                                    }, setResponse) {
    try {
        const cleanAddress = trimWhiteSpace(address);
        axios({
            headers: {Authorization: authorizationHeader},
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/property?searchText=${cleanAddress}&state=${state}`,
        }).then((response) => setResponse(response.data.result.IndexResult));
    } catch (error) {
        throw error;
    }
}

export async function createQuote({
                                      companyCode,
                                      state,
                                      product,
                                      propertyId,
                                      setLoadingData,
                                      setQuoteValues,
                                      setInputValues,
                                  }) {
    try {
        axios({
            headers: {Authorization: authorizationHeader},
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/quote`,
            data: {
                companyCode,
                state,
                product,
                propertyId,
            },
        }).then(response => {
            setLoadingData(false);
            setQuoteValues(response.data.result);

            const result = response.data.result;
            const inputsArray = [];

            const {input} = result;

            const categoryList = Object.keys(input.categories)
            categoryList.forEach(categoryKey => {
                const category = input.categories[categoryKey];
                if (category.status === 'Ready') {
                    const properties = Object.keys(category.properties);

                    properties.forEach(property => {
                        const propertySchema = category.properties[property].schema;

                        if (propertySchema) {
                            if (propertySchema.type === 'object') {
                                //Add object schema type to inputsArray
                                inputsArray.push({
                                    path: `categories.${categoryKey}.properties.${property}`,
                                    category: categoryKey,
                                    section: property,
                                    dataType: propertySchema.type,
                                    properties: propertySchema.properties,
                                    value: category.properties[property].value,
                                });
                            } else if (propertySchema.type === 'array') {
                                //Add Array schema type to inputsArray
                                inputsArray.push({
                                    path: `categories.${categoryKey}.properties.${property}`,
                                    section: property,
                                    dataType: propertySchema.type,
                                    properties: propertySchema.items.properties,
                                    value: category.properties[property].value
                                });
                            }
                        } else {
                            const categoryProperty = category.properties[property];
                            let propertyKeys = Object.keys(categoryProperty);

                            // Check to see if the properties have an order and sort them
                            if (categoryProperty[propertyKeys[0]].order) {
                                propertyKeys = propertyKeys.sort((a, b) => categoryProperty[a].order - categoryProperty[b].order)
                            }

                            const inputSection = {
                                section: property,
                                properties: [],
                            }

                            //Add object to inputList we've made it to the bottom
                            propertyKeys.forEach(key => {
                                const path = `categories.${categoryKey}.properties.${property}.${key}.value`
                                const prop = categoryProperty[key];
                                const inputProperties = {
                                    path,
                                    name: prop.name,
                                    displayText: prop.displayText || prop.question, //Use || question for underwritingAnswers, or create a new property for question
                                    required: prop.required,
                                    enum: prop.schema?.enum,
                                    inputType: prop.schema?.type,
                                    value: prop.value,
                                    default: prop.default,
                                    min: prop.schema?.min,
                                    max: prop.schema?.max,
                                }
                                inputSection.properties.push(inputProperties);
                            });
                            inputsArray.push(inputSection);
                        }
                    });
                }
            })
            setInputValues(inputsArray);
        });
    } catch (error) {
        throw error;
    }
};

export async function updateQuote(e, quote, input) {
    e.preventDefault();
    try {
        axios({
            headers: {Authorization: authorizationHeader},
            method: 'put',
            url: `${process.env.REACT_APP_API_URL}/quote/${quote.quoteNumber}`,
            data: {
                quote,
                input
            },
        }).then(response => {
            console.log('response', response);
            // setLoadingData(false);
            // setQuoteValues(response);
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};
