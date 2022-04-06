// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Locations, Items, Business } = initSchema(schema);

export {
  Locations,
  Items,
  Business
};