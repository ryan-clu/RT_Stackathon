const Project = require("../models/Project");
const Client = require("../models/Client");

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLEnumType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
} = require("graphql");

// Client Type GraphQL
const ClientType = new GraphQLObjectType({
  name: "Client",
  description: "GraphQL Client type.",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

// Project Type GraphQL
const ProjectType = new GraphQLObjectType({
  name: "Project",
  description: "GraphQL Project type.",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve: (parent, args) => {
        return Client.findById(parent.clientId);
      },
    },
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "Root_Query",
  description: "Root query.",
  fields: () => ({
    projects: {
      type: new GraphQLList(ProjectType),
      description: "Query to return all projects.",
      resolve: (parent, args) => {
        return Project.find();
      },
    },
    project: {
      type: ProjectType,
      description: "Query to return single project by id.",
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return Project.findById(args.id);
      },
    },
    clients: {
      type: new GraphQLList(ClientType),
      description: "Query to return all clients.",
      resolve: (parent, args) => {
        return Client.find();
      },
    },
    client: {
      type: ClientType,
      description: "Query to return single client by id.",
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return Client.findById(args.id);
      },
    },
  }),
});

// Mutations
const RootMutation = new GraphQLObjectType({
  name: "Root_Mutation",
  description: "Root mutation.",
  fields: () => ({
    // Add a Client
    addClient: {
      type: ClientType,
      description: "Add a new client.",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });

        return client.save();
        // Client.create();
      },
    },
    // Delete a Client
    deleteClient: {
      type: ClientType,
      description: "Delete a client by id.",
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: (parent, args) => {
        Project.find({ clientId: args.id}).then((projects) => {
          projects.forEach(project => {
            project.remove();
          })
        })

        return Client.findByIdAndRemove(args.id);
      },
    },
    // Add a Project
    addProject: {
      type: ProjectType,
      description: "Add a new project.",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
          defaultValue: "Not Started",
        },
        clientId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: (parent, args) => {
        const proj = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        });

        return proj.save();
      },
    },
    // Delete a Project
    deleteProject: {
      type: ProjectType,
      description: "Delete a project by id.",
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: (parent, args) => {
        return Project.findByIdAndRemove(args.id);
      },
    },
    // Update a Project
    updateProject: {
      type: ProjectType,
      description: "Update a project by id.",
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatusUpdate",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
        },
      },
      resolve: (parent, args) => {
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
            },
          },
					// if not there, then set new project
          { new: true }
        );
      },
    },
  }),
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
