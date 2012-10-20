// Copyright 2012 Armagan Amcalar. All Rights Reserved.
//
// This file is part of Pedalboard.js.
//
// Pedalboard.js is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Pedalboard.js is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Pedalboard.js.  If not, see <http://www.gnu.org/licenses/>.

/**
 * @fileoverview The base component class.
 */

goog.provide('pb.ui.ComponentManager');
goog.require('tart.ui.ComponentManager');



/**
 * pb.ui.ComponentManager is a child class of tart.ui.ComponentManager for pb.ui.Components.
 *
 * @constructor
 * @extends {tart.ui.ComponentManager}
 */
pb.ui.ComponentManager = function() {
    /** @type {Object.<string, pb.ui.Component>} */
    this.components = {};

    this.initHandlers();
};
goog.inherits(pb.ui.ComponentManager, tart.ui.ComponentManager);
goog.addSingletonGetter(pb.ui.ComponentManager);


/**
 * @override
 * @return {pb.ui.Component} Parent node.
 */
pb.ui.ComponentManager.prototype.getParentCmp = function(child) {
    var node = child, cmp;

    do {
        if (cmp = (this.components[node.getAttribute && node.getAttribute('data-cmp')])) {}
        else if (cmp = this.components[node.id])
            child.setAttribute('data-cmp', node.id);

        if (cmp) break;
    } while (node = node.parentNode);

    return cmp;
};


/**
 * @override
 * @param {pb.ui.Component} cmp Component which will be set to components.
 */
pb.ui.ComponentManager.prototype.set = function(cmp) {
    this.components[cmp.getId()] = cmp;
};


/**
 * @override
 * @param {pb.ui.Component} cmp Component which will be removed from components.
 */
pb.ui.ComponentManager.prototype.remove = function(cmp) {
    delete this.components[cmp.getId()];
};
