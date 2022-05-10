// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Category, Locations, Items, Business } = initSchema(schema);

export {
  Category,
  Locations,
  Items,
  Business
};