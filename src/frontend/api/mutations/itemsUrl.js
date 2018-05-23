import gql from 'graphql-tag';

export default gql`
    mutation itemUrl(
        $itMain: Boolean
        $url: String
        $itemId: Int
        $discount: Int
        $id: Int
    ) {
        itemUrl(
            itMain: $itMain
            url: $url
            itemId: $itemId
            discount: $discount
            id: $id
        ) {
            id
        }
    }
`;
