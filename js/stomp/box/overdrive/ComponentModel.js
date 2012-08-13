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
 * @fileoverview Overdrive pedal component model.
 */

goog.provide('stomp.box.overdrive.ComponentModel');
goog.require('stomp.box.box.ComponentModel');



/**
 * Component model for overdrive pedal.
 *
 * @constructor
 * @extends {stomp.box.box.ComponentModel}
 * @param {webkitAudioContext} context The context this component model will operate on.
 */
stomp.box.overdrive.ComponentModel = function(context) {
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
goog.inherits(stomp.box.overdrive.ComponentModel, stomp.box.box.ComponentModel);


/**
 * Creates two wave shaper curves that introduce distortion to the incoming signal.
 *
 * @param {number} amount Amount of distortion to be applied.
 */
stomp.box.overdrive.ComponentModel.prototype.createWSCurve = function(amount) {
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
stomp.box.overdrive.ComponentModel.prototype.setDrive = function(newDrive) {
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
stomp.box.overdrive.ComponentModel.prototype.connect = function(destination) {
    goog.base(this, 'connect', destination);
    //    this.inputBuffer.connect(destination);
};
