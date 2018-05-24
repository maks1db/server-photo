import itemConst from '../constants/item';

export const selectItem = (items, name) => ({
    type: itemConst.SELECT_ITEM,
    payload: { items, name }
});
