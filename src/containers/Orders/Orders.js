import React, { Component } from 'react';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Aux from '../../hoc/Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
    error: false,
  }

  componentDidMount() {

    axios.get('/orders.json')
      .then(response => {
        // console.log(response.data);
        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({
            ...response.data[key],
            id: key
          })
        }
        // console.log(fetchedOrders);
        this.setState({ loading: false, orders: fetchedOrders, error: false })
        // console.log(this.state.orders)
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: false, error: true  })
      })
  }

  errorConfirmedHandler = () => {
    this.setState({ loading: false, error: false })
  }

  render() {
    return (
      <Aux>
        <Modal
          show={this.state.error}
          modalClosed={this.errorConfirmedHandler}
        >{this.state.error ? <p style={{ margin: '0' }} >Error!</p> : null}
        </Modal>

        {this.state.orders.map(order => (
          <Order key={order.id}
            ingredients={order.ingredients}
            price={+order.price} />
        ))}

      </Aux>
    );
  }
}

export default withErrorHandler(Orders, axios);