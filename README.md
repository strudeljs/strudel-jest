# strudel-jest

This package provides jest config preset and helpers for writing unit tests for Strudel components.

## Installation

To use strudel-jest you must have the following installed and configured:

* jest
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
// HelloWorld.spec.js

import './HelloWorld';
import { createComponentWrapper } from 'strudel-jest';
let wrapper;

describe('Hello World', () => {
  // Make sure your babel understands async/await in order for this snippet to work
  beforeAll(async () => {
    wrapper = await createComponentWrapper('<div class="hello"></div>');
  });
  
  test('Sample test', () => {
      /*
       * wrapper.domEl - access to the DOM
       * wrapper.instance - access to the component instance with all of the methods
       * wrapper.$element - access to the Element
       */
  })
})
```
