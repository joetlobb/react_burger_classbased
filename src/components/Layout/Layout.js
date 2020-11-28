import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  SideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false })
  }

  sideDrawerToggleHandler = () => {
    // this.setState({ showSideDrawer: !this.state.showSideDrawer }) // this approach
    // may lead to unexpect outcome
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    })
  }

  render() {
    return (
      <Aux>
        <Toolbar
          drawerToggleClicked={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          closed={this.SideDrawerClosedHandler}
          open={this.state.showSideDrawer}
        />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }


}
export default Layout;