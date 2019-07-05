export default () => {
    return import('./rest').then(provider => provider.default);
}