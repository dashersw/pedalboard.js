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


goog.provide('pb.ui.ComponentManager');
goog.require('tart.ui.ComponentManager');

/**
 * @fileoverview Registry for pb.ui.Component. Manages DOM event interactions for these components.
 */


/**
 * @constructor
 * @extends {tart.ui.ComponentManager}
 */
pb.ui.ComponentManager = function() {
    goog.base(this);
    /** @type {Object.<string, pb.ui.Component>} */
    this.components = {};
};
goog.inherits(pb.ui.ComponentManager, tart.ui.ComponentManager);
goog.addSingletonGetter(pb.ui.ComponentManager);


/**
 * Set given component.
 * @param {pb.ui.Component} cmp Component which will be set to components.
 */
pb.ui.ComponentManager.prototype.set = function(cmp) {
    this.components[cmp.getId()] = cmp;
};


/**
 * Removes given component.
 * @param {pb.ui.Component} cmp Component which will be removed from components.
 */
pb.ui.ComponentManager.prototype.remove = function(cmp) {
    delete this.components[cmp.getId()];
};
