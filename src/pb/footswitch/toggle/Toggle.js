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


goog.provide('pb.footswitch.Toggle');
goog.require('pb.footswitch.Switch');
goog.require('pb.footswitch.ToggleModel');



/**
 * Toggle switch component models a toggle footswitch. It's on after you press it once and stays on until you press it
 * a second time when it will then be off.
 *
 * @constructor
 * @extends {pb.footswitch.Switch}
 *
 * @param {string=} opt_name Name of the switch. Will be written under it.
 */
pb.footswitch.Toggle = function(opt_name) {
    goog.base(this, opt_name);
};
goog.inherits(pb.footswitch.Toggle, pb.footswitch.Switch);


/**
 * @type {function(new: pb.footswitch.SwitchModel, string=)}
 *       The component model this switch component will work with.
 */
pb.footswitch.Toggle.prototype.modelClass = pb.footswitch.ToggleModel;
