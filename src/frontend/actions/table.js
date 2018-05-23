import tableConst from '../constants/table';
import { getItems as getItemsApi } from '../api';

export const getItems = (type, pagination) => async dispatch => {
    dispatch({ type: tableConst.ITEMS_REQUEST });

    const result = await getItemsApi(
        type,
        pagination.rowsPerPage,
        (pagination.page - 1) * pagination.rowsPerPage
    );

    dispatch({
        type: tableConst.ITEMS_RECEIVE,
        payload: result.data.items
    });
};

export const clearItems = () => ({
    type: tableConst.ITEMS_CLEAR
});

export const changePagination = (key, value) => ({
    type: tableConst.CHANGE_PAGINATION,
    payload: { key, value }
});
