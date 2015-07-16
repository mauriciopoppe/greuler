# greuler 

[![Build Status][travis-image]][travis-url] <img src="//benschwarz.github.io/bower-badges/badge@2x.png" width="130" height="30">

[![NPM][npm-image]][npm-url]

<b>greuler</b> is graph theory visualization tool powered by <a href="http://d3js.org/">d3</a>
and on top of <a href="http://marvl.infotech.monash.edu/webcola/">WebCola</a>
which allows the creation and manipulation of graphs with a simple api
        
[Homepage](http://maurizzzio.github.io/greuler/)

## Installation

With npm:

```sh
// ES6
$ npm install --save greuler
```

Or bower:

```sh
$ bower install --save greuler
```

## Usage

```js
var greuler;
// npm
greuler = require('greuler');
// browser
greuler = window.greuler;

greuler({
  // options below
})
```

## Examples

Check out the examples at the [`homepage`](http://maurizzzio.github.io/greuler/)

## API

```
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

### `instance.update([options])`

**params**

* `options={}`
  * `options.skipLayout=false` True to skip layout and only bind the data to the svg elements (a layout
  operations needs to be done only when nodes/edges are added/removed to the graph, any other operation
  that modifies existing properties of the nodes/edges don't need a layout)

### `instance.graph`

### `instance.selector`

## Development

After cloning the repo and running `npm install`

```sh
gulp serve
```

Open `http://localhost:9000` and that's it! 

## License

2015 MIT © Mauricio Poppe

[npm-image]: https://nodei.co/npm/greuler.png?downloads=true
[npm-url]: https://npmjs.org/package/greuler
[travis-image]: https://travis-ci.org/maurizzzio/greuler.svg?branch=master
[travis-url]: https://travis-ci.org/maurizzzio/greuler
