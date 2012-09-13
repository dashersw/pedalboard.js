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


goog.provide('pb.pot.LogModel');
goog.require('pb.pot.PotModel');



/**
 * Log model provides a potentiometer behavior similar to real world logarithmic potentiometers.
 *
 * @constructor
 * @extends {pb.pot.PotModel}
 * @inheritDoc
 */
pb.pot.LogModel = function(param, name, multiplier) {
    goog.base(this, param, name, multiplier);
};
goog.inherits(pb.pot.LogModel, pb.pot.PotModel);


/**
 * @override
 */
pb.pot.LogModel.prototype.processValue = function(newValue, oldValue) {
    newValue = Math.pow(newValue, 3) / 100;
    this.value = newValue * this.multiplier;
};


/**
 * @override
 */
pb.pot.LogModel.prototype.getNormalizedValue = function() {
    return Math.round(Math.pow(this.value * 100 / this.multiplier, 1 / 3) * 100) / 100;
};
