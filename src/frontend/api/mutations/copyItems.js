import gql from 'graphql-tag';

export default gql`
    mutation copyItems($files: [String], $folder: String) {
        copyItems(files: $files, folder: $folder) {
            name
            path
            dateCreate
            size
            itFolder
        }
    }
`;
