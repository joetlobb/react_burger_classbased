import React, { Component } from 'react';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
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
        this.setState({ loading: false, orders: fetchedOrders })
        // console.log(this.state.orders)
      })
      .catch(err => {
        this.setState({ loading: false })
      })
  }

  render() {
    return (
      <div>
      {this.state.orders.map(order => (
        <Order key={order.id}
        ingredients={order.ingredients}
        price={+order.price} />
      ))}
      </div>
    );
  }
}

export default Orders;