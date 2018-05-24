import gql from 'graphql-tag';

export default gql`
    query items($folder: String) {
        items(folder: $folder) {
            name
            path
            dateCreate
            size
            itFolder
        }
    }
`;
