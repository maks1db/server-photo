import appConst from '../constants/app';
const R = require('ramda');

const initialState = {
    title: ''
};

export default (state = initialState, action) => {
    const setValue = R.assoc(R.__, action.payload, state);

    switch (action.type) {
    case appConst.SET_TITLE:
        return setValue('title');
    }
    return state;
};
