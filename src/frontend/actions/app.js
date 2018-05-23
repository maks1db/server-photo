import appConst from '../constants/app';

export const setTitle = title => ({
    type: appConst.SET_TITLE,
    payload: title
});
