import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';


class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
    checkingOut: false
  }

  componentDidMount() {
    console.log(this.props);
    const ingredients = {};
    let price = 0;
    const query = new URLSearchParams(this.props.location.search);
    for (let param of query.entries()) {
      if (param[0] === 'price') {
        price = (+param[1]).toFixed(2);
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients: ingredients, totalPrice: price });
  }

  // componentDidMount() {
  //   console.log(this.props);
  // }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
    this.setState(prevState => {
      return { checkingOut: !prevState.checkingOut }
    })
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler} />
        <Route
          path={this.props.match.url + '/contact-data'}
          render={// this.state.checkingOut ?
            ((props) => (
              <ContactData
                ingredients={this.state.ingredients}
                totalPrice={this.state.totalPrice}
                {...props}
              />
            ))// : null
          } />
      </div>
    );
  }
}

export default Checkout;