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
 * @fileoverview Delay pedal component model.
 */

goog.provide('pb.stomp.DelayModel');
goog.require('pb.stomp.BoxModel');



/**
 * Component model for delay pedal.
 * @constructor
 * @extends {pb.stomp.BoxModel}
 * @param {AudioContext} context The context this component model will operate on.
 */
pb.stomp.DelayModel = function(context){
    goog.base(this, context);

    this.delayer = this.context.createDelay();
    this.delayer.delayTime.value = 0.4;

    this.feedbackGain = this.context.createGain();
    this.feedbackGain.gain.value = 0.9;

    this.effects = [this.delayer, this.feedbackGain, this.level];
};
goog.inherits(pb.stomp.DelayModel, pb.stomp.BoxModel);


/**
 * Sets the delay timer level.
 *
 * @param {number} newTimer New delay timer value to be set.
 */
pb.stomp.DelayModel.prototype.setDelayTimer = function(newTimer) {
    this.delayer.delayTime.value = newTimer;
};


/**
 * Sets the feedback gain level.
 *
 * @param {number} newGain New gain value to be set.
 */
pb.stomp.DelayModel.prototype.setFeedbackGain = function(newGain) {
    this.feedbackGain.gain.value = newGain;
};


/**
 * @override
 */
pb.stomp.DelayModel.prototype.routeInternal = function() {
    goog.base(this, 'routeInternal');

    this.feedbackGain.connect(this.delayer);
    this.inputBuffer.connect(this.outputBuffer);
};
