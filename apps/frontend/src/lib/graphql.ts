import { gql } from '@apollo/client';

export const SPORTS_ARTICLE_FIELDS = gql`
  fragment SportsArticleFields on SportsArticle {
    id
    title
    content
    imageUrl
    createdAt
  }
`;

export const GET_ARTICLES = gql`
  query GetArticles($limit: Int, $offset: Int) {
    articles(limit: $limit, offset: $offset) {
      ...SportsArticleFields
    }
  }
  ${SPORTS_ARTICLE_FIELDS}
`;

export const GET_ARTICLE = gql`
  query GetArticle($id: ID!) {
    article(id: $id) {
      ...SportsArticleFields
    }
  }
  ${SPORTS_ARTICLE_FIELDS}
`;

export const DELETE_ARTICLE = gql`
  mutation DeleteArticle($id: ID!) {
    deleteArticle(id: $id)
  }
`;
