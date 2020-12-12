import * as actionTypes from './actionTypes';

export const addIngredient = (ingredientName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    igName: ingredientName
  }
}
export const removeIngredient = (ingredientName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    igName: ingredientName
  }
}