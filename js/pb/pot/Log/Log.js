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
 * @fileoverview Base pot component.
 */


goog.provide('pb.pot.Log');
goog.require('pb.pot.LogModel');
goog.require('pb.pot.Pot');



/**
 * Log pot component models a logarithmic potentiometer.
 *
 * @constructor
 * @extends {pb.pot.Pot}
 * @inheritDoc
 */
pb.pot.Log = function(param, name, multiplier, opt_size) {
    goog.base(this, param, name, multiplier, opt_size);
};
goog.inherits(pb.pot.Log, pb.pot.Pot);


/**
 * @type {function(new: pb.pot.LogModel, (AudioParam|Function), string, number)}
 *       The component model this pot component will work with.
 * @override
 */
pb.pot.Log.prototype.modelClass = pb.pot.LogModel;
