'use strict';

import objectAssign from 'react/lib/Object.assign';

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
  const componentName = capitalize(camelize(options.componentName));

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

function getClassName(config={}) {
  const defaults = {
    className: this && (this.props && this.props.hasOwnProperty('className') && this.props.className) || null,
    componentName: this && (this.constructor.displayName || this.constructor.name) || 'Undefined',
    descendantName: null,
    modifiers: null,
    namespace: this && this.namespace || null,
    states: null,
    // Allow utilities to be set on descendants when using utility function or passed in directly.
    // Do not automatically inherit utilities from top level component onto descendants when using mixin or decorator.
    utilities: this && (config.descendantName ? null : (this.props && this.props.hasOwnProperty('utilities') && this.props.utilities)) || null
  };

  const options = objectAssign({}, defaults, config);

  const classNames = [
    getBaseClassName(options)
  ].concat(
    getModifierClassNames(options),
    getStateClassNames(options),
    getUtilityClassNames(options),
    options.className
  )
  .filter(e => !!e)
  .join(' ');

  return classNames;
}

export default getClassName;
