import React, { Component } from 'react';
import { ACCESS_TOKEN } from '../authProvider';
import { Redirect } from 'react-router-dom'

class OAuth2RedirectHandler extends Component {
    
    getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        var results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    render() {
        console.log('OAuth2RedirectHandler')
        const token = this.getUrlParameter('token');
        const error = this.getUrlParameter('error');

        console.log('token:', token)
        console.log('error:', error)

        if(token) {
            localStorage.setItem(ACCESS_TOKEN, token);
            return <Redirect to={{ pathname: "/", state: { from: this.props.location }}}/>; 
        } else {
            return <Redirect to={{ pathname: "/", state: { from: this.props.location, error: error }}}/>; 
        }
    }
}

export default OAuth2RedirectHandler;