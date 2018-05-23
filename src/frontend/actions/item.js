import { toastr } from 'react-redux-toastr';
import { saveItem as saveItemApi, getItem as getItemApi } from '../api';
import itemConst from '../constants/item';

export const getItem = id => async dispatch => {
    dispatch({ type: itemConst.ITEM_REQUEST });
    const result = await getItemApi(id);

    dispatch({
        type: itemConst.ITEM_RECEIVE,
        payload: result.data.item
    });

    return result;
};

export const saveItem = obj => async dispatch => {
    dispatch({ type: itemConst.SAVE_REQUEST });
    const result = await saveItemApi(obj);

    toastr.success('Элемент записан в базу данных...');
    dispatch({
        type: itemConst.SAVE_COMPLETE,
        payload: result.data.item
    });
    return result;
};
