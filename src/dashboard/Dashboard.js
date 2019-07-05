import React, { Component } from 'react';
import { GET_ONE, Responsive, withDataProvider } from 'react-admin';
import compose from 'recompose/compose';
import { connect } from 'react-redux';

import ApiCalls from './ApiCalls';

const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '1em' },
    rightCol: { flex: 1, marginLeft: '1em' },
    singleCol: { marginTop: '2em', marginBottom: '2em' },
};

class Dashboard extends Component {
    state = {revenue: 0};

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.version !== prevProps.version) {
            this.fetchData();
        }
    }

    fetchData() {
        this.fetchCalls();
    }

    async fetchCalls() {
        const { dataProvider } = this.props;
        // const { data: apiCalls } = await dataProvider(GET_ONE, 'john-watson/hello', {id: 1});
        const { data : hello } = await dataProvider(GET_ONE, 'john-watson/hello', {id: 1})
        this.setState({revenue: hello.id});
    }

    render() {
        const { revenue } = this.state;
        return (
            <Responsive
                xsmall={
                    <div>
                        <div style={styles.flexColumn}>
                            <div style={styles.flex}>
                                <ApiCalls value={revenue} />
                            </div>
                        </div>
                    </div>
                }
                small={
                    <div style={styles.flexColumn}>
                        <div style={styles.flex}>
                            <ApiCalls value={revenue} />
                        </div>
                    </div>
                }
                medium={
                    <div style={styles.flex}>
                        <div style={styles.leftCol}>
                            <div style={styles.flex}>
                                <ApiCalls value={revenue} />
                            </div>
                        </div>
                        <div style={styles.rightCol}>
                            <div style={styles.flex}>
                            <ApiCalls value={revenue} />
                            </div>
                        </div>
                    </div>
                }
            />
        );
    }
}

const mapStateToProps = state => ({
    version: state.admin.ui.viewVersion,
});

export default compose(
    connect(mapStateToProps),
    withDataProvider
)(Dashboard);
