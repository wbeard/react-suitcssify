'use strict';

import React from 'react';
import utility from './utility';

const mixin = {
  propTypes: {
    className: React.PropTypes.string,
    utilities: React.PropTypes.string
  },

  getClassName: utility
};

export default mixin;
