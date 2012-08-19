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
 * @fileoverview Base pot component model.
 */


goog.provide('pb.pot.ComponentModel');
goog.require('tart.ui.ComponentModel');



/**
 * @constructor
 * @extends {tart.ui.ComponentModel}
 *
 * @param {AudioParam} param Audio parameter this pot will adjust. Can be gain, etc.
 * @param {string} name Name of the pot. Will be written under it.
 * @param {number} range The multiplier of the effect. Some effects (such as gain) need this to be on the order of
 *                       thousands.
 */
pb.pot.ComponentModel = function(param, name, range) {
    goog.base(this);

    this.param = param;
    this.name = name;
    this.range = range;
};
goog.inherits(pb.pot.ComponentModel, tart.ui.ComponentModel);


/**
 * Sets the new value for this pot's audio parameter and lets whoever listens hear about it.
 *
 * @param {number} newValue New value to be set.
 */
pb.pot.ComponentModel.prototype.setValue = function(newValue) {
    var oldValue = this.param.value;
    newValue = newValue * this.range;
    newValue = Math.min(newValue, 10 * this.range);
    newValue = newValue / 10;
    if (newValue < 0)
        return;
    this.param.value = newValue;

    this.dispatchEvent({
        type: pb.pot.ComponentModel.EventType.VALUE_CHANGED,
        newValue: newValue,
        oldValue: oldValue
    });
};


/**
 * @return {number} The normalized value of this pot's parameter (as calculated in value / range).
 */
pb.pot.ComponentModel.prototype.getNormalizedValue = function() {
    return this.param.value / this.range;
};


/**
 *
 * @enum {string}
 */
pb.pot.ComponentModel.EventType = {
    VALUE_CHANGED: 'valueChanged'
};
