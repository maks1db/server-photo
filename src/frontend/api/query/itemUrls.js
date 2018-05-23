import gql from 'graphql-tag';

export default itemId => gql`
    query{
    itemUrls(itemId:${itemId}){
      url,
      discount
    }
  }
`;
