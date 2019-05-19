import React, { Component } from 'react';
import { Admin, Resource } from 'react-admin';

import { Layout } from '../layout';

import englishMessages from '../i18n/en';
import authProvider from '../authProvider';
import sagas from '../sagas';
import themeReducer from '../themeReducer';
import customRoutes from '../routes';

import dataProviderFactory from '../dataProvider';
import fakeServerFactory from '../fakeServer';

import visitors from '../visitors';

import './Dashboard.css';

const i18nProvider = locale => {
    if (locale === 'pt-br') {
        return import('../i18n/pt-br').then(messages => messages.default);
    }
    return englishMessages;
};

class Dashboard extends Component {

    state = { dataProvider: null };

    async componentWillMount() {
        this.restoreFetch = await fakeServerFactory(
            process.env.REACT_APP_DATA_PROVIDER
        );

        const dataProvider = await dataProviderFactory(
            process.env.REACT_APP_DATA_PROVIDER
        );

        this.setState({ dataProvider });
    }

    componentWillUnmount() {
        this.restoreFetch();
    }

    render() {
        const { dataProvider } = this.state;

        if (!dataProvider) {
            return (
                <div className="loader-container">
                    <div className="loader">Loading...</div>
                </div>
            );
        }

        return (
            <Admin
                title=""
                dataProvider={dataProvider}
                customReducers={{ theme: themeReducer }}
                customSagas={sagas}
                customRoutes={customRoutes}
                authProvider={authProvider}
                dashboard={Dashboard}
                appLayout={Layout}
                locale="en"
                i18nProvider={i18nProvider}
            >
                <Resource name="customers" {...visitors} />
            </Admin>
        )
    }
}

export default Dashboard