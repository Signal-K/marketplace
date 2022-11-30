import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

// Connecting to Lens API
const API_URL = 'https://api.lens.dev';

export const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
});

// Fetch list of lens profiles -> Let's set this up to only fetch users in our DAO
export const exploreProfiles = gql`
  query ExploreProfiles {
    exploreProfiles(request: { sortCriteria: MOST_FOLLOWERS }) {
      items {
        id
        name
        bio
        handle
        picture {
          ... on MediaSet {
            original {
              url
            }
          }
        }
        stats {
          totalFollowers
        }
      }
    }
  }
`;

// Fetch data from a specific profile
export const getProfile = gql`
  query Profile($handle: Handle!) {
    profile(request: { handle: $Handle }) {
      id
      name
      bio
      picture {
        ...on MediaSet {
          original {
            url
          }
        }
      }
      handle
    }
  }
`;

// Fetch specific profile publications/posts
export const getPublications = gql`
  query Publications($id: ProfileId!, $limit: LimitScalar) {
    publications(
      request: { profileId: $id, publicationTypes: [POST], limit: $limit }
    ) {
      items {
        __typename
        ... on Post {
          ...PostFields
        }
      }
    }
  }
  fragment PostFields on Post {
    id
    metadata {
      ...MetadataOutputFields
    }
  }
  fragment MetadataOutputFields on MetadataOutput {
    content
  }
`;