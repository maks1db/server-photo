import gql from 'graphql-tag';

export default gql`
    mutation moveItems($files: [String], $folder: String) {
        moveItems(files: $files, folder: $folder) {
            name
            path
            dateCreate
            size
            itFolder
        }
    }
`;
