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
 * @fileoverview Overdrive pedal.
 */

goog.provide('pb.box.overdrive.Component');
goog.require('pb.box.box.Component');
goog.require('pb.box.overdrive.ComponentModel');



/**
 * Overdrive pedal.
 *
 * @constructor
 * @extends {pb.box.box.Component}
 * @param {AudioContext} context Audio context the pedal will work on.
 */
pb.box.overdrive.Component = function(context) {
    goog.base(this, context);

    this.setDrive(7);
};
goog.inherits(pb.box.overdrive.Component, pb.box.box.Component);


/**
 * @override
 */
pb.box.overdrive.Component.prototype.modelClass = pb.box.overdrive.ComponentModel;


/**
 * @override
 */
pb.box.overdrive.Component.prototype.createPots = function() {
    goog.base(this, 'createPots');
    this.drivePot = new pb.pot.Component(this.model.gain.gain, 'Drive', 1000);
    this.pots.push(this.drivePot);
};


/**
 * @override
 */
pb.box.overdrive.Component.prototype.bindModelEvents = function() {
    goog.events.listen(this.drivePot.model, pb.pot.ComponentModel.EventType.VALUE_CHANGED, function(e) {
        this.model.setDrive(e.newValue);
    }, false, this);
};


/**
 * Sets the drive pot.
 *
 * @param {number} newValue New drive value, ranges between 0-10.
 */
pb.box.overdrive.Component.prototype.setDrive = function(newValue) {
    this.drivePot.setValue(newValue);
};


/**
 * @override
 */
pb.box.overdrive.Component.prototype.name = 'overdrive';
