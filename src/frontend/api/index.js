import client from './client';
import queryItems from './query/items';
import queryItem from './query/item';
import queryItemUrls from './query/itemUrls';
import mutateItem from './mutations/item';

const toQueryObj = query => ({ query });

export const getItems = (type, limit, offset) => {
    return client.query({
        query: queryItems,
        variables: { type, limit, offset }
    });
};

export const getItem = id =>
    client.query({
        query: queryItem,
        variables: { id }
    });

export const getItemUrl = itemId => {
    return itemId |> queryItemUrls |> toQueryObj |> client.query;
};

export const saveItem = obj => {
    return client.mutate({
        mutation: mutateItem,
        variables: obj
    });
};
