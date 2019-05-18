import React, { Component } from 'react';

import './Home.css';
import Dashboard from '../dashboard/Dashboard';

class Home extends Component {

    renderDashboard() {
        return <Dashboard {...this.props} />
    }

    renderWelcome() {
        return <div>WELCOME</div>
    }

    render() {
        const isAuthenticated = this.props.authenticated;
        return (
            <div className="container">
                {isAuthenticated ? this.renderDashboard() : this.renderWelcome()}
            </div>
        )
    }
}

export default Home;