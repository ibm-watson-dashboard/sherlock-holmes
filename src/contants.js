export const OAUTH2_REDIRECT_URI = process.env.REACT_APP_SERVER_URL + '/#/oauth2/redirect';

export const GOOGLE_AUTH_URL = process.env.REACT_APP_SECURITY_API_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL = process.env.REACT_APP_SECURITY_API_URL + '/oauth2/authorize/github?redirect_uri=' + OAUTH2_REDIRECT_URI;