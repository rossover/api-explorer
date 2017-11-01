const React = require('react');
const PropTypes = require('prop-types');
const Form = require('react-jsonschema-form').default;
const UpDownWidget = require('react-jsonschema-form/lib/components/widgets/UpDownWidget').default;
const TextWidget = require('react-jsonschema-form/lib/components/widgets/TextWidget').default;
const FileWidget = require('react-jsonschema-form/lib/components/widgets/FileWidget').default;

const ObjectField = require('./form-components/ObjectField');
const SchemaField = require('./form-components/SchemaField');
const FieldTemplate = require('./form-components/FieldTemplate');

const Oas = require('./lib/Oas');

const { Operation } = Oas;
const parametersToJsonSchema = require('./lib/parameters-to-json-schema');

function Params({ oas, operation, formData, onChange, onSubmit }) {
  const jsonSchema = parametersToJsonSchema(operation, oas);

  const forms = [];

  // This is kinda hacky but it's the only way we can make sure we
  // only call onSubmit when all of the forms are valid
  //
  // Otherwise if the users presses <enter> whilst they're in the first
  // form, it'll bypass any validation in the 2nd form.
  function submit() {
    return forms.every(form => {
      return form.validate(form.state.formData).errors.length === 0;
    }) && onSubmit();
  }

  return (
    <div className="api-manager">
      <div className="param-table">
        {jsonSchema &&
          jsonSchema.map((schema) => {
            return [
              <div className="param-header" key={`${schema.type}-header`}>
                <h3>{schema.label}</h3>
                <div className="param-header-border" />
              </div>,
              <Form
                key={`${schema.type}-form`}
                id={`form-${operation.operationId}-${schema.type}`}
                schema={schema.schema}
                widgets={{
                  int64: UpDownWidget,
                  int32: UpDownWidget,
                  double: UpDownWidget,
                  float: UpDownWidget,
                  binary: FileWidget,
                  TextWidget,
                }}
                onSubmit={submit}
                formData={formData[schema.type]}
                onChange={form => {
                  // return onChange({ [schema.type]: { $set: form.formData } })
                  return onChange({ [schema.type]: form.formData });
                }}
                onError={() => {}}
                FieldTemplate={FieldTemplate}
                fields={{
                  ObjectField,
                  SchemaField,
                  TitleField: () => null,
                }}
                ref={form => forms.push(form)}
              >
                <button type="submit" style={{ display: 'none' }} />
              </Form>,
            ];
          })}
      </div>
    </div>
  );
}

Params.propTypes = {
  oas: PropTypes.instanceOf(Oas).isRequired,
  operation: PropTypes.instanceOf(Operation).isRequired,
  formData: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

module.exports = Params;
