import React from 'react';
import { Route } from 'react-router-dom';

import Configuration from './configuration/Configuration';
import Segments from './segments/Segments';
import OAuth2RedirectHandler from './oauth/OAuth2RedirectHandler';

export default [
    <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>,
    <Route exact path="/configuration" component={Configuration} />,
    <Route exact path="/segments" component={Segments} />,
];
