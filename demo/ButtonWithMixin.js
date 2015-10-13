'use strict';

import React, { PropTypes } from 'react';
import SuitCssify from '../index';
import classNames from 'classnames';

let Button = React.createClass({
  mixins: [SuitCssify.mixin],

  propTypes: {
    children: PropTypes.node,
    disabled: PropTypes.bool,
    kind: PropTypes.oneOf(['primary', 'secondary']),
    onClick: PropTypes.func,
    size: PropTypes.oneOf(['small', 'medium', 'large'])
  },

  render() {
    const buttonProps = {
      className: this.getClassName({
        modifiers: classNames(this.props.kind, this.props.size),
        states: classNames({
          disabled: this.props.disabled
        })
      }),
      onClick: this.props.onClick && this.props.onClick()
    };

    const textProps = {
      className: this.getClassName({
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
