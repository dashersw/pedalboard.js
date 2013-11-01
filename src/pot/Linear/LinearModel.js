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
 * @fileoverview Linear pot component model.
 */


goog.provide('pb.pot.LinearModel');
goog.require('pb.pot.PotModel');



/**
 * Linear model provides a potentiometer behavior similar to real world linear potentiometers.
 *
 * @constructor
 * @extends {pb.pot.PotModel}
 *
 * @param {AudioParam|Function} param Audio parameter this pot will adjust. Can be gain, etc.
 * @param {string} name Name of the pot. Will be written under it.
 * @param {number} multiplier The multiplier of the effect. Some effects (such as gain) need this to be on the order of
 *                       thousands.
 * @param {number=} opt_max Optional minimum value for the pot. Default value is 0.
 * @param {number=} opt_min Optional maximum value for the pot. Default value is 1.
 * @param {number=} opt_default Optional default value for the pot. Default value is 0.5.
 */
pb.pot.LinearModel = function(param, name, multiplier, opt_min, opt_max, opt_default) {
    goog.base(this, param, name, multiplier, opt_min, opt_max, opt_default);
};
goog.inherits(pb.pot.LinearModel, pb.pot.PotModel);
