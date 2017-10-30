const React = require('react');
const Cookie = require('js-cookie');
const PropTypes = require('prop-types');
const classNames = require('classnames');
const extensions = require('../../readme-oas-extensions');

const Doc = require('./Doc');

class ApiExplorer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { language: Cookie.get('readme_language') || this.getDefaultLanguage() };

    this.setLanguage = this.setLanguage.bind(this);
    this.getDefaultLanguage = this.getDefaultLanguage.bind(this);
  }
  setLanguage(language) {
    this.setState({ language });
    Cookie.set('readme_language', language);
  }

  getDefaultLanguage() {
    try {
      const firstOas = Object.keys(this.props.oasFiles)[0];
      return this.props.oasFiles[firstOas][extensions.SAMPLES_LANGUAGES][0];
    } catch (e) {
      return 'curl';
    }
  }
  render() {
    const stripe = this.props.flags.stripe ? 'stripe' : '';
    return (
      <div className={`is-lang-${this.state.language}`}>
        {/* The below div does not seem to make any difference stylistically*/}
        <div id="hub-container">
          {/* The below div creates a margin on the left as well*/}
          {/* <div className="hub-container"> */}
          {/* Section moves content to the right allowing space for sidebar */}
          <section id="hub-content">
            {/* The below div does not seem to make any difference stylistically*/}
            <div state-container className="hub-content-container" data-state-container="true">
              <div
                id="hub-reference"
                className={classNames(
                  `content-body hub-reference-sticky hub-reference-theme-${stripe}`,
                )}
              >
                {this.props.docs.map(doc => (
                  <Doc
                    key={doc._id}
                    doc={doc}
                    oas={
                      doc.category.apiSetting ? this.props.oasFiles[doc.category.apiSetting] : {}
                    }
                    setLanguage={this.setLanguage}
                    flags={this.props.flags}
                  />
                ))}
              </div>
            </div>
          </section>
          {/* </div> */}
        </div>
      </div>
    );
  }
}

ApiExplorer.propTypes = {
  docs: PropTypes.arrayOf(PropTypes.object).isRequired,
  oasFiles: PropTypes.shape({}).isRequired,
  flags: PropTypes.shape({
    stripe: PropTypes.bool,
  }).isRequired,
};

ApiExplorer.defaultProps = {
  stripe: false,
};

module.exports = ApiExplorer;
