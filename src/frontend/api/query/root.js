import gql from 'graphql-tag';

export default gql`
    query {
        rootFolders {
            name
            path
            dateCreate
            itFolder
        }
    }
`;
