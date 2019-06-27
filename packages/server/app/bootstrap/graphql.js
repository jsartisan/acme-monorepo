const path = require('path');
const _ = require('lodash');
const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas');
const { ApolloServer } = require('apollo-server-express');

/**
 * merge types and resolvers
 * @type {[type]}
 */
const types = fileLoader(path.join(__dirname, '../graphql/types'));
const typeDefs = mergeTypes(types);

const resolversArray = fileLoader(path.join(__dirname, './../graphql/resolvers'));
const db = require('@app/models');
const resolvers = mergeResolvers(resolversArray);
const UserService = require('@app/services/UserService');

const userService = new UserService();

/**
 * lift ups apollo server
 *
 * @return {[type]} [description]
 */
const boot = app => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const authorizationHeader = req.headers.authorization || '';
      const userId = userService.decodeJWT(authorizationHeader);

      return { req, db, userId };
    },
  });

  server.applyMiddleware({ app, path: '/graphql', cors: true });
};

module.exports = {
  boot,
};
