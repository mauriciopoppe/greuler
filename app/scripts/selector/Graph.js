'use strict';

import utils from '../utils';

export default class ElementSelector {
  constructor(owner) {
    this.owner = owner;
    this.graph = owner.manager;
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
