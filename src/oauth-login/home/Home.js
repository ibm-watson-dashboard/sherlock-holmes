import React, { Component } from 'react';

import './Home.css';
import Dashboard from '../dashboard/Dashboard';
import Welcome from '../welcome/Welcome';

class Home extends Component {

    renderDashboard() {
        return <Dashboard {...this.props} />
    }

    renderWelcome() {
        return <Welcome {...this.props} />
    }

    render() {
        const isAuthenticated = this.props.authenticated;
        return (
            <div className="container float-right">
                {isAuthenticated ? this.renderDashboard() : this.renderWelcome()}
            </div>
        )
    }
}

export default Home;