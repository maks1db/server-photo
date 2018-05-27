import gql from 'graphql-tag';

export default gql`
    mutation deleteItem($file: String) {
        deleteItem(file: $file) {
            name
            path
            dateCreate
            size
            itFolder
        }
    }
`;
