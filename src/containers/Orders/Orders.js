import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Aux from '../../hoc/Aux/Aux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  errorConfirmedHandler = () => {
    this.setState({ loading: false, error: false })
  }

  render() {
    let orders = <Spinner />
    if (!this.props.loading) {
      orders = this.props.orders.map(order => (
        <Order key={order.id}
          ingredients={order.ingredients}
          price={+order.price} />
      ))
    }
    return (
      <Aux>
        {/* <Modal
          show={this.state.error}
          modalClosed={this.errorConfirmedHandler}
        >{this.props.error ? <p style={{ margin: '0' }} >Error!</p> : null}
        </Modal> */}
        {orders}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));