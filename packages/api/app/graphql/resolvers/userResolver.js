const UserService = require("@app/services/UserService");

const userService = new UserService();

module.exports = {
  User: {
    id: user => user.id,
    name: user => user.name,
    email: user => user.email
  },

  UserConnection: {
    edges: parent => parent.results,
    pageInfo: parent => ({
      hasPreviousPage: parent.cursors.hasPrevious,
      hasNextPage: parent.cursors.hasNext
    })
  },

  UserEdge: {
    node: parent => parent,
    cursor: parent => Buffer.from(`${parent.id}`).toString("base64")
  },

  Query: {
    users: async (parent, { first }, { db }) => {
      return await db.User.paginate({ limit: first });
    },

    me: async (parent, args, { db, userId }) => {
      if (userId) {
        return await db.User.findByPk(userId);
      }

      return null;
    }
  },

  Mutation: {
    login: async (parent, args, { req }) => {
      const token = await userService.login(args);

      return token;
    }
  }
};
