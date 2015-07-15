'use strict';

import utils from '../utils';
import {colors} from '../const';
import extend from 'extend';

export default class ElementSelector {
  constructor(owner) {
    this.owner = owner;
    this.graph = owner.graph;
    this.defaultStyleOptions = {};
  }

  getDefaultStyleOptions() {
    return extend({
      duration: this.getAnimationTime(),
      stroke: '#E74C3C'
    }, this.defaultStyleOptions);
  }

  getStyleOptions(options) {
    return extend({}, this.getDefaultStyleOptions(), options);
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
