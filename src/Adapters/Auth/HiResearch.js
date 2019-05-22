'use strict';

// Helper functions for accessing the Facebook Graph API.
const httpsRequest = require('./httpsRequest');
const logger = require('../../logger').default;
const Parse = require('parse/node').Parse;

// Returns a promise that fulfills iff this user id is valid.
function validateAuthData(authData, options) {
  logger.info('validateAuthData ++');
  logger.info(JSON.stringify(authData));
  logger.info(JSON.stringify(options));

  return httpsRequest
    .get({
      host: options['hiresearchHost'],
      port: options['hiresearchPort'],
      path: '/careauthservice/v1/session/validate?userId=' + authData['id'],
      headers: {
        'User-Agent': 'parse-server',
        accept: 'application/json',
        'Bridge-Session': authData['bridgeSession'],
      },
    })
    .then(
      res => {
        if (res['code'] !== '0') {
          logger.error(JSON.stringify(res));
          throw new Parse.Error(
            Parse.Error.OBJECT_NOT_FOUND,
            'hiresearch auth is invalid for this user.'
          );
        }
        logger.info(JSON.stringify(res));
        return;
      },
      err => {
        logger.error(err);
        throw new Parse.Error(
          Parse.Error.CONNECTION_FAILED,
          'Failed to connect to hiresearch'
        );
      }
    );
}

// Returns a promise that fulfills iff this app id is valid.
function validateAppId(appIds, authData) {
  logger.info('validateAppId ++');
  logger.info(appIds);
  logger.info(JSON.stringify(authData));
  return Promise.resolve();
}

module.exports = {
  validateAppId: validateAppId,
  validateAuthData: validateAuthData,
};
