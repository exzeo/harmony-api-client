import axios from 'axios';

const trimWhiteSpace = (value) =>
  value ? value.replace(/\s+/g, ' ').trim() : value;
const authorizationHeader =
  'bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImhuVmF3NzRVcVhTdHA5RkRRbHc0QWQtb2RFQkJJaFcxUVBBZUxuNzN4ekkifQ.eyJ1c2VybmFtZSI6ImFmM2JldGEiLCJraW5kIjoiYWNjZXNzX3Rva2VuIiwianRpIjoiVURBZHpuREtwWUZWdmtNRkdjNXBRIiwic3ViIjoiOTdXQnliSEpQRlV5QTJ5ajBXRS0iLCJpYXQiOjE2NDUwNTkzOTMsImV4cCI6MTY0NTE0NTc5Mywic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImlzcyI6Imh0dHBzOi8vaWQudHJ5Y2MudGVjaC8iLCJhdWQiOiJJNExRcE1RQnhBdzdVLW0tVjh1UzUifQ.melJbdUtO0gS_hkB1Fha-P2GY3j7w2wheveidq1-de9U_TNau-sEHHhy-5PsfZ9HotWYU3e2FBCTVfrRlYM2eaA00mXavdzYXyzyMe-5Q8C8kZupwLjwJ65GWnL5nagL0s0Gs4CLeNakMABXCfRnl6qYcR8Gg9ciugSByMdVN1BMje87jMtjfz_lReeBeJPLqJebMrfGCdU4Iax5sWlqsuvMykuD52c9f1xYrXEMXyTjVIYQ6GI4_5vRHLpURxnHuc_-_W3FVMh68-9OYkrmiLFduh3nRW1kc0rx4PvgwH6S1tDQWZckaGD-GUY4hv4LmdQ7qszq83WQbeW017KVLQ';

