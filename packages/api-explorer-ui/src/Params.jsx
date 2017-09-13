const React = require('react');
const PropTypes = require('prop-types');
const Form = require('react-jsonschema-form').default;
const UpDownWidget = require('react-jsonschema-form/lib/components/widgets/UpDownWidget').default;
const TextWidget = require('react-jsonschema-form/lib/components/widgets/TextWidget').default;
const SchemaField = require('react-jsonschema-form/lib/components/fields/SchemaField').default;
const NumberField = require('react-jsonschema-form/lib/components/fields/NumberField').default
const TitleField = require('react-jsonschema-form/lib/components/fields/TitleField').default
const StringField = require('react-jsonschema-form/lib/components/fields/StringField').default
const DescriptionField = require('react-jsonschema-form/lib/components/fields/DescriptionField').default
const ArrayField = require('react-jsonschema-form/lib/components/fields/ArrayField').default
// const { CustomSchemaField, CustomTitleField, CustomStringField, CustomNumberField, CustomDescriptionField } = require('./CustomFields');

const CustomSchemaField = function(props) {
  return (
    <div className="param-item">
      <SchemaField {...props} />
    </div>
  );
};

const CustomTitleField = ({title, required}) => {
  const legend = required ? `${title  }*` : title;
  return (<div className="param-item-name">
    {/* <strong>{legend}</strong> */}
  </div>);
};

// const CustomStringField = ({title, required}) => {
//   const legend = required ? `${title  }*` : title;
//   return (<div className="param-item-name">
//     <strong>{legend}</strong>
//   </div>);
// };
//
const CustomNumberField = (props) => {
  const legend = props.required ? `${props.title  }*` : props.title;

  return (<div className="param-item-name">
    {legend}
    <NumberField {...props} />
  </div>);
};

const CustomDescriptionField = (props) => {
  const { description } = props;
    return (
      <div className="param-header">
        <h3>
          {description}
        </h3>
      </div>

    );
}

// const CustomArrayField = (props) => {
//   const btnStyle = {
//     flex: 1,
//     paddingLeft: 6,
//     paddingRight: 6,
//     fontWeight: "bold",
//   };
//   return (
//     <div key={props.index} className={props.className}>
//       <div className={props.hasToolbar ? "col-xs-9" : "col-xs-12"}>
//         {props.children}
//       </div>
//
//       {props.hasToolbar && (
//         <div className="col-xs-3 array-item-toolbox">
//           <div
//             className="btn-group"
//             style={{ display: "flex", justifyContent: "space-around" }}
//           >
//             {(props.hasMoveUp || props.hasMoveDown) && (
//               <i
//                 icon="arrow-up"
//                 className="fa fa-arrow-up"
//                 aria-hidden="true"
//                 tabIndex="-1"
//                 style={btnStyle}
//                 disabled={props.disabled || props.readonly || !props.hasMoveUp}
//                 onClick={props.onReorderClick(props.index, props.index - 1)}
//               />
//             )}
//
//             {(props.hasMoveUp || props.hasMoveDown) && (
//               <i
//                 icon="arrow-down"
//                 className="fa fa-arrow-down"
//                 aria-hidden="true"
//                 tabIndex="-1"
//                 style={btnStyle}
//                 disabled={
//                   props.disabled || props.readonly || !props.hasMoveDown
//                 }
//                 onClick={props.onReorderClick(props.index, props.index + 1)}
//               />
//             )}
//
//             {props.hasRemove && (
//               <i
//                 type="danger"
//                 icon="remove"
//                 className="fa fa-times"
//
//                 tabIndex="-1"
//                 style={btnStyle}
//                 disabled={props.disabled || props.readonly}
//                 onClick={props.onDropIndexClick(props.index)}
//               />
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

const Oas = require('./lib/Oas');

const { Operation } = Oas;
const parametersToJsonSchema = require('./lib/parameters-to-json-schema');

function CustomFieldTemplate(props) {
  const {id, classNames, label, help, required, description, errors, children} = props;
  return (
    <div className="param-item">
      <label htmlFor={id}>
        <strong>{label}</strong>
        <div className={`param-item-${required ? "required" : null}`}>{required ? "required" : null}</div>
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
    classNames: "param-item-required"
  }
}

function Params({ oas, operation, formData, onChange }) {
  const jsonSchema = parametersToJsonSchema(operation, oas);
  console.log('this is jsonSchema', jsonSchema)
  return (
    <div className="api-manager">
      {jsonSchema && (
        <Form
          id={`form-${operation.operationId}`}
          schema={jsonSchema}
          fields={{SchemaField: CustomSchemaField, TitleField: CustomTitleField, NumberField: CustomNumberField }}
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
