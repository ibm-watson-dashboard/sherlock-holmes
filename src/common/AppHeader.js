import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { GoogleLoginButton, GithubLoginButton } from 'react-social-login-buttons';
import { GOOGLE_AUTH_URL, GITHUB_AUTH_URL } from '../constants';
import MenuLink from './MenuLink';
import './AppHeader.css';

class AppHeader extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {dropdownOpen: false};
    }

    toggle() {
        this.setState(prevState => ({dropdownOpen: !prevState.dropdownOpen}));
    }

    renderLogin() {
        return (
            <ButtonDropdown size="sm" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret color="light">Login</DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem>
                        <GoogleLoginButton onClick={() => { window.open(GOOGLE_AUTH_URL, '_self') }}/>
                    </DropdownItem>
                    <DropdownItem>
                        <GithubLoginButton onClick={() => { window.open(GITHUB_AUTH_URL, '_self') }}/>
                    </DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>
        )
    }

    renderLogout() {
        return (
            <ButtonDropdown size="sm" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret color="light">{this.props.currentUser.name}</DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem>
                        <MenuLink label="Dashboard" to="/" />
                    </DropdownItem>
                    <DropdownItem>
                        <MenuLink label="Profile" to="/profile" />
                    </DropdownItem>
                    <DropdownItem onClick={this.props.onLogout}>
                        Logout
                    </DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>
        )
    }

    render() {
        const isAuthenticated = this.props.authenticated;
        return (
            <header className="app-header">
                <div className="app-login-menu">
                    {!isAuthenticated ? this.renderLogin() : this.renderLogout()}
                </div>
            </header>
        )
    }
}

export default AppHeader;