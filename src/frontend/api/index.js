import client from './client';
import rootQuery from './query/root';
import itemsQuery from './query/items';
import mutateCopyItems from './mutations/copyItems';
import mutateCreateFolder from './mutations/createFolder';
import mutateRenameItem from './mutations/renameItem';

const query = (q, variables = {}) =>
    client.query({
        query: q,
        variables
    });

const mutation = (m, variables = {}) =>
    client.mutate({
        mutation: m,
        variables
    });

export const getRootFolders = () => query(rootQuery);
export const getItems = folder => query(itemsQuery, { folder });

export const copyItems = (files, folder) =>
    mutation(mutateCopyItems, { files, folder });

export const createFolder = (folder, name) =>
    mutation(mutateCreateFolder, { folder, name });

export const renameItem = (file, name) =>
    mutation(mutateRenameItem, { file, name });
