'use strict';

import React, { PropTypes } from 'react';
import SuitCssify from '../index';
import classNames from 'classnames';

const getClassName = SuitCssify.getClassName;

const Button = React.createClass({
  propTypes: {
    children: PropTypes.node,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    kind: PropTypes.oneOf(['primary', 'secondary']),
    onClick: PropTypes.func,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    utilities: PropTypes.string
  },

  render() {
    const { children, className, disabled, kind, onClick, size, utilities } = this.props;

    const buttonProps = {
      className: getClassName({
        className,
        componentName: this.constructor.displayName,
        modifiers: classNames(kind, size),
        states: classNames({ disabled }),
        utilities
      }),
      onClick: onClick && onClick()
    };

    const textProps = {
      className: getClassName({
        componentName: this.constructor.displayName,
        descendantName: 'text'
      })
    };

    return (
      <button { ...buttonProps }>
        <span { ...textProps }>{ children }</span>
      </button>
    );
  }
});

export default Button;
