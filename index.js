'use strict';

import React from 'react';
import assign from 'react/lib/Object.assign';

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function camelize(string) {
  return string
    .replace(/[\-_/\.\s]+(.)?/g, (match, chr) => chr.toUpperCase())
    .replace(/^(.)/, (match, chr) => chr.toLowerCase());
}

function getBaseClassName(options={}) {
  let baseClassName;
  let componentName = capitalize(camelize(options.componentName));

  baseClassName = options.namespace ? `${options.namespace}-${componentName}` : componentName;
  baseClassName = options.descendantName ? `${baseClassName}-${camelize(options.descendantName)}` : baseClassName;

  return baseClassName;
}

function getModifierClassNames(options={}) {
  let modifierClassNames;
  if (options.modifiers) {
    modifierClassNames = options.modifiers
      .split(' ')
      .map(modifier => `${getBaseClassName(options)}--${camelize(modifier)}`)
      .join(' ');
  }
  return modifierClassNames;
}

function getStateClassNames(options={}) {
  let stateClassNames;
  if (options.states) {
    stateClassNames = options.states
      .split(' ')
      .map(state => `is-${camelize(state)}`)
      .join(' ');
  }
  return stateClassNames;
}

function getUtilityClassNames(options={}) {
  let utilityClassNames;
  if (options.utilities) {
    utilityClassNames = options.utilities
      .split(' ')
      .map(utility => `u-${camelize(utility)}`)
      .join(' ');
  }
  return utilityClassNames;
}

let SuitCss = {
  propTypes: {
    utilities: React.PropTypes.string
  },

  getClassName(config={}) {
    let defaults = {
      namespace: this.namespace || null,
      componentName: this.constructor.displayName,
      descendantName: null,
      modifiers: null,
      states: null,
      utilities: config.descendantName ? null : (this.props.hasOwnProperty('utilities') && this.props.utilities) || null
    };

    let options = assign({}, defaults, config);

    let classNames = [
      getBaseClassName(options)
    ].concat(
      getModifierClassNames(options),
      getStateClassNames(options),
      getUtilityClassNames(options),
      this.props.className
    )
    .filter(e => e)
    .join(' ');

    return classNames;
  }
};

export default SuitCss;
