'use strict';

import React, { PropTypes } from 'react';
import SuitCssify from '../index';
import classNames from 'classnames';

const getClassName = SuitCssify.utility;

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
    const buttonProps = {
      className: getClassName({
        className: this.props.className,
        componentName: this.constructor.displayName,
        modifiers: classNames(this.props.kind, this.props.size),
        states: classNames({
          disabled: this.props.disabled
        }),
        utilities: this.props.utilities
      }),
      onClick: this.props.onClick && this.props.onClick()
    };

    const textProps = {
      className: getClassName({
        componentName: this.constructor.displayName,
        descendantName: 'text'
      })
    };

    return (
      <button { ...buttonProps }>
        <span { ...textProps }>{ this.props.children }</span>
      </button>
    );
  }
});

export default Button;
