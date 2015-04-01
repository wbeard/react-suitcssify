'use strict';

import React from 'react/addons';
import SuitCss from '../index';
import classNames from 'classnames';

let Button = React.createClass({
  mixins: [SuitCss],

  propTypes: {
    kind: React.PropTypes.oneOf(['primary', 'secondary']),
    size: React.PropTypes.oneOf(['small', 'medium', 'large']),
    onClick: React.PropTypes.func
  },

  render() {
    let props = {
      className: this.getClassName({
        modifiers: classNames(this.props.kind, this.props.size),
        states: classNames({
          disabled: this.props.disabled
        })
      }),
      onClick: this.onClick
    };

    let textProps = {
      className: this.getClassName({
        descendantName: 'text'
      })
    };

    return (
      /* jshint ignore:start */
      <button { ...props }>
        <span { ...textProps }>{ this.props.children }</span>
      </button>
      /* jshint ignore:end */
    );
  },

  onClick(e) {
    this.props.onClick && this.props.onClick(e);
  }
});

React.render(
  /* jshint ignore:start */
  <div>
    <div className="group">
      <Button kind="primary" size="small">Hello</Button>
      <Button kind="primary" size="medium">Hello</Button>
      <Button kind="primary" size="large" disabled>Hello</Button>
      <Button kind="primary" size="large" utilities="pullRight">Hello</Button>
    </div>
    <div className="group">
      <Button kind="secondary" size="small">Hello</Button>
      <Button kind="secondary" size="medium">Hello</Button>
      <Button kind="secondary" size="large" disabled>Hello</Button>
      <Button kind="secondary" size="large" utilities="pullRight">Hello</Button>
    </div>
  </div>,
  document.getElementById('main')
  /* jshint ignore:end */
);
