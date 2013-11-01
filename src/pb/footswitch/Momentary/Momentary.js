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


goog.provide('pb.footswitch.Momentary');
goog.require('pb.footswitch.MomentaryModel');
goog.require('pb.footswitch.Switch');



/**
 * Momentary switch component models a Momentary footswitch. It's on as long as you press it and turns off when you
 * release.
 *
 * @constructor
 * @extends {pb.footswitch.Switch}
 *
 * @param {string=} opt_name Name of the switch. Will be written under it.
 */
pb.footswitch.Momentary = function(opt_name) {
    goog.base(this, opt_name);
    this.state = false;
};
goog.inherits(pb.footswitch.Momentary, pb.footswitch.Switch);


/**
 * @type {function(new: pb.footswitch.SwitchModel, string=)}
 *       The component model this switch component will work with.
 */
pb.footswitch.Momentary.prototype.modelClass = pb.footswitch.MomentaryModel;

(function(proto) {
    proto.events = {};
    var mousedown = proto.events[goog.events.EventType.MOUSEDOWN] = {};
    var mouseup = proto.events[goog.events.EventType.MOUSEUP] = {};

    mousedown[proto.mappings.BUTTON] = proto.toggle;
    mouseup[proto.mappings.BUTTON] = proto.toggle;
})(pb.footswitch.Momentary.prototype);
