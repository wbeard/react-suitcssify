'use strict';

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function camelize(string) {
  return string
    .replace(/[\-_/\.\s]+(.)?/g, (match, chr) => chr.toUpperCase())
    .replace(/^(.)/, (match, chr) => chr.toLowerCase());
}

function getBaseClassName({ namespace, componentName, descendantName }) {
  componentName = capitalize(camelize(componentName));

  let baseClassName = namespace ? `${namespace}-${componentName}` : componentName;
  baseClassName = descendantName ? `${baseClassName}-${camelize(descendantName)}` : baseClassName;

  return baseClassName;
}

function format(values, prefix) {
  return values && values
    .split(' ')
    .map(value => `${prefix}${camelize(value)}`)
    .join(' ');
}

function getClassName(config={}) {
  // Allow utilities and className to be set on descendants when using utility function or passed in directly.
  // Do not automatically inherit utilities or className from top level component onto descendants when using mixin or decorator.
  const defaults = {
    className: this && (config.descendantName ? null : (this.props && this.props.hasOwnProperty('className') && this.props.className)) || null,
    componentName: this && (this.constructor.displayName || this.constructor.name) || 'Undefined',
    descendantName: null,
    modifiers: null,
    namespace: this && this.namespace || null,
    states: null,
    utilities: this && (config.descendantName ? null : (this.props && this.props.hasOwnProperty('utilities') && this.props.utilities)) || null
  };

  const options = { ...defaults, ...config };
  const baseClassName = getBaseClassName(options);

  const classNames = [
    baseClassName
  ].concat(
    format(options.modifiers, `${baseClassName}--`),
    format(options.states, 'is-'),
    format(options.utilities, 'u-'),
    options.className
  )
  .filter(value => !!value)
  .join(' ');

  return classNames;
}

export default getClassName;
