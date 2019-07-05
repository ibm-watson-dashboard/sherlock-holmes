import React, { Component } from 'react';
import { Admin, Resource } from 'react-admin';
// import jsonServerProvider from 'ra-data-json-server';

import './App.css';

import authProvider from './authProvider';
import dataProviderFactory from './dataProvider';
import themeReducer from './themeReducer';
import { Login, Layout } from './layout';
import { Dashboard } from './dashboard';
import customRoutes from './routes';
import englishMessages from './i18n/en';

import { PostList, PostEdit, PostCreate, PostIcon } from './posts';

const i18nProvider = locale => {
    if (locale === 'pt-br') {
        return import('./i18n/pt-br').then(messages => messages.default);
    }
    return englishMessages;
};

class App extends Component {

    state = { dataProvider: null };

    async componentWillMount() {
        const dataProvider = await dataProviderFactory();
        this.setState({ dataProvider });
    }

    componentWillUnmount() {
        // this.restoreFetch();
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
                dataProvider={dataProvider}
                customReducers={{ theme: themeReducer }}
                customRoutes={customRoutes}
                authProvider={authProvider}
                dashboard={Dashboard}
                loginPage={Login}
                appLayout={Layout}
                locale="en"
                i18nProvider={i18nProvider}
            >
                <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon}/>
            </Admin>
        );
    }
}

export default App;
