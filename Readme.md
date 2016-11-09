# Polymer Global Variables

Share variables across all the polymer elements in your **Polymer 1.x** application.

The Polymer 1.x data system have great and powerful tools (Data bindings, observers,...) but sometimes it feels very repetitive to passing the same data to almost every element you declare (e.g., localization, authentication flags,...).

This hack tries to solve this issue setting a global object in every Polymer component instance that requires global variables of your project.

Use it instead repetitive declarations of components, binding the same data in every child element or using the same behaviour in every component you make.

## Differences between this hack and the one by ivanrod

This hack is based on the one made by ivanrod, the main difference is that the one from ivanrod target all the Polymer elements in your app, while this hack is more selective and target only the one interested in global variables.

## Install

With bower do:

```bash
$ bower install --save polymer-selective-global-variables
```

Import the `polymer-global-variables.js` or `polymer-global-variables.min.js` file in your project main file:

*index.html*
```html
<script src="bower_components/polymer-global-variables/dist/polymer-global-variables.js" charset="utf-8"></script>
```

## Usage

Now you have access to `Polymer.globalsManager`, use `set()` method to make changes in the globals object.

```javascript
Polymer.globalsManager.set('myGlobalVariable', {foo: 'bar'});
Polymer.globalsManager.set('anotherGlobalVariable', 'foo');
```

This changes will be reflected in every component instance on your project that subscribe to that change:

*component-with-specific-target.html*
```html
...

<template>
  <div>
    <div>1</div>
    <h1>[[globals.myGlobalVariable.foo]]</h1>
    <p>[[globals.anotherGlobalVariable]]</p>
  </div>
</template>
<script>
Polymer({
    is: "component-with-specific-target",
    globalsProperties: [
      'myGlobalVariable',
      'anotherGlobalVariable'
    ],
    ...
</script>
...

```
*component-with-any-target.html*
```html
...

<template>
  <div>
    <div>2</div>
    <h1>[[globals.myGlobalVariable.foo]]</h1>
    <p>[[globals.anotherGlobalVariable]]</p>
  </div>
</template>
<script>
Polymer({
    is: "component-with-any-target",
    globalsProperties: true,
    ...
</script>
...
```

As seen in the example you need to add the property *globalsProperties* in your Polymer element to subscribe to them. If you pass an array the element will subscribe only to the properties you have specified, if you pass anything else the element will subscribe to all the global properties.

## Polymer.globalsManager API

#### set(variableToSet:string, value:any)

Sets a global variable in every element in the app.

Example:

```javascript
Polymer.globalsManager.set('myGlobalVariable', {foo: 'bar'});
```

## License

MIT © [maury91](https://github.com/maury91), [ivanrod](https://github.com/ivanrod).
