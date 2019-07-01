module.exports = `
  type Query {
    users(first: Int!): UserConnection
    me: User
  }

  type UserConnection {
    edges: [UserEdge!]!,
    pageInfo: PageInfo!
  }

  type UserEdge {
    node: User!
    cursor: String!
  }

  type User {
    id: String
    name: String
    email: String
  }

  type Mutation {
    login(idToken: String!, email: String!, name: String!): String!
  }
`;
