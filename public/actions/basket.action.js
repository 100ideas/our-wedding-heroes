import AppDispatcher from '../dispatchers/app.dispatcher.js';
import {ADD_TO_BASKET, REMOVE_FROM_BASKET} from '../constants/actionTypes.constants';

export default {
    addToBasket: (item, quantity) => {
        AppDispatcher.dispatch({
            actionType: ADD_TO_BASKET,
            item,
            quantity,
        });
    },

    removeFromBasket: (item) => {
        AppDispatcher.dispatch({
            actionType: REMOVE_FROM_BASKET,
            item,
        });
    },
};
