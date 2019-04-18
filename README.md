# strudel-jest

This package provides jest config preset and helpers for writing unit tests for Strudel components.

## Installation

To use strudel-jest you must have the following installed and configured:

* babel
* babel-jest

In order to use this package it must be transpiled by Babel, so please make sure that your babel config allows 
node_modules transpilation for *test* environment if you disabled it by deafult (snippet taken from [jest docs](https://jestjs.io/docs/en/22.x/getting-started.html)):

```javascript
{
  "presets": [["env", {"modules": false}], "react"],
  "env": {
    "test": {
      "presets": [["env"], "react"]
    }
  }
}
```

## Preset

Strudel-jest preset automatically adds required polyfills for Strudel to work in Jest environment. It also adds 
configuration property that causes js files to be transpiled by babel with babel-jest

To use strudel-jest preset add following property to your jest.config.js:

```javascript
{
    preset: 'strudel-jest'
}
```

## Helpers

This package provides a createComponentWrapper helper for instantiating Strudel components which allows the tests to 
access DOM, Instance (with all of the methods) and Element (with all of the Strudel DOM API methods) of the component.
Sample usage:

```javascript
// HelloWorld.js
import { Evt, Component } from 'strudel';

@Component(".hello")
class HelloWorld {
  init() {
    this.$element.html('Hello world!');
  }
  
  @Evt('click')
  toggleActive() {
    this.$element.toggleClass('active');
  }

  sayHi() {
    return 'Hi!';
  }
}

export default HelloWorld;
```

```javascript
// HelloWorld.spec.js

import './HelloWorld';
import { createComponentWrapper } from 'strudel-jest';
let wrapper;

describe('HelloWorld', () => {
  // Make sure your babel understands async/await in order for this snippet to work
  beforeAll(async () => {
    wrapper = await createComponentWrapper('<div class="hello"></div>');
  });
  
  test('Component inits', () => {
    expect(wrapper.$element.is('.hello')).toBe(true); // usage of wrapper.$element
    expect(wrapper.$element.is('.strudel-init')).toBe(true);
    expect(wrapper.instance.sayHi()).toBe('Hi!'); // usage of wrapper.instance
  });

  test('Active class is toggled', () => {
    wrapper.$element.trigger('click');
    expect(wrapper.domEl.classList.contains('active')).toBe(true); // usage of wrapper.domEl
    wrapper.$element.trigger('click');
    expect(wrapper.domEl.classList.contains('active')).toBe(false);
  })
})
```
