import React, { Component } from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  // for optimizing purpose
  componentDidMount() {
    // console.log(this.props);
  }

  componentDidUpdate() {
    console.log('[OrderSummary.js] componentDidUpdate');
  };

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map(igKey => {
        return <li key={igKey + this.props.ingredients[igKey]}>
          <span
            style={{ textTransform: 'capitalize' }}
          >{igKey}
          </span>: {this.props.ingredients[igKey]}</li>
      });

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>Burger with the following ingredients</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger"
          clicked={this.props.purchaseCancel}
        >CANCEL</Button>
          <Button btnType="Success"
            clicked={this.props.purchaseContinue}
          >CONTINUE</Button>
      </Aux>
    )
  }
}

export default OrderSummary;