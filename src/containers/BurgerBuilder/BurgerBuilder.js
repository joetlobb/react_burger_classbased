import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {...}
  // }

  state = {
    // ingredients: null,
    // totalPrice: 4,
    // purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    // axios.get('https://react-burger-builder-1fc0e.firebaseio.com/ingredients.json')
    //   .then(response => {
    //     this.setState({ ingredients: response.data })
    //     const currentIg = {...this.state.ingredients};
    //     this.updatePurchaseState(currentIg);
    //   }).catch(error => {
    //     this.setState({ error: true })
    //   })
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  // addIngredientHandler = (type) => {
  //   const oldIgCount = this.state.ingredients[type];
  //   const updatedIgCount = oldIgCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedIgCount;
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   this.setState({
  //     totalPrice: newPrice,
  //     ingredients: updatedIngredients
  //   });
  //   this.updatePurchaseState(updatedIngredients);
  // }

  // removeIngredientHandler = (type) => {
  //   const oldIgCount = this.state.ingredients[type];
  //   if (oldIgCount <= 0) {
  //     return;
  //   }
  //   const updatedIgCount = oldIgCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedIgCount;
  //   const priceDeduction = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;
  //   this.setState({
  //     totalPrice: newPrice,
  //     ingredients: updatedIngredients
  //   });
  //   this.updatePurchaseState(updatedIngredients);
  // }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
    // this.props.history.
  }

  purchaseContinueHandler = () => {
    // alert('You continue!!!');
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    }
    queryParams.push('price=' + this.state.totalPrice);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  }

  render() {
    const disabledInfo = {
      // ...this.state.ingredients
      ...this.props.ings
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    } // {'salad': true, 'bacon': false, ...}

    let orderSummary = null;
    let burger = this.state.error ?
      <p style={{ textAlign: 'center' }}>
        Ingredients can't be loaded!</p> : <Spinner />;
    // if (this.state.ingredients) {
    if (this.props.ings) {
      burger =
        <Aux>
          {/* <Burger ingredients={this.state.ingredients} /> */}
          <Burger ingredients={this.props.ings} />
          <BuildControls
            // ingredientAdded={this.addIngredientHandler}
            ingredientAdded={this.props.onIngredientAdded}
            // ingredientRemoved={this.removeIngredientHandler}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            price={this.props.price}
          />
        </Aux>;
      orderSummary =
        <OrderSummary
        // ingredients={this.state.ingredients}
          ingredients={this.props.ings}
          price={this.props.price}
          purchaseCancel={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
        />;
    }

    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredientName) => dispatch({
      type: actionTypes.ADD_INGREDIENT,
      igName: ingredientName
    }),
    onIngredientRemoved: (ingredientName) => dispatch({
      type: actionTypes.REMOVE_INGREDIENT,
      igName: ingredientName
    }),
  }
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));