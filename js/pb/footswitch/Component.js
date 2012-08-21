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
 * @fileoverview Base switch component.
 */


goog.provide('pb.footswitch.Component');
goog.require('goog.events.MouseWheelHandler');
goog.require('pb.footswitch.ComponentModel');
goog.require('tart.ui.DlgComponent');



/**
 * Footswitch component models a virtual switch. This base class is used to toggle stompbox nodes.
 *
 * @constructor
 * @extends {tart.ui.DlgComponent}
 *
 * @param {string=} opt_name Name of the switch. Will be written under it.
 */
pb.footswitch.Component = function(opt_name) {
    this.model = new this.modelClass(opt_name);
    goog.base(this);
};
goog.inherits(pb.footswitch.Component, tart.ui.DlgComponent);


/**
 * @type {function(new: pb.footswitch.ComponentModel, string=)}
 *       The component model this switch component will work with.
 */
pb.footswitch.Component.prototype.modelClass = pb.footswitch.ComponentModel;


/**
 * Sets the nodes this switch will toggle.
 *
 * @param {Array.<Array.<AudioNode>>} nodes Nodes of this switch.
 */
pb.footswitch.Component.prototype.setNodes = function(nodes) {
    this.model.setNodes(nodes);
};


/**
 * Switch click handler.
 */
pb.footswitch.Component.prototype.onClick = function() {
    this.model.toggle();
};


/**
 * Nothing to do atm.
 */
pb.footswitch.Component.prototype.render = function() {};


/**
 * @override
 */
pb.footswitch.Component.prototype.templates_base = function() {
    return '<div class="switch" id="' + this.id + '">' +
               '<img class="button" src="img/switch.png"/>' +
               this.templates_name() +
           '</div>';
};


/**
 * @return {string} Name template. Returns empty string if no name is given.
 */
pb.footswitch.Component.prototype.templates_name = function() {
    return this.model.name ? ('<div class="name">' + this.model.name + '</div>') : '';
};


/**
 * @enum {string} DOM mappings.
 */
pb.footswitch.Component.prototype.mappings = {
    BUTTON: '.button'
};


(function(proto) {
    proto.events = {};
    var click = proto.events[goog.events.EventType.CLICK] = {};

    click[proto.mappings.BUTTON] = proto.onClick;
})(pb.footswitch.Component.prototype);
