const config = require('../config/config');
const Schema = require('../graphql/schema');
const SchemaExporter = require('./SchemaExporter');
SchemaExporter(Schema(config));
