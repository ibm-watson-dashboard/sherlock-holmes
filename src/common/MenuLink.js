import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MenuLink extends Component {

    render() {
      return (<Link {...this.props} style={{textDecoration: 'none', color: 'black'}}>{this.props.label}</Link>)
    }

}

export default MenuLink;