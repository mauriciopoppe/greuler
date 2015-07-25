# greuler 

[![Build Status][travis-image]][travis-url] [![NPM][npm-image]][npm-url] <img src="https://github.com/maurizzzio/greuler/blob/master/badge%402x.png" width="130" height="30">

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

<b>greuler</b> is graph theory visualization tool powered by <a href="http://d3js.org/">d3</a>
and on top of <a href="http://marvl.infotech.monash.edu/webcola/">WebCola</a>
which allows the creation and manipulation of graphs with a simple api
        
[Homepage](http://maurizzzio.github.io/greuler/)

## Installation

### npm + browserify

```sh
// ES6
$ npm install --save greuler
```

### browser

**greuler** works on top of d3.js and WebCola so include those first

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.js"></script>
<script src="http://marvl.infotech.monash.edu/webcola/cola.v3.min.js"></script>
```

Install **greuler** with bower

```sh
bower install greuler
```

And then include it in your webpage

```html
<script src="bower_components/greuler/dist/greuler.js"></script>
```

or 
    
```html
<script src="bower_components/greuler/dist/greuler.min.js"></script>
```

## Usage

```js
// npm
var greuler = require('greuler');
// browser
var greuler = window.greuler;

greuler({
  // options below
})
```

## Examples

Check out the examples at the [`homepage`](http://maurizzzio.github.io/greuler/)

## Usage Notes

- The `data` property of the configuration option sent to greuler maps all the properties to calls to methods of WebCola

```javascript
// e.g.
greuler({
  // ...
  data: {
    linkDistance: 100,
    avoidOverlaps: true,
    nodes: [...],
    links: [...],
    groups: [...],
  }
});

// is mapped to
cola.d3Adaptor()
  .linkDistance(data.linkDistance)
  .avoidOverlaps(data.avoidOverlaps)
  .nodes(data.nodes)
  .links(data.links)
// ...
```

- layout methods that receive multiple arguments are sent in data in an array form

e.g. `layout.flowLayout('y', 50)`

```
data: {
  // ...
  symmetricDiffLinkLengths: ['y', 50]
}
```

On runtime you can add/remove/update the properties through `instance.options.data`, make sure you don't modify
`instance.options.data.nodes` or `instance.options.data.links` to avoid layout errors, after all this is the job of
`instance.graph.*` methods :)

- The layout adaptor instance can be accessed through `instance.layout`
- To make the nodes have a fixed position listen for the `firstLayoutEnd` event and add the `fixed` property 
to each one of the nodes you want to be fixed e.g.

```javascript
instance.events.on('firstLayoutEnd', function () {
  instance.graph.nodes.forEach(function (d) {
    d.fixed = true;
  });
});
```

- Custom animations can easily be created, for any of the values returned from `instance.graph.*` call
`instance.selector.select` and you obtain the group that represents the node/edge e.g.

```javascript
var nodes = instance.graph.getNodesByFn(function (node) {
  return node.id > 5;
});

// a selection of <g> tags
var selection = instance.selection.select(nodes);
```

## API

```javascript
var greuler = require('greuler');
```

### `instance = greuler(options)`

**params**

The smallest program consists of call to `greuler` with an object with two properties

* `options.target`: The container to hold the graph
* `options.data`: The data that contains the description of the graph, all the properties are mapped
to calls to methods of the layout program, check [WebCola's documentation](http://marvl.infotech.monash.edu/webcola/doc/classes/cola.layout.html#alpha)
for a full overview of the layout options

The required properties of `data` are:

* `nodes=[]` An array of objects, each object describes the properties of a node
  * `node.id` (required) The `id` of the node, the mapping of the endpoints of an edge is done by id
  * `node.x=undefined` The `x` position in the graph of this node
  * `node.y=undefined` The `y` position in the graph of this node
  * `node.fixed=false` True to keep this node in a fixed position after it was dragged,
  (style properties)
  * `node.fill` The fill of the circle representing a node
  * `node.r` The radius of the circle representing a node
  * `node.label=''` Label to be shown inside the node, the `id` is shown by default
  * `node.topRightLabel=''` Label to be shown on the top right of the node, useful for additional
  annotations

* `links=[]` An array of objects, each object describes the properties of an edge
  * `link.source` The id of the source node
  * `link.target` The id of the target node
  (style properties)
  * `link.directed=false` True to make the edge directed

Additional options

* `options.width=700` Width of the graph
* `options.height=300` Height of the graph
* `options.directed=false` True to make the graph directed
* `options.animationTime=1000` Time in ms used for the transitions done with `instance.selector.*`
* `options.labels=true` False to hide the labels on the nodes

**returns**

A greuler instance used to interact with the graph

#### `instance.events`

All the events are exposed through this object

**events**

* `firstLayoutEnd` fired when the initial layout has finished, it's fired only once

#### `instance.update([options])`

**params**

* `options={}`
  * `options.skipLayout=false` True to skip layout and only bind the data to the svg elements (a layout
  operations needs to be done only when nodes/edges are added/removed to the graph, any other operation
  that modifies existing properties of the nodes/edges don't need a layout)
  * `options.iterations=[]` The number of iterations run by WebCola see [layout.start](http://marvl.infotech.monash.edu/webcola/doc/classes/cola.layout.html#start)

#### `instance.graph`

Check out [the Graph class](https://github.com/maurizzzio/greuler/blob/master/src/Graph.js)

#### `instance.selector`

Check out [the Selector class](https://github.com/maurizzzio/greuler/blob/master/src/selector/GreulerDefaultTransition.js)

### `greuler.colors`

An object containing the predefined palette used in greuler which is built with `d3.scale.category20()`

e.g.

```javascript
greuler.colors.RED
greuler.colors.BLUE
greuler.colors.LIGHT_GREEN
```

## Development

After cloning the repo run

```
npm install
bower install
```

And then

```sh
gulp serve
```

Open `http://localhost:9000` and that's it! 

## License

2015 MIT © Mauricio Poppe

[npm-image]: https://img.shields.io/npm/v/greuler.svg?style=flat
[npm-url]: https://npmjs.org/package/greuler
[travis-image]: https://travis-ci.org/maurizzzio/greuler.svg?branch=master
[travis-url]: https://travis-ci.org/maurizzzio/greuler
