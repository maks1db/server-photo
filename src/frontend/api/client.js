/*global process */
import ApolloClient from 'apollo-boost';

let API_PREFIX = '';
if (process.env.DEV) {
    API_PREFIX = 'http://localhost:4100';
}

const client = new ApolloClient({
    uri: `${API_PREFIX}/graphql`
});

export default client;
