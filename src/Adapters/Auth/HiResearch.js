// Helper functions for accessing the Facebook Graph API.
// const httpRequest = require('./httpRequest');
const logger = require('../../logger').default;

// var Parse = require('parse/node').Parse;

// Returns a promise that fulfills iff this user id is valid.
function validateAuthData(authData) {
  logger.info('validateAuthData ++');
  logger.info(JSON.stringify(authData));
  return Promise.resolve();
}

// Returns a promise that fulfills iff this app id is valid.
function validateAppId(appIds, authData) {
  logger.info('validateAppId ++');
  logger.info(appIds);
  logger.info(JSON.stringify(authData));
  return Promise.resolve();
}

// A promisey wrapper for FB graph requests.
// function graphRequest(path) {
//   return httpRequest.get('https://graph.facebook.com/' + path);
// }

module.exports = {
  validateAppId: validateAppId,
  validateAuthData: validateAuthData,
};
