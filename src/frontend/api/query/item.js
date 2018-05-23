import gql from 'graphql-tag';

export default gql`
    query item($id: Int) {
        item(id: $id) {
            id
            title
            active
            itemType
            orderNumber
            owner
            description
            myPrice
            myPriceHot
            urlList {
                itMain
                url
                discount
            }
        }
    }
`;
