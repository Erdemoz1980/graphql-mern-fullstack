import { clients, projects } from '../sampleData.js';
import {
  GraphQLString,
  GraphQLID,
  GraphQLObjectType,
  GraphQLList,
  GraphQLSchema
} from 'graphql';

//Client Type
const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString }
  })
});



const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return clients.find(client => client.id === args.id)
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: RootQuery
});

export default schema;

