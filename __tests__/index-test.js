'use strict';

jest.autoMockOff();

import React from 'react/addons';
const { TestUtils } = React.addons;
const SuitCssify = require('../index');

const DECORATOR = 0;
const MIXIN = 1;
const UTILITY = 2;

/* eslint-disable react/no-multi-comp, no-shadow, no-unused-vars */
const ComponentFactory = {
  build(kind, options={}) {
    let Component;

    switch(kind) {
      case DECORATOR:
        @SuitCssify.decorator
        class Component extends React.Component{
          render() {
            return (
              <div className={ this.getClassName(options) } />
            );
          }
        }

        break;

      case MIXIN:
        Component = React.createClass({
          mixins: [SuitCssify.mixin],
          render() {
            return (
              <div className={ this.getClassName(options) } />
            );
          }
        });
        break;

      case UTILITY:
        const getClassName = SuitCssify.utility;
        Component = React.createClass({
          render() {
            return (
              <div className={ getClassName(options) } />
            );
          }
        });
        break;
    }

    return Component;
  }
};
/* eslint-enable react/no-multi-comp, no-shadow, no-unused-vars */

function renderComponent(Component, props={}) {
  const jsx = (
    <Component { ...props } />
  );
  const component = TestUtils.renderIntoDocument(jsx);
  //console.log(React.renderToStaticMarkup(jsx));
  return component;
}

