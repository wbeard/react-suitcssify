'use strict';

import React from 'react/addons';
import SuitCssify from '../index';
import classNames from 'classnames';

const getClassName = SuitCssify.utility;

const Button = React.createClass({
  propTypes: {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    kind: React.PropTypes.oneOf(['primary', 'secondary']),
    onClick: React.PropTypes.func,
    size: React.PropTypes.oneOf(['small', 'medium', 'large']),
    utilities: React.PropTypes.string
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
