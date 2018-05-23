import gql from 'graphql-tag';

export default gql`
    query items($type: String, $limit: Int, $offset: Int) {
        items(itemType: $type, limit: $limit, offset: $offset) {
            id
            title
            img
            itemType
            orderNumber
            owner
            description
            myPrice
            myPriceHot
            active
            priceList {
                id
                date
                price
                itemUrl {
                    url
                    itMain
                    domain
                }
            }
            minPrice {
                id
                date
                price
                itemUrl {
                    url
                    domain
                }
            }
        }
    }
`;
