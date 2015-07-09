'use strict';

import React from 'react/addons';
import SuitCssify from '../index';
import classNames from 'classnames';

@SuitCssify.decorator
class Button extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    disabled: React.PropTypes.bool,
    kind: React.PropTypes.oneOf(['primary', 'secondary']),
    onClick: React.PropTypes.func,
    size: React.PropTypes.oneOf(['small', 'medium', 'large'])
  };

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
}

export default Button;
