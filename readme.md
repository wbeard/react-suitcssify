# react-suitcssify

A React component utility to generate CSS class names that conform to [SUIT CSS naming conventions](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md).

__This utility can be used as a decorator, mixin, or utility function__.
This means that you can use it with React components defined as ES6 classes.

Provides a general purpose `getClassName(options)` method that accepts a variety of options for generating SUIT CSS conformant class names.

```JavaScript
getClassName({
  className: string,
  componentName: string,
  descendantName: string,
  modifiers: string,
  namespace: string,
  states: string,
  utilities: string
})
```

When using the decorator or mixin approach, the following sensible defaults are provided.

* __className__  - `Component.props.className`  _Note that `Component.propTypes.className` is also added for convenience._
* __componentName__ - `Component.constructor.displayName || Component.constructor.name`
* __namespace__ - `Component.namespace`
* __utilities__ - `Component.props.utilities`  _Note that `Component.propTypes.utilities` is also added for convenience._


## Installation

```
npm install react-suitcssify
```

## Usage

#### ES6 class with a decorator

```JavaScript
import React from 'react';
import SuitCssify from 'react-suitcssify';

@SuitCssify.decorator
MyComponent extends React.Component{
  render: function() {
    return <div className={ this.getClassName() }></div>
  }
}

React.render(<MyComponent/>, document.body);
```
* _NOTE: Your codebase must support ES7 decorators to use this synax.  Alternatively, simply use the decorator as a wrapper function to achieve the same effect._

#### As a mixin

```JavaScript
import React from 'react';
import SuitCssify from 'react-suitcssify';

const MyComponent = React.createClass({
  mixins: [SuitCssify.mixin],

  render: function() {
    return <div className={ this.getClassName() }></div>
  }
});

React.render(<MyComponent/>, document.body);
```

#### As a utility method

```JavaScript
import React from 'react';
import SuitCssify from 'react-suitcssify';

const getClassName = SuitCssify.utility;

const MyComponent = React.createClass({
  render: function() {
    return <div className={ getClassName({ componentName: 'MyComponent' }) }></div>
  }
});

React.render(<MyComponent/>, document.body);
```


Each of the above render as:

```html
<div class="MyComponent"></div>
```

## Examples

#### Assuming we have the following component

```HTML
<Component />
```

#### We should expect the following output.

```JavaScript
getClassName() -----> 'Component'

getClassName({ componentName: 'AwesomeComponent' }) -----> 'AwesomeComponent'

getClassName({ namespace: 'my' }) -----> 'my-Component'

getClassName({ modifiers: 'foo bar' }) -----> 'Component Component--foo Component--bar'

getClassName({ states: 'active' }) -----> 'Component is-active'

getClassName({ utilities: 'floatRight' }) -----> 'Component u-floatRight'

getClassName({ className: 'arbitrary' }) -----> 'Component arbitrary'

getClassName({ descendantName: 'title' }) -----> 'Component Component-title'

getClassName({
  className: 'arbitrary',
  componentName: 'AwesomeComponent',
  modifiers: 'foo bar',
  namespace: 'my',
  states: 'active',
  utilities: 'floatRight'
}) -----> 'my-AwesomeComponent my-AwesomeComponent--foo my-AwesomeComponent--bar is-active u-floatRight arbitrary'

getClassName({
  componentName: 'AwesomeComponent',
  namespace: 'my',
  modifiers: 'foo bar',
  states: 'active',
  utilities: 'floatRight',
  className: 'arbitrary',
  descendantName: 'child'
}) -----> 'my-AwesomeComponent-child my-AwesomeComponent-child--foo my-AwesomeComponent-child--bar is-active u-floatRight arbitrary'

```

For more examples, browse the [demo files](https://github.com/brentertz/react-suitcss-mixin/blob/master/demo) or just run the demo.

## Demo

```
npm run demo
```

## Build

```
npm run build
```

## Tests

```
npm test
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 3.0.0 - Descendant elements no longer automatically inherit parent className.
* 2.0.2 - Add extra this.props check when using as utility.
* 2.0.1 - Remove React as peer dependency.
* 2.0.0 - Extend capabilities for use as decorator, mixin, or utility method. Project renamed to react-suitcssify.  To upgrade, simply change the import/require to use the desired type (decorator, mixin, or utility) as shown in the usage section above.
* 1.0.1 - Update dependencies. Fix test mock. Update readme.
* 1.0.0 - Camelize and capitalize componentName
* 0.0.5 - Use Object.assign polyfill from react/lib. Update .npmignore and readme.
* 0.0.4 - Initial release
