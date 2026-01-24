export const typeDefs = `#graphql
  scalar DateTime

  type SportsArticle {
    id: ID!
    title: String!
    content: String!
    imageUrl: String
    createdAt: DateTime
    deletedAt: DateTime
  }

  input ArticleInput {
    title: String!
    content: String!
    imageUrl: String
  }

  type Query {
    articles(limit: Int, offset: Int): [SportsArticle!]!
    article(id: ID!): SportsArticle
  }

  type Mutation {
    createArticle(input: ArticleInput!): SportsArticle!
    updateArticle(id: ID!, input: ArticleInput!): SportsArticle!
    deleteArticle(id: ID!): Boolean!
  }
`;
