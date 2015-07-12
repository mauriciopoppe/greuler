'use strict';

import polyfills from './polyfills';
polyfills();

var d3 = window.d3;

// node
import Draw from './Draw';
import utils from './utils';

var instances = new Map();

function run(options) {
  function factory(options) {
    var el = d3.select(options.target);
    var id = el.attr('greuler-id');
    if (!id) {
      id = utils.id();
      el.attr('greuler-id', id);
      instances.set(id, new Draw(id, options));
    }
    return instances.get(id);
  }

  return factory(options);
}

import Graph from './Graph';
run.Graph = Graph;

import {colors} from './const';
run.colors = colors;

export default run;
