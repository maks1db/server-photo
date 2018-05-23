import appConst from '../constants/app';
import itemConst from '../constants/item';
import { change } from 'redux-form';

const init = store => next => action => {
    if (action.type === appConst.SET_TITLE) {
        document.title = action.payload;
    }

    //load item in redux form
    if (action.type === itemConst.ITEM_RECEIVE) {
        Object.keys(action.payload).forEach(x => {
            if (x === 'urlList') {
                change(
                    'entity',
                    x,
                    action.payload[x]
                        .reduce((accum, item) => {
                            return accum + `${item.url}\r\n`;
                        }, '')
                        .trim()
                ) |> store.dispatch;
            } else {
                change('entity', x, action.payload[x]) |> store.dispatch;
            }
        });
    }

    next(action);
};

export default init;