export async function searchAddress(
  {
    address,
    state,
    // TODO enable these once service recognizes them
    // companyCode,
    // product = 'HO3',
    tor = 'single family',
    page = '1',
    pageSize = '10',
  },
  setResponse
) {
  try {
    const cleanAddress = trimWhiteSpace(address);
    axios({
      headers: { Authorization: authorizationHeader },
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/property?searchText=${cleanAddress}&state=${state}`,
    }).then((response) => setResponse(response.data.result.IndexResult));
  } catch (error) {
    throw error;
  }
}

function determineType(schema) {
  if (schema.enum) {
    return 'select';
  } else if (schema === 'billing') {
    return 'billing';
  }
  return 'textbox';
}

function getOptions({ format, schema }) {
  if (schema.enum) {
    if (typeof schema.enum[0] === 'string') {
      return schema.enum.map((e) => ({ value: e, label: e }));
    }
    if (typeof schema.enum[0] === 'boolean') {
      return schema.enum.map((e) => ({ value: e, label: e.toString() }));
    }
    if (schema.type === 'number') {
      return schema.enum.map((e) => ({ value: e, label: e }));
    }

    if (format === 'Currency') {
      return schema.enum.map((e) => ({
        value: e,
        label: `$${e.toLocaleString('en', { minimumFractionDigits: 2 })}`,
      }));
    }
  }
  return undefined;
}

function getBillingOptions(options) {
  return options.map((option, index) => {
    const {
      companyName,
      emailAddress,
      entityType,
      firstName,
      lastName,
      order,
      primaryPhoneNumber,
      _id,
    } = option.metadata;
    return {
      inputHint: 'billing',
      name: 'categories.billing.value',
      companyName,
      emailAddress,
      entityType,
      firstName,
      lastName,
      order,
      primaryPhoneNumber,
      id: _id,
      optionPropertyList: option.properties.billPlan,
      billToId: option.properties.billToId,
    };
  });
}

function getDefault(value) {
  let defaultValue = null;
  if (value || typeof value === 'boolean') {
    defaultValue = {
      value: value,
      label: value.toString(),
    };
  }
  return defaultValue;
}

function getInputList(propertyList) {
  const propertyListKeys = Object.keys(propertyList);
  const inputList = [];

  propertyListKeys.forEach((key) => {
    const property = propertyList[key];
    if (key === 'country') {
      inputList.push({
        name: `country.properties.code`,
        title: 'country',
        type: propertyList[key].type,
      });
    } else if (property.type === 'object') {
      Object.keys(property.properties).forEach((propertyKey) => {
        // if propertyKey country push something else
        inputList.push({
          name: `${key}.${propertyKey}`,
          title: propertyKey,
          type: property.properties[propertyKey].type,
        });
      });
    } else {
      inputList.push({
        name: key,
        title: key,
        type: propertyList[key].type,
      });
    }
  });

  return inputList;
}

function buildArrayInput(subSection, categoryKey, subSectionKey) {
  return {
    title: subSectionKey,
    path: `categories.${categoryKey}.properties.${subSectionKey}.value`,
    inputHint: subSection.schema.type,
    inputList: getInputList(subSection.schema.items.properties),
  };
}

function buildObjectInput(subSection, categoryKey, subSectionKey) {
  return {
    title: subSectionKey,
    path: `categories.${categoryKey}.properties.${subSectionKey}.value`,
    inputHint: subSection.schema.type,
    inputList: getInputList(subSection.schema.properties),
    value: subSection.value,
  };
}

function buildInput(
  subSection,
  categoryKey,
  subSectionKey,
  subSectionProperty,
  subSectionPropertyKey
) {
  return {
    title: subSectionProperty.question || subSectionProperty.displayText,
    path: `categories.${categoryKey}.properties.${subSectionKey}.properties.${subSectionPropertyKey}.value`,
    inputHint: determineType(subSectionProperty.schema),
    type: subSectionProperty.schema.type,
    options: getOptions(subSectionProperty),
    default: getDefault(subSectionProperty.schema.default),
  };
}

function parseInputData(input) {
  const sections = [];

  const categoryList = Object.keys(input.categories);
  const readyCategoriesKeys = categoryList.filter(
    (key) => input.categories[key].status === 'Ready'
  );

  readyCategoriesKeys.forEach((categoryKey) => {
    const category = input.categories[categoryKey];

    const subSectionKeys = Object.keys(category.properties);
    subSectionKeys.forEach((subSectionKey) => {
      const section = {};

      const subSection = category.properties[subSectionKey];
      section.title = subSectionKey; // underwritingAnswers
      section.inputs = [];

      if (subSection.name === 'billing') {
        section.inputs.push({
          title: subSection.name,
          path: `categories.${categoryKey}.properties.${subSectionKey}.properties`,
          inputHint: determineType('billing'),
          type: 'oneOf',
          options: getBillingOptions(subSection.schema.oneOf),
          default: getDefault(subSection.value),
        });
      } else if (subSection.properties) {
        const propertyKeys = Object.keys(subSection.properties);

        propertyKeys.forEach((subSectionPropertyKey) => {
          const subSectionProperty =
            subSection.properties[subSectionPropertyKey]; // business

          // TODO need to account for billing section separately
          if (subSectionProperty.schema) {
            section.inputs.push(
              buildInput(
                subSection,
                categoryKey,
                subSectionKey,
                subSectionProperty,
                subSectionPropertyKey
              )
            );
          }
        });
      } else {
        if (subSection.schema.type === 'array') {
          section.inputs.push(
            buildArrayInput(subSection, categoryKey, subSectionKey)
          );
        } else if (subSection.schema.type === 'object') {
          section.inputs.push(
            buildObjectInput(subSection, categoryKey, subSectionKey)
          );
        }
      }
      sections.push(section);
    });
  });

  return sections;
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
      headers: { Authorization: authorizationHeader },
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/quote`,
      data: {
        companyCode,
        state,
        product,
        propertyId,
      },
    }).then((response) => {
      setLoadingData(false);
      setQuoteValues(response.data.result);

      const input = response.data.result.input;

      const inputSections = parseInputData(input);

      setInputValues(inputSections);
    });
  } catch (error) {
    throw error;
  }
}

export async function updateQuote(
  quote,
  input,
  setQuoteValues,
  setInputValues
) {
  try {
    axios({
      headers: { Authorization: authorizationHeader },
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}/quote/${quote.quoteNumber}`,
      data: {
        quote,
        input,
      },
    }).then((response) => {
      const result = response.data.result;
      // setLoadingData(false);

      // Need to set the result so we have access to the new quote
      setQuoteValues(result);

      const { input } = result;

      const inputSections = parseInputData(input);

      setInputValues(inputSections);
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
