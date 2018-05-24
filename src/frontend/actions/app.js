import appConst from '../constants/app';

import { getRootFolders, getItems as getItemsApi } from '../api';

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

    console.log(result);

    dispatch({
        type: appConst.ITEMS_RECEIVE,
        payload: {
            itemName,
            folder,
            items: result.data.items   
        }
        
    });
};

