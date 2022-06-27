import { gql } from "@apollo/client";

const GET_PROJECTS = gql`
  query getProjects {
    projects {
      id
      name
      description
      status
    }
  }
`;

export { GET_PROJECTS };

/*

query getProjects {
    projects {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }

*/