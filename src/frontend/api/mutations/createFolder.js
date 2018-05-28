import gql from 'graphql-tag';

export default gql`
    mutation createFolder($folder: String, $name: String) {
        createFolder(folder: $folder, name: $name) {
            name
            path
            dateCreate
            size
            itFolder
        }
    }
`;
