import appConst from '../constants/app';
import itemConst from '../constants/item';
import { toastr } from 'react-redux-toastr';
import {
    getRootFolders,
    getItems as getItemsApi,
    copyItems as copyItemsApi,
    createFolder as createFolderApi,
    renameItem as renameItemApi,
    deleteItem as deleteItemApi,
    moveItems as moveItemsApi
} from '../api';

export const init = () => async dispatch => {
    dispatch({
        type: appConst.ROOT_REQUEST
    });

    const result = await getRootFolders();

    dispatch({
        type: appConst.ROOT_RECEIVE,
        payload: result.data.rootFolders
    });
};

export const getItems = (previewName, folder) => async dispatch => {
    dispatch({
        type: appConst.ITEMS_REQUEST
    });

    const result = await getItemsApi(folder);

    dispatch({
        type: appConst.ITEMS_RECEIVE,
        payload: {
            previewName,
            folder,
            items: result.data.items
        }
    });
};

export const goRoot = previewName => ({
    type: appConst.GO_ROOT,
    payload: previewName
});

export const copyItems = (files, folder) => async dispatch => {
    await copyItemsApi(files, folder);
    toastr.success('Копирование', 'Копирование файлов завершено');
    dispatch(getItems('edit', folder));
    dispatch({
        type: itemConst.DISABLE_SELECT,
        payload: 'view'
    });
};

export const moveItems = (files, folder) => async dispatch => {
    await moveItemsApi(files, folder);
    toastr.success('Перемещение', 'Перемещение файлов завершено');

    dispatch(getItems('edit', folder));
    dispatch({
        type: appConst.ITEMS_MOVE,
        payload: files
    });
};

export const deleteItem = file => async dispatch => {
    await deleteItemApi(file);
    toastr.success('Удаление', 'Файл успешно удален');
    dispatch({
        type: appConst.ITEM_DELETE,
        payload: file
    });
};

export const createFolder = (folder, name) => async dispatch => {
    const result = await createFolderApi(folder, name);

    if (result.name === null) {
        toastr.error('Ошибка', 'Папка с таким именем уже существует');
    } else {
        toastr.success('Создание', `Новая папка "${name}" создана`);
        dispatch({
            type: appConst.FOLDER_CREATE,
            payload: result.data.createFolder
        });
    }
};

export const renameItem = (file, name, oldName) => async dispatch => {
    const result = await renameItemApi(file, name);
    if (result.name === null) {
        toastr.error('Ошибка', 'Не удалось переименовать файл');
    } else {
        toastr.success('Успешно', 'Файл переименован');
        dispatch({
            type: appConst.ITEM_RENAME,
            payload: {
                oldName,
                newFile: result.data.renameItem
            }
        });
    }
};
