'use strict';

import mixin from './mixin';

function decorate(Component) {
  Component.displayName = Component.displayName || Component.name;

  Component.propTypes = {
    ...Component.propTypes,
    ...mixin.propTypes
  };

  Component.prototype.getClassName = mixin.getClassName;

  return Component;
}

export default decorate;
