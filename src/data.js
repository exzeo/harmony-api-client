import axios from "axios";

const trimWhiteSpace = value =>
    value ? value.replace(/\s+/g, ' ').trim() : value;
const authorizationHeader = 'bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImhuVmF3NzRVcVhTdHA5RkRRbHc0QWQtb2RFQkJJaFcxUVBBZUxuNzN4ekkifQ.eyJ1c2VybmFtZSI6ImFmM2JldGEiLCJraW5kIjoiYWNjZXNzX3Rva2VuIiwianRpIjoiTVZKMnlmN0YyNU5PWXUxVHMxaFh6Iiwic3ViIjoiOTdXQnliSEpQRlV5QTJ5ajBXRS0iLCJpYXQiOjE2NDQ1MjQxNjgsImV4cCI6MTY0NDYxMDU2OCwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImlzcyI6Imh0dHBzOi8vaWQudHJ5Y2MudGVjaC8iLCJhdWQiOiJJNExRcE1RQnhBdzdVLW0tVjh1UzUifQ.e8rIc5fZROEqrBH5yMfVmPTat7x0QxJCw6Yki5CbefYOmdJpXXW9ZkpDcPKh3tl0kLB3hy9YYTxz1Xh6PZR0YmYWodiw6AGimptM5YI-U-Fnm-9gqD4_T2ZB2Xq5lAI59rJMvHMb0EdlDpJ3Fw6rdSqQjKRzn_eJjvQQrULe3rRMlbqKriXu0MXa291H-AwexXtRiHsG88wnooaB84bwJqwh9UEzNvf8JOUTfzFvmxEAwm3TiU77vHqAXerKW01es9EO4jO-SP0QiddoVyrZ9oGUcegOJWcKJPs_36NaweQK7iQOIrl6ubAE8Pi1PbpgZthSQtCJKymOXQnyBWsKxg';

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
                                      setInputsByCategory,
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

            const result = response.data.result.input;
            const inputsArray = [];
            const inputsByCategory = {};

            const {input} = result;

            const categoryList = Object.keys(input.categories)
            categoryList.forEach(categoryKey => {
                const category = input.categories[categoryKey];
                if (category.status === 'Ready') {
                    inputsByCategory.category = [];
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
                            let propertyKeys = Object.keys(categoryProperty.properties);

                            // Check to see if the properties have an order and sort them
                            if (categoryProperty.properties[propertyKeys[0]].order) {
                                propertyKeys = propertyKeys.sort((a, b) => categoryProperty.properties[a].order - categoryProperty.properties[b].order)
                            }

                            const inputSection = {
                                section: property,
                                properties: [],
                            }

                            //Add object to inputList we've made it to the bottom
                            propertyKeys.forEach(key => {
                                const path = `categories.${categoryKey}.properties.${property}.properties.${key}.value`
                                const prop = categoryProperty.properties[key];
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

export async function updateQuote(e, quote, input, setQuoteValues, setInputValues, setInputsByCategory) {
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
            const result = response.data.result
            // setLoadingData(false);
            setQuoteValues(result);

            // const inputsByCategory = {
            //     // ... inputArrays[], "billing": [], quote: [], etc... ?
            // {
            //     billing: []
            //     quote: [[],[],[]]
            // }
            // }
            const inputsByCategory = {};
            const inputsArray = [];

            const {input} = result;

            const categoryList = Object.keys(input.categories);
            categoryList.forEach(categoryKey => {
                const category = input.categories[categoryKey];
                if (category.status === 'Ready') {
                    inputsByCategory.category = [];
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
                                inputsByCategory.category.push({
                                    type: 'object',
                                    section: property,
                                    path: `categories.${categoryKey}.properties.${property}`,
                                    properties: category.properties[property]
                                });
                                inputsArray.push({
                                    path: `categories.${categoryKey}.properties.${property}`,
                                    section: property,
                                    dataType: propertySchema.type,
                                    properties: propertySchema.items.properties,
                                    value: category.properties[property].value
                                });
                            } else if (propertySchema.oneOf) {
                                inputsByCategory.category.push({
                                    type: 'oneOf',
                                    section: property,
                                    path: `categories.${categoryKey}.properties.${property}`,
                                    properties: category.properties[property]
                                })
                                inputsArray.push({
                                    path: `categories.${categoryKey}.properties.${property}`,
                                    section: property,
                                    dataType: 'oneOf',
                                    schema: category.properties[property].schema,
                                    value: category.properties[property].value
                                })
                            }
                        } else {
                            const categoryProperty = category.properties[property];
                            let propertyKeys = Object.keys(categoryProperty.properties);

                            // Check to see if the properties have an order and sort them
                            if (categoryProperty.properties[propertyKeys[0]].order) {
                                propertyKeys = propertyKeys.sort((a, b) => categoryProperty.properties[a].order - categoryProperty.properties[b].order)
                            }

                            const inputSection = {
                                section: property,
                                properties: [],
                            }

                            //Add object to inputList we've made it to the bottom
                            propertyKeys.forEach(key => {
                                const path = `categories.${categoryKey}.properties.${property}.properties.${key}.value`
                                const prop = categoryProperty.properties[key];
                                inputsByCategory.category.push({
                                    type: 'standard',
                                    section: property,
                                    path: `categories.${categoryKey}.properties.${property}`,
                                    properties: category.properties[property]
                                });
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
            setInputsByCategory(inputsByCategory);
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};
