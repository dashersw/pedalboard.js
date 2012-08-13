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
 * @fileoverview Reverb pedal component model.
 *
 * Inspiration and impulse response buffer taken from
 *
 * http://kevincennis.com/audio/
 * http://kevincennis.com/audio/assets/sounds/pcm90cleanplate.wav
 *
 * More can be found at
 * http://www.dubbhism.com/2008/10/free-download-60-classic-and-king-tubby.html
 * http://www.adventurekid.se/akrt/free-reverb-impulse-responses/
 */

goog.provide('stomp.box.reverb.ComponentModel');
goog.require('stomp.box.box.ComponentModel');



/**
 * Component model for reverb pedal.
 *
 * @constructor
 * @extends {stomp.box.box.ComponentModel}
 * @param {webkitAudioContext} context The context this component model will operate on.
 */
stomp.box.reverb.ComponentModel = function(context) {
    goog.base(this, context);
    this.conv = this.context.createConvolver();

    this.effects = [this.conv];

    this.loadIR();

};
goog.inherits(stomp.box.reverb.ComponentModel, stomp.box.box.ComponentModel);


/**
 * The path of the impulse response of this reverb.
 *
 * @type {string}
 */
stomp.box.reverb.ComponentModel.prototype.IRPath = 'audio/ir/reverb/pcm90cleanplate.wav';


/**
 * Sets the level of the reverb effect.

 * @param {number} newLevel The new level of the reverb effect.
 */
stomp.box.reverb.ComponentModel.prototype.setLevel = function(newLevel) {
    this.effect.gain.value = newLevel;
};




/**
 * @override
 */
stomp.box.reverb.ComponentModel.prototype.connect = function(destination) {
    goog.base(this, 'connect', destination);
    this.inputBuffer.connect(destination);
};


/**
 * Loads the impulse response.
 */
stomp.box.reverb.ComponentModel.prototype.loadIR = function() {
    var that = this,
        request = new XMLHttpRequest();

    request.open('GET', this.IRPath, true);
    request.responseType = 'arraybuffer';


    request.onload = function() {
        that.context.decodeAudioData(request.response, function(buffer) {
            console.log(buffer);
            window.buf = buffer;
            that.conv.buffer = buffer;
        });
    };
    request.send();
};
