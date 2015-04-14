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

goog.provide('pb.ui.Component');
goog.require('goog.ui.Component');
goog.require('goog.ui.Container');
goog.require('goog.ui.Control');
goog.require('pb.ui.ComponentManager');
goog.require('tart.dom');



/**
 * pb.ui.Component is a mix between tart.ui.Component and goog.ui.Component.
 *
 * @constructor
 * @extends {goog.ui.Component}
 */
pb.ui.Component = function() {
    goog.base(this);

    pb.ui.ComponentManager.getInstance().set(this);
};
goog.inherits(pb.ui.Component, goog.ui.Component);


/**
 * Listens to the model's events. This method should be overriden by the implementer, and should keep the model's event
 * listeners.
 * @protected
 */
pb.ui.Component.prototype.bindModelEvents = function() {};


/**
 * @override
 */
pb.ui.Component.prototype.createDom = function() {
    this.setElementInternal(/** @type {Element} */(tart.dom.createElement(this.templates_base())));
};


/**
 * @override
 */
pb.ui.Component.prototype.setModel = function(model) {
    goog.base(this, 'setModel', model);
    this.model = this.getModel();
};


/**
 * @override
 */
pb.ui.Component.prototype.addChildAt = function(child, index, opt_render) {
    if (opt_render != false) opt_render = true;

    goog.base(this, 'addChildAt', child, index, opt_render);
};


/**
 * Adds the specified children to this component, appending at the end.
 *
 * @param {Array.<pb.ui.Component>} children The new child components.
 * @param {boolean=} opt_render If false, the child component will not be rendered into the parent.
 */
pb.ui.Component.prototype.addChildren = function(children, opt_render) {
    var that = this;
    children.forEach(function(child) {
        that.addChild(child, opt_render);
    }, this);
};


/**
 * Returns the child components of this component (if any).
 * @return {Array.<pb.ui.Component>} Child components.
 */
pb.ui.Component.prototype.getChildren = function() {
    var ids = this.getChildIds(), that = this;
    return ids.map(function(id) {
        return that.getChild(id);
    });
};


/**
 * @override
 */
pb.ui.Component.prototype.disposeInternal = function() {
    goog.base(this, 'disposeInternal');

    this.model && this.model.dispose && this.model.dispose();
    this.model = null;
};


/**
 * Much like jQuery, this method gets a DOM element that is a child of this component. It's a convenience method and
 * wraps goog.dom.query.
 *
 * @param {string} selector A selector string as understood by the querySelector.
 * @return { {length: number} } The elements as the result of the query.
 */
pb.ui.Component.prototype.$ = function(selector) {
    return goog.dom.query(selector, this.getElement());
};


/**
 * template for the component's root element.
 *
 * @return {string} template.
 */
pb.ui.Component.prototype.templates_base = function() {
    return '<div id="' + this.getId() + '"></div>';
};
