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

goog.provide('pb.box.overdrive.ComponentModel');
goog.require('pb.box.box.ComponentModel');



/**
 * Component model for overdrive pedal.
 *
 * @constructor
 * @extends {pb.box.box.ComponentModel}
 * @param {webkitAudioContext} context The context this component model will operate on.
 */
pb.box.overdrive.ComponentModel = function(context) {
    goog.base(this, context);
    this.lowPassFreq = 1600;
    this.secondLowPassFreq = 4000;

    this.lowPass = this.context.createBiquadFilter();
    this.lowPass.type = 0;
    this.lowPass.frequency.value = this.lowPassFreq;

    this.secondLowPass = this.context.createBiquadFilter();
    this.secondLowPass.type = 0;
    this.secondLowPass.frequency.value = this.secondLowPassFreq;

    this.gain = this.context.createGainNode();
    this.waveShaper = this.context.createWaveShaper();
    this.waveShaper2 = this.context.createWaveShaper();
    this.setDrive(0);
    this.compressor = this.context.createDynamicsCompressor();
    this.compressor.threshold.value = -10;

    this.effects = [
//        this.gain,
//        this.waveShaper2,
        this.waveShaper,
//        this.secondLowPass,
        this.lowPass,
        this.compressor
    ];
};
goog.inherits(pb.box.overdrive.ComponentModel, pb.box.box.ComponentModel);


/**
 * Creates two wave shaper curves that introduce distortion to the incoming signal.
 *
 * @param {number} amount Amount of distortion to be applied.
 */
pb.box.overdrive.ComponentModel.prototype.createWSCurve = function(amount) {
    var k = amount;
    var n_samples = 44100;
    this.wsCurve = new Float32Array(n_samples);
    this.wsCurve2 = new Float32Array(n_samples);
    var deg = Math.PI / 180;
    for (var i = 0; i < n_samples; i += 1) {
        var x = i * 2 / n_samples - 1;
        this.wsCurve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));

        this.wsCurve2[i] = this.wsCurve[i] * 10;
    }

    this.waveShaper.curve = this.wsCurve;
    this.waveShaper2.curve = this.wsCurve;
};


/**
 * Sets the drive level.
 *
 * @param {number} newDrive Drive level to set.
 */
pb.box.overdrive.ComponentModel.prototype.setDrive = function(newDrive) {
    var input = newDrive / 100;
    if (input < 1) input = 1;
    var curveInput = Math.min(Math.pow(input, 3) + 1, 1000);
    this.createWSCurve(curveInput);

    this.lowPass.frequency.value = 20000 / ((input || 0.2)/1.4);
    this.secondLowPass.frequency.value = 20000 / ((input || 2) * 0.25);
    //    this.gain.gain.value = input * 100 || 1;
};


/**
 * @override
 */
pb.box.overdrive.ComponentModel.prototype.connect = function(destination) {
    goog.base(this, 'connect', destination);
    //    this.inputBuffer.connect(destination);
};
