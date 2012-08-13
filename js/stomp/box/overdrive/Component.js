// Copyright 2011 Armagan Amcalar. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Overdrive pedal.
 */

goog.provide('stomp.box.overdrive.Component');
goog.require('stomp.box.box.Component');
goog.require('stomp.box.overdrive.ComponentModel');



/**
 * Overdrive pedal.
 *
 * @constructor
 * @extends {stomp.box.box.Component}
 * @param {webkitAudioContext} context Audio context the pedal will work on.
 */
stomp.box.overdrive.Component = function(context) {
    goog.base(this, context);
};
goog.inherits(stomp.box.overdrive.Component, stomp.box.box.Component);


/**
 * @override
 */
stomp.box.overdrive.Component.prototype.modelClass = stomp.box.overdrive.ComponentModel;


/**
 * @override
 */
stomp.box.overdrive.Component.prototype.createPots = function() {
    goog.base(this, 'createPots');
    this.drivePot = new stomp.pot.PotComponent(this.model.gain.gain, 'Drive', 1000);
    this.pots.push(this.drivePot);
};


/**
 * @override
 */


/**
 * Sets the drive pot.
 *
 * @param {number} newValue New drive value, ranges between 0-10.
 */
stomp.box.overdrive.Component.prototype.setDrive = function(newValue) {
    this.drivePot.setValue(newValue);
    this.model.setDrive(newValue);
};


/**
 * @override
 */
stomp.box.overdrive.Component.prototype.name = 'overdrive';
