import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {
  // state = {
  //   ingredients: null,
  //   totalPrice: 0,
  //   checkingOut: false
  // }

  // componentDidMount() {
  //   // console.log(this.props);
  //   const ingredients = {};
  //   let price = 0;
  //   const query = new URLSearchParams(this.props.location.search);
  //   for (let param of query.entries()) {
  //     if (param[0] === 'price') {
  //       price = param[1];
  //     } else {
  //       ingredients[param[0]] = +param[1];
  //     }
  //   }
  //   this.setState({ ingredients: ingredients, totalPrice: price });
  // }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
    // this.setState(prevState => {
    //   return { checkingOut: !prevState.checkingOut }
    // })
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ings}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler} />
        <Route
          path={this.props.match.url + '/contact-data'}
          component={ContactData}
          // render={(props) => (
          //   <ContactData
          //     ingredients={this.props.ings}
          //     totalPrice={this.props.price}
          //     {...props}
          //   />)}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients
  };
};

export default connect(mapStateToProps)(Checkout);