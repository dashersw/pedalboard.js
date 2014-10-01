// Copyright 2014 Aytekin Hazar İlhan. All Rights Reserved.
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
 * @fileoverview Delay pedal.
 */

goog.provide('pb.stomp.Delay');
goog.require('pb.pot.Linear');
goog.require('pb.stomp.Box');
goog.require('pb.stomp.DelayModel');



/**
 * Delay pedal.
 *
 * @constructor
 * @extends {pb.stomp.Box}
 * @param {AudioContext} context Audio context the pedal will work on.
 */
pb.stomp.Delay = function(context) {
    goog.base(this, context);
};
goog.inherits(pb.stomp.Delay, pb.stomp.Box);


/**
 * @override
 */
pb.stomp.Delay.prototype.modelClass = pb.stomp.DelayModel;


/**
 * @override
 */
pb.stomp.Delay.prototype.createPots = function() {
    goog.base(this, 'createPots');
    var delayTimeHandler = goog.bind(this.model.setDelayTimer, this.model);
    var feedbackGainHandler = goog.bind(this.model.setFeedbackGain, this.model);

    this.delayTimerPot = new pb.pot.Log(delayTimeHandler, 'delay time', 5);
    this.feedbackGainPot = new pb.pot.Linear(feedbackGainHandler, 'feedback gain', 0.95);
    this.pots.push(this.delayTimerPot, this.feedbackGainPot);
};


/**
 * Sets the delay timer pot.
 *
 * @param {number} newTimer New delay timer value in range 0-5 seconds.
 */
pb.stomp.Delay.prototype.setDelayTimer = function(newTimer) {
    this.delayTimerPot.setValue(newTimer);
};


/**
 * Sets the feedback gain pot.
 *
 * @param {number} newGain New gain value in range 0-0.95.
 */
pb.stomp.Delay.prototype.setFeedbackGain = function(newGain) {
    this.feedbackGainPot.setValue(newGain);
};


/**
 * @override
 */
pb.stomp.Delay.prototype.name = 'delay';
