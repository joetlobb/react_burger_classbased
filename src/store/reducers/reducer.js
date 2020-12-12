import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 4
};


const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.igName]: state.ingredients[action.igName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.igName]
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.igName]: state.ingredients[action.igName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.igName]
      };
    default:
      return state;
  };
};

export default reducer;