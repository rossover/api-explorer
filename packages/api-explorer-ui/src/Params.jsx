const React = require('react');
const PropTypes = require('prop-types');
const Form = require('react-jsonschema-form').default;
const UpDownWidget = require('react-jsonschema-form/lib/components/widgets/UpDownWidget').default;
const TextWidget = require('react-jsonschema-form/lib/components/widgets/TextWidget').default;

const {
  CustomSchemaField,
  CustomTitleField,
  // CustomStringField,
  CustomNumberField,
  CustomDescriptionField,
} = require('./CustomFields');

const Oas = require('./lib/Oas');

const { Operation } = Oas;
const parametersToJsonSchema = require('./lib/parameters-to-json-schema');

function CustomFieldTemplate(props) {
  const { id, classNames, label, help, required, description, errors, children } = props;
  return (
    <div className="param-item">
      <label htmlFor={id}>
        <strong>{label}</strong>
        <div className={`param-item-${required ? 'required' : null}`}>
          {required ? 'required' : null}
        </div>
      </label>
      {description}
      {children}
      {errors}
      {help}
    </div>
  );
}

const uiSchema = {
  required: {
    classNames: 'param-item-required',
  },
};

function Params({ oas, operation, formData, onChange }) {
  const jsonSchema = parametersToJsonSchema(operation, oas);
  console.log('this is jsonSchema', jsonSchema);
  return (
    <div className="api-manager">
      {jsonSchema && (
        <Form
          id={`form-${operation.operationId}`}
          schema={jsonSchema}
          fields={{
            SchemaField: CustomSchemaField,
            TitleField: CustomTitleField,
            NumberField: CustomNumberField,
            // DescriptionField: CustomDescriptionField,
          }}
          widgets={{ int64: UpDownWidget, int32: UpDownWidget, uuid: TextWidget }}
          // eslint-disable-next-line no-console
          onSubmit={form => console.log('submit', form.formData)}
          formData={formData}
          onChange={form => onChange(form.formData)}
          FieldTemplate={CustomFieldTemplate}
          uiSchema={uiSchema}
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
