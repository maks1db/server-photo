import appConst from '../constants/app';
const R = require('ramda');
const initialState = {
    root: [],
    items: []
};

export default (state = initialState, action) => {
    switch (action.type) {
    case appConst.ROOT_RECEIVE:
        //set in root and items
        return (
            { ...state, root: action.payload }
                |> R.assoc('items', action.payload)
        );
    }

    return state;
};
