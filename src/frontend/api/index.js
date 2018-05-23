import client from './client';
import rootQuery from './query/root';
import mutateItem from './mutations/item';

const query = (q, variables = {}) =>
    client.query({
        query: q,
        variables
    });

export const getRootFolders = () => query(rootQuery);

export const saveItem = obj => {
    return client.mutate({
        mutation: mutateItem,
        variables: obj
    });
};
