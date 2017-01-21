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
      senators: {
        type: new GraphQLList(senatorType),
        args: {
          zipcode: { type: GraphQLString }
        },
        resolve: (__, args) => {
          return args.zipcode ? new Promise((resolve, reject) => {
            rp({
              method: "POST",
              uri: "https://heroku-postgres-7720c2d1.herokuapp.com/find_senator",
              body: { zipcode: args.zipcode },
              json: true
            })
            .catch(error => {
              reject(error)
            })
            .then(data => {
              console.log({data});
              resolve(data.results);
            })
          }) : null;
        }
      },
      congresspeople: {
        type: new GraphQLList(congresspersonType),
        args: {
          zipcode: { type: GraphQLString }
        },
        resolve: (__, args) => {
          return args.zipcode ? new Promise((resolve, reject) => {
            rp({
              method: "POST",
              uri: "https://heroku-postgres-7720c2d1.herokuapp.com/find_congressperson",
              body: { zipcode: args.zipcode },
              json: true
            })
            .catch(error => {
              reject(error)
            })
            .then(data => {
              resolve(data.results);
            })
          }) : null;
        }
      },
      user: {
        type: new GraphQLList(userType),
        args: {
          email: { type: GraphQLString },
          password: { type: GraphQLString },
          first_name: { type: GraphQLString },
          last_name: { type: GraphQLString },
          street: { type: GraphQLString },
          zip_code: { type: GraphQLString },
          gender: {type: GraphQLString },
          DOB: {type: GraphQLString }
        },
        resolve: (__, args) => {
          return args.email && args.password && args.street && args.zip_code && args.gender && args.dob ? new Promise((resolve, reject) => {
            rp({
              method: "POST",
              uri: "https://heroku-postgres-7720c2d1.herokuapp.com/new_user",
              body: { email: args.email,
                      password: args.password,
                      first_name: args.first_name,
                      last_name: args.last_name,
                      street: args.street,
                      zip_code: args.zip_code,
                      gender: args.gender,
                      dob: args.dob
                    },
              json: true
            })
            .catch(error => {
              reject(error)
            })
            .then(data => {
              resolve(data.results);
            })
          }) : null;
        }
      }
    }),
    interfaces: [nodeDefs.nodeInterface]
  })

  let senatorType = new GraphQLObjectType({
    name: "Senator",
    fields: () => ({
      name: { type: GraphQLString, resolve: senator => `${senator.first_name} ${senator.last_name}` },
      bioID: {type: GraphQLString, resolve: senator => senator.bioguide_id }
    })
  })

 let congresspersonType = new GraphQLObjectType({
    name: "Congressperson",
    fields: () => ({
      name: { type: GraphQLString, resolve: congressperson => congressperson.name },
      bioID: { type: GraphQLString, resolve: congressperson => congressperson.bioguide_id }
    })
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
