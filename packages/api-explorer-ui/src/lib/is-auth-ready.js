function isAuthReady(operation, authData) {
  let ready = true;

  const authInputData = authData === undefined ? {} : authData;
  const securitySettings = operation.getSecurity();
  if (!securitySettings) return ready;
  securitySettings.forEach(sec => {
    const keys = Object.keys(sec);
    // const key = Object.keys(sec)[0];

    const securities = [];
    keys.map(key => {
      if (!operation.oas.components.securitySchemes[key]) {
        return;
      }
      securities.push([operation.oas.components.securitySchemes[key], authInputData[key]]);
    });

    // handle or scenario
    if (securitySettings.length > 1) {
      const obj = {
        securities: [],
      };
      if (securities.length === 1) {
        // check if this is !auth
        securities.map(security => {
          // console.log({ security });
          const auth = security[1];
          // console.log({ auth });
          if (security.type === 'http' && security.scheme === 'basic') {
            if (!auth || !auth.username) {
              // ready = false;
              obj.security = false;
            }
            obj.security = true;
          }

          if (security.type === 'apiKey') {
            if (!auth) {
              // ready = false;
              obj.security = false;
            }
            obj.security = true;
          }

          if (security.type === 'oauth2') {
            if (!auth) {
              // ready = false;
              obj.security = false;
            }
            obj.security = true;
          }
        });
      } else if (securities.length > 1) {
        // at least one  securities need to be !auth to be false
        securities.map(security => {
          const auth = security[1];
          if (security.type === 'http' && security.scheme === 'basic') {
            if (!auth || !auth.username) {
              // ready = false;
              obj.securities.push(false);
            }
            obj.securities.push(true);
          }

          if (security.type === 'apiKey') {
            if (!auth) {
              // ready = false;
              obj.securities.push(false);
            }
            obj.securities.push(true);
          }

          if (security.type === 'oauth2') {
            if (!auth) {
              // ready = false;
              obj.securities.push(false);
            }
            obj.securities.push(true);
          }
        });
      }
      // if both OR conditions have a false  then ready is false
      if (obj.securities.indexOf(false) !== -1 && obj.security === false) {
        ready = false;
      }
    }
    securities.map(security => {
      // console.log({ security });
      const auth = security[1];
      // console.log({ auth });
      if (security.type === 'http' && security.scheme === 'basic') {
        if (!auth || !auth.username) {
          ready = false;
        }
      }

      if (security.type === 'apiKey') {
        if (!auth) {
          ready = false;
        }
      }

      if (security.type === 'oauth2') {
        if (!auth) {
          ready = false;
        }
      }
    });

    // original auth ready logic starting on line 7

    // securitySettings.forEach(sec => {
    //     const key = Object.keys(sec)[0];
    //
    //     if (!operation.oas.components.securitySchemes[key]) return;
    //     const security = operation.oas.components.securitySchemes[key];
    //     const auth = authInputData[key];
    //     if (security.type === 'http' && security.scheme === 'basic') {
    //       if (!auth || !auth.username) {
    //         ready = false;
    //       }
    //     }
    //
    //     if (security.type === 'apiKey') {
    //       if (!auth) {
    //         ready = false;
    //       }
    //     }
    //
    //     if (security.type === 'oauth2') {
    //       if (!auth) {
    //         ready = false;
    //       }
    //     }
  });
  return ready;
}

module.exports = isAuthReady;
