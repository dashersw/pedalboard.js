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

goog.provide('pb.box.reverb.ComponentModel');
goog.require('pb.box.box.ComponentModel');



/**
 * Component model for reverb pedal.
 *
 * @constructor
 * @extends {pb.box.box.ComponentModel}
 * @param {webkitAudioContext} context The context this component model will operate on.
 */
pb.box.reverb.ComponentModel = function(context) {
    goog.base(this, context);
    this.conv = this.context.createConvolver();
    this.effects = [this.conv, this.level];

    this.loadIR();

};
goog.inherits(pb.box.reverb.ComponentModel, pb.box.box.ComponentModel);


/**
 * The path of the impulse response of this reverb.
 *
 * @type {string}
 */
pb.box.reverb.ComponentModel.prototype.iRPath = 'audio/ir/reverb/pcm90cleanplate.wav';


/**
 * @override
 */
pb.box.reverb.ComponentModel.prototype.routeInternal = function() {
    goog.base(this, 'routeInternal');
    this.inputBuffer.connect(this.outputBuffer);
};


/**
 * Loads the impulse response.
 */
pb.box.reverb.ComponentModel.prototype.loadIR = function() {
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
