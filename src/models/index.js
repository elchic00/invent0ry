// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Categories, Items, Locations, Business } = initSchema(schema);

export {
  Categories,
  Items,
  Locations,
  Business
};