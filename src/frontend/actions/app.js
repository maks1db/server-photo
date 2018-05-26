import appConst from '../constants/app';
import { toastr } from 'react-redux-toastr';
import {
    getRootFolders,
    getItems as getItemsApi,
    copyItems as copyItemsApi,
    createFolder as createFolderApi,
    renameItem as renameItemApi
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

export const getItems = (itemName, folder) => async dispatch => {
    dispatch({
        type: appConst.ITEMS_REQUEST
    });

    const result = await getItemsApi(folder);

    dispatch({
        type: appConst.ITEMS_RECEIVE,
        payload: {
            itemName,
            folder,
            items: result.data.items
        }
    });
};

export const goRoot = itemName => ({
    type: appConst.GO_ROOT,
    payload: itemName
});

export const copyItems = (files, folder) => async dispatch => {
    await copyItemsApi(files, folder);
    toastr.success('Копирование', 'Копирование файлов завершено');
    dispatch(getItems('edit', folder));
};

export const createFolder = (folder, name) => async dispatch => {
    const result = await createFolderApi(folder, name);

    if (result.name === null) {
        toastr.error('Ошибка', 'Папка с таким именем уже существует');
    } else {
        toastr.error('Создание', `Новая папка "${name}" создана`);
        dispatch({
            type: appConst.FOLDER_CREATE,
            payload: result
        });
    }
};

export const renameItem = (file, name) => async dispatch => {
    const result = await renameItemApi(file, name);
    if (result.name === null) {
        toastr.error('Ошибка', 'Не удалось переименовать файл');
    } else {
        toastr.error('Успешно', 'Файл переименован');
        dispatch({
            type: appConst.FOLDER_CREATE,
            payload: {
                oldName: name,
                newFile: result
            }
        });
    }
};
