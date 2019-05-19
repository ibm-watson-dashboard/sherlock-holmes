import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propTypes, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { Notification, translate, userLogin } from 'react-admin';
import { GoogleLoginButton, GithubLoginButton } from 'react-social-login-buttons';

import Card from '@material-ui/core/Card';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';

import { GOOGLE_AUTH_URL, GITHUB_AUTH_URL } from '../contants';

import { lightTheme } from './themes';

import bg from '../assets/img/bg.jpg';

const styles = theme => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        background: `url(${bg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
    },
    card: {
        minWidth: 400,
    },
    title: {
        margin: '1em',
        display: 'flex',
        justifyContent: 'center',
    },
    hint: {
        marginTop: '1em',
        marginBottom: '1em',
        display: 'flex',
        justifyContent: 'center',
        color: theme.palette.grey[500],
    },
    form: {
        padding: '0 1em 0 1em',
    },
});

class Login extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.main}>
                <Card className={classes.card}>
                    <div className={classes.title}>
                        Sherlock Holmes
                    </div>
                    <div className={classes.hint}>An IBM Watson Assistant Dashboard</div>
                    <div className={classes.form}>
                        <GoogleLoginButton onClick={() => { window.open(GOOGLE_AUTH_URL, '_self') }}/>
                        <GithubLoginButton onClick={() => { window.open(GITHUB_AUTH_URL, '_self') }}/>
                    </div>
                    <div className={classes.hint}>By: <a href="https://www.linkedin.com/in/leandro-boeing-vieira/" target="_blank" rel="noopener noreferrer">Leandro Boeing Vieira</a></div>
                </Card>
                <Notification />
            </div>
        );
    }
}

Login.propTypes = {
    ...propTypes,
    authProvider: PropTypes.func,
    classes: PropTypes.object,
    previousRoute: PropTypes.string,
    translate: PropTypes.func.isRequired,
    userLogin: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ isLoading: state.admin.loading > 0 });

const enhance = compose(
    translate,
    reduxForm({
        form: 'signIn',
        validate: (values, props) => {
            const errors = {};
            const { translate } = props;
            if (!values.username) {
                errors.username = translate('ra.validation.required');
            }
            if (!values.password) {
                errors.password = translate('ra.validation.required');
            }
            return errors;
        },
    }),
    connect(
        mapStateToProps,
        { userLogin }
    ),
    withStyles(styles)
);

const EnhancedLogin = enhance(Login);

const LoginWithTheme = props => (
    <MuiThemeProvider theme={createMuiTheme(lightTheme)}>
        <EnhancedLogin {...props} />
    </MuiThemeProvider>
);

export default LoginWithTheme;
