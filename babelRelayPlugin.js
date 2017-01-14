var getBabelRelayPlugin = require('babel-relay-plugin');
var schemaData = require('./graphql/schema.json').data;
module.exports = getBabelRelayPlugin(schemaData);
