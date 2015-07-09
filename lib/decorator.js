'use strict';

import objectAssign from 'react/lib/Object.assign';
import mixin from './mixin';

function decorate(Component) {
  class SuitCssComponent extends Component {
    static displayName = Component.displayName || Component.name;

    static propTypes = objectAssign({}, Component.propTypes, mixin.propTypes);

    constructor(props) {
      super(props);
      this.getClassName = this::mixin.getClassName;
    }
  }

  return SuitCssComponent;
}

export default decorate;
