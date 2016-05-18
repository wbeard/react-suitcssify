'use strict';

import React from 'react';
import utility from './utility';

export default function(namespace) {
  return function(Component) {
    const componentName = Component.displayName || Component.name;
    const getClassName = (options) => utility({ namespace, componentName, ...options });

    return class SuitCssifyHigherOrder extends React.Component {
      static propTypes = {
        className: React.PropTypes.string,
        utilities: React.PropTypes.string
      };

      render() {
        let finalGetClassName = getClassName;
        const { className, utilities } = this.props;
        if (className || utilities) {
          const propsOptions = {};
          if (className) {
            propsOptions.className = className;
          }
          if (utilities) {
            propsOptions.utilities = utilities;
          }
          finalGetClassName = (options) => getClassName({ ...options, ...propsOptions });
        }
        return <Component { ...this.props } getClassName={ finalGetClassName } />;
      }
    };
  };
}
