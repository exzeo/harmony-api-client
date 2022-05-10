import { Field } from 'react-final-form';

import InputSelect from './components/Select';

const HIDDEN_FIELDS = ['order'];

function formatHeading(str) {
  let capitalized = str.charAt(0).toUpperCase() + str.slice(1);
  return capitalized.replace(/([0-9A-Z])/g, ' $&'); // Add space between camel casing
}

function getBillingOptions(options) {
  return options.map((option) => {
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

function renderInput(input) {
  switch (input.component) {
    case '$INPUT':
      return (
        <div
          key={input.path}
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <label>{input.title}</label>
          <div>
            <Field
              key={input.path}
              name={input.path}
              type={input.type === 'string' ? 'text' : input.type}
              component="input"
            />
          </div>
        </div>
      );
    case '$SELECT':
    case '$RADIO':
      return <InputSelect key={input.path} {...input} />;
    default:
      return null;
  }
}

function getComponent(properties) {
  if (properties.question) {
    return '$RADIO';
  }

  if (properties.schema?.enum || properties.schema?.oneOf) {
    return '$SELECT';
  }

  if (properties?.type === 'number' || 'string') {
    return '$INPUT';
  }

  if (properties.type === 'boolean') {
    return '$SWITCH';
  }
}

function formatQuoteProperties(properties, path) {
  const formatted = [];

  Object.keys(properties).forEach((key) => {
    if (HIDDEN_FIELDS.includes(key)) {
      return;
    }
    const options =
      (properties[key].schema?.enum &&
        properties[key].schema.enum.map((opt) => ({
          label: opt,
          value: opt,
        }))) ||
      (properties[key].schema?.oneOf &&
        properties[key].schema?.oneOf.map((opt) => ({
          label: opt.title,
          value: opt.const,
        })));

    if (properties[key]?.type === 'object') {
      const nested = formatQuoteProperties(
        properties[key].properties,
        `${path}.${key}`
      );
      nested.forEach((v) => formatted.push(v));
    } else {
      const component = getComponent(properties[key]);

      formatted.push({
        path: `${path}.${key}`,
        title: properties[key].displayText || properties[key].question || key,
        component,
        type: properties[key].type || properties[key].schema?.type,
        ...(options && { options }),
        ...(properties[key].value && { value: properties[key].value }),
        ...(properties[key].schema?.default && {
          defaultValue: properties[key].schema.default,
        }),
        ...(properties[key].required && { required: properties[key].required }),
        ...(properties[key].order && { order: properties[key].order }),
      });
    }
  });

  return formatted;
}

function formatSections([sectionName, section]) {
  if (sectionName === 'billing') {
    return {
      key: sectionName,
      type: 'billing',
      options: getBillingOptions(section.schema.oneOf),
    };
  }
  if (section.schema?.type === 'array') {
    return {
      key: sectionName,
      type: 'array',
      path: `categories.quote.properties.${sectionName}.value`,
      inputs: formatQuoteProperties(
        section.schema.items.properties,
        // No 'path' provided b/c the path is defined top-level for an array section
        ''
      ),
    };
  }
  if (section.schema?.type === 'object') {
    return {
      key: sectionName,
      type: 'object',
      inputs: formatQuoteProperties(
        section.schema.properties,
        `categories.quote.properties.${sectionName}.value`
      ),
    };
  }
  // else format each input and add 'value' to the end of each input's path
  return {
    key: sectionName,
    inputs: formatQuoteProperties(
      section.properties,
      `categories.quote.properties.${sectionName}.properties`
    ).map((v) => ({ ...v, path: v.path + '.value' })),
  };
}

export { formatHeading, renderInput, formatSections };
