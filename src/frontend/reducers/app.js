import appConst from '../constants/app';
import itemConst from '../constants/item';
import sortBy from 'sort-by';

const R = require('ramda');
const initialState = {
    root: [],
    viewItems: [],
    editItems: [],
    viewFolder: '',
    editFolder: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
    case appConst.ROOT_RECEIVE:
        //set in root and items
        return (
            { ...state, root: action.payload }
                |> R.assoc('viewItems', action.payload)
                |> R.assoc('editItems', action.payload)
        );
    case itemConst.SELECT_ITEM:
        return (
            state[action.payload.items].map(x =>
                R.assoc(
                    'selected',
                    x.name === action.payload.name && x.selected
                        ? false
                        : x.selected
                            ? true
                            : x.name === action.payload.name,
                    x
                )
            ) |> R.assoc(action.payload.items, R.__, state)
        );

    case appConst.ITEMS_RECEIVE:
        return (
            R.assoc(
                `${action.payload.previewName}Folder`,
                action.payload.folder,
                state
            )
                |> R.assoc(
                    `${action.payload.previewName}Items`,
                    action.payload.items
                )
        );
    case appConst.GO_ROOT:
        return (
            R.assoc(`${action.payload}Items`, state.root, state)
                |> R.assoc(`${action.payload}Folder`, '')
        );
    case itemConst.DISABLE_SELECT:
        return R.assoc(
            `${action.payload}Items`,
            state[`${action.payload}Items`].map(x =>
                R.assoc('selected', false, x)
            ),
            state
        );
    case appConst.FOLDER_CREATE:
        return R.assoc(
            'editItems',
            R.append(action.payload, state.editItems)
                    |> (_ => _.sort(sortBy('-itFolder', 'name'))),
            state
        );
    case appConst.ITEMS_MOVE:
        return {
            ...state,
            viewItems: state.viewItems.filter(
                x => action.payload.find(p => p === x.path) === undefined
            )
        };
    case appConst.ITEM_DELETE:
        return {
            ...state,
            editItems: state.editItems.filter(
                x => x.path !== action.payload
            )
        };
    case appConst.ITEM_RENAME:
        return {
            ...state,
            editItems:
                    state.editItems.map(
                        x =>
                            x.name.split('.')[0] === action.payload.oldName
                                ? R.assoc(
                                    'selected',
                                    true,
                                    action.payload.newFile
                                )
                                : x
                    ) |> (_ => _.sort(sortBy('-itFolder', 'name')))
        };
    }

    return state;
};
