function determineType(schema) {
  if (schema.enum || schema.oneOf) {
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
  } else if (schema.oneOf) {
    return schema.oneOf.map((item) => {
      return {
        value: item.const,
        label: item.title,
      };
    });
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
      name1,
    } = option.metadata;
    return {
      inputHint: 'billing',
      name: 'categories.billing.value',
      companyName,
      emailAddress,
      entityType,
      firstName: firstName || name1,
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
    } else if (key === 'order') {
      return;
    } else if (property.type === 'object') {
      Object.keys(property.properties).forEach((propertyKey) => {
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
  function getValue(subSection) {
    if (Object.keys(subSection.value).length !== 0) {
      return subSection.value;
    } else {
      const keys = Object.keys(subSection.schema.properties);
      return keys.reduce((acc, value) => {
        acc[value] = undefined;
        return acc;
      }, {});
    }
  }

  return {
    title: subSectionKey,
    path: `categories.${categoryKey}.properties.${subSectionKey}.value`,
    inputHint: subSection.schema.type,
    inputList: getInputList(subSection.schema.properties, subSection),
    value: getValue(subSection),
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
    default:
      getDefault(subSectionProperty.schema.default) || subSectionProperty.value,
  };
}

export function parseInputData(input) {
  if (!input) return [];

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
      } else if (subSectionKey === 'property') {
        return;
      } else if (subSection.properties) {
        const propertyKeys = Object.keys(subSection.properties);

        propertyKeys.forEach((subSectionPropertyKey) => {
          const subSectionProperty =
            subSection.properties[subSectionPropertyKey]; // business
          if (subSectionPropertyKey === 'order') {
            // Is order going to be removed or is hidden field going to be added?
            return;
          }
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

// TODO - Reworking parseInput data - still need to fix 'path' property
// function getComponent(properties) {
//   if (properties.question) {
//     return '$RADIO'
//   }
//
//   if (properties.schema?.enum || properties.schema?.oneOf) {
//     return '$SELECT'
//   }
//
//   if (properties?.type === 'number' || 'string') {
//     return '$INPUT'
//   }
//
//   if (properties.type === 'boolean') {
//     return '$SWITCH'
//   }
// }
//
// function formatProperties(properties, path) {
//   const formatted = {};
//   Object.keys(properties).forEach(key => {
//
//     const options = properties[key].schema?.enum || properties[key].schema?.oneOf && properties[key].schema?.oneOf.map(opt => ({ label: opt.title, value: opt.const }));
//
//
//     const component = getComponent(properties[key]);
//
//     formatted[key] = {
//       path: `${path}.${key}.value`,
//       displayText: properties[key].displayText || properties[key].question || key,
//       component,
//       ...(options && { options }),
//       ...(properties[key].value && { value: properties[key].value }),
//       ...(properties[key].schema?.defaultValue && { defaultValue: properties[key].schema.default }),
//       ...(properties[key].type && { type: properties[key].type }),
//       ...(properties[key].required && { required: properties[key].required }),
//       ...(properties[key].order && { order: properties[key].order })
//     }
//   })
//
//   return formatted
// }
//
// const { coverageLimits, coverageOptions, policyHolderMailingAddress, mortgagees, underwritingAnswers } = categories.quote.properties;
//
// const formattedQuote = {
//   coverageLimits: formatProperties(coverageLimits.properties, 'quote.properties.coverageLimits.properties.'),
//   coverageOptions: formatProperties(coverageOptions.properties, 'quote.properties.coverageOptions.properties'),
//   policyHolderMailingAddress: {
//     ...formatProperties(policyHolderMailingAddress.schema.properties, 'quote.properties.policyHolderMailingAddress.schema.properties.'),
//     country: formatProperties(policyHolderMailingAddress.schema.properties.country.properties, 'quote.properties.policyHolderMailingAddress.schema.properties.country.properties')
//   },
//   mortgagees: {
//     ...formatProperties(mortgagees.schema.items.properties, 'quote.properties.mortgagees.schema.items.properties'),
//     mailingAddress: {
//       ...formatProperties(mortgagees.schema.items.properties.mailingAddress.properties, 'quote.properties.mortgagees.schema.items.properties.mailingAddress.properties'),
//       country: formatProperties(mortgagees.schema.items.properties.mailingAddress.properties.country.properties, 'quote.properties.mortgagees.schema.items.properties.mailingAddress.properties.country')
//     }
//   },
//   underwritingAnswers:
//     formatProperties(underwritingAnswers.properties, 'quote.properties.underwritingAnswers.properties')
// }
