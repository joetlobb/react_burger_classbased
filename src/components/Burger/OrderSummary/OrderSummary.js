import React from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
      return <li key={igKey + props.ingredients[igKey]}>
        <span
          style={{ textTransform: 'capitalize' }}
        >{igKey}
        </span>: {props.ingredients[igKey]}</li>
    });

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>Burger with the following ingredients</p>
      <ul>
        {ingredientSummary}
      </ul>
  <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger"
        clicked={props.purchaseCancel}
      >CANCEL</Button>
      <Button btnType="Success"
        clicked={props.purchaseContinue}
      >CONTINUE</Button>
    </Aux>
  )
}

export default orderSummary;