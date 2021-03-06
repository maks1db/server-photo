import client from './client';
import rootQuery from './query/root';
import itemsQuery from './query/items';
import mutateCopyItems from './mutations/copyItems';
import mutateCreateFolder from './mutations/createFolder';
import mutateRenameItem from './mutations/renameItem';
import mutateMoveItems from './mutations/moveItems';
import mutateDeleteItem from './mutations/deleteItem';

const query = (q, variables = {}) =>
    client.query({
        query: q,
        variables,
        fetchPolicy: 'no-cache'
    });

const mutation = (m, variables = {}) =>
    client.mutate({
        mutation: m,
        variables,
        fetchPolicy: 'no-cache'
    });

export const getRootFolders = () => query(rootQuery);
export const getItems = folder => query(itemsQuery, { folder });

export const copyItems = (files, folder) =>
    mutation(mutateCopyItems, { files, folder });

export const createFolder = (folder, name) =>
    mutation(mutateCreateFolder, { folder, name });

export const renameItem = (file, name) =>
    mutation(mutateRenameItem, { file, name });

export const moveItems = (files, folder) =>
    mutation(mutateMoveItems, { files, folder });

export const deleteItem = file => mutation(mutateDeleteItem, { file });
