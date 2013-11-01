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
 * @fileoverview Conv pedal.
 */

goog.provide('pb.stomp.Conv');
goog.require('pb.stomp.Box');
goog.require('pb.stomp.ConvModel');



/**
 * Conv pedal.
 *
 * @constructor
 * @extends {pb.stomp.Box}
 * @param {AudioContext} context Audio context the pedal will work on.
 */
pb.stomp.Conv = function(context) {
    goog.base(this, context);
};
goog.inherits(pb.stomp.Conv, pb.stomp.Box);


/**
 * @override
 */
pb.stomp.Conv.prototype.modelClass = pb.stomp.ConvModel;


/**
 * @override
 */
pb.stomp.Conv.prototype.name = 'convo';


/**
 * @type {number} The gain multiplier for the level pot. Some IR responses are too high on volume and they need
 * to be tamed.
 */
pb.stomp.Conv.prototype.gainMultiplier = 1;


/**
 * @override
 */
pb.stomp.Conv.prototype.createPots = function() {
    this.volumePot = new pb.pot.Pot(this.model.convGain.gain, 'effect', this.gainMultiplier);
    this.pots = [].concat(this.volumePot);
};
