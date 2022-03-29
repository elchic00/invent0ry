// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Locations, Business, Items } = initSchema(schema);

export {
  Locations,
  Business,
  Items
};