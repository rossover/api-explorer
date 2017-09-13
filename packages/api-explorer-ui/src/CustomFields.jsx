const React = require('react');
const SchemaField = require('react-jsonschema-form/lib/components/fields/SchemaField').default;
const NumberField = require('react-jsonschema-form/lib/components/fields/NumberField').default;
const TitleField = require('react-jsonschema-form/lib/components/fields/TitleField').default;
const StringField = require('react-jsonschema-form/lib/components/fields/StringField').default;
const DescriptionField = require('react-jsonschema-form/lib/components/fields/DescriptionField')
  .default;
const ArrayField = require('react-jsonschema-form/lib/components/fields/ArrayField').default;

const CustomSchemaField = function(props) {
  return (
    <div className="param-item">
      <SchemaField {...props} />
    </div>
  );
};

const CustomTitleField = ({ title, required }) => {
  const legend = required ? `${title}*` : title;
  return (
    <div className="param-item-name">
      <strong>{legend}</strong>
    </div>
  );
};

// const CustomStringField = ({title, required}) => {
//   const legend = required ? `${title  }*` : title;
//   return (<div className="param-item-name">
//     <strong>{legend}</strong>
//   </div>);
// };
//
const CustomNumberField = props => {
  const legend = props.required ? `${props.title}*` : props.title;

  return (
    <div className="param-item-name">
      {legend}
      <NumberField {...props} />
    </div>
  );
};

const CustomDescriptionField = props => {
  const { description } = props;
  return (
    <div className="param-header">
      <h3>{description}</h3>
    </div>
  );
};

module.exports = {
  CustomDescriptionField,
  CustomNumberField,
  // CustomStringField,
  CustomTitleField,
  CustomSchemaField,
};
