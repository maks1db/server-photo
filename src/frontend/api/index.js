import client from './client';
import rootQuery from './query/root';
import itemsQuery from './query/items';
import mutateItem from './mutations/item';

const query = (q, variables = {}) =>
    client.query({
        query: q,
        variables
    });

export const getRootFolders = () => query(rootQuery);
export const getItems = folder => query(itemsQuery, { folder });

export const saveItem = obj => {
    return client.mutate({
        mutation: mutateItem,
        variables: obj
    });
};
