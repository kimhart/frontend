import config from '../config/config';
import Schema from '../graphql/schema'
import SchemaExporter from './SchemaExporter';
SchemaExporter(Schema(config));
