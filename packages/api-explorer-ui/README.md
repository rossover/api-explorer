# api-explorer-ui

UI components for the API explorer

[![build status](https://secure.travis-ci.org/readme/api-explorer-ui.svg)](http://travis-ci.org/readme/api-explorer-ui)
[![dependency status](https://david-dm.org/readme/api-explorer-ui.svg)](https://david-dm.org/readme/api-explorer-ui)

## Installation

```
npm install --save api-explorer-ui
```

## Usage
### ` <ApiExplorer docs={this.state.docs} oasFiles={{
        'api-setting': Object.assign(extensions.defaults, this.state.oas),}} flags={{ correctnewlines: false, stripe: true }}
        oauthUrl={this.props.oauthUrl}
      />`

- `docs` is an object with each endpoint's path, title, and method.
- `oasFiles` is the combined object of the documentation file with the [default swagger extensions](https://readme.readme.io/v2.0/docs/swagger-extensions) that affect which component's are rendered and/or the AJAX request itself.
- `flags` is an object of settings that come from readme that affects the UI of ApiExplorer. The main two are `correctnewlines`- [docs](#correctnewlines) and `stripe` -[docs](#stripe)
-`oauthUrl` is a string that it utilized it the response result body to determine the user's OAuth could be authenticated


### `correctnewlines`

- `correctnewlines` is an object with a boolean value when false it adds line breaks between words instead of spaces. This can be seen in an embedded image with a caption.

### `stripe`

- `stripe` is an object with a boolean value when true it changes the theme of ApiExplorer to show stripes.

### `module.exports = (
  oas,
  pathOperation = { path: '', method: '' },
  values = {},
  opts = { proxyUrl: false },
) => {
  const formData = Object.assign({}, defaultValues, values);
  const har = {
    headers: [],
    queryString: [],
    postData: {},
    method: pathOperation.method.toUpperCase(),
    url: "${oas.servers ? oas.servers[0].url : ''}${pathOperation.path}".replace(/\s/g, '%20'),
  };`  

  - `postData` is an object that includes any body params data we have excluded mimeType for clients that might have a multipart/form since package [react-jsonschema-form](https://mozilla-services.github.io/react-jsonschema-form/) turns files into base64.

## Credits
[Dom Harrington](https://github.com/readme/)

## License

ISC
