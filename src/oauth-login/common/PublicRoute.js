import React from 'react';
import { Route } from "react-router-dom";
  
  
const PublicRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route {...rest} render={props => <Component {...rest} authenticated={authenticated} {...props} />} />
);
  
export default PublicRoute