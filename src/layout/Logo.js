import React from 'react';
import { translate } from 'react-admin';
import compose from 'recompose/compose';

const Logo = ({
  translate,
}) => (translate('pos.title'));

const enhance = compose(
  translate,
);

export default enhance(Logo);

