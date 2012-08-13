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
 * @fileoverview Conv pedal component model.
 *
 * Impulse response buffer taken from
 *
 * http://www.adventurekid.se/akrt/free-conv-impulse-responses/
 */

goog.provide('stomp.box.conv.ComponentModel');
goog.require('stomp.box.box.ComponentModel');



/**
 * Component model for conv pedal.
 *
 * @constructor
 * @extends {stomp.box.box.ComponentModel}
 * @param {webkitAudioContext} context The context this component model will operate on.
 */
stomp.box.conv.ComponentModel = function(context) {
    goog.base(this, context);
    this.conv = this.context.createConvolver();
    this.convGain = this.context.createGainNode();

    this.effects = [this.conv, this.convGain];

    this.loadIR();

};
goog.inherits(stomp.box.conv.ComponentModel, stomp.box.box.ComponentModel);


/**
 * The path of the impulse response of this conv.
 *
 * @type {string}
 */
stomp.box.conv.ComponentModel.prototype.iRPath = 'audio/ir/speaker/AK-SPKRS_VinUs_002.wav';


/**
 * @override
 */
stomp.box.conv.ComponentModel.prototype.connect = function(destination) {
    goog.base(this, 'connect', destination);
    this.inputBuffer.connect(destination);
    //    this.inputBuffer.gain.value = 0.1;
    //    this.convGain.gain.value = 10;
};


/**
 * Loads the impulse response.
 */
stomp.box.conv.ComponentModel.prototype.loadIR = function() {
    var that = this,
        request = new XMLHttpRequest();

    request.open('GET', this.iRPath, true);
    request.responseType = 'arraybuffer';


    request.onload = function() {
        that.context.decodeAudioData(request.response, function(buffer) {
            that.conv.buffer = buffer;
        });
    };
    request.send();
};
