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
 * @fileoverview Conv pedal component model.
 *
 * Impulse response buffer taken from
 *
 * http://www.adventurekid.se/akrt/free-conv-impulse-responses/
 */

goog.provide('pb.stomp.ConvModel');
goog.require('pb.stomp.BoxModel');



/**
 * Component model for conv pedal.
 *
 * @constructor
 * @extends {pb.stomp.BoxModel}
 * @param {AudioContext} context The context this component model will operate on.
 */
pb.stomp.ConvModel = function(context) {
    goog.base(this, context);
    this.conv = this.context.createConvolver();
    this.convGain = this.context.createGain();
    this.effects = [this.conv, this.convGain];

    this.iRPath && this.loadIR();
};
goog.inherits(pb.stomp.ConvModel, pb.stomp.BoxModel);


/**
 * The path of the impulse response of this conv.
 *
 * @type {string}
 */
pb.stomp.ConvModel.prototype.iRPath;


/**
 * @override
 */
pb.stomp.ConvModel.prototype.routeInternal = function() {
    goog.base(this, 'routeInternal');
    this.inputBuffer.connect(this.outputBuffer);
};


/**
 * Loads the impulse response.
 */
pb.stomp.ConvModel.prototype.loadIR = function() {
    var that = this,
        request = new XMLHttpRequest();

    request.open('GET', this.iRPath, true);
    request.responseType = 'arraybuffer';


    request.onload = function() {
        that.context.decodeAudioData(/** @type {ArrayBuffer} */(request.response), function(buffer) {
            that.conv.buffer = buffer;
        });
    };
    request.send();
};
