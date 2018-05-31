import itemConst from '../constants/item';

export const selectItem = (items, name) => ({
    type: itemConst.SELECT_ITEM,
    payload: { items, name }
});

export const disableSelect = previewName => ({
    type: itemConst.DISABLE_SELECT,
    payload: previewName
});
