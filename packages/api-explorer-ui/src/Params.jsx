const React = require('react');
const PropTypes = require('prop-types');
const Form = require('react-jsonschema-form').default;
const UpDownWidget = require('react-jsonschema-form/lib/components/widgets/UpDownWidget').default;
const TextWidget = require('react-jsonschema-form/lib/components/widgets/TextWidget').default;
const SchemaField = require('react-jsonschema-form/lib/components/fields/SchemaField').default;

const CustomSchemaField = function(props) {
  return (
    <div className="param-item">
      <SchemaField {...props} />
    </div>
  );
};

const CustomTitleField = ({title, required}) => {
  const legend = required ? title + '*' : title;
  return (<div className="param-item-name">
    <strong>{legend}</strong>
  </div>);
};

const CustomIntegerField = ({title, required}) => {
  const legend = required ? title + '*' : title;
  return (<div className="param-item-name">
    <strong>{legend}</strong>
  </div>);
};

const Oas = require('./lib/Oas');

const { Operation } = Oas;
const parametersToJsonSchema = require('./lib/parameters-to-json-schema');

function Params({ oas, operation, formData, onChange }) {
  const jsonSchema = parametersToJsonSchema(operation, oas);

  return (
    <div className="api-manager">
      {jsonSchema && (
        <Form
          id={`form-${operation.operationId}`}
          schema={jsonSchema}
          fields={{SchemaField: CustomSchemaField, TitleField: CustomTitleField}}
          widgets={{ int64: UpDownWidget, int32: UpDownWidget, uuid: TextWidget }}
          // eslint-disable-next-line no-console
          onSubmit={form => console.log('submit', form.formData)}
          formData={formData}
          onChange={form => onChange(form.formData)}
        >
          <button type="submit" style={{ display: 'none' }} />
        </Form>
      )}
    </div>
  );
}

Params.propTypes = {
  oas: PropTypes.instanceOf(Oas).isRequired,
  operation: PropTypes.instanceOf(Operation).isRequired,
  formData: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
};

module.exports = Params;
