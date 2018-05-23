import appConst from '../constants/app';
import { getRootFolders } from '../api';

export const init = () => async dispatch => {
    dispatch({
        type: appConst.ROOT_REQUEST
    });

    const result = await getRootFolders();
    console.log(result);

    dispatch({
        type: appConst.ROOT_RECEIVE,
        payload: result.data.rootFolders
    });
};
