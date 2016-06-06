'use strict';

const CAMELIZE_REGEX_UPPER_CASE = /[\-_/\.\s]+(.)?/g;
const CAMELIZE_REGEX_LOWER_CASE = /^(.)/;

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function camelize(string) {
  return string
    .replace(CAMELIZE_REGEX_UPPER_CASE, (match, chr) => chr.toUpperCase())
    .replace(CAMELIZE_REGEX_LOWER_CASE, (match, chr) => chr.toLowerCase());
}

export function getBaseComponentName(componentName, namespace) {
  const sanitizedComponentName = capitalize(camelize(componentName));
  return namespace ? `${namespace}-${sanitizedComponentName}` : sanitizedComponentName;
};

function getConfiguredClassName({ namespace, componentName, descendantName, baseComponentName }) {
  let baseClassName = baseComponentName;
  if (componentName || namespace) {
    baseClassName = getBaseComponentName(componentName, namespace);
  }
  return descendantName ? `${baseClassName}-${camelize(descendantName)}` : baseClassName;
}

function format(values, prefix) {
  return values && values
    .split(' ')
    .map(value => `${prefix}${camelize(value)}`)
    .join(' ');
}

export function getClassName(options = {}) {
  // Allow utilities and className to be set on descendants when using utility function or passed in directly.
  // Do not automatically inherit utilities or className from top level component onto descendants when using mixin or decorator.

  const baseClassName = getConfiguredClassName(options);

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