describe('SuitCssify', () => {
  let Component, component, className;

  it('includes getClassName method', () => {
    Component = ComponentFactory.build(DECORATOR);
    component = renderComponent(Component);
    expect(component.getClassName).toBeDefined();

    Component = ComponentFactory.build(MIXIN);
    component = renderComponent(Component);
    expect(component.getClassName).toBeDefined();
  });

  it('includes utilities propType', () => {
    Component = ComponentFactory.build(DECORATOR);
    expect(Component.propTypes.utilities).toBeDefined();

    Component = ComponentFactory.build(MIXIN);
    expect(Component.propTypes.utilities).toBeDefined();
  });

  describe('base class name', () => {
    it('includes capitalized component name defaulting to the component displayName', () => {
      Component = ComponentFactory.build(DECORATOR);
      component = renderComponent(Component);
      className = React.findDOMNode(component).className;
      expect(className).toMatch(/Component/);

      Component = ComponentFactory.build(MIXIN);
      component = renderComponent(Component);
      className = React.findDOMNode(component).className;
      expect(className).toMatch(/Component/);
    });

    it('includes capitalized component name and allows it to be customized', () => {
      Component = ComponentFactory.build(DECORATOR, {
        componentName: 'FooBar'
      });
      component = renderComponent(Component);
      className = React.findDOMNode(component).className;
      expect(className).toMatch(/FooBar/);

      Component = ComponentFactory.build(MIXIN, {
        componentName: 'FooBar'
      });
      component = renderComponent(Component);
      className = React.findDOMNode(component).className;
      expect(className).toMatch(/FooBar/);

      Component = ComponentFactory.build(UTILITY, {
        componentName: 'FooBar'
      });
      component = renderComponent(Component);
      className = React.findDOMNode(component).className;
      expect(className).toMatch(/FooBar/);
    });

    it('includes namespace if provided', () => {
      Component = ComponentFactory.build(DECORATOR, {
        namespace: 'my'
      });
      component = renderComponent(Component);
      className = React.findDOMNode(component).className;
      expect(className).toMatch(/my-Component/);

      Component = ComponentFactory.build(MIXIN, {
        namespace: 'my'
      });
      component = renderComponent(Component);
      className = React.findDOMNode(component).className;
      expect(className).toMatch(/my-Component/);

      Component = ComponentFactory.build(UTILITY, {
        componentName: 'Component',
        namespace: 'my'
      });
      component = renderComponent(Component);
      className = React.findDOMNode(component).className;
      expect(className).toMatch(/my-Component/);
    });

    it('includes camelized descendantName if provided', () => {
      Component = ComponentFactory.build(DECORATOR, {
        descendantName: 'descendant-element'
      });
      component = renderComponent(Component);
      className = React.findDOMNode(component).className;
      expect(className).toMatch(/Component-descendantElement/);

      Component = ComponentFactory.build(MIXIN, {
        descendantName: 'descendant-element'
      });
      component = renderComponent(Component);
      className = React.findDOMNode(component).className;
      expect(className).toMatch(/Component-descendantElement/);

      Component = ComponentFactory.build(UTILITY, {
        componentName: 'Component',
        descendantName: 'descendant-element'
      });
      component = renderComponent(Component);
      className = React.findDOMNode(component).className;
      expect(className).toMatch(/Component-descendantElement/);
    });
  });

  it('modifier class names follow SuitCss conventions', () => {
    Component = ComponentFactory.build(DECORATOR, {
      modifiers: 'modifier-one modifier-two'
    });
    component = renderComponent(Component);
    className = React.findDOMNode(component).className;
    expect(className).toMatch(/Component--modifierOne/);
    expect(className).toMatch(/Component--modifierTwo/);

    Component = ComponentFactory.build(MIXIN, {
      modifiers: 'modifier-one modifier-two'
    });
    component = renderComponent(Component);
    className = React.findDOMNode(component).className;
    expect(className).toMatch(/Component--modifierOne/);
    expect(className).toMatch(/Component--modifierTwo/);

    Component = ComponentFactory.build(UTILITY, {
      componentName: 'Component',
      modifiers: 'modifier-one modifier-two'
    });
    component = renderComponent(Component);
    className = React.findDOMNode(component).className;
    expect(className).toMatch(/Component--modifierOne/);
    expect(className).toMatch(/Component--modifierTwo/);
  });

  it('state class names follow SuitCss conventions', () => {
    Component = ComponentFactory.build(DECORATOR, {
      states: 'state-one state-two'
    });
    component = renderComponent(Component);
    className = React.findDOMNode(component).className;
    expect(className).toMatch(/is-stateOne/);
    expect(className).toMatch(/is-stateTwo/);

    Component = ComponentFactory.build(MIXIN, {
      states: 'state-one state-two'
    });
    component = renderComponent(Component);
    className = React.findDOMNode(component).className;
    expect(className).toMatch(/is-stateOne/);
    expect(className).toMatch(/is-stateTwo/);

    Component = ComponentFactory.build(UTILITY, {
      componentName: 'Component',
      states: 'state-one state-two'
    });
    component = renderComponent(Component);
    className = React.findDOMNode(component).className;
    expect(className).toMatch(/is-stateOne/);
    expect(className).toMatch(/is-stateTwo/);
  });

  it('utility class names follow SuitCss conventions', () => {
    Component = ComponentFactory.build(DECORATOR, {
      utilities: 'utility-one utility-two'
    });
    component = renderComponent(Component);
    className = React.findDOMNode(component).className;
    expect(className).toMatch(/u-utilityOne/);
    expect(className).toMatch(/u-utilityTwo/);

    Component = ComponentFactory.build(MIXIN, {
      utilities: 'utility-one utility-two'
    });
    component = renderComponent(Component);
    className = React.findDOMNode(component).className;
    expect(className).toMatch(/u-utilityOne/);
    expect(className).toMatch(/u-utilityTwo/);

    Component = ComponentFactory.build(UTILITY, {
      componentName: 'Component',
      utilities: 'utility-one utility-two'
    });
    component = renderComponent(Component);
    className = React.findDOMNode(component).className;
    expect(className).toMatch(/u-utilityOne/);
    expect(className).toMatch(/u-utilityTwo/);
  });

  it('transfers utilities props directly', () => {
    Component = ComponentFactory.build(DECORATOR);
    component = renderComponent(Component, {
      utilities: 'utility-one utility-two'
    });
    className = React.findDOMNode(component).className;
    expect(className).toMatch(/u-utilityOne/);
    expect(className).toMatch(/u-utilityTwo/);

    Component = ComponentFactory.build(MIXIN);
    component = renderComponent(Component, {
      utilities: 'utility-one utility-two'
    });
    className = React.findDOMNode(component).className;
    expect(className).toMatch(/u-utilityOne/);
    expect(className).toMatch(/u-utilityTwo/);
  });

  it('does not apply utilities props to descendants');

  it('allows arbitrary class names to be set', () => {
    Component = ComponentFactory.build(DECORATOR);
    component = renderComponent(Component, {
      className: 'arbitrary'
    });
    className = React.findDOMNode(component).className;
    expect(className).toMatch(/arbitrary/);

    Component = ComponentFactory.build(MIXIN);
    component = renderComponent(Component, {
      className: 'arbitrary'
    });
    className = React.findDOMNode(component).className;
    expect(className).toMatch(/arbitrary/);

    Component = ComponentFactory.build(UTILITY, {
      className: 'arbitrary',
      componentName: 'Component'
    });
    component = renderComponent(Component);
    className = React.findDOMNode(component).className;
    expect(className).toMatch(/arbitrary/);
  });
});
