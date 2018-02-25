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
 * @fileoverview Overdrive pedal component model.
 */

goog.provide('pb.stomp.OverdriveModel');
goog.require('pb.stomp.BoxModel');



/**
 * Component model for overdrive pedal.
 *
 * @constructor
 * @extends {pb.stomp.BoxModel}
 * @param {AudioContext} context The context this component model will operate on.
 */
pb.stomp.OverdriveModel = function(context) {
    goog.base(this, context);
    this.lowPassFreq = 3000;

    this.lowPass = this.context.createBiquadFilter();
    this.lowPass.type = 'lowpass';
    this.lowPass.frequency.value = this.lowPassFreq;

    this.waveShaper = this.context.createWaveShaper();

    this.effects = [
        this.waveShaper,
        this.lowPass,
        this.level
    ];
};
goog.inherits(pb.stomp.OverdriveModel, pb.stomp.BoxModel);


/**
 * Creates two wave shaper curves that introduce distortion to the incoming signal.
 *
 * @param {number} amount Amount of distortion to be applied.
 */
pb.stomp.OverdriveModel.prototype.createWSCurve = function(amount) {
    var k = amount;
    var n_samples = 22050;
    this.wsCurve = new Float32Array(n_samples);
    var deg = Math.PI / 180;
    for (var i = 0; i < n_samples; i += 1) {
        var x = i * 2 / n_samples - 1;
        this.wsCurve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
    }
    this.waveShaper.curve = this.wsCurve;
};


/**
 * Sets the drive level.
 *
 * @param {number} newDrive Drive level to set.
 */
pb.stomp.OverdriveModel.prototype.setDrive = function(newDrive) {
    this.createWSCurve(10 * newDrive);
};


/**
 * Sets the tone level.
 * @param {number} newTone Tone level to set.
 */
pb.stomp.OverdriveModel.prototype.setTone = function(newTone) {
    this.lowPass.frequency.value = 2000 + newTone;
};
