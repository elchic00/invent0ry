// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Account, Items, Locations, Business } = initSchema(schema);

export {
  Account,
  Items,
  Locations,
  Business
};