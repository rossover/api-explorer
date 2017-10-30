const React = require('react');
const { shallow } = require('enzyme');
const Params = require('../src/Params');

const Oas = require('../src/lib/Oas');
const petstore = require('./fixtures/petstore/oas.json');

const props = {
  formData: {},
  onChange: () => {},
  onSubmit: () => {},
};

test('form id should be set to the operationId', () => {
  const oas = new Oas(petstore);
  const operation = oas.operation('/pet/{petId}', 'get');
  expect(shallow(<Params {...props} oas={oas} operation={operation} />).find(`#form-${operation.operationId}`).length).toBe(1);
});
