'use strict';

jest.dontMock('../index');

import React from 'react/addons';
let { TestUtils } = React.addons;
var SuitCss = require('../index');

let ComponentFactory = {
  build(options={}) {
    let Component = React.createClass({
      mixins: [SuitCss],
      render() {
        return (
          /* jshint ignore:start */
          <div className={ this.getClassName(options) } />
          /* jshint ignore:end */
        );
      }
    });

    return Component;
  }
};

describe('SuitCss', () => {
  let renderComponent = (Component, props={}) => {
    let jsx = (
      /* jshint ignore:start */
      <Component { ...props } />
      /* jshint ignore:end */
    );
    let component = TestUtils.renderIntoDocument(jsx);
    //console.log(React.renderToStaticMarkup(jsx));
    return component;
  };

  it('includes getClassName method', () => {
    let Component = ComponentFactory.build();

    expect(Component.prototype.__reactAutoBindMap.getClassName).toBeDefined();
  });

  it('includes utilities propType', () => {
    let Component = ComponentFactory.build();

    expect(Component.propTypes.utilities).toBeDefined();
  });

  describe('base class name', () => {
    it('includes capitalized component name defaulting to the component displayName', () => {
      let Component = ComponentFactory.build();
      let component = renderComponent(Component);
      let className = component.getDOMNode().className;

      expect(className).toMatch(/Component/);
    });

    it('includes capitalized component name and allows it to be customized', () => {
      let Component = ComponentFactory.build({
        componentName: 'FooBar'
      });
      let component = renderComponent(Component);
      let className = component.getDOMNode().className;

      expect(className).toMatch(/FooBar/);
    });

    it('includes namespace if provided', () => {
      let Component = ComponentFactory.build({
        namespace: 'my'
      });
      let component = renderComponent(Component);
      let className = component.getDOMNode().className;

      expect(className).toMatch(/my-Component/);
    });

    it('includes camelized descendantName if provided', () => {
      let Component = ComponentFactory.build({
        descendantName: 'descendant-element'
      });
      let component = renderComponent(Component);
      let className = component.getDOMNode().className;

      expect(className).toMatch(/Component-descendantElement/);
    });
  });

  it('modifier class names follow SuitCss conventions', () => {
    let Component = ComponentFactory.build({
      modifiers: 'modifier-one modifier-two'
    });
    let component = renderComponent(Component);
    let className = component.getDOMNode().className;

    expect(className).toMatch(/Component--modifierOne/);
    expect(className).toMatch(/Component--modifierTwo/);
  });

  it('state class names follow SuitCss conventions', () => {
    let Component = ComponentFactory.build({
      states: 'state-one state-two'
    });
    let component = renderComponent(Component);
    let className = component.getDOMNode().className;

    expect(className).toMatch(/is-stateOne/);
    expect(className).toMatch(/is-stateTwo/);
  });

  it('utility class names follow SuitCss conventions', () => {
    let Component = ComponentFactory.build({
      utilities: 'utility-one utility-two'
    });
    let component = renderComponent(Component);
    let className = component.getDOMNode().className;

    expect(className).toMatch(/u-utilityOne/);
    expect(className).toMatch(/u-utilityTwo/);
  });

  it('transfers utilities props directly', () => {
    let Component = ComponentFactory.build();
    let component = renderComponent(Component, {
      utilities: 'utility-one utility-two'
    });
    let className = component.getDOMNode().className;

    expect(className).toMatch(/u-utilityOne/);
    expect(className).toMatch(/u-utilityTwo/);
  });

  it('does not apply utilities props to descendants');

  it('allows arbitrary class names to be set', () => {
    let Component = ComponentFactory.build();
    let component = renderComponent(Component, {
      className: 'arbitrary'
    });
    let className = component.getDOMNode().className;

    expect(className).toMatch(/arbitrary/);
  });
});
