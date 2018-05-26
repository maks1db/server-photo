import gql from 'graphql-tag';

export default gql`
    mutation renameItem($file: String, $name: String) {
        renameItem(file: "", name: "") {
            name
            path
            dateCreate
            size
            itFolder
        }
    }
`;
