'use strict';

import decorator from './lib/decorator';
import higherOrder from './lib/higher-order';
import mixin from './lib/mixin';
import { getBaseComponentName, getClassName } from './lib/utility';

const SuitCssify = {
  decorator,
  getBaseComponentName,
  getClassName,
  higherOrder,
  mixin,
  utility: getClassName
};

export default SuitCssify;
