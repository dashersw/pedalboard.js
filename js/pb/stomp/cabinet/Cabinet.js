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
 * @fileoverview Cabinet pedal. This pedal simulates amp cabinets.
 */

goog.provide('pb.stomp.Cabinet');
goog.require('pb.stomp.Conv');
goog.require('pb.stomp.CabinetModel');



/**
 * Cabinet pedal.
 *
 * @constructor
 * @extends {pb.stomp.Conv}
 * @param {AudioContext} context Audio context the pedal will work on.
 */
pb.stomp.Cabinet = function(context) {
    goog.base(this, context);

    this.volumePot.setValue(1);
};
goog.inherits(pb.stomp.Cabinet, pb.stomp.Conv);


/**
 * @override
 */
pb.stomp.Cabinet.prototype.modelClass = pb.stomp.CabinetModel;


/**
 * @override
 */
pb.stomp.Cabinet.prototype.name = 'cabinet';


/**
 * @override
 */
pb.stomp.Cabinet.prototype.gainMultiplier = 10;
