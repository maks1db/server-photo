import gql from 'graphql-tag';

export default gql`
    mutation renameItem($file: String, $name: String) {
        renameItem(file: $file, name: $name) {
            name
            path
            dateCreate
            size
            itFolder
        }
    }
`;
