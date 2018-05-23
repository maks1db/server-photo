import gql from 'graphql-tag';

export default gql`
    mutation(
        $id: Int
        $title: String
        $itemType: String
        $orderNumber: Int
        $description: String
        $myPrice: Int
        $myPriceHot: Int
        $active: Boolean
    ) {
        item(
            id: $id
            title: $title
            itemType: $itemType
            orderNumber: $orderNumber
            description: $description
            myPrice: $myPrice
            myPriceHot: $myPriceHot
            active: $active
        ) {
            id
        }
    }
`;
