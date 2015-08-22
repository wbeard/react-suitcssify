'use strict';

import React, { PropTypes } from 'react';
import utility from './utility';

const mixin = {
  propTypes: {
    className: PropTypes.string,
    utilities: PropTypes.string
  },

  getClassName: utility
};

export default mixin;
