import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import {
  connectionDefinitions,
  connectionArgs,
  connectionFromPromisedArray,
  mutationWithClientMutationId,
  globalIdField,
  fromGlobalId,
  nodeDefinitions
} from 'graphql-relay';

import rp from 'request-promise';


let schema = (db) => {
  class Data {};
  let data = new Data();

  let nodeDefs = nodeDefinitions(
    (globalId) => {
      let {type} = fromGlobalId(globalId);
      if (type === 'Data') {
        return data;
      }
      return null;
    },
    (obj) => {
      if (obj instanceof Data) {
        return dataSchema;
      }
      return null;
    }
  );

  let dataSchema = new GraphQLObjectType({
    name: "Data",
    fields: () => ({
      id: globalIdField("Data"),
      user: {
        type: new GraphQLList(userType),
        args: {
          email: { type: GraphQLString },
          password: { type: GraphQLString }
        },
        resolve: (__, args) => {
          return args.email && args.password ? new Promise((resolve, reject) => {
            rp({
              method: "POST",
              uri: "https://heroku-postgres-7720c2d1.herokuapp.com/login",
              body: { 
                      email: args.email,
                      password: args.password
                    },
              json: true
            })
            .catch(error => {
              reject(error)
            })
            .then(data => {
              resolve(data.results);
              console.log(data.results);
            })
          }) : null;
        }
      }
    }),
    interfaces: [nodeDefs.nodeInterface]
  })

  let userType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
      email: { type: GraphQLString, resolve: user => user.email },
      password: { type: GraphQLString, resolve: user => user.password },
      first_name: { type: GraphQLString, resolve: user => user.first_name },
      last_name: { type: GraphQLString, resolve: user => user.last_name },
      street: { type: GraphQLString, resolve: user => user.street },
      zip_code: { type: GraphQLString, resolve: user => user.zipcode },
      gender: { type: GraphQLString, resolve: user => user.gender },
      dob: { type: GraphQLString, resolve: user => user.dob }
    })
  })


  let QueryType = new GraphQLObjectType({
    name: "Query",
    fields: () => ({
      node: nodeDefs.nodeField,
      data: {
        type: dataSchema,
        resolve: () => data
      },
    })
  });

  return new GraphQLSchema({
    query: QueryType
  });
}

export default schema;
