import Client from '../models/Client.js';
import Project from '../models/Project.js';
import {
  GraphQLID,
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLEnumType
} from 'graphql';
 

//Client Type
const ClientType = new GraphQLObjectType({
  name: 'ClientType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString }
  })
});

//Project Type
const ProjectType = new GraphQLObjectType({
  name: 'ProjectType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId)
      }
    }
  })
});

//Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Client.findById(args.id)
      }
    },
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return Client.find({});
      }
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find({});
      }
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id)
      }
    }
  }
});

//Mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    //Add a client
    addClient: {
      type: ClientType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone
        })
        return client.save();
      }
    },
    //Delete a client
    deleteClient: {
      type: ClientType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return Client.findByIdAndRemove(args.id)
      }
    },
    //Add a project
    addProject: {
      type: ProjectType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLID) },
        description: { type: new GraphQLNonNull(GraphQLID) },
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatus',
            values: {
              new: { value: 'Not Started' },
              progress: { value: 'In Progress' },
              completed: { value: 'Completed' }
            },
          }),
          defaultValue: 'Not Started'
        },
        clientId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        const project = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId
        });
        return project.save();
      }
    },
    //Delete a project
    deleteProject: {
      type: ProjectType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return Project.findByIdAndRemove(args.id)
      }
    },
    //Update a project
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatusUpdate',
            values: {
              new: { value: 'Not Started' },
              progress: { value: 'In Progress' },
              completed: { value: 'Completed' }
            }
          })
        }
      },
      resolve(parent, args) {
        return Project.findByIdAndUpdate(args.id, {
          $set: {
            name: args.name,
            description: args.description,
            status: args.status
          }
        }, {
          new: true
        });
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation
});

export default schema;