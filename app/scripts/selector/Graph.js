'use strict';

import utils from '../utils';
import {colors} from '../const';
import extend from 'extend';

export default class ElementSelector {
  constructor(owner) {
    this.owner = owner;
    this.graph = owner.graph;
    this.defaultOptions = {};
  }

  getDefaultOptions() {
    return extend({
      duration: this.getAnimationTime(),
      stroke: colors.RED,
      source: -1
    }, this.defaultOptions);
  }

  updateOptions(options) {
    return extend({}, this.getDefaultOptions(), options);
  }

  getAnimationTime() {
    return this.owner.options.animationTime;
  }

  // edges
  select(els) {
    if (!Array.isArray(els)) {
      els = [els];
    }
    if (!els.length) {
      els.push({ id: -1 });
    }
    els = els.filter(Boolean);
    return this.owner.root.selectAll(
      els.map(function (e) {
        return '#' + utils.ns(e.id);
      }).join(', ')
    );
  }
}
