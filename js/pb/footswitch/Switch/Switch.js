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


goog.provide('pb.footswitch.Switch');
goog.require('pb.footswitch.SwitchModel');
goog.require('pb.ui.Component');



/**
 * Switch component models a footswitch. This base class is used to toggle stompbox nodes.
 *
 * @constructor
 * @extends {pb.ui.Component}
 *
 * @param {string=} opt_name Name of the switch. Will be written under it.
 */
pb.footswitch.Switch = function(opt_name) {
    this.model = new this.modelClass(opt_name);
    goog.base(this);
};
goog.inherits(pb.footswitch.Switch, pb.ui.Component);


/**
 * @type {function(new: pb.footswitch.SwitchModel, string=)}
 *       The component model this switch component will work with.
 */
pb.footswitch.Switch.prototype.modelClass = pb.footswitch.SwitchModel;


/**
 * Sets the nodes this switch will toggle.
 *
 * @param {Array.<Array.<AudioNode>>} nodes Nodes of this switch.
 */
pb.footswitch.Switch.prototype.setNodes = function(nodes) {
    this.model.setNodes(nodes);
};


/**
 * Returns the current state of the switch. Return value is true if the switch is on, and false if otherwise.
 *
 * @return {boolean} Whether the switch is on or off.
 */
pb.footswitch.Switch.prototype.getState = function() {
    return this.model.state;
};


/**
 * Toggles the switch.
 */
pb.footswitch.Switch.prototype.toggle = function() {
    this.model.toggle();
};


/**
 * @override
 */
pb.footswitch.Switch.prototype.templates_base = function() {
    return '<div class="switch" id="' + this.getId() + '">' +
               '<div class="button"></div>' +
               this.templates_name() +
           '</div>';
};


/**
 * @return {string} Name template. Returns empty string if no name is given.
 */
pb.footswitch.Switch.prototype.templates_name = function() {
    return this.model.name ? ('<div class="name">' + this.model.name + '</div>') : '';
};


/**
 * @enum {string} DOM mappings.
 */
pb.footswitch.Switch.prototype.mappings = {
    BUTTON: '.button'
};


(function(proto) {
    proto.events = {};
    var click = proto.events[goog.events.EventType.CLICK] = {};

    click[proto.mappings.BUTTON] = proto.toggle;
})(pb.footswitch.Switch.prototype);
